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

    setLoading(true);
    setError("");

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

      router.replace("/admin/dashboard");
      router.refresh();
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(
        error?.message ||
          "Unable to login."
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
        <div
          style={{
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              color: "#c8ff3d",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
            }}
          >
            WA CREATIVE SOLUTIONS
          </div>

          <h1
            style={{
              margin: "12px 0 8px",
              fontSize: "32px",
            }}
          >
            Admin Login
          </h1>

          <p
            style={{
              margin: 0,
              color: "#8d938b",
              fontSize: "14px",
            }}
          >
            Access your AI conversation inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div
            style={{
              marginBottom: "18px",
            }}
          >
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "11px",
                letterSpacing: "0.1em",
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
              }}
            />
          </div>

          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "11px",
                letterSpacing: "0.1em",
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
              fontWeight: 800,
              cursor: loading
                ? "wait"
                : "pointer",
            }}
          >
            {loading
              ? "SIGNING IN..."
              : "SIGN IN"}
          </button>

        </form>
      </div>
    </main>
  );
}