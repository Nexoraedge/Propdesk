import React from 'react';
import Link from 'next/link';
import { Sparkles, Code, Palette, Rocket } from 'lucide-react';

export const metadata = {
  title: 'About Us',
  description: 'Learn more about the team behind PropDesk.',
};

export default function AboutUs() {
  const interns = [
    {
      name: "Hardik Jain",
      slug: "hardik-jain",
      role: "Lead Developer",
      desc: "Job done. Core architect and problem solver.",
      image: "/hardik.jpg"
    },
    {
      name: "Suraj Shah",
      slug: "suraj-shah",
      role: "Digital Marketing Intern",
      desc: "Creative strategies and brand visibility.",
      image: "/suraj.jpg"
    },
    {
      name: "Naman Sharma",
      slug: "naman-sharma",
      role: "Video Editor & Director",
      desc: "Visual storytelling and crisp editing.",
      image: "/naman.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden pt-24 pb-16">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6 font-display">
            Building the Future of <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-300">
              Real Estate
            </span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            PropDesk is engineered to scale modern agents, brokers, and high-growth agencies. We believe in providing world-class tools to empower the emerging force of New India's real estate sector.
          </p>
        </div>

        {/* Our Story & Founders Section */}
        <div className="mb-24 mt-8 max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-slate-600 text-lg leading-relaxed text-left sm:text-center">
              Founded with the vision to modernize India's real estate landscape, PropDesk is the central nervous system for ambitious brokerages. We saw firsthand how manual processes, Excel sheets, and chaotic WhatsApp groups were holding brilliant agents back. We built PropDesk to bring AI-powered matching, secure lead management, and seamless automation to every property transaction in India.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">Meet the Founder</h2>
            <div className="flex justify-center">
              {/* Hardik Jain */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 max-w-lg">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center text-2xl font-black flex-shrink-0 shadow-lg shadow-emerald-500/20">
                  HJ
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Hardik Jain</h3>
                  <div className="text-emerald-500 font-semibold text-sm mb-3">Founder</div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Hardik drives the product architecture and user experience, ensuring PropDesk remains the fastest, most intuitive CRM for brokers across India.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interns Section */}
        <div className="mt-24 pt-16 border-t border-slate-200/60">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold tracking-wide uppercase mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              21 Days Internship Program
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Brilliant Minds Behind PropDesk
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              We are incredibly proud of the talented interns who contributed significantly to this project during their rigorous 21-day internship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {interns.map((intern) => (
              <Link
                href={`/internship/${intern.slug}`}
                key={intern.slug}
                className="group relative bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 hover:border-emerald-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-200/50 flex flex-col items-center text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-100 mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10 shadow-md">
                  <img src={intern.image} alt={intern.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 relative z-10">{intern.name}</h3>
                <div className="text-emerald-600 font-semibold text-sm mb-4 relative z-10">{intern.role}</div>
                <p className="text-slate-600 text-sm leading-relaxed relative z-10">
                  {intern.desc}
                </p>
                <div className="mt-6 text-emerald-500 font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:translate-y-0 translate-y-2 relative z-10">
                  View Profile &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
