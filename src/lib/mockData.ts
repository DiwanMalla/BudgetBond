import { User, Group, ShoppingList, Item, Payment } from "@/types";
import { generateId } from "@/lib/utils";

// Mock users
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    groups: ["group1", "group2"],
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    groups: ["group1"],
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "user3",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    groups: ["group1", "group2"],
    createdAt: new Date("2024-02-01"),
  },
];

// Mock groups
export const mockGroups: Group[] = [
  {
    id: "group1",
    name: "Roommates",
    description: "Shared apartment expenses",
    members: ["user1", "user2", "user3"],
    admins: ["user1"],
    shoppingLists: ["list1", "list2"],
    createdBy: "user1",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "group2",
    name: "Family",
    description: "Family grocery shopping",
    members: ["user1", "user3"],
    admins: ["user1"],
    shoppingLists: ["list3"],
    createdBy: "user1",
    createdAt: new Date("2024-02-01"),
  },
];

// Mock shopping lists
export const mockShoppingLists: ShoppingList[] = [
  {
    id: "list1",
    groupId: "group1",
    name: "Weekly Groceries",
    description: "Regular grocery shopping for the week",
    items: ["item1", "item2", "item3", "item4"],
    createdBy: "user1",
    createdAt: new Date("2024-07-25"),
    updatedAt: new Date("2024-07-29"),
  },
  {
    id: "list2",
    groupId: "group1",
    name: "Party Supplies",
    description: "Items for weekend party",
    items: ["item5", "item6"],
    createdBy: "user2",
    createdAt: new Date("2024-07-28"),
    updatedAt: new Date("2024-07-29"),
  },
  {
    id: "list3",
    groupId: "group2",
    name: "Monthly Shopping",
    description: "Monthly bulk shopping",
    items: ["item7", "item8"],
    createdBy: "user1",
    createdAt: new Date("2024-07-20"),
    updatedAt: new Date("2024-07-25"),
  },
];

// Mock items
export const mockItems: Item[] = [
  {
    id: "item1",
    shoppingListId: "list1",
    name: "Organic Milk",
    category: "dairy",
    quantity: 2,
    price: 5.5,
    notes: "Whole milk preferred",
    status: "Purchased",
    assignedPayers: { user1: 3.0, user2: 2.5 },
    addedBy: "user1",
    addedAt: new Date("2024-07-25"),
    purchasedAt: new Date("2024-07-26"),
    purchasedBy: "user1",
  },
  {
    id: "item2",
    shoppingListId: "list1",
    name: "Sourdough Bread",
    category: "pantry",
    quantity: 1,
    price: 4.99,
    notes: "From the bakery section",
    status: "To Buy",
    assignedPayers: { user1: 2.5, user3: 2.49 },
    addedBy: "user2",
    addedAt: new Date("2024-07-26"),
  },
  {
    id: "item3",
    shoppingListId: "list1",
    name: "Bananas",
    category: "produce",
    quantity: 6,
    price: 3.25,
    status: "At Home",
    assignedPayers: { user2: 3.25 },
    addedBy: "user2",
    addedAt: new Date("2024-07-26"),
  },
  {
    id: "item4",
    shoppingListId: "list1",
    name: "Chicken Breast",
    category: "meat",
    quantity: 2,
    price: 12.99,
    notes: "Free-range if available",
    status: "To Buy",
    assignedPayers: { user1: 6.5, user2: 3.25, user3: 3.24 },
    addedBy: "user3",
    addedAt: new Date("2024-07-27"),
  },
];

// Mock payments
export const mockPayments: Payment[] = [
  {
    id: "payment1",
    groupId: "group1",
    fromUser: "user2",
    toUser: "user1",
    amount: 15.75,
    date: new Date("2024-07-26"),
    status: "Settled",
    description: "Grocery reimbursement",
    relatedItems: ["item1"],
  },
];

// Data store class for managing mock data
export class MockDataStore {
  private users = new Map(mockUsers.map((user) => [user.id, user]));
  private groups = new Map(mockGroups.map((group) => [group.id, group]));
  private shoppingLists = new Map(
    mockShoppingLists.map((list) => [list.id, list])
  );
  private items = new Map(mockItems.map((item) => [item.id, item]));
  private payments = new Map(
    mockPayments.map((payment) => [payment.id, payment])
  );

  // Users
  getUsers(): User[] {
    return Array.from(this.users.values());
  }

  getUser(id: string): User | undefined {
    return this.users.get(id);
  }

  // Groups
  getGroups(): Group[] {
    return Array.from(this.groups.values());
  }

  getGroup(id: string): Group | undefined {
    return this.groups.get(id);
  }

  getUserGroups(userId: string): Group[] {
    return Array.from(this.groups.values()).filter((group) =>
      group.members.includes(userId)
    );
  }

  // Shopping Lists
  getShoppingLists(): ShoppingList[] {
    return Array.from(this.shoppingLists.values());
  }

  getShoppingList(id: string): ShoppingList | undefined {
    return this.shoppingLists.get(id);
  }

  getGroupShoppingLists(groupId: string): ShoppingList[] {
    return Array.from(this.shoppingLists.values()).filter(
      (list) => list.groupId === groupId
    );
  }

  // Items
  getItems(): Item[] {
    return Array.from(this.items.values());
  }

  getItem(id: string): Item | undefined {
    return this.items.get(id);
  }

  getListItems(listId: string): Item[] {
    return Array.from(this.items.values()).filter(
      (item) => item.shoppingListId === listId
    );
  }

  // Payments
  getPayments(): Payment[] {
    return Array.from(this.payments.values());
  }

  getGroupPayments(groupId: string): Payment[] {
    return Array.from(this.payments.values()).filter(
      (payment) => payment.groupId === groupId
    );
  }

  // Add methods
  addUser(user: Omit<User, "id" | "createdAt">): User {
    const newUser: User = {
      ...user,
      id: generateId(),
      createdAt: new Date(),
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  addGroup(group: Omit<Group, "id" | "createdAt">): Group {
    const newGroup: Group = {
      ...group,
      id: generateId(),
      createdAt: new Date(),
    };
    this.groups.set(newGroup.id, newGroup);
    return newGroup;
  }

  addShoppingList(
    list: Omit<ShoppingList, "id" | "createdAt" | "updatedAt">
  ): ShoppingList {
    const newList: ShoppingList = {
      ...list,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.shoppingLists.set(newList.id, newList);
    return newList;
  }

  addItem(item: Omit<Item, "id" | "addedAt">): Item {
    const newItem: Item = {
      ...item,
      id: generateId(),
      addedAt: new Date(),
    };
    this.items.set(newItem.id, newItem);
    return newItem;
  }
}

export const dataStore = new MockDataStore();
