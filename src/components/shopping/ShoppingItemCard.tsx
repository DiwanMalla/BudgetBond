"use client";

import { useState } from "react";
import {
  MoreVertical,
  Edit2,
  Trash2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { ShoppingItem, ItemStatus, Priority } from "@/types/shopping";

interface ShoppingItemCardProps {
  item: ShoppingItem;
  viewMode: "grid" | "list";
  onUpdate: (item: ShoppingItem) => void;
  onDelete: (itemId: string) => void;
}

export function ShoppingItemCard({
  item,
  viewMode,
  onUpdate,
  onDelete,
}: ShoppingItemCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.URGENT:
        return "bg-red-500/20 text-red-700 dark:text-red-300";
      case Priority.HIGH:
        return "bg-orange-500/20 text-orange-700 dark:text-orange-300";
      case Priority.MEDIUM:
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300";
      case Priority.LOW:
        return "bg-green-500/20 text-green-700 dark:text-green-300";
    }
  };

  const getStatusActions = () => {
    switch (item.status) {
      case ItemStatus.TO_BUY:
        return [
          {
            label: "Mark as At Home",
            icon: <ArrowRight className="h-4 w-4" />,
            action: () =>
              onUpdate({
                ...item,
                status: ItemStatus.AT_HOME,
                updatedAt: new Date(),
              }),
          },
          {
            label: "Mark as Purchased",
            icon: <ArrowRight className="h-4 w-4" />,
            action: () =>
              onUpdate({
                ...item,
                status: ItemStatus.PURCHASED,
                updatedAt: new Date(),
              }),
          },
        ];
      case ItemStatus.AT_HOME:
        return [
          {
            label: "Move to Buy List",
            icon: <ArrowLeft className="h-4 w-4" />,
            action: () =>
              onUpdate({
                ...item,
                status: ItemStatus.TO_BUY,
                updatedAt: new Date(),
              }),
          },
          {
            label: "Mark as Purchased",
            icon: <ArrowRight className="h-4 w-4" />,
            action: () =>
              onUpdate({
                ...item,
                status: ItemStatus.PURCHASED,
                updatedAt: new Date(),
              }),
          },
        ];
      case ItemStatus.PURCHASED:
        return [
          {
            label: "Move to Buy List",
            icon: <ArrowLeft className="h-4 w-4" />,
            action: () =>
              onUpdate({
                ...item,
                status: ItemStatus.TO_BUY,
                updatedAt: new Date(),
              }),
          },
        ];
    }
  };

  const cardClasses =
    viewMode === "grid"
      ? "bg-background rounded-xl border border-border/30 p-4 hover:shadow-md transition-shadow"
      : "bg-background rounded-lg border border-border/20 p-3 hover:bg-muted/20 transition-colors flex items-center justify-between";

  return (
    <div className={cardClasses}>
      <div
        className={viewMode === "list" ? "flex items-center gap-3 flex-1" : ""}
      >
        {/* Item Info */}
        <div className={viewMode === "grid" ? "mb-3" : "flex-1"}>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground text-sm">
              {item.name}
            </h3>
            {viewMode === "grid" && (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1 rounded-md hover:bg-muted/50 text-foreground/60"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
                {showMenu && (
                  <div className="absolute right-0 top-8 bg-card border border-border/20 rounded-lg shadow-lg z-10 min-w-[160px]">
                    {getStatusActions().map((action, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          action.action();
                          setShowMenu(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-muted/50 text-foreground flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {action.icon}
                        {action.label}
                      </button>
                    ))}
                    <hr className="border-border/20" />
                    <button
                      onClick={() => {
                        onDelete(item.id);
                        setShowMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-2 rounded-b-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            className={`flex items-center gap-2 mt-1 ${
              viewMode === "list" ? "text-xs" : "text-sm"
            }`}
          >
            <span className="text-foreground/60">Qty: {item.quantity}</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                item.priority
              )}`}
            >
              {item.priority}
            </span>
            {item.price && (
              <span className="text-foreground/60">
                ${item.price.toFixed(2)}
              </span>
            )}
          </div>

          {item.notes && (
            <p className="text-foreground/50 text-xs mt-2 line-clamp-2">
              {item.notes}
            </p>
          )}
        </div>

        {/* List View Actions */}
        {viewMode === "list" && (
          <div className="flex items-center gap-2">
            {getStatusActions()
              .slice(0, 1)
              .map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary"
                  title={action.label}
                >
                  {action.icon}
                </button>
              ))}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-lg hover:bg-muted/50 text-foreground/60"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {showMenu && (
              <div className="absolute right-0 bg-card border border-border/20 rounded-lg shadow-lg z-10 min-w-[160px]">
                {getStatusActions()
                  .slice(1)
                  .map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        action.action();
                        setShowMenu(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-muted/50 text-foreground flex items-center gap-2"
                    >
                      {action.icon}
                      {action.label}
                    </button>
                  ))}
                <hr className="border-border/20" />
                <button
                  onClick={() => {
                    onDelete(item.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-2 rounded-b-lg"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
