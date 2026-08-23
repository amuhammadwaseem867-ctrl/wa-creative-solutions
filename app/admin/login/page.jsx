"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data?.message || "Invalid email or password."
        );
      }

      router.replace("/admin");
      router.refresh();
    } catch (error) {
      console.error("ADMIN LOGIN ERROR:", error);

      setError(
        error?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080908",
        color: "#f4f6ef",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#111411",
          border: "1px solid #252925",
          padding: "40px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "#c8ff3d",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#c8ff3d",
                display: "inline-block",
              }}
            />

            WA CREATIVE SOLUTIONS
          </div>

          <h1
            style={{
              margin: "14px 0 8px",
              fontSize: "32px",
              lineHeight: 1.1,
            }}
          >
            Admin Login
          </h1>

          <p
            style={{
              margin: 0,
              color: "#8d938b",
              fontSize: "14px",
              lineHeight: 1.6,
            }}
          >
            Sign in to access your AI conversation inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "18px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "11px",
                letterSpacing: "0.12em",
              }}
            >
              EMAIL
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="admin@example.com"
              autoComplete="email"
              required
              disabled={loading}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px",
                background: "#080908",
                border: "1px solid #303530",
                color: "#f4f6ef",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "11px",
                letterSpacing: "0.12em",
              }}
            >
              PASSWORD
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              disabled={loading}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px",
                background: "#080908",
                border: "1px solid #303530",
                color: "#f4f6ef",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                marginBottom: "18px",
                padding: "12px",
                background: "#2a1717",
                border: "1px solid #553030",
                color: "#ff9d9d",
                fontSize: "13px",
                lineHeight: 1.5,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              background: "#c8ff3d",
              color: "#080908",
              fontWeight: 700,
              cursor: loading ? "wait" : "pointer",
              fontSize: "12px",
              letterSpacing: "0.1em",
            }}
          >
            {loading ? "AUTHENTICATING..." : "SIGN IN"}
          </button>
        </form>

        <div
          style={{
            marginTop: "28px",
            paddingTop: "18px",
            borderTop: "1px solid #252925",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#626961",
            fontSize: "10px",
            letterSpacing: "0.12em",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#c8ff3d",
              display: "inline-block",
            }}
          />

          SECURE ADMIN ACCESS
        </div>
      </div>
    </main>
  );
}