import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; // For email and location
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'; // For social brands

import { faCode } from '@fortawesome/free-solid-svg-icons';


export const Contact = () => {
  return (
    <section id="contact" className="container mx-auto px-4 py-24">
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
            className="text-gray-400 hover:text-[#00BFFF] transition"
            aria-label="GitHub Profile"
          >
            <FontAwesomeIcon icon={faGithub} className="text-3xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/siddhanththakuri/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#00BFFF] transition"
            aria-label="LinkedIn Profile"
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-3xl" />
          </a>
          <a
            href="https://leetcode.com/u/siddhanththakuri/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#00BFFF] transition"
            aria-label="LeetCode Profile"
          >
            <FontAwesomeIcon icon={faCode} className="text-3xl" />
          </a>
        </div>

        <p className="text-center text-md italic text-gray-500 max-w-lg mx-auto mt-8">
          "The best way to predict the future is to create it." - Peter Drucker
        </p>
      </div>
    </section>
  );
};