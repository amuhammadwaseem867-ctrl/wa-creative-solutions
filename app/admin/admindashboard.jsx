"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./admin.css";

export default function AdminDashboard() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const loadChats = async () => {
    try {
      setLoadingChats(true);
      setError("");

      const response = await fetch("/api/admin/chats", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data?.message || "Unable to load conversations."
        );
      }

      const conversations = Array.isArray(data.conversations)
        ? data.conversations
        : [];

      setChats(conversations);

      if (conversations.length > 0) {
        await loadMessages(conversations[0].session_id);
      } else {
        setSelectedChat(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("LOAD CHATS ERROR:", error);

      setChats([]);
      setSelectedChat(null);
      setMessages([]);

      setError(
        error?.message || "Unable to load conversations."
      );
    } finally {
      setLoadingChats(false);
    }
  };

  const loadMessages = async (sessionId) => {
    try {
      setSelectedChat(sessionId);
      setLoadingMessages(true);
      setMessages([]);
      setError("");

      const response = await fetch(
        `/api/admin/chats/${sessionId}`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data?.message || "Unable to load messages."
        );
      }

      setMessages(
        Array.isArray(data.messages)
          ? data.messages
          : []
      );
    } catch (error) {
      console.error("LOAD MESSAGES ERROR:", error);

      setMessages([]);

      setError(
        error?.message || "Unable to load conversation."
      );
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      setError("");

      const response = await fetch(
        "/api/admin/logout",
        {
          method: "POST",
          credentials: "include",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed.");
      }

      window.location.href = "/admin/login";
    } catch (error) {
      console.error("LOGOUT ERROR:", error);

      setLoggingOut(false);
      setError(
        error?.message || "Unable to logout."
      );
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString([], {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const formatShortDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <main className="admin">
      <div className="admin-noise" />

      {/* HEADER */}

      <header className="admin-header">

        <div>
          <div className="admin-brand">
            <span className="admin-brand-dot" />
            WA CREATIVE SOLUTIONS
          </div>

          <h1>AI Chat Inbox</h1>

          <p>
            Monitor and review conversations from your
            website AI assistant.
          </p>
        </div>

        <div className="admin-header-meta">

          <div className="admin-header-status">
            <span className="admin-live-dot" />
            AI SUPPORT
          </div>

          <div className="admin-conversation-count">
            <strong>{chats.length}</strong>
            <span>CONVERSATIONS</span>
          </div>

          <button
            type="button"
            className="admin-logout"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? "LOGGING OUT..." : "LOGOUT"}
          </button>

        </div>

      </header>

      {/* MAIN WORKSPACE */}

      <section className="admin-workspace">

        {/* SIDEBAR */}

        <aside className="admin-sidebar">

          <div className="admin-sidebar-header">

            <div>
              <span>INBOX</span>
              <h2>Conversations</h2>
            </div>

            <button
              className="admin-refresh"
              onClick={loadChats}
              type="button"
              aria-label="Refresh conversations"
            >
              ↻
            </button>

          </div>

          {loadingChats && (
            <div className="admin-empty">
              <span className="admin-loader" />
              Loading conversations...
            </div>
          )}

          {!loadingChats && chats.length === 0 && (
            <div className="admin-empty">
              No conversations yet.
            </div>
          )}

          {!loadingChats && chats.length > 0 && (
            <div className="admin-conversation-list">

              {chats.map((chat) => (
                <button
                  key={chat.session_id}
                  className={`admin-conversation ${
                    selectedChat === chat.session_id
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    loadMessages(chat.session_id)
                  }
                  type="button"
                >

                  <div className="admin-conversation-top">

                    <span className="admin-avatar">
                      WA
                    </span>

                    <span className="admin-conversation-date">
                      {formatShortDate(
                        chat.last_message_at
                      )}
                    </span>

                  </div>

                  <div className="admin-session">
                    {chat.session_id.slice(0, 18)}...
                  </div>

                  <div className="admin-conversation-bottom">

                    <span>
                      {chat.message_count} messages
                    </span>

                    <span>●</span>

                  </div>

                </button>
              ))}

            </div>
          )}

        </aside>

        {/* CHAT AREA */}

        <section className="admin-chat">

          {!selectedChat ? (

            <div className="admin-chat-empty">

              <div className="admin-chat-empty-icon">
                WA
              </div>

              <h2>Select a conversation</h2>

              <p>
                Choose a conversation from the inbox
                to view the complete chat.
              </p>

            </div>

          ) : (

            <>

              <div className="admin-chat-header">

                <div className="admin-chat-person">

                  <div className="admin-avatar large">
                    WA
                  </div>

                  <div>
                    <span>
                      AI SUPPORT SESSION
                    </span>

                    <h2>
                      {selectedChat.slice(0, 22)}...
                    </h2>
                  </div>

                </div>

                <div className="admin-chat-status">
                  <span />
                  ACTIVE SESSION
                </div>

              </div>

              <div className="admin-messages">

                {loadingMessages && (
                  <div className="admin-message-loading">
                    <span className="admin-loader" />
                    Loading conversation...
                  </div>
                )}

                {!loadingMessages &&
                  messages.length === 0 && (
                    <div className="admin-message-loading">
                      No messages found.
                    </div>
                  )}

                {!loadingMessages &&
                  messages.map((message) => (

                    <div
                      key={message.id}
                      className={`admin-message-row ${
                        message.role === "user"
                          ? "user"
                          : "assistant"
                      }`}
                    >

                      <div className="admin-message-meta">

                        <span>
                          {message.role === "user"
                            ? "VISITOR"
                            : "WA ASSISTANT"}
                        </span>

                        <time>
                          {formatDate(
                            message.created_at
                          )}
                        </time>

                      </div>

                      <div className="admin-message-bubble">

                        {message.role === "assistant" ? (
                          <ReactMarkdown>
                            {message.message}
                          </ReactMarkdown>
                        ) : (
                          <p>
                            {message.message}
                          </p>
                        )}

                      </div>

                    </div>

                  ))}

                <div ref={messagesEndRef} />

              </div>

              <div className="admin-chat-footer">

                <span>
                  SESSION ID
                </span>

                <code>
                  {selectedChat}
                </code>

                <span className="admin-footer-dot" />

                <span>
                  {messages.length} MESSAGES
                </span>

              </div>

            </>

          )}

        </section>

      </section>

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

    </main>
  );
}