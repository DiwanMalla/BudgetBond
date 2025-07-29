"use client";

import { useState } from "react";
import { Plus, Search, Grid, List } from "lucide-react";
import { ShoppingList, ItemStatus, ShoppingItem } from "@/types/shopping";
import { ShoppingItemCard } from "./ShoppingItemCard";
import { AddItemModal } from "./AddItemModal";

interface ShoppingListViewProps {
  list: ShoppingList;
  onUpdateList: (list: ShoppingList) => void;
}

export function ShoppingListView({
  list,
  onUpdateList,
}: ShoppingListViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [activeTab, setActiveTab] = useState<ItemStatus>(ItemStatus.TO_BUY);

  const filteredItems = list.items.filter(
    (item) =>
      item.status === activeTab &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTabCount = (status: ItemStatus) =>
    list.items.filter((item) => item.status === status).length;

  const tabs = [
    {
      status: ItemStatus.TO_BUY,
      label: "To Buy",
      emoji: "🟢",
      count: getTabCount(ItemStatus.TO_BUY),
    },
    {
      status: ItemStatus.AT_HOME,
      label: "At Home",
      emoji: "🟡",
      count: getTabCount(ItemStatus.AT_HOME),
    },
    {
      status: ItemStatus.PURCHASED,
      label: "Purchased",
      emoji: "✅",
      count: getTabCount(ItemStatus.PURCHASED),
    },
  ];

  return (
    <div className="bg-card rounded-2xl shadow-lg border border-border/20 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{list.name}</h2>
          {list.description && (
            <p className="text-foreground/60 mt-1">{list.description}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground/70"
          >
            {viewMode === "grid" ? (
              <List className="h-4 w-4" />
            ) : (
              <Grid className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 flex items-center gap-2 font-medium"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Item</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border/30 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
        />
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border/20">
        {tabs.map((tab) => (
          <button
            key={tab.status}
            onClick={() => setActiveTab(tab.status)}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-medium transition-colors relative ${
              activeTab === tab.status
                ? "bg-primary/10 text-primary border-b-2 border-primary"
                : "text-foreground/60 hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <span>{tab.emoji}</span>
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
            {tab.count > 0 && (
              <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-semibold">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Items Grid/List */}
      <div
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-3"
        }`}
      >
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ShoppingItemCard
              key={item.id}
              item={item}
              viewMode={viewMode}
              onUpdate={(updatedItem: ShoppingItem) => {
                const updatedList = {
                  ...list,
                  items: list.items.map((i) =>
                    i.id === updatedItem.id ? updatedItem : i
                  ),
                  updatedAt: new Date(),
                };
                onUpdateList(updatedList);
              }}
              onDelete={(itemId: string) => {
                const updatedList = {
                  ...list,
                  items: list.items.filter((i) => i.id !== itemId),
                  updatedAt: new Date(),
                };
                onUpdateList(updatedList);
              }}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">
              {activeTab === ItemStatus.TO_BUY && "🛒"}
              {activeTab === ItemStatus.AT_HOME && "🏠"}
              {activeTab === ItemStatus.PURCHASED && "✅"}
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No items{" "}
              {activeTab === ItemStatus.TO_BUY
                ? "to buy"
                : activeTab === ItemStatus.AT_HOME
                ? "at home"
                : "purchased"}{" "}
              yet
            </h3>
            <p className="text-foreground/60">
              {activeTab === ItemStatus.TO_BUY &&
                "Add items to your shopping list to get started!"}
              {activeTab === ItemStatus.AT_HOME &&
                "Mark items as 'at home' when you already have them."}
              {activeTab === ItemStatus.PURCHASED &&
                "Items you've bought will appear here."}
            </p>
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          onAdd={(newItem: ShoppingItem) => {
            const updatedList = {
              ...list,
              items: [...list.items, newItem],
              updatedAt: new Date(),
            };
            onUpdateList(updatedList);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}
