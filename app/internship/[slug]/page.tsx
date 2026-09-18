import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Award, Calendar, CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const name = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    title: `${name} | PropDesk Internship`,
  };
}

const internsData = {
  "hardik-jain": {
    name: "Hardik Jain",
    role: "Lead Developer",
    duration: "21 Days Internship",
    status: "Job Done",
    image: "/hardik.jpg",
    bio: "Hardik Jain is a phenomenal developer who architected core systems for PropDesk. During this 21-day internship, Hardik successfully executed complex requirements and delivered exceptional results ahead of schedule.",
    highlights: ["Architected the Next.js App Router structure", "Implemented seamless animations and transitions", "Delivered pixel-perfect UI components"]
  },
  "suraj-shah": {
    name: "Suraj Shah",
    role: "Digital Marketing Intern",
    duration: "21 Days Internship",
    status: "Successfully Completed",
    image: "/suraj.jpg",
    bio: "Suraj Shah spearheaded digital marketing initiatives for PropDesk. His creative strategies significantly improved our online presence and audience engagement.",
    highlights: ["Executed high-conversion ad campaigns", "Optimized social media reach", "Boosted brand visibility"]
  },
  "naman-sharma": {
    name: "Naman Sharma",
    role: "Video Editor & Director",
    duration: "21 Days Internship",
    status: "Successfully Completed",
    image: "/naman.jpg",
    bio: "Naman Sharma is the creative force behind PropDesk's video content. From directing shoots to crisp editing, his visual storytelling brings the product to life.",
    highlights: ["Directed product launch videos", "Edited high-quality promotional content", "Created engaging social media reels"]
  }
};

export default async function InternshipPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const intern = internsData[slug as keyof typeof internsData];

  if (!intern) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-32 relative overflow-hidden">
      {/* Light mode premium aesthetics */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl w-full relative z-10">
        <Link href="/about-us" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors group font-medium">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to About Us
        </Link>

        <div className="bg-white/90 backdrop-blur-xl border border-slate-200 p-8 sm:p-12 rounded-3xl shadow-xl shadow-slate-200/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10 relative z-10">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-3 tracking-tight font-display">{intern.name}</h1>
              <div className="text-xl text-emerald-600 font-semibold mb-6">{intern.role}</div>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-medium border border-slate-200 shadow-sm">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  {intern.duration}
                </div>
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-200 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  {intern.status}
                </div>
              </div>
            </div>
            
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-xl shadow-emerald-500/20 flex-shrink-0 rotate-3 hover:rotate-0 transition-transform duration-300 relative border border-slate-100">
              <img src={intern.image} alt={intern.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-10 relative z-10">
            <div>
              <h2 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-widest font-display">Bio</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {intern.bio}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest font-display">Key Highlights</h2>
              <ul className="space-y-4">
                {intern.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mr-4 mt-0.5 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-base font-medium">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-100 text-center relative z-10">
            <p className="text-slate-400 text-sm font-medium tracking-wide">PropDesk Internship Program 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
