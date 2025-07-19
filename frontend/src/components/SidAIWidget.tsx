// src/components/SidAIWidget.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { getSessionId } from '@/utils/session';

type RuleResponse = { type: "text" | "action"; message: string; action?: () => void };

const RULES: { match: RegExp; response: () => RuleResponse }[] = [
  {
    match: /resume|cv/i,
    response: () => ({
      type: "action",
      message: "Here’s my resume!",
      action: () => window.open("/resume.pdf", "_blank"),
    }),
  },
  {
    match: /project|work|portfolio/i,
    response: () => ({
      type: "action",
      message: "Let me show you my projects!",
      action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
    }),
  },
  {
    match: /skill|tech|stack|technology/i,
    response: () => ({
      type: "text",
      message: "I work with .NET, React, Node.js, C#, SQL Server, REST APIs, Python, Azure, HTML, CSS, JS, and more!",
    }),
  },
  {
    match: /education|degree|study|college|university/i,
    response: () => ({
      type: "action",
      message: "Here’s my education background!",
      action: () => document.getElementById("experience-education")?.scrollIntoView({ behavior: "smooth" }),
    }),
  },
  {
    match: /contact|email|reach/i,
    response: () => ({
      type: "action",
      message: "You can contact me at thakurisiddhanth1@gmail.com or scroll to the Contact section!",
      action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
    }),
  },
  {
    match: /fun fact|joke|hobby|beyond/i,
    response: () => ({
      type: "text",
      message: "Fun fact: I’ve solved 275+ LeetCode problems and love playing guitar!",
    }),
  },
];

const LLM_LIMIT = 10;

const SID_KNOWLEDGE: { keywords: RegExp; answer: string }[] = [
  { keywords: /name|who are you|yourself/i, answer: "I'm Sid AI, your friendly portfolio assistant!" },
  { keywords: /siddhanth|owner|portfolio owner/i, answer: "Siddhanth Thakuri is a Software Engineer & AI Developer, a recent graduate with a Master’s in Computer Science (ML & Big Data) from University of Wollongong, Australia." },
  { keywords: /experience|work|accenture/i, answer: "I worked as a full stack developer at Accenture (2021–2023) using .NET, React, Node.js, C#, SQL Server, REST APIs, Python, and Azure." },
  { keywords: /education|degree|study|college|university|masters|bachelor/i, answer: "I completed my Master’s in Computer Science (ML & Big Data) at University of Wollongong, Australia, and my B.Tech in Aeronautical Engineering at MLR Institute of Technology (JNTUH), India." },
  { keywords: /skills|tech|stack|technology/i, answer: ".NET, React, Node.js, C#, SQL Server, REST APIs, Python, Azure, HTML, CSS, JS, and more!" },
  { keywords: /project|work|portfolio/i, answer: "Check out my featured projects below!" },
  { keywords: /contact|email|reach/i, answer: "You can contact me at thakurisiddhanth1@gmail.com or via the Contact section." },
  { keywords: /fun fact|hobby|beyond|joke/i, answer: "Fun fact: I’ve solved 275+ LeetCode problems and love playing guitar!" },
  { keywords: /resume|cv/i, answer: "Here’s my resume!", },
];

const SID_CONTEXT = `
You are Sid AI, a portfolio assistant for Siddhanth Thakuri.
Here is up-to-date context about Siddhanth:
- Recent graduate, Master’s in Computer Science (ML & Big Data), University of Wollongong, Australia (2023–2025)
- B.Tech in Aeronautical Engineering, MLR Institute of Technology (JNTUH), India (2017–2021)
- 2 years as Software Engineer at Accenture India (2021–2023), full stack developer (Python, .NET, C#, React.js, Node.js, SQL Server, REST APIs, HTML, CSS, JavaScript, Azure)
- Built MedMatch: AI-driven drug interaction checker (React, Node.js, FastAPI, LLMs, ML/DL)
- Experience with RAG, Agentic AI, MCP, LLM finetuning, Cursor, Claude, Ollama
- Fast learner, strong teamwork and communication, passionate, excellent time management, problem solving, creativity, work ethic, attention to detail, types fast
- Contact: thakurisiddhanth1@gmail.com
- LinkedIn: https://www.linkedin.com/in/siddhanththakuri/
- GitHub: https://github.com/SIDDHANTH-THAKURI
- LeetCode: https://leetcode.com/u/siddhanththakuri/
Instructions:
- Only introduce yourself as Sid AI in the first message. After that, reply as if you are Siddhanth, in first person, concise and natural.
- If asked about a skill you don’t know, say you’re a fast learner and can pick up new things quickly.
- If asked non-sensible or inappropriate questions, politely decline or redirect.
- When sharing links, display them as short, clickable links or buttons.
- Always consider the previous chat for context.
`;

