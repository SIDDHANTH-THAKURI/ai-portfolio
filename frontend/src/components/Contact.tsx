import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; // For email and location
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'; // For social brands

import { faCode } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { getSessionId } from '@/utils/session';


export const Contact = () => {
  return (
    <motion.section
      id="contact"
      className="container mx-auto px-4 py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
    >
      <h2 className="text-center text-4xl font-bold font-poppins mb-4">Get In Touch</h2>
      <p className="text-center text-lg text-gray-400 max-w-xl mx-auto mb-12">
        I'm currently open to new opportunities, and my inbox is always open. Whether for a question or just to connect, I'll do my best to get back to you!
      </p>

      <div className="flex flex-col items-center space-y-6">
        <div className="text-center flex items-center space-x-2">
          <FontAwesomeIcon icon={faEnvelope} className="text-[#00BFFF] text-xl" />
          <p className="text-xl text-white-300">
            <a href="mailto:thakurisiddhanth1@gmail.com" className="text-[#00BFFF] hover:underline">
              thakurisiddhanth1@gmail.com
            </a>
          </p>
        </div>
        <div className="text-center flex items-center space-x-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#00BFFF] text-xl" />
          <p className="text-xl text-gray-300">
            Sydney, Australia
          </p>
        </div>

        <div className="flex justify-center space-x-6 pt-4"> {/* Added padding top */}
          <a
            href="https://github.com/SIDDHANTH-THAKURI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#23243a] border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-white transition-colors duration-200 rounded-full w-12 h-12 shadow-lg text-2xl animate-glow-breathe"
            aria-label="GitHub Profile"
            onClick={() => fetch('/api/link-click', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ link_type: 'github', session_id: getSessionId() }) })}
          >
            <FontAwesomeIcon icon={faGithub} className="text-3xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/siddhanththakuri/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#23243a] border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-white transition-colors duration-200 rounded-full w-12 h-12 shadow-lg text-2xl animate-glow-breathe"
            aria-label="LinkedIn Profile"
            onClick={() => fetch('/api/link-click', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ link_type: 'linkedin', session_id: getSessionId() }) })}
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-3xl" />
          </a>
          <a
            href="https://leetcode.com/u/siddhanththakuri/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#23243a] border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-white transition-colors duration-200 rounded-full w-12 h-12 shadow-lg text-2xl animate-glow-breathe"
            aria-label="LeetCode Profile"
            onClick={() => fetch('/api/link-click', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ link_type: 'leetcode', session_id: getSessionId() }) })}
          >
            <FontAwesomeIcon icon={faCode} className="text-3xl" />
          </a>
        </div>

        <p className="text-center text-md italic text-gray-500 max-w-lg mx-auto mt-8">
          "The best way to predict the future is to create it." - Peter Drucker
        </p>
      </div>
      <style jsx global>{`
        .glass-card {
          background: rgba(26, 26, 46, 0.55);
          box-shadow: 0 8px 32px 0 rgba(0,191,255,0.10);
          border: 1.5px solid rgba(255,255,255,0.10);
          backdrop-filter: blur(12px);
        }
        @keyframes glow-breathe {
         0%, 100% { box-shadow: 0 0 16px 4px #00BFFF55, 0 2px 16px 0 #7F7FD5; }
         50% { box-shadow: 0 0 32px 12px #00BFFFcc, 0 2px 24px 0 #7F7FD5; }
       }
       .animate-glow-breathe {
         animation: glow-breathe 2.8s ease-in-out infinite;
       }
      `}</style>
    </motion.section>
  );
};