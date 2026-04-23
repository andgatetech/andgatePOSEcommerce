import type { Metadata } from "next";
import RegisterForm from "./_components/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a Hawkeri account for faster checkout and order tracking.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-10 px-6">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-5 bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] border border-(--color-border) overflow-hidden min-h-[620px]">

        {/* Left — Branding Panel (3/5) */}
        <div className="hidden md:flex md:col-span-3 flex-col justify-center px-10 lg:px-14 py-14 bg-(--color-primary) text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute top-1/3 right-10 w-36 h-36 rounded-full bg-white/5" />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-3">
              Join the<br />Hawkeri family
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              Create your account and unlock exclusive deals, faster checkout, and order tracking.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-sm text-white/80">Exclusive member discounts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-sm text-white/80">Real-time order tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-sm text-white/80">Saved addresses & fast checkout</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-sm text-white/80">Wishlist & personalized picks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Form (2/5) */}
        <div className="md:col-span-2 flex flex-col justify-center px-8 py-10">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-(--color-text)">Create Account</h1>
            <p className="text-(--color-text-muted) mt-1 text-sm">
              Fill in your details to get started
            </p>
          </div>
          <RegisterForm />
        </div>

      </div>
    </div>
  );
}
