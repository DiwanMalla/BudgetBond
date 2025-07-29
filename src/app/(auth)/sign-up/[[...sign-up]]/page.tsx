import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Join BudgetBond
          </h1>
          <p className="text-foreground/70">
            Create your account and start collaborating on shopping lists
          </p>
        </div>
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-sm normal-case",
              card: "bg-card shadow-xl border border-border/20",
              headerTitle: "text-foreground",
              headerSubtitle: "text-foreground/70",
              socialButtonsBlockButton:
                "border-border/30 text-foreground hover:bg-muted/50",
              formFieldLabel: "text-foreground",
              formFieldInput: "bg-background border-border/30 text-foreground",
              footerActionLink: "text-primary hover:text-primary/80",
            },
          }}
        />
      </div>
    </div>
  );
}
