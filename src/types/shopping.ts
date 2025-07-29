export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  category: ItemCategory;
  priority: Priority;
  price?: number;
  status: ItemStatus;
  addedBy: string;
  addedAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  description?: string;
  items: ShoppingItem[];
  collaborators: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export enum ItemStatus {
  TO_BUY = "to_buy",
  AT_HOME = "at_home",
  PURCHASED = "purchased",
}

export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export enum ItemCategory {
  GROCERIES = "groceries",
  HOUSEHOLD = "household",
  PERSONAL = "personal",
  ELECTRONICS = "electronics",
  CLOTHING = "clothing",
  HEALTH = "health",
  OTHER = "other",
}

export interface Bill {
  id: string;
  name: string;
  totalAmount: number;
  participants: BillParticipant[];
  createdBy: string;
  createdAt: Date;
  status: BillStatus;
  splitType: SplitType;
  category: ItemCategory;
}

export interface BillParticipant {
  userId: string;
  name: string;
  email: string;
  amount: number;
  paid: boolean;
  paidAt?: Date;
  paymentMethod?: string;
}

export enum BillStatus {
  PENDING = "pending",
  PARTIALLY_PAID = "partially_paid",
  FULLY_PAID = "fully_paid",
}

export enum SplitType {
  EQUAL = "equal",
  CUSTOM = "custom",
  PERCENTAGE = "percentage",
}
