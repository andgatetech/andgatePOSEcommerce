import React from 'react';
import { Metadata } from 'next';
import { FaBoxOpen, FaUndo, FaTag, FaRegEnvelope } from 'react-icons/fa';
import Container from "@/components/shared/Container";

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Reach out for help with your orders or account.',
};

export default function ContactPage() {
  return (
    <div className="bg-(--color-bg) min-h-screen">
      <div className="bg-(--color-primary-900) py-16 md:py-20 text-white text-center rounded-b-3xl relative overflow-hidden">
         <span className="text-(--color-cta) font-bold tracking-widest uppercase text-sm mb-4 block relative z-10">Contact Us</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight relative z-10 px-4">How can we help you?</h1>
          <p className="text-base md:text-lg text-(--color-primary-100) leading-relaxed font-light max-w-2xl mx-auto relative z-10 px-4">
            Need help with a recent order? Got questions about a product? We are here to assist you.
          </p>
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-(--color-primary) opacity-50 blur-[100px] md:h-96 md:w-96"></div>
      </div>

      <Container className="relative z-20 -mt-8 mb-16 md:-mt-10 md:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 mt-10 md:mt-16">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-black/5 border border-(--color-border)">
              <div className="w-14 h-14 bg-(--color-primary-100) text-(--color-primary) rounded-2xl flex items-center justify-center mb-6">
                <FaBoxOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-(--color-primary-dark) mb-3">Order Status</h3>
              <p className="text-(--color-text-muted) text-sm">Track your shipments and find out exactly when your products will be delivered to your doorstep.</p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-black/5 border border-(--color-border)">
              <div className="w-14 h-14 bg-(--color-primary-100) text-(--color-primary) rounded-2xl flex items-center justify-center mb-6">
                <FaUndo size={24} />
              </div>
              <h3 className="text-xl font-bold text-(--color-primary-dark) mb-3">Returns & Refunds</h3>
              <p className="text-(--color-text-muted) text-sm">Need to return an item? Contact us to initiate a return request for eligible products.</p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-black/5 border border-(--color-border)">
              <div className="w-14 h-14 bg-(--color-primary-100) text-(--color-primary) rounded-2xl flex items-center justify-center mb-6">
                <FaTag size={24} />
              </div>
              <h3 className="text-xl font-bold text-(--color-primary-dark) mb-3">Product Inquiries</h3>
              <p className="text-(--color-text-muted) text-sm">Have a question about a specific product's specifications, size, or warranty? Let us know!</p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-black/5 border border-(--color-border)">
              <div className="w-14 h-14 bg-(--color-primary-100) text-(--color-primary) rounded-2xl flex items-center justify-center mb-6">
                <FaRegEnvelope size={24} />
              </div>
              <h3 className="text-xl font-bold text-(--color-primary-dark) mb-3">General Support</h3>
              <p className="text-(--color-text-muted) text-sm">For account issues, payment problems, or any other general inquiries, our team is ready.</p>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl shadow-(--color-primary-dark)/10 border border-(--color-primary-200)">
              <h3 className="text-2xl font-bold text-(--color-primary-dark) mb-6">Send a Message</h3>
              <form className="space-y-5">
                <div>
                  <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-(--color-border) outline-none focus:border-(--color-primary) bg-transparent" />
                </div>
                <div>
                  <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-(--color-border) outline-none focus:border-(--color-primary) bg-transparent" />
                </div>
                <div>
                  <input type="text" placeholder="Order ID (Optional)" className="w-full px-4 py-3 rounded-xl border border-(--color-border) outline-none focus:border-(--color-primary) bg-transparent" />
                </div>
                <div>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-(--color-border) outline-none focus:border-(--color-primary) bg-transparent resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="button" className="w-full bg-(--color-cta) hover:bg-(--color-cta-hover) text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

      </Container>
    </div>
  );
}
