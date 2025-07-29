import { ItemCategory } from "@/types";

export const DEFAULT_CATEGORIES: ItemCategory[] = [
  { id: "groceries", name: "Groceries", color: "#10B981", icon: "🛒" },
  { id: "dairy", name: "Dairy", color: "#F59E0B", icon: "🥛" },
  { id: "meat", name: "Meat & Seafood", color: "#EF4444", icon: "🥩" },
  { id: "produce", name: "Produce", color: "#22C55E", icon: "🥬" },
  { id: "pantry", name: "Pantry", color: "#8B5CF6", icon: "🍞" },
  { id: "beverages", name: "Beverages", color: "#06B6D4", icon: "🥤" },
  { id: "snacks", name: "Snacks", color: "#F97316", icon: "🍿" },
  { id: "health", name: "Health & Beauty", color: "#EC4899", icon: "💊" },
  { id: "household", name: "Household", color: "#6B7280", icon: "🧽" },
  { id: "electronics", name: "Electronics", color: "#1F2937", icon: "📱" },
  { id: "clothing", name: "Clothing", color: "#7C3AED", icon: "👕" },
  { id: "other", name: "Other", color: "#9CA3AF", icon: "📦" },
];

export const ITEM_STATUSES = [
  { value: "To Buy", label: "To Buy", color: "#EF4444" },
  { value: "At Home", label: "At Home", color: "#10B981" },
  { value: "Purchased", label: "Purchased", color: "#3B82F6" },
  { value: "Postponed", label: "Postponed", color: "#6B7280" },
] as const;
