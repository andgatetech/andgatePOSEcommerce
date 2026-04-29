import React from 'react';
import { Metadata } from 'next';
import Container from "@/components/shared/Container";

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Frequently Asked Questions',
};

const faqs = [
  { q: "How do I track my order?", a: "Once your order is shipped, you will receive an SMS and email with your tracking number. You can also view shipping status in your 'My Account' dashboard." },
  { q: "What payment methods do you accept?", a: "We accept Cash on Delivery (COD), bKash, Nagad, Visa, MasterCard, and direct bank transfers." },
  { q: "How long does shipping take?", a: "Standard delivery within Dhaka takes 1-2 business days. Outside Dhaka takes 3-5 business days depending on the courier." },
  { q: "What should I do if I receive a damaged item?", a: "Please refer to our Return Policies. Contact us within 48 hours of delivery with pictures of the damaged product and we will arrange a replacement." }
];

export default function FAQsPage() {
  return (
    <div className="bg-(--color-primary-100) min-h-screen py-20 lg:py-28">
      <Container>
        <div className="text-center mb-12">
           <span className="text-(--color-cta) font-bold tracking-widest uppercase text-sm mb-4 block">Support</span>
           <h1 className="text-4xl md:text-5xl font-bold text-(--color-primary-dark) mb-6">Frequently Asked Questions</h1>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border-l-8 border-(--color-primary) hover:border-(--color-cta) transition-colors">
              <h3 className="text-xl font-bold text-(--color-primary-dark) mb-3">{faq.q}</h3>
              <p className="text-(--color-text-muted) leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
