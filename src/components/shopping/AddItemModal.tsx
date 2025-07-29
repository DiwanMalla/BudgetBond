"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import {
  ShoppingItem,
  ItemStatus,
  Priority,
  ItemCategory,
} from "@/types/shopping";

interface AddItemModalProps {
  onClose: () => void;
  onAdd: (item: ShoppingItem) => void;
}

export function AddItemModal({ onClose, onAdd }: AddItemModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: 1,
    category: ItemCategory.GROCERIES,
    priority: Priority.MEDIUM,
    price: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      quantity: formData.quantity,
      category: formData.category,
      priority: formData.priority,
      price: formData.price ? parseFloat(formData.price) : undefined,
      status: ItemStatus.TO_BUY,
      addedBy: "current-user", // Replace with actual user ID
      addedAt: new Date(),
      updatedAt: new Date(),
      notes: formData.notes.trim() || undefined,
    };

    onAdd(newItem);
  };

  const categories = [
    { value: ItemCategory.GROCERIES, label: "🛒 Groceries" },
    { value: ItemCategory.HOUSEHOLD, label: "🏠 Household" },
    { value: ItemCategory.PERSONAL, label: "👤 Personal" },
    { value: ItemCategory.ELECTRONICS, label: "📱 Electronics" },
    { value: ItemCategory.CLOTHING, label: "👕 Clothing" },
    { value: ItemCategory.HEALTH, label: "💊 Health" },
    { value: ItemCategory.OTHER, label: "📦 Other" },
  ];

  const priorities = [
    { value: Priority.LOW, label: "Low", color: "text-green-600" },
    { value: Priority.MEDIUM, label: "Medium", color: "text-yellow-600" },
    { value: Priority.HIGH, label: "High", color: "text-orange-600" },
    { value: Priority.URGENT, label: "Urgent", color: "text-red-600" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-xl border border-border/20 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/20">
          <h2 className="text-xl font-bold text-foreground">Add New Item</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted/50 text-foreground/60"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Item Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Organic Bananas"
              className="w-full px-3 py-2 rounded-lg bg-background border border-border/30 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              required
            />
          </div>

          {/* Quantity and Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: parseInt(e.target.value) || 1,
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-background border border-border/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Price (optional)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="$0.00"
                className="w-full px-3 py-2 rounded-lg bg-background border border-border/30 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as ItemCategory,
                })
              }
              className="w-full px-3 py-2 rounded-lg bg-background border border-border/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Priority
            </label>
            <div className="grid grid-cols-2 gap-2">
              {priorities.map((priority) => (
                <button
                  key={priority.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, priority: priority.value })
                  }
                  className={`px-3 py-2 rounded-lg border text-sm font-medium ${
                    formData.priority === priority.value
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-background border-border/30 text-foreground/70 hover:bg-muted/50"
                  }`}
                >
                  {priority.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Notes (optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Any additional details..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg bg-background border border-border/30 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-border/30 text-foreground/70 hover:bg-muted/50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
