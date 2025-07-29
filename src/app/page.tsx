"use client";

import Link from "next/link";
import React from "react";
import {
  ShoppingCart,
  Users,
  PieChart,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useUser, UserButton } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn, user } = useUser();

  const features = [
    {
      icon: <ShoppingCart className="h-12 w-12" />,
      title: "Smart Collaborative Lists",
      description:
        "Create and share shopping lists with your group members in real-time. Never forget an item again.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Intelligent Bill Splitting",
      description:
        "Automatically split costs among group members with flexible sharing options and smart calculations.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <PieChart className="h-12 w-12" />,
      title: "Beautiful Analytics",
      description:
        "Visualize your spending patterns with interactive charts and gain valuable insights into your habits.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Smartphone className="h-12 w-12" />,
      title: "Works Everywhere",
      description:
        "Perfect offline experience that syncs seamlessly across all your devices when you're back online.",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Roommate Coordinator",
      content:
        "BudgetBond has made managing our apartment expenses so much easier. No more awkward money conversations!",
      avatar: "SC",
    },
    {
      name: "Mike Rodriguez",
      role: "Family Dad",
      content:
        "Finally, a shopping app that the whole family can use. The bill splitting feature is a game-changer.",
      avatar: "MR",
    },
    {
      name: "Emma Thompson",
      role: "College Student",
      content:
        "Perfect for splitting grocery costs with friends. The interface is super intuitive and beautiful.",
      avatar: "ET",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-gray-800 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,#000,rgba(0,0,0,0.8))] -z-10"></div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
        <div className="w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-500/5 dark:to-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12">
        <div className="w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 dark:from-emerald-500/5 dark:to-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Responsive Header */}
      <header className="container mx-auto px-4 py-4 md:py-6 relative z-10">
        <nav className="flex justify-between items-center bg-card/80 backdrop-blur-md rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 shadow-lg border border-border/20">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-lg">
              <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              BudgetBond
            </span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-3">
            <ThemeToggle />
            {isSignedIn ? (
              // Authenticated user menu
              <>
                <Link
                  href="/dashboard"
                  className="text-foreground/80 hover:text-foreground font-medium px-3 md:px-4 py-2 rounded-lg hover:bg-muted/50 text-sm md:text-base"
                >
                  Dashboard
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 md:w-9 md:h-9",
                    },
                  }}
                />
              </>
            ) : (
              // Guest user menu
              <>
                <Link
                  href="/sign-in"
                  className="text-foreground/80 hover:text-foreground font-medium px-3 md:px-4 py-2 rounded-lg hover:bg-muted/50 text-sm md:text-base"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl hover:from-indigo-700 hover:to-purple-700 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm md:text-base"
                >
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Start</span>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Responsive Hero Section */}
      <main className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-muted text-foreground/80 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium mb-6 md:mb-8 border border-border">
            <Zap className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">
              Now with AI-powered spending insights
            </span>
            <span className="sm:hidden">AI-powered insights</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 leading-tight">
            {isSignedIn ? (
              <>
                <span className="text-foreground">Welcome back,</span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {user?.firstName || "User"}!
                </span>
              </>
            ) : (
              <>
                <span className="text-foreground">Shopping Made</span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                  Effortless
                </span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 mb-8 md:mb-12 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            {isSignedIn
              ? "Ready to create some collaborative shopping lists and manage your expenses with friends and family?"
              : "The most beautiful way to create collaborative shopping lists, split bills intelligently, and track spending with your friends, family, or roommates."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-12 md:mb-16 px-4 sm:px-0">
            <Link
              href="/dashboard"
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl text-base md:text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              {isSignedIn ? (
                <>
                  <span className="hidden sm:inline">Go to Dashboard</span>
                  <span className="sm:hidden">Dashboard</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Start Shopping Today</span>
                  <span className="sm:hidden">Start Shopping</span>
                </>
              )}
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1" />
            </Link>
            {!isSignedIn && (
              <Link
                href="/demo"
                className="group border-2 border-border text-foreground/80 px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl text-base md:text-lg font-semibold hover:border-border/80 hover:bg-muted/50 flex items-center gap-2 w-full sm:w-auto justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  alert(
                    "🚧 Coming Soon! Demo is under development. Stay tuned!"
                  );
                }}
              >
                <span>View Demo</span>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              </Link>
            )}
          </div>

          {/* Trust indicators - Better mobile layout */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-4 md:gap-8 text-xs md:text-sm text-foreground/60 mb-16 md:mb-20">
            <div className="flex items-center gap-1.5 md:gap-2">
              <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
              <span className="hidden sm:inline">No credit card required</span>
              <span className="sm:hidden">No credit card</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 flex-shrink-0" />
              <span>Works offline</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 fill-current flex-shrink-0" />
              <span>4.9/5 rating</span>
            </div>
          </div>
        </div>

        {/* Responsive Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 border border-border/20 overflow-hidden"
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-3`}
              ></div>

              {/* Icon with gradient background */}
              <div
                className={`inline-flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-4 md:mb-6 shadow-lg group-hover:scale-110`}
              >
                <div className="w-8 h-8 md:w-12 md:h-12">
                  {React.cloneElement(feature.icon, {
                    className: "w-8 h-8 md:w-12 md:h-12",
                  })}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4 group-hover:text-foreground/90">
                {feature.title}
              </h3>

              <p className="text-foreground/70 text-base md:text-lg leading-relaxed group-hover:text-foreground/80">
                {feature.description}
              </p>

              {/* Hover effect arrow */}
              <div className="mt-4 md:mt-6 flex items-center text-primary opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2">
                <span className="font-medium text-sm md:text-base">
                  Learn more
                </span>
                <ArrowRight className="h-3 w-3 md:h-4 md:w-4 ml-2" />
              </div>
            </div>
          ))}
        </div>

        {/* Responsive Testimonials Section */}
        <div className="mt-20 md:mt-32 mb-16 md:mb-20">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
              Loved by thousands of users
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-xl md:max-w-2xl mx-auto px-4">
              See what our community has to say about their BudgetBond
              experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-border/20 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex items-center mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg flex-shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-3 md:ml-4 flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-sm md:text-base truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-foreground/60 text-xs md:text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                  <div className="ml-2 flex flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-foreground/70 leading-relaxed italic text-sm md:text-base">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Responsive Enhanced Stats Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl md:rounded-3xl shadow-2xl p-8 md:p-12 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-white/10 rounded-full -translate-y-16 md:-translate-y-32 translate-x-16 md:translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 md:w-48 md:h-48 bg-white/10 rounded-full translate-y-12 md:translate-y-24 -translate-x-12 md:-translate-x-24"></div>

          <div className="relative z-10">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                Join the BudgetBond community
              </h2>
              <p className="text-base md:text-xl text-white/90 max-w-xl md:max-w-2xl mx-auto px-4">
                Thousands of users worldwide trust BudgetBond for their shopping
                and expense management
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
              <div className="group">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 group-hover:scale-110">
                  25K+
                </div>
                <div className="text-base md:text-lg text-white/90 font-medium">
                  Happy Users
                </div>
                <div className="text-xs md:text-sm text-white/70 mt-1">
                  and growing daily
                </div>
              </div>
              <div className="group">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 group-hover:scale-110">
                  150K+
                </div>
                <div className="text-base md:text-lg text-white/90 font-medium">
                  Lists Created
                </div>
                <div className="text-xs md:text-sm text-white/70 mt-1">
                  across all groups
                </div>
              </div>
              <div className="group">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 group-hover:scale-110">
                  $5M+
                </div>
                <div className="text-base md:text-lg text-white/90 font-medium">
                  Bills Split
                </div>
                <div className="text-xs md:text-sm text-white/70 mt-1">
                  and counting
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modern Responsive Footer */}
      <footer className="container mx-auto px-4 py-8 md:py-16 mt-20 md:mt-32 relative z-10">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl border border-border/20 p-6 md:p-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Logo and description - Takes full width on mobile */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4 justify-center md:justify-start">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg">
                  <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  BudgetBond
                </span>
              </div>
              <p className="text-foreground/70 leading-relaxed text-sm text-center md:text-left max-w-xs mx-auto md:mx-0">
                Making shopping and bill splitting effortless for teams,
                families, and friends worldwide.
              </p>
            </div>

            {/* Developer info - Enhanced responsive design */}
            <div className="col-span-1">
              <h3 className="font-semibold text-foreground mb-4 text-center md:text-left text-sm md:text-base">
                👨‍💻 Developer
              </h3>
              <div className="space-y-4">
                {/* Developer card */}
                <div className="bg-muted/50 rounded-xl p-4 border border-border/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      DM
                    </div>
                    <div className="flex-1">
                      <p className="font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-sm md:text-base">
                        Diwan Malla
                      </p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        Full Stack Developer
                      </p>
                    </div>
                  </div>
                  <p className="text-foreground/70 text-xs leading-relaxed mb-3">
                    Passionate about creating beautiful, user-friendly
                    applications that solve real-world problems.
                  </p>
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="bg-blue-500/20 border border-blue-500/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                      React
                    </span>
                    <span className="bg-green-500/20 border border-green-500/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                      Next.js
                    </span>
                    <span className="bg-purple-500/20 border border-purple-500/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-medium">
                      TypeScript
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product links */}
            <div className="col-span-1">
              <h3 className="font-semibold text-foreground mb-4 text-center md:text-left text-sm md:text-base">
                🚀 Product
              </h3>
              <ul className="space-y-2 text-center md:text-left">
                <li>
                  <Link
                    href="/features"
                    className="text-foreground/70 hover:text-primary text-sm inline-flex items-center gap-1 group"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(
                        "🚧 Coming Soon! Features page is under development."
                      );
                    }}
                  >
                    <span>Features</span>
                    <span className="text-orange-500 text-xs">
                      (Coming Soon)
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-foreground/70 hover:text-primary text-sm inline-flex items-center gap-1 group"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(
                        "🚧 Coming Soon! Pricing page is under development."
                      );
                    }}
                  >
                    <span>Pricing</span>
                    <span className="text-orange-500 text-xs">
                      (Coming Soon)
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/demo"
                    className="text-foreground/70 hover:text-primary text-sm inline-flex items-center gap-1 group"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("🚧 Coming Soon! Demo is under development.");
                    }}
                  >
                    <span>Demo</span>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mobile"
                    className="text-foreground/70 hover:text-primary text-sm inline-flex items-center gap-1 group"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("🚧 Coming Soon! Mobile app is under development.");
                    }}
                  >
                    <span>Mobile App</span>
                    <span className="text-orange-500 text-xs">
                      (Coming Soon)
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support links */}
            <div className="col-span-1">
              <h3 className="font-semibold text-foreground mb-4 text-center md:text-left text-sm md:text-base">
                🛟 Support
              </h3>
              <ul className="space-y-2 text-center md:text-left">
                <li>
                  <Link
                    href="/help"
                    className="text-foreground/70 hover:text-primary text-sm inline-flex items-center gap-1 group"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(
                        "🚧 Coming Soon! Help Center is under development."
                      );
                    }}
                  >
                    <span>Help Center</span>
                    <span className="text-orange-500 text-xs">
                      (Coming Soon)
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-foreground/70 hover:text-primary text-sm inline-flex items-center gap-1 group"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(
                        "🚧 Coming Soon! Contact page is under development."
                      );
                    }}
                  >
                    <span>Contact Us</span>
                    <span className="text-orange-500 text-xs">
                      (Coming Soon)
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-foreground/70 hover:text-primary text-sm inline-flex items-center gap-1 group"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(
                        "🚧 Coming Soon! Privacy Policy is under development."
                      );
                    }}
                  >
                    <span>Privacy Policy</span>
                    <span className="text-orange-500 text-xs">
                      (Coming Soon)
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-foreground/70 hover:text-primary text-sm inline-flex items-center gap-1 group"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(
                        "🚧 Coming Soon! Terms of Service is under development."
                      );
                    }}
                  >
                    <span>Terms of Service</span>
                    <span className="text-orange-500 text-xs">
                      (Coming Soon)
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar - Fully responsive */}
          <div className="border-t border-border pt-6 md:pt-8">
            {/* Status indicator */}
            <div className="flex justify-center mb-4 md:hidden">
              <Link
                href="/status"
                className="text-sm text-foreground/70 hover:text-primary transition-colors flex items-center gap-2 bg-green-100 dark:bg-green-900/20 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800"
                onClick={(e) => {
                  e.preventDefault();
                  alert(
                    "🚧 Status page coming soon! Currently all systems are operational."
                  );
                }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">
                  All systems operational
                </span>
              </Link>
            </div>

            {/* Copyright and credits */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left order-2 md:order-1">
                <p className="text-foreground/70 text-sm">
                  © 2025 BudgetBond. Crafted with{" "}
                  <span className="text-red-500">❤️</span> for better shopping
                  experiences.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
                  <span className="text-foreground/50 text-xs">Built by</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">D</span>
                    </div>
                    <span className="font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-xs">
                      Diwan Malla
                    </span>
                  </div>
                  <span className="text-foreground/30 text-xs">•</span>
                  <span className="text-foreground/50 text-xs">
                    Full Stack Developer
                  </span>
                </div>
              </div>

              {/* Status for desktop */}
              <div className="hidden md:flex items-center space-x-6 order-1 md:order-2">
                <Link
                  href="/status"
                  className="text-sm text-foreground/70 hover:text-primary flex items-center gap-2 bg-green-100 dark:bg-green-900/20 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(
                      "🚧 Status page coming soon! Currently all systems are operational."
                    );
                  }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium">
                    All systems operational
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
