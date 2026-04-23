import React from 'react';
import { Metadata } from 'next';
import { FaBriefcase, FaGraduationCap, FaLaptopCode } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join our team at Hawkeri.',
};

export default function CareersPage() {
  return (
    <div className="bg-(--color-bg) min-h-screen">
      
      <div className="bg-gradient-to-r from-(--color-primary-900) to-(--color-primary-dark) py-24 text-white text-center rounded-b-3xl">
        <span className="text-(--color-cta) font-bold tracking-widest uppercase text-sm mb-4 block">Careers</span>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Build the future of commerce</h1>
        <p className="text-lg text-(--color-primary-100) max-w-2xl mx-auto px-4">
          Join a fast-growing team of innovators, engineers, and creatives stationed in Dhaka. Let's make retail better for everyone.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20 -mt-20">
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-black/5 border border-(--color-primary-100) border-t-8 border-t-(--color-cta) flex flex-col items-center md:items-start text-center md:text-left">
            <div className="bg-(--color-primary-100) p-5 rounded-2xl text-(--color-primary) mb-6">
               <FaLaptopCode size={28} />
            </div>
            <h3 className="text-xl font-bold text-(--color-primary-dark) mb-3">Remote-Friendly</h3>
            <p className="text-(--color-text-muted) text-sm">Flexible working hours and WFH options for engineering and design roles.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-black/5 border border-(--color-primary-100) border-t-8 border-t-(--color-primary) flex flex-col items-center md:items-start text-center md:text-left">
            <div className="bg-(--color-primary-100) p-5 rounded-2xl text-(--color-primary) mb-6">
              <FaGraduationCap size={28} />
            </div>
            <h3 className="text-xl font-bold text-(--color-primary-dark) mb-3">Learning Budget</h3>
            <p className="text-(--color-text-muted) text-sm">Annual allowance to spend on courses, books, and professional development.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-black/5 border border-(--color-primary-100) border-t-8 border-t-(--color-cta) flex flex-col items-center md:items-start text-center md:text-left">
            <div className="bg-(--color-primary-100) p-5 rounded-2xl text-(--color-primary) mb-6">
               <FaBriefcase size={28} />
            </div>
            <h3 className="text-xl font-bold text-(--color-primary-dark) mb-3">Health & Wellness</h3>
            <p className="text-(--color-text-muted) text-sm">Comprehensive medical insurance for you and your direct dependents.</p>
          </div>
        </div>

        <h2 className="text-3xl xl:text-4xl font-bold text-(--color-primary-900) mb-8 border-b border-(--color-border) pb-6 text-center md:text-left">Open Positions</h2>
        
        <div className="space-y-6">
          {[
            { id: 1, title: 'Senior Software Engineer (React / Next.js)', type: 'Full-time', location: 'Dhaka / Remote', dept: 'Engineering' },
            { id: 2, title: 'E-Commerce Product Manager', type: 'Full-time', location: 'Dhaka', dept: 'Product' },
            { id: 3, title: 'Customer Success Specialist', type: 'Full-time', location: 'Dhaka', dept: 'Support' },
          ].map(job => (
            <div key={job.id} className="bg-white p-8 rounded-3xl shadow-md border border-(--color-border) flex flex-col md:flex-row md:items-center justify-between hover:shadow-lg hover:border-(--color-primary) transition-all cursor-pointer">
              <div className="mb-6 md:mb-0">
                <span className="text-xs font-bold text-(--color-cta) uppercase tracking-wider mb-2 block">{job.dept}</span>
                <h3 className="text-xl font-bold text-(--color-primary-dark)">{job.title}</h3>
                <p className="text-(--color-text-muted) text-sm mt-2">{job.type} &bull; {job.location}</p>
              </div>
              <button className="bg-(--color-primary) hover:bg-(--color-primary-dark) text-white font-bold py-3.5 px-8 rounded-xl transition-colors whitespace-nowrap">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
