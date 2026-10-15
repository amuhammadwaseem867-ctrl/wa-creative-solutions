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

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectSubmitting, setProjectSubmitting] = useState(false);
  const [projectSubmitted, setProjectSubmitted] = useState(false);

  const [projectForm, setProjectForm] = useState({
    name: "",
    email: "",
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading, showProjectForm]);

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

      const aiMessage =
        data?.message ||
        "Sorry, I couldn't generate a response.";

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: aiMessage,
        },
      ]);

      /*
       * Show the project form when the AI has
       * finished creating the project brief.
       */
      const normalizedResponse =
        aiMessage.toLowerCase();

      const shouldShowProjectForm =
        normalizedResponse.includes(
          "project request ready"
        ) &&
        normalizedResponse.includes("name") &&
        normalizedResponse.includes("email");

      if (shouldShowProjectForm) {
        setShowProjectForm(true);
      }
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

  const handleProjectFormChange = (event) => {
    const { name, value } = event.target;

    setProjectForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submitProjectRequest = async (event) => {
    event.preventDefault();

    if (
      !projectForm.name.trim() ||
      !projectForm.email.trim()
    ) {
      return;
    }

    setProjectSubmitting(true);

    try {
      /*
       * Find the project brief from the conversation.
       * The complete conversation is sent so the API
       * can receive the client's project context.
       */

      const response = await fetch(
        "/api/project-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: projectForm.name.trim(),
            email: projectForm.email.trim(),

            projectType: extractProjectField(
              messages,
              "project type"
            ),

            goal: extractProjectField(
              messages,
              "main goal"
            ),

            timeline: extractProjectField(
              messages,
              "timeline"
            ),

            requirements: extractProjectField(
              messages,
              "requirements"
            ),

            conversation: messages,
          }),
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          "Invalid server response."
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to submit project request."
        );
      }

      setProjectSubmitted(true);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "### Project request ready ✓\n\nThank you! Your project details have been prepared successfully.\n\n**WA Creative Solutions** can now review your project information and follow up with you.",
        },
      ]);
    } catch (error) {
      console.error(
        "PROJECT REQUEST ERROR:",
        error
      );

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "I couldn't process the project request right now. Please try again.",
        },
      ]);
    } finally {
      setProjectSubmitting(false);
    }
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

                        a: ({
                          href,
                          children,
                        }) => (
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
                      {cleanAIResponse(
                        message.content
                      )}
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

              {/* PROJECT FORM */}

              {showProjectForm &&
                !projectSubmitted && (
                  <motion.form
                    className="ai-project-form"
                    onSubmit={
                      submitProjectRequest
                    }
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    <div className="ai-project-form__header">
                      <span>
                        PROJECT REQUEST
                      </span>

                      <small>
                        FINAL DETAILS
                      </small>
                    </div>

                    <div className="ai-project-form__field">
                      <label htmlFor="project-name">
                        NAME
                      </label>

                      <input
                        id="project-name"
                        name="name"
                        type="text"
                        value={
                          projectForm.name
                        }
                        onChange={
                          handleProjectFormChange
                        }
                        placeholder="Your name"
                        autoComplete="name"
                        disabled={
                          projectSubmitting
                        }
                        required
                      />
                    </div>

                    <div className="ai-project-form__field">
                      <label htmlFor="project-email">
                        EMAIL
                      </label>

                      <input
                        id="project-email"
                        name="email"
                        type="email"
                        value={
                          projectForm.email
                        }
                        onChange={
                          handleProjectFormChange
                        }
                        placeholder="you@example.com"
                        autoComplete="email"
                        disabled={
                          projectSubmitting
                        }
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="ai-project-form__submit"
                      disabled={
                        projectSubmitting ||
                        !projectForm.name.trim() ||
                        !projectForm.email.trim()
                      }
                    >
                      {projectSubmitting
                        ? "SUBMITTING..."
                        : "SUBMIT PROJECT REQUEST"}

                      <span>↗</span>
                    </button>

                    <p className="ai-project-form__note">
                      Your details will only be used
                      for this project inquiry.
                    </p>
                  </motion.form>
                )}

              {/* SUCCESS */}

              {projectSubmitted && (
                <motion.div
                  className="ai-project-success"
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                >
                  <span className="ai-project-success__icon">
                    ✓
                  </span>

                  <div>
                    <strong>
                      Request prepared
                    </strong>

                    <p>
                      Your project information is
                      ready for WA Creative
                      Solutions.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* SUGGESTIONS */}

              {messages.length === 1 &&
                !loading && (
                  <div className="ai-chat__suggestions">
                    {suggestions.map(
                      (suggestion) => (
                        <button
                          key={suggestion}
                          className="ai-chat__suggestion"
                          onClick={() =>
                            sendMessage(
                              suggestion
                            )
                          }
                          type="button"
                        >
                          <span>
                            {suggestion}
                          </span>

                          <span>↗</span>
                        </button>
                      )
                    )}
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
                    setInput(
                      event.target.value
                    )
                  }
                  placeholder="Ask us anything..."
                  disabled={loading}
                  autoComplete="off"
                  aria-label="Ask WA Assistant"
                />

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !input.trim()
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

/*
 * Reads the project brief from the AI conversation.
 *
 * This keeps the current chat architecture intact.
 */
function extractProjectField(
  messages,
  fieldName
) {
  const assistantMessages = messages
    .filter(
      (message) =>
        message.role === "assistant"
    )
    .map((message) => message.content);

  const latestBrief = assistantMessages
    .slice()
    .reverse()
    .find((content) =>
      content
        .toLowerCase()
        .includes(fieldName)
    );

  if (!latestBrief) {
    return "Not provided";
  }

  const lines = latestBrief.split("\n");

  const fieldIndex = lines.findIndex(
    (line) =>
      line
        .toLowerCase()
        .includes(fieldName)
  );

  if (
    fieldIndex !== -1 &&
    lines[fieldIndex + 1]
  ) {
    return lines[fieldIndex + 1]
      .replace(/\*\*/g, "")
      .trim();
  }

  return latestBrief
    .replace(/\*\*/g, "")
    .trim();
}