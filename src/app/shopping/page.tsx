"use client";

import { useState } from "react";
import { Plus, Search, Users, Calendar } from "lucide-react";
import {
  ShoppingList,
  ItemStatus,
  ItemCategory,
  Priority,
} from "@/types/shopping";
import { ShoppingListView } from "@/components/shopping/ShoppingListView";

// Mock data for development
const mockShoppingList: ShoppingList = {
  id: "1",
  name: "Weekly Groceries",
  description: "Our weekly grocery shopping list",
  items: [
    {
      id: "1",
      name: "Organic Bananas",
      quantity: 6,
      category: ItemCategory.GROCERIES,
      priority: Priority.MEDIUM,
      price: 3.99,
      status: ItemStatus.TO_BUY,
      addedBy: "user1",
      addedAt: new Date(),
      updatedAt: new Date(),
      notes: "Make sure they are ripe",
    },
    {
      id: "2",
      name: "Whole Wheat Bread",
      quantity: 1,
      category: ItemCategory.GROCERIES,
      priority: Priority.HIGH,
      price: 4.5,
      status: ItemStatus.TO_BUY,
      addedBy: "user1",
      addedAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "Dish Soap",
      quantity: 1,
      category: ItemCategory.HOUSEHOLD,
      priority: Priority.LOW,
      status: ItemStatus.AT_HOME,
      addedBy: "user1",
      addedAt: new Date(),
      updatedAt: new Date(),
      notes: "We still have half a bottle",
    },
    {
      id: "4",
      name: "Greek Yogurt",
      quantity: 4,
      category: ItemCategory.GROCERIES,
      priority: Priority.MEDIUM,
      price: 6.99,
      status: ItemStatus.PURCHASED,
      addedBy: "user1",
      addedAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  collaborators: ["user1", "user2"],
  createdBy: "user1",
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
};

export default function ShoppingPage() {
  const [lists, setLists] = useState<ShoppingList[]>([mockShoppingList]);
  const [activeListId, setActiveListId] = useState<string>(mockShoppingList.id);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const activeList = lists.find((list) => list.id === activeListId);

  const handleUpdateList = (updatedList: ShoppingList) => {
    setLists((prev) =>
      prev.map((list) => (list.id === updatedList.id ? updatedList : list))
    );
  };

  const getTotalItems = (list: ShoppingList) => list.items.length;
  const getPendingItems = (list: ShoppingList) =>
    list.items.filter((item) => item.status === ItemStatus.TO_BUY).length;
  const getTotalValue = (list: ShoppingList) =>
    list.items.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Shopping Lists
            </h1>
            <p className="text-foreground/60 mt-1">
              Manage your collaborative shopping and inventory
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 flex items-center gap-2 font-semibold shadow-lg"
          >
            <Plus className="h-5 w-5" />
            New List
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - List Selection */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl shadow-lg border border-border/20 p-6">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Your Lists
              </h2>

              <div className="space-y-3">
                {lists.map((list) => (
                  <button
                    key={list.id}
                    onClick={() => setActiveListId(list.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      activeListId === list.id
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-background border-border/20 hover:bg-muted/50 text-foreground"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium truncate">{list.name}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                        {getPendingItems(list)}
                      </span>
                    </div>
                    <p className="text-xs opacity-70 mb-2 line-clamp-2">
                      {list.description || "No description"}
                    </p>
                    <div className="flex justify-between text-xs opacity-60">
                      <span>{getTotalItems(list)} items</span>
                      <span>${getTotalValue(list).toFixed(2)}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-border/20">
                <h3 className="font-medium text-foreground mb-3">
                  Quick Stats
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Active Lists:</span>
                    <span className="font-medium text-foreground">
                      {lists.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Total Items:</span>
                    <span className="font-medium text-foreground">
                      {lists.reduce(
                        (sum, list) => sum + getTotalItems(list),
                        0
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Est. Total:</span>
                    <span className="font-medium text-foreground">
                      $
                      {lists
                        .reduce((sum, list) => sum + getTotalValue(list), 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Active List */}
          <div className="lg:col-span-3">
            {activeList ? (
              <ShoppingListView
                list={activeList}
                onUpdateList={handleUpdateList}
              />
            ) : (
              <div className="bg-card rounded-2xl shadow-lg border border-border/20 p-12 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  No List Selected
                </h2>
                <p className="text-foreground/60 mb-6">
                  Select a shopping list from the sidebar or create a new one to
                  get started.
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 flex items-center gap-2 font-semibold mx-auto"
                >
                  <Plus className="h-5 w-5" />
                  Create Your First List
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
