import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for purchasing physical goods.',
};

export default function TermsPage() {
  return (
    <div className="bg-(--color-primary-100) min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 lg:p-16 border-t-8 border-(--color-primary)">
          <h1 className="text-4xl md:text-5xl font-bold text-(--color-primary-900) mb-8 pb-8 border-b border-(--color-border)">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-(--color-text-muted)">
            <h2 className="text-2xl font-bold text-(--color-primary-dark) mt-8 mb-4">Introduction</h2>
            <p>Please read these Terms carefully before using the Hawkeri platform to browse or purchase products. Your use of the Service is conditioned on your acceptance of and compliance with these Terms.</p>

            <h2 className="text-2xl font-bold text-(--color-primary-dark) mt-8 mb-4">Purchases</h2>
            <p>If you wish to purchase any product made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, but not limited to, your credit card number, expiration date, billing address, and your shipping information.</p>
            <p>You represent and warrant that you have the legal right to use any payment method(s) in connection with any Purchase.</p>

            <h2 className="text-2xl font-bold text-(--color-primary-dark) mt-8 mb-4">Pricing and Availability</h2>
            <p>We constantly update our offerings of products on the Service. The products available on our Service may be mispriced, described inaccurately, or unavailable, and we may experience delays in updating information on the Service and in our advertising on other websites.</p>

            <h2 className="text-2xl font-bold text-(--color-primary-dark) mt-8 mb-4">Shipping and Delivery</h2>
            <p>Delivery times are estimated and not guaranteed. Shipping costs and delivery estimates depend on your location and the shipping method selected during checkout.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
