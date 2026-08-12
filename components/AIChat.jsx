"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import "./AIChat.css";

const suggestions = [
  "What services do you offer?",
  "How much does a website cost?",
  "I want to start a project",
];

const cleanAIResponse = (text) => {
  if (!text) return "";

  return text
    .replace(/\\\*/g, "*")
    .replace(/\\_/g, "_")
    .replace(/\\#/g, "#")
    .replace(/\\`/g, "`")
    .replace(/\\\[/g, "[")
    .replace(/\\\]/g, "]")
    .replace(/\\\(/g, "(")
    .replace(/\\\)/g, ")")
    .replace(/\\:/g, ":")
    .trim();
};

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm the WA Creative Solutions AI assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async (text) => {
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

      const contentType =
        response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        const textResponse = await response.text();

        console.error(
          "API returned non-JSON response:",
          textResponse
        );

        throw new Error(
          "The AI service returned an invalid response."
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "AI service request failed."
        );
      }

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            data?.message ||
            "Sorry, I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.error("AI CHAT ERROR:", error);

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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat"
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 25,
              scale: 0.96,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* HEADER */}

            <div className="ai-chat__header">
              <div className="ai-chat__identity">
                <div className="ai-chat__logo">
                  WA
                </div>

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
                type="button"
              >
                ×
              </button>
            </div>

            {/* CHAT CONTENT */}

            <div className="ai-chat__content">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`ai-message ${
                    message.role === "user"
                      ? "ai-message--user"
                      : "ai-message--assistant"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p>{children}</p>
                        ),

                        strong: ({ children }) => (
                          <strong>{children}</strong>
                        ),

                        em: ({ children }) => (
                          <em>{children}</em>
                        ),

                        ul: ({ children }) => (
                          <ul>{children}</ul>
                        ),

                        ol: ({ children }) => (
                          <ol>{children}</ol>
                        ),

                        li: ({ children }) => (
                          <li>{children}</li>
                        ),

                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {cleanAIResponse(message.content)}
                    </ReactMarkdown>
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>
              ))}

              {/* TYPING INDICATOR */}

              {loading && (
                <div className="ai-message ai-message--assistant ai-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}

              <div ref={messagesEndRef} />

              {/* SUGGESTIONS */}

              {messages.length === 1 && !loading && (
                <div className="ai-chat__suggestions">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      className="ai-chat__suggestion"
                      onClick={() =>
                        sendMessage(suggestion)
                      }
                      type="button"
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
                  autoComplete="off"
                  aria-label="Ask WA Assistant"
                />

                <button
                  type="submit"
                  disabled={
                    loading || !input.trim()
                  }
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

      {/* CHAT LAUNCHER */}

      <motion.button
        className="ai-chat__launcher"
        onClick={() =>
          setIsOpen((value) => !value)
        }
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        aria-label={
          isOpen
            ? "Close AI support"
            : "Open AI support"
        }
        type="button"
      >
        <span className="ai-chat__launcher-status"></span>

        <span>
          {isOpen ? "CLOSE" : "AI SUPPORT"}
        </span>

        <strong>
          {isOpen ? "×" : "↗"}
        </strong>
      </motion.button>
    </>
  );
}