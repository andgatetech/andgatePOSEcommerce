import type { Metadata } from "next";
import LoginForm from "./_components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Hawkeri account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-10 px-6">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-5 bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] border border-(--color-border) overflow-hidden min-h-[560px]">

        {/* Left — Branding Panel (3/5) */}
        <div className="hidden md:flex md:col-span-3 flex-col justify-center px-10 lg:px-14 py-14 bg-(--color-primary) text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute top-1/3 right-10 w-36 h-36 rounded-full bg-white/5" />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-3">
              Welcome back to<br />Hawkeri
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              Manage your orders, track deliveries, and enjoy a seamless shopping experience.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <span className="text-sm text-white/80">Secure & encrypted checkout</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" rx="2" />
                    <path d="M16 8h4l3 3v5a2 2 0 0 1-2 2h-1" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <span className="text-sm text-white/80">Fast & reliable delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <span className="text-sm text-white/80">24/7 customer support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Form (2/5) */}
        <div className="md:col-span-2 flex flex-col justify-center px-8 py-10">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-(--color-text)">Sign In</h1>
            <p className="text-(--color-text-muted) mt-1 text-sm">
              Enter your credentials to access your account
            </p>
          </div>
          <LoginForm />
        </div>

      </div>
    </div>
  );
}
