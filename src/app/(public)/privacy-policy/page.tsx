import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Andgate E-Commerce',
  description: 'How we manage your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-(--color-primary-100) min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 lg:p-16 border-t-8 border-(--color-cta)">
          <h1 className="text-4xl md:text-5xl font-bold text-(--color-primary-900) mb-8 pb-8 border-b border-(--color-border)">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-(--color-text-muted)">
            <h2 className="text-2xl font-bold text-(--color-primary-dark) mt-8 mb-4">Information We Collect</h2>
            <p>When you visit our store, register an account, or make a purchase, we collect certain personal information directly from you. This includes your name, email address, shipping address, billing address, and phone number.</p>

            <h2 className="text-2xl font-bold text-(--color-primary-dark) mt-8 mb-4">How We Use Your Information</h2>
            <p>We use the order information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).</p>
            <ul>
              <li>Communicate with you regarding your order status.</li>
              <li>Screen our orders for potential risk or fraud.</li>
              <li>When in line with the preferences you have shared with us, provide you with tracking details and targeted product advertisements.</li>
            </ul>

            <h2 className="text-2xl font-bold text-(--color-primary-dark) mt-8 mb-4">Data Protection</h2>
            <p>We implement robust security measures to protect your personal information when you place an order or enter, submit, or access your account details. Payment information is processed through secure gateways and is never stored on our direct servers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