const SESSION_MEMORY = 8;

export const SidAIWidget = () => {
  // Reset LLM count on page load (refresh)
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidai_llm_count", "0");
    }
  }, []);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [llmCount, setLlmCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);
  const [firstAI, setFirstAI] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputDisabled, setInputDisabled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const count = parseInt(localStorage.getItem("sidai_llm_count") || "0", 10);
      setLlmCount(count);
    }
  }, [open]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (inputDisabled && messages.length > 0) {
      const userMessages = messages.filter(m => m.role === 'user').map(m => m.text);
      const summary = userMessages.slice(0, 3).join(' | '); 
      fetch('/api/chat-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: getSessionId(), summary }),
      });
    }
  }, [inputDisabled]);

  useEffect(() => {
    if (!open && messages.length > 0) {
      const userMessages = messages.filter(m => m.role === 'user').map(m => m.text);
      const summary = userMessages.slice(0, 3).join(' | ');
      fetch('/api/chat-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: getSessionId(), summary }),
      });
    }
  }, [open]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");
    if (llmCount >= LLM_LIMIT) {
      setInputDisabled(true);
      setMessages((msgs) => [
        ...msgs,
        {
          role: "ai",
          text: "Sid AI LLM limit reached for this session. Please scroll down to see the portfolio for more information!",
        },
      ]);
      return;
    }
    const userMsg = input.trim();
    if (!userMsg) return;
    setMessages((msgs) => [...msgs, { role: "user", text: userMsg }]);
    setInput("");
    if (inputRef.current) inputRef.current.focus();
    fetch('/api/chat-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: getSessionId(), prompt: userMsg }),
    });
    setLoading(true);
    try {
      const recentHistory = messages.slice(-SESSION_MEMORY).map(m => ({ role: m.role, content: m.text }));
      
      const context = firstAI ? SID_CONTEXT : SID_CONTEXT.replace('Only introduce yourself as Sid AI in the first message. After that, reply as if you are Siddhanth, in first person, concise and natural.', 'Reply as if you are Siddhanth, in first person, concise and natural.');
      const llmPrompt = `${context}\n\nUser: ${userMsg}`;
      const resp = await fetch("/api/sidai-llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: llmPrompt,
          history: recentHistory,
        }),
      });
      const data = await resp.json();
      if (data.message) {
        setMessages((msgs) => [...msgs, { role: "ai", text: data.message }]);
        setFirstAI(false);
        const newCount = llmCount + 1;
        setLlmCount(newCount);
        if (typeof window !== "undefined") localStorage.setItem("sidai_llm_count", String(newCount));
        if (newCount >= LLM_LIMIT) {
          setInputDisabled(true);
          setMessages((msgs) => [
            ...msgs,
            {
              role: "ai",
              text: "Sid AI LLM limit reached for this session. Please scroll down to see the portfolio for more information!",
            },
          ]);
        }
      } else {
        setMessages((msgs) => [...msgs, { role: "ai", text: "Sorry, I couldn’t get a response from Sid AI right now." }]);
      }
    } catch (err) {
      setError("Error connecting to Sid AI. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  function renderMessage(text: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
      if (urlRegex.test(part)) {
        let short = part.replace(/^https?:\/\//, '').replace(/\/$/, '');
        if (short.length > 30) short = short.slice(0, 27) + '...';
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#00BFFF] text-white px-3 py-1 rounded-full font-semibold text-xs mx-1 my-0.5 hover:bg-[#7F7FD5] transition-colors duration-200 shadow">
            {short}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      
      {!open && (
        <button
          className="relative flex items-center gap-2 bg-gradient-to-tr from-[#00BFFF] to-[#7F7FD5] text-white px-7 py-4 rounded-full shadow-2xl font-bold text-lg hover:scale-110 transition-transform duration-200 glass-ai-btn backdrop-blur-md animate-sidai-pulse"
          onClick={() => setOpen(true)}
          style={{ boxShadow: '0 0 24px 6px #00BFFF88, 0 2px 16px 0 #7F7FD5' }}
        >
          <span className="absolute -top-2 -right-2 bg-[#00BFFF] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md border-2 border-white animate-bounce z-10">AI</span>
          <span className="absolute inset-0 rounded-full pointer-events-none animate-sidai-glow" />
          <FontAwesomeIcon icon={faRobot} className="text-2xl z-10" />
          <span className="hidden sm:inline z-10">Sid AI</span>
        </button>
      )}
      {open && (
        <div className="glass-ai-card w-[420px] max-w-[98vw] p-6 rounded-2xl shadow-2xl flex flex-col items-center animate-fadein min-h-[480px]">
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-[#00BFFF] text-xl"
            onClick={() => setOpen(false)}
            aria-label="Close Sid AI"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="mb-3 mt-1">
            <Image src="/chatbot.png" alt="Sid AI Avatar" width={56} height={56} className="rounded-full border-2 border-[#00BFFF] shadow-lg" />
          </div>
          <div ref={chatRef} className="w-full flex-1 max-h-[340px] overflow-y-auto mb-3 px-1">
            {messages.length === 0 && (
              <div className="text-gray-400 text-center text-sm mb-2">Ask me anything about Siddhanth’s portfolio, skills, or projects!</div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`rounded-2xl px-4 py-2 max-w-[85%] text-base font-poppins shadow ${msg.role === "user" ? "bg-[#00BFFF] text-white" : "bg-[#23243a] text-gray-100"}`} style={{ wordBreak: 'break-word', whiteSpace: 'pre-line' }}>
                  {renderMessage(msg.text)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="mb-2 flex justify-start">
                <div className="rounded-2xl px-4 py-2 max-w-[85%] text-base font-poppins shadow bg-[#23243a] text-gray-100 opacity-70">Sid AI is thinking...</div>
              </div>
            )}
            {error && <div className="text-red-400 text-xs text-center mt-2">{error}</div>}
          </div>
          <form onSubmit={handleSend} className="w-full flex gap-2 mt-2">
            <input
              type="text"
              className="w-full rounded-full px-4 py-2 bg-[#23243a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BFFF] text-base"
              placeholder={loading ? "Sid AI is thinking..." : inputDisabled ? "Sid AI LLM limit reached" : "Type a message..."}
              value={input}
              onChange={e => setInput(e.target.value)}
              ref={inputRef}
              autoFocus
              disabled={inputDisabled}
            />
            <button
              type="submit"
              className="bg-[#00BFFF] text-white rounded-full px-4 py-2 font-bold shadow hover:bg-[#7F7FD5] transition-colors duration-200 disabled:opacity-50 text-base"
              disabled={loading || !input.trim() || inputDisabled}
            >
              Send
            </button>
          </form>
          <div className="w-full text-right text-xs text-gray-400 mt-1">LLM uses: {llmCount}/{LLM_LIMIT}</div>
        </div>
      )}
      <style jsx global>{`
        .glass-ai-btn {
          background: rgba(26, 26, 46, 0.7);
          box-shadow: 0 8px 32px 0 rgba(0,191,255,0.15);
          border: 1.5px solid rgba(255,255,255,0.10);
          backdrop-filter: blur(10px);
        }
        .glass-ai-card {
          background: rgba(26, 26, 46, 0.85);
          box-shadow: 0 8px 32px 0 rgba(0,191,255,0.18);
          border: 1.5px solid rgba(255,255,255,0.10);
          backdrop-filter: blur(16px);
          position: relative;
        }
        @keyframes fadein {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein {
          animation: fadein 0.5s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes sidai-glow {
          0%, 100% { box-shadow: 0 0 24px 8px #00BFFF88, 0 2px 16px 0 #7F7FD5; opacity: 0.7; }
          50% { box-shadow: 0 0 36px 16px #00BFFFcc, 0 2px 24px 0 #7F7FD5; opacity: 1; }
        }
        .animate-sidai-glow {
          animation: sidai-glow 2.2s infinite alternate;
        }
        @keyframes sidai-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .animate-sidai-pulse {
          animation: sidai-pulse 2.2s infinite;
        }
      `}</style>
    </div>
  );
};

export default SidAIWidget; 