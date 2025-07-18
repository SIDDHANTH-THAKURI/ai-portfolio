// src/components/Hero.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { Scene } from './Scene';
import { motion } from 'framer-motion';
import { getSessionId } from '@/utils/session';
import { supabase } from '@/utils/supabaseClient';

export const Hero = () => {
  const [showcase, setShowcase] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState({ name: '', email: '', message: '' });
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackError, setFeedbackError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackError('');
    if (!feedback.message.trim()) {
      setFeedbackError('Please enter your feedback.');
      return;
    }
    try {
      const resp = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...feedback, session_id: getSessionId() }),
      });
      if (!resp.ok) throw new Error('Failed to submit feedback');
      setFeedbackSent(true);
      setTimeout(() => {
        setFeedbackOpen(false);
        setFeedbackSent(false);
        setFeedback({ name: '', email: '', message: '' });
      }, 2000);
    } catch (err) {
      setFeedbackError('Failed to submit feedback. Please try again later.');
    }
  };

  const handleContactScroll = () => {
    setDropdownOpen(false);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleJupiterClick = async () => {
    setAnalyticsOpen(true);
    setAnalyticsLoading(true);
    const [analytics, feedback, chatPrompts, linkClicks] = await Promise.all([
      supabase.from('analytics').select('*'),
      supabase.from('feedback').select('*'),
      supabase.from('chat_prompts').select('*'),
      supabase.from('link_clicks').select('*'),
    ]);
    setAnalyticsData({
      hits: analytics.data?.length || 0,
      feedback: feedback.data?.length || 0,
      prompts: chatPrompts.data?.length || 0,
      github: linkClicks.data?.filter((l: any) => l.link_type === 'github').length || 0,
      linkedin: linkClicks.data?.filter((l: any) => l.link_type === 'linkedin').length || 0,
      leetcode: linkClicks.data?.filter((l: any) => l.link_type === 'leetcode').length || 0,
      recentPrompts: chatPrompts.data?.slice(-10).reverse() || [],
      recentFeedback: feedback.data?.slice(-5).reverse() || [],
    });
    setAnalyticsLoading(false);
  };

  const nameVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.7 } },
  };

  return (
    <section id="hero" className="relative w-full h-screen mx-auto">
      <div className="absolute top-8 left-0 right-0 z-30 flex flex-row justify-between items-center w-full px-8 pointer-events-none">
        <div className="pointer-events-auto">
          <button
            className="bg-[#23243a] bg-opacity-80 text-white px-4 py-2 rounded-full shadow hover:bg-[#00BFFF] transition-colors duration-300 text-sm font-semibold"
            onClick={() => setShowcase((v) => !v)}
          >
            {showcase ? 'Show Info' : 'Background'}
          </button>
        </div>
        <div className="pointer-events-auto" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="bg-gradient-to-r from-[#00BFFF] to-[#7F7FD5] text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:from-[#7F7FD5] hover:to-[#00BFFF] transition-colors duration-300 text-base flex items-center gap-2"
          >
            More
            <svg className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#18182F] rounded-xl shadow-2xl py-2 flex flex-col animate-fadein border border-[#23243a]">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-white hover:bg-[#23243a] rounded-t-xl transition-colors duration-200 text-left"
                onClick={() => setDropdownOpen(false)}
              >
                View Resume
              </a>
              <a
                href="/resume.pdf"
                download
                className="px-5 py-3 text-white hover:bg-[#23243a] transition-colors duration-200 text-left"
                onClick={() => setDropdownOpen(false)}
              >
                Download Resume
              </a>
              <button
                onClick={() => { setFeedbackOpen(true); setDropdownOpen(false); }}
                className="px-5 py-3 text-white hover:bg-[#23243a] transition-colors duration-200 text-left"
              >
                Feedback
              </button>
              <button
                onClick={handleContactScroll}
                className="px-5 py-3 text-white hover:bg-[#23243a] rounded-b-xl transition-colors duration-200 text-left"
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </div>
      {feedbackOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
          <div className="bg-[#18182F] rounded-2xl shadow-2xl p-8 w-[95vw] max-w-md relative animate-fadein">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-[#00BFFF] text-xl"
              onClick={() => setFeedbackOpen(false)}
              aria-label="Close Feedback"
            >
              ×
            </button>
            {!feedbackSent ? (
              <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold font-poppins text-white mb-2">Feedback</h3>
                <input
                  type="text"
                  placeholder="Name (optional)"
                  className="rounded-lg px-4 py-2 bg-[#23243a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
                  value={feedback.name}
                  onChange={e => setFeedback(f => ({ ...f, name: e.target.value }))}
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  className="rounded-lg px-4 py-2 bg-[#23243a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BFFF]"
                  value={feedback.email}
                  onChange={e => setFeedback(f => ({ ...f, email: e.target.value }))}
                />
                <textarea
                  placeholder="Your feedback (required)"
                  className="rounded-lg px-4 py-2 bg-[#23243a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BFFF] min-h-[80px]"
                  value={feedback.message}
                  onChange={e => setFeedback(f => ({ ...f, message: e.target.value }))}
                  required
                />
                {feedbackError && <div className="text-red-400 text-xs">{feedbackError}</div>}
                <button
                  type="submit"
                  className="bg-[#00BFFF] text-white rounded-full px-4 py-2 font-bold shadow hover:bg-[#7F7FD5] transition-colors duration-200 text-base"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div className="text-center text-white text-lg font-poppins py-8">Thank you for your feedback!</div>
            )}
          </div>
        </div>
      )}
      <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing">
        <Scene onJupiterClick={handleJupiterClick} />
      </div>
      {analyticsOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
          <div className="bg-[#18182F] rounded-2xl shadow-2xl p-8 w-[98vw] max-w-3xl relative animate-fadein overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-[#00BFFF] text-xl"
              onClick={() => setAnalyticsOpen(false)}
              aria-label="Close Analytics"
            >
              ×
            </button>
            <h2 className="text-3xl font-bold font-poppins text-white mb-8">Portfolio Analytics</h2>
            {analyticsLoading ? (
              <div className="text-white text-center py-12">Loading...</div>
            ) : analyticsData ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                  <div className="bg-[#23243a] rounded-xl p-6 flex flex-col items-center shadow-lg animate-analytics-pop">
                    <span className="text-4xl font-bold text-[#00BFFF] animate-analytics-counter" style={{ animationDelay: '0.1s' }}>{analyticsData.hits}</span>
                    <span className="text-xs text-gray-300 mt-2 flex items-center gap-2"><svg className="w-5 h-5 text-[#00BFFF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>Page Hits</span>
                  </div>
                  <div className="bg-[#23243a] rounded-xl p-6 flex flex-col items-center shadow-lg animate-analytics-pop">
                    <span className="text-4xl font-bold text-[#00BFFF] animate-analytics-counter" style={{ animationDelay: '0.2s' }}>{analyticsData.feedback}</span>
                    <span className="text-xs text-gray-300 mt-2 flex items-center gap-2"><svg className="w-5 h-5 text-[#00BFFF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4-7 8-9 8s-9-4-9-8a9 9 0 1118 0z" /></svg>Feedbacks</span>
                  </div>
                  <div className="bg-[#23243a] rounded-xl p-6 flex flex-col items-center shadow-lg animate-analytics-pop">
                    <span className="text-4xl font-bold text-[#00BFFF] animate-analytics-counter" style={{ animationDelay: '0.3s' }}>{analyticsData.prompts}</span>
                    <span className="text-xs text-gray-300 mt-2 flex items-center gap-2"><svg className="w-5 h-5 text-[#00BFFF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m10-4h-4m0 0V4m0 0v4" /></svg>Chat Prompts</span>
                  </div>
                  <div className="col-span-2 md:col-span-3 flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold mb-2 text-[#00BFFF]">Link Clicks</h3>
                    <div className="flex gap-8 items-end justify-center mt-2">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-20 bg-[#00BFFF] rounded-t-lg animate-bar-grow" style={{ height: `${analyticsData.github * 10 + 20}px`, minHeight: 24 }}></div>
                        <span className="text-xs text-gray-300 mt-1">GitHub</span>
                        <span className="text-xs text-[#00BFFF] font-bold">{analyticsData.github}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-20 bg-[#7F7FD5] rounded-t-lg animate-bar-grow" style={{ height: `${analyticsData.linkedin * 10 + 20}px`, minHeight: 24 }}></div>
                        <span className="text-xs text-gray-300 mt-1">LinkedIn</span>
                        <span className="text-xs text-[#7F7FD5] font-bold">{analyticsData.linkedin}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-20 bg-[#FFA500] rounded-t-lg animate-bar-grow" style={{ height: `${analyticsData.leetcode * 10 + 20}px`, minHeight: 24 }}></div>
                        <span className="text-xs text-gray-300 mt-1">LeetCode</span>
                        <span className="text-xs text-[#FFA500] font-bold">{analyticsData.leetcode}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-white text-center py-12">No analytics data found.</div>
            )}
            <style jsx global>{`
              @keyframes analytics-pop {
                0% { transform: scale(0.8); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
              }
              .animate-analytics-pop {
                animation: analytics-pop 0.7s cubic-bezier(0.4,0,0.2,1) both;
              }
              @keyframes analytics-counter {
                0% { opacity: 0; transform: translateY(20px); }
                100% { opacity: 1; transform: translateY(0); }
              }
              .animate-analytics-counter {
                animation: analytics-counter 0.8s cubic-bezier(0.4,0,0.2,1) both;
              }
              @keyframes bar-grow {
                0% { height: 0; }
                100% { }
              }
              .animate-bar-grow {
                animation: bar-grow 1.2s cubic-bezier(0.4,0,0.2,1) both;
              }
            `}</style>
          </div>
        </div>
      )}
      <div
        className={`relative z-10 h-full flex flex-col justify-center items-center text-center px-4 pointer-events-none transition-opacity duration-500 ${showcase ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <motion.h1
          variants={nameVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold font-poppins text-white select-none"
        >
          Siddhanth Thakuri
        </motion.h1>
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl md:text-4xl text-gray-300 mt-2 font-normal select-none"
        >
          Software Engineer & AI Developer
        </motion.h2>
      </div>
      {!showcase && (
        <div className="absolute xs:bottom-10 bottom-32 w-full flex flex-col items-center justify-center">
          <a href="#about" className="flex flex-col items-center group cursor-pointer">
            
            <svg className="w-8 h-8 text-gray-300 animate-bounce group-hover:text-[#00BFFF] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <span className="mt-2 text-gray-300 text-sm font-poppins opacity-80 group-hover:text-[#00BFFF] group-hover:opacity-100 transition-all duration-300 animate-fadein">Scroll Down</span>
          </a>
      </div>
      )}
    </section>
  );
};

<style jsx global>{`
@keyframes fadein {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 0.8; transform: translateY(0); }
}
.animate-fadein {
  animation: fadein 1.5s ease-in 0.5s both;
}
`}</style>