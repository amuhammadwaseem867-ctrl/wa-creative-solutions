"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AIChat.css";

const suggestions = [
  "What services do you offer?",
  "How much does a website cost?",
  "I want to start a project",
];

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm the WA Creative Solutions AI assistant. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(text) {
    const message = text.trim();

    if (!message || loading) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: data.message,
        },
      ]);
    } catch (error) {
      console.error("CHAT ERROR:", error);

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat"
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.96 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* HEADER */}
            <div className="ai-chat__header">
              <div className="ai-chat__identity">
                <div className="ai-chat__logo">WA</div>

                <div>
                  <span className="ai-chat__eyebrow">
                    AI SUPPORT
                  </span>

                  <h3>WA Assistant</h3>
                </div>
              </div>

              <button
                className="ai-chat__close"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI chat"
              >
                ×
              </button>
            </div>

            {/* MESSAGES */}
            <div className="ai-chat__content">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`ai-message ${
                    message.role === "user"
                      ? "ai-message--user"
                      : "ai-message--assistant"
                  }`}
                >
                  {message.content}
                </div>
              ))}

              {/* TYPING INDICATOR */}
              {loading && (
                <div className="ai-message ai-message--assistant ai-typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}

              {/* SUGGESTIONS */}
              {messages.length === 1 && !loading && (
                <div className="ai-chat__suggestions">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="ai-chat__suggestion"
                      onClick={() => sendMessage(suggestion)}
                    >
                      <span>{suggestion}</span>
                      <span>↗</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* INPUT */}
            <div className="ai-chat__bottom">
              <form
                className="ai-chat__input"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  placeholder="Ask us anything..."
                  disabled={loading}
                />

                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                >
                  ↗
                </button>
              </form>

              <span className="ai-chat__powered">
                WA CREATIVE SOLUTIONS • AI SUPPORT
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LAUNCHER */}
      <motion.button
        className="ai-chat__launcher"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI support"
      >
        <span className="ai-chat__launcher-status" />

        <span>
          {isOpen ? "CLOSE" : "AI SUPPORT"}
        </span>

        <strong>{isOpen ? "×" : "↗"}</strong>
      </motion.button>
    </>
  );
}