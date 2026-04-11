import React from 'react';
import { Metadata } from 'next';
import { FaStoreAlt, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Become a Vendor | Hawkeri',
  description: 'Join our marketplace and start selling to thousands of customers.',
};

export default function BecomeVendorPage() {
  return (
    <div className="bg-(--color-bg) min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Hero */}
        <div className="bg-(--color-primary-900) rounded-3xl p-10 md:p-16 text-center text-white mb-16 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-(--color-cta) font-bold tracking-widest uppercase text-sm mb-4 block">Marketplace</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Become a Hawkeri Vendor</h1>
            <p className="text-lg text-(--color-primary-200) max-w-2xl mx-auto mb-10">
              Tap into our massive ecosystem of digital shoppers. Open your digital storefront in minutes and reach customers across the country with low commission rates.
            </p>
            <button className="bg-(--color-cta) hover:bg-(--color-cta-hover) text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg text-lg">
              Start Selling Today
            </button>
          </div>
          {/* Backer decoration */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-(--color-primary) blur-3xl opacity-50 rounded-full"></div>
        </div>

        {/* Benefits */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why sell on Hawkeri?</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-blue-50 text-(--color-primary) rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
              <FaStoreAlt size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Storefront</h3>
            <p className="text-gray-600 text-sm">Personalize your brand experience with custom banners, categories, and dedicated profiles.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-blue-50 text-(--color-primary) rounded-2xl flex items-center justify-center mx-auto mb-6 -rotate-3">
              <FaMoneyBillWave size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Next-Day Payouts</h3>
            <p className="text-gray-600 text-sm">Don't wait for your hard-earned money. We process vendor settlements in 24-48 business hours.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-blue-50 text-(--color-primary) rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
              <FaShieldAlt size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Fraud Protection</h3>
            <p className="text-gray-600 text-sm">State-of-the-art payment gateways and integrated AI to protect you from chargebacks and fraud.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
