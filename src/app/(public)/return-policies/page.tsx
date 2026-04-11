import React from 'react';
import { Metadata } from 'next';
import { FaBoxOpen, FaUndoAlt, FaCreditCard } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Return & Refund Policies | Hawkeri',
  description: 'Our return and refund policies for products purchased.',
};

export default function ReturnPoliciesPage() {
  return (
    <div className="bg-(--color-primary-100) min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16 px-6 py-12 bg-gradient-to-r from-(--color-primary-900) to-(--color-primary-dark) rounded-3xl shadow-xl text-white">
          <span className="text-(--color-cta) font-bold tracking-widest uppercase text-sm mb-4 block">Satisfaction Guaranteed</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Return & Refund Policy</h1>
          <p className="text-lg text-(--color-primary-200)">
            We want you to be absolutely satisfied with your purchases from our store.
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-(--color-text)">
          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-md border-l-8 border-(--color-primary) mb-8 flex flex-col md:flex-row gap-8 items-start hover:-translate-y-1 transition-transform">
            <div className="bg-(--color-primary-100) p-5 rounded-2xl text-(--color-primary) shrink-0 shadow-inner">
              <FaBoxOpen size={30} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-(--color-primary-dark) mt-0 mb-3">Product Returns</h2>
              <p className="mb-4 text-(--color-text-muted)">
                You have 7 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused, unwashed, and in the same condition that you received it. It must also be in the original packaging with all tags attached.
              </p>
              <p className="mb-0 text-(--color-text-muted)">
                You will be responsible for paying for your own shipping costs for returning your item unless the product arrived damaged or defective. Certain items like perishables and personal care goods are exempt from being returned.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-md border-l-8 border-(--color-cta) mb-8 flex flex-col md:flex-row gap-8 items-start hover:-translate-y-1 transition-transform">
            <div className="bg-orange-50 p-5 rounded-2xl text-(--color-cta) shrink-0 shadow-inner">
              <FaUndoAlt size={30} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-(--color-primary-dark) mt-0 mb-3">Exchanges</h2>
              <p className="mb-4 text-(--color-text-muted)">
                We only replace items if they are defective or damaged upon arrival, or if you received the wrong size. If you need to exchange an item for the same product, please contact our support team within 48 hours of delivery.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-md border-l-8 border-(--color-primary-dark) flex flex-col md:flex-row gap-8 items-start hover:-translate-y-1 transition-transform">
            <div className="bg-(--color-primary-100) p-5 rounded-2xl text-(--color-primary-dark) shrink-0 shadow-inner">
              <FaCreditCard size={30} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-(--color-primary-dark) mt-0 mb-3">Refund Processing</h2>
              <p className="mb-0 text-(--color-text-muted)">
                Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund. If approved, we will initiate a refund to your credit card, mobile banking (bKash/Nagad), or original method of payment within 5-7 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
