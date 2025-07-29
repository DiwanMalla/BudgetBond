"use client";

import { useState } from "react";
import { Plus, Users, ShoppingCart, BarChart3, Settings } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { dataStore } from "@/lib/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("lists");
  const { user, isLoaded } = useUser();

  // Show loading state while Clerk loads
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Mock current user - in real app, you'd use user.id from Clerk
  const currentUserId = user?.id || "user1";
  const currentUser = dataStore.getUser(currentUserId) || {
    id: currentUserId,
    name: user?.fullName || user?.firstName || "User",
    email: user?.primaryEmailAddress?.emailAddress || "",
    avatar: user?.imageUrl || "",
  };
  const userGroups = dataStore.getUserGroups(currentUserId);

  const tabs = [
    { id: "lists", label: "Shopping Lists", icon: ShoppingCart },
    { id: "groups", label: "Groups", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderListsTab = () => {
    const allLists = userGroups.flatMap((group) =>
      dataStore.getGroupShoppingLists(group.id).map((list) => ({
        ...list,
        groupName: group.name,
      }))
    );

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Shopping Lists
          </h2>
          <Link
            href="/shopping"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            New List
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allLists.map((list) => {
            const items = dataStore.getListItems(list.id);
            const totalItems = items.length;
            const completedItems = items.filter(
              (item) => item.status === "Purchased"
            ).length;
            const totalCost = items.reduce((sum, item) => sum + item.price, 0);

            return (
              <div
                key={list.id}
                className="group bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl border border-border/20 overflow-hidden hover:-translate-y-1"
              >
                {/* Gradient top border */}
                <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-foreground/90">
                        {list.name}
                      </h3>
                      <p className="text-sm text-foreground/60 font-medium">
                        {list.groupName}
                      </p>
                    </div>
                    <span className="text-xs bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-3 py-1 rounded-full font-semibold">
                      {completedItems}/{totalItems} done
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/60 font-medium">
                        Total Cost
                      </span>
                      <span className="font-bold text-foreground">
                        {formatCurrency(totalCost)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/60 font-medium">
                        Updated
                      </span>
                      <span className="text-foreground/60">
                        {formatDate(list.updatedAt)}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-muted rounded-full h-3 mb-6 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full shadow-sm"
                      style={{
                        width: `${
                          totalItems > 0
                            ? (completedItems / totalItems) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>

                  <button className="w-full bg-background hover:bg-muted/50 text-foreground font-semibold py-3 rounded-xl border border-border hover:border-primary/30 hover:text-primary">
                    View Details →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderGroupsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Groups</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Group
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {userGroups.map((group) => {
          const lists = dataStore.getGroupShoppingLists(group.id);
          const allItems = lists.flatMap((list) =>
            dataStore.getListItems(list.id)
          );
          const totalSpent = allItems
            .filter((item) => item.status === "Purchased")
            .reduce((sum, item) => sum + item.price, 0);

          return (
            <div key={group.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {group.name}
                  </h3>
                  <p className="text-sm text-gray-600">{group.description}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {group.members.length} members
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shopping Lists</span>
                  <span className="font-medium">{lists.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-medium">
                    {formatCurrency(totalSpent)}
                  </span>
                </div>
              </div>

              <button className="w-full text-indigo-600 hover:text-indigo-800 font-medium">
                Manage Group →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Spending Analytics</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            This Month
          </h3>
          <p className="text-3xl font-bold text-indigo-600">$234.56</p>
          <p className="text-sm text-gray-600">Total spent</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">You Owe</h3>
          <p className="text-3xl font-bold text-red-600">$45.23</p>
          <p className="text-sm text-gray-600">To group members</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Owed to You
          </h3>
          <p className="text-3xl font-bold text-green-600">$67.89</p>
          <p className="text-sm text-gray-600">From group members</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {dataStore
            .getItems()
            .slice(0, 5)
            .map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {formatDate(item.addedAt)}
                  </p>
                </div>
                <span className="font-medium">
                  {formatCurrency(item.price)}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={currentUser?.name || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={currentUser?.email || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Email Notifications</span>
            <button className="bg-indigo-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out">
              <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Push Notifications</span>
            <button className="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out">
              <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-gray-800 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,#000,rgba(0,0,0,0.8))] -z-10"></div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
        <div className="w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Modern Header */}
      <header className="bg-card/80 backdrop-blur-md shadow-lg border-b border-border/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg">
                <ShoppingCart className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  BudgetBond
                </span>
                <p className="text-sm text-foreground/60">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-foreground/60">Welcome back,</p>
                <p className="font-semibold text-foreground">
                  {currentUser?.name}!
                </p>
              </div>
              <ThemeToggle />
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-12 h-12",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Modern Sidebar */}
          <div className="lg:w-1/4">
            <nav className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-border/20">
              <ul className="space-y-3">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left ${
                          activeTab === tab.id
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105"
                            : "text-foreground/70 hover:bg-muted/50 hover:text-foreground hover:transform hover:scale-105"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {activeTab === "lists" && renderListsTab()}
            {activeTab === "groups" && renderGroupsTab()}
            {activeTab === "analytics" && renderAnalyticsTab()}
            {activeTab === "settings" && renderSettingsTab()}
          </div>
        </div>
      </div>
    </div>
  );
}
