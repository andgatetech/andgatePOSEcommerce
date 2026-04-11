import React from 'react';
import { Metadata } from 'next';
import { FaLink, FaShareSquare, FaRegMoneyBillAlt } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Affiliate Program | Hawkeri',
  description: 'Refer products and earn money.',
};

export default function AffiliatePage() {
  return (
    <div className="bg-(--color-bg) min-h-screen">
      <div className="bg-gradient-to-br from-(--color-primary-900) to-(--color-primary-dark) pt-24 pb-36 text-center relative overflow-hidden rounded-b-[3rem]">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 relative z-10">Promote & <span className="text-(--color-cta)">Earn</span></h1>
        <p className="text-xl text-(--color-primary-200) max-w-2xl mx-auto mb-10 relative z-10 px-4">
          Share your favorite products from Hawkeri with your audience and earn a commission on every successful sale.
        </p>
        <button className="bg-(--color-cta) hover:bg-(--color-cta-hover) text-white font-bold py-4 px-10 rounded-full text-lg shadow-[0_0_20px_rgba(216,137,31,0.5)] transition-all relative z-10">
          Join Now for Free
        </button>
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-(--color-primary) blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl -mt-16 relative z-20 pb-20">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-(--color-border) text-center">
            <div className="w-20 h-20 rounded-2xl bg-(--color-primary-100) text-(--color-primary) flex items-center justify-center mx-auto mb-8 shadow-inner shadow-black/5">
              <FaLink size={32} />
            </div>
            <h3 className="text-2xl font-bold text-(--color-primary-dark) mb-4">1. Get Links</h3>
            <p className="text-(--color-text-muted)">Generate unique affiliate links for any product on our vast marketplace seamlessly.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-(--color-border) text-center">
             <div className="w-20 h-20 rounded-2xl bg-(--color-primary-100) text-(--color-primary) flex items-center justify-center mx-auto mb-8 shadow-inner shadow-black/5">
              <FaShareSquare size={32} />
            </div>
            <h3 className="text-2xl font-bold text-(--color-primary-dark) mb-4">2. Share</h3>
            <p className="text-(--color-text-muted)">Share links creatively on your blog, YouTube, social media platforms, or with friends.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-(--color-border) text-center">
             <div className="w-20 h-20 rounded-2xl bg-(--color-bg) border-4 border-(--color-cta) text-(--color-cta) flex items-center justify-center mx-auto mb-8 shadow-inner shadow-black/5">
              <FaRegMoneyBillAlt size={32} />
            </div>
            <h3 className="text-2xl font-bold text-(--color-primary-dark) mb-4">3. Earn</h3>
            <p className="text-(--color-text-muted)">Earn a whopping up to <strong className="text-(--color-cta)">10% commission</strong> directly transferred on qualifying purchases.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
