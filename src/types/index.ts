export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  groups: string[];
  createdAt: Date;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  members: string[];
  admins: string[];
  shoppingLists: string[];
  createdBy: string;
  createdAt: Date;
}

export interface ShoppingList {
  id: string;
  groupId: string;
  name: string;
  description?: string;
  items: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ItemStatus = "To Buy" | "At Home" | "Purchased" | "Postponed";

export interface Item {
  id: string;
  shoppingListId: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  notes?: string;
  status: ItemStatus;
  assignedPayers: Record<string, number>; // userId -> amount
  imageUrl?: string;
  addedBy: string;
  addedAt: Date;
  purchasedAt?: Date;
  purchasedBy?: string;
}

export type PaymentStatus = "Pending" | "Settled";

export interface Payment {
  id: string;
  groupId: string;
  fromUser: string;
  toUser: string;
  amount: number;
  date: Date;
  status: PaymentStatus;
  description?: string;
  relatedItems?: string[]; // item IDs
}

export interface GroupMember {
  userId: string;
  role: "admin" | "member";
  joinedAt: Date;
}

export interface ItemCategory {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface SpendingData {
  category: string;
  amount: number;
  items: number;
}

export interface UserSpending {
  userId: string;
  totalSpent: number;
  totalOwed: number;
  categories: SpendingData[];
}
