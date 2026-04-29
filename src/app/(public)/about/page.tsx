import React from 'react';
import { Metadata } from 'next';
import { FaShippingFast, FaCheckCircle, FaMoneyBillWave, FaHeadset } from 'react-icons/fa';
import Container from "@/components/shared/Container";

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our mission to bring the best products to your doorstep.',
};

export default function AboutPage() {
  return (
    <div className="bg-(--color-bg) min-h-screen">
      {/* Colorful Hero */}
      <div className="bg-linear-to-br from-(--color-primary-900) to-(--color-primary-dark) py-16 lg:py-28 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-(--color-primary) opacity-50 blur-[100px] md:h-96 md:w-96"></div>
        <Container className="relative z-10 text-center">
          <span className="text-(--color-cta) font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
          <h1 className="text-3xl md:text-6xl font-bold mb-6">Your Premium Shopping Destination</h1>
          <p className="text-base md:text-xl text-(--color-primary-100) max-w-3xl mx-auto leading-relaxed">
            At Hawkeri, our mission is to provide shoppers in Bangladesh with a seamless, reliable, and exciting online shopping experience. We bring millions of products from verified vendors directly to your doorstep.
          </p>
        </Container>
      </div>

      <Container className="relative z-20 -mt-10 py-14 pb-20 md:py-20 md:pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-black/5 border border-(--color-border) text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-(--color-primary-100) text-(--color-primary) rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner shadow-black/5">
              <FaShippingFast size={28} />
            </div>
            <h3 className="text-xl font-bold text-(--color-primary-dark) mb-3">Fast Delivery</h3>
            <p className="text-(--color-text-muted) text-sm leading-relaxed">Nationwide home delivery with robust tracking so you never miss a package.</p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-black/5 border border-(--color-border) text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-(--color-primary-100) text-(--color-primary) rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner shadow-black/5">
              <FaCheckCircle size={28} />
            </div>
            <h3 className="text-xl font-bold text-(--color-primary-dark) mb-3">Quality Assured</h3>
            <p className="text-(--color-text-muted) text-sm leading-relaxed">We strictly vet all our vendors to ensure 100% authentic and high-quality products.</p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-black/5 border border-(--color-border) text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-(--color-primary-100) text-(--color-primary) rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner shadow-black/5">
              <FaMoneyBillWave size={28} />
            </div>
            <h3 className="text-xl font-bold text-(--color-primary-dark) mb-3">Best Prices</h3>
            <p className="text-(--color-text-muted) text-sm leading-relaxed">Constant sales, coupons, and competitive pricing across all categories.</p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-black/5 border border-(--color-border) text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-(--color-primary-100) text-(--color-primary) rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner shadow-black/5">
              <FaHeadset size={28} />
            </div>
            <h3 className="text-xl font-bold text-(--color-primary-dark) mb-3">24/7 Support</h3>
            <p className="text-(--color-text-muted) text-sm leading-relaxed">Our customer happiness team is always available to resolve your issues quickly.</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
