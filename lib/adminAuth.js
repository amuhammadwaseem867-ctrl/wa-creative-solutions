import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "wa_admin_session";

const SESSION_DURATION =
  7 * 24 * 60 * 60 * 1000;

/**
 * Create a secure admin session token
 */
function createSessionToken(email) {
  const encodedEmail = Buffer.from(
    email,
    "utf8"
  ).toString("base64url");

  const timestamp = Date.now().toString();

  const payload =
    `${encodedEmail}.${timestamp}`;

  const secret =
    process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not configured."
    );
  }

  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  const token = Buffer.from(
    `${encodedEmail}.${timestamp}.${signature}`,
    "utf8"
  ).toString("base64url");

  return token;
}

/**
 * Create admin session cookie
 */
export async function createAdminSession(email) {
  const adminEmail =
    process.env.ADMIN_EMAIL?.trim();

  if (!adminEmail) {
    throw new Error(
      "ADMIN_EMAIL is not configured."
    );
  }

  if (
    email.trim().toLowerCase() !==
    adminEmail.toLowerCase()
  ) {
    throw new Error(
      "Unauthorized admin email."
    );
  }

  const token =
    createSessionToken(
      email.trim()
    );

  const cookieStore =
    await cookies();

  cookieStore.set({
    name: COOKIE_NAME,
    value: token,

    httpOnly: true,

    secure:
      process.env.NODE_ENV ===
      "production",

    sameSite: "lax",

    path: "/",

    maxAge:
      SESSION_DURATION / 1000,
  });

  return true;
}

/**
 * Check whether admin is authenticated
 */
export async function isAdminAuthenticated() {
  try {
    const cookieStore =
      await cookies();

    const token =
      cookieStore.get(
        COOKIE_NAME
      )?.value;

    if (!token) {
      return false;
    }

    const decoded =
      Buffer.from(
        token,
        "base64url"
      ).toString("utf8");

    const parts =
      decoded.split(".");

    if (parts.length !== 3) {
      return false;
    }

    const [
      encodedEmail,
      timestamp,
      signature,
    ] = parts;

    const secret =
      process.env.ADMIN_SESSION_SECRET;

    const adminEmail =
      process.env.ADMIN_EMAIL?.trim();

    if (!secret || !adminEmail) {
      return false;
    }

    const email =
      Buffer.from(
        encodedEmail,
        "base64url"
      ).toString("utf8");

    const payload =
      `${encodedEmail}.${timestamp}`;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          secret
        )
        .update(payload)
        .digest("hex");

    if (
      signature.length !==
      expectedSignature.length
    ) {
      return false;
    }

    const signatureBuffer =
      Buffer.from(signature, "utf8");

    const expectedBuffer =
      Buffer.from(
        expectedSignature,
        "utf8"
      );

    if (
      !crypto.timingSafeEqual(
        signatureBuffer,
        expectedBuffer
      )
    ) {
      return false;
    }

    const timestampNumber =
      Number(timestamp);

    if (
      !Number.isFinite(
        timestampNumber
      )
    ) {
      return false;
    }

    const age =
      Date.now() -
      timestampNumber;

    if (
      age < 0 ||
      age > SESSION_DURATION
    ) {
      return false;
    }

    if (
      email.trim().toLowerCase() !==
      adminEmail.toLowerCase()
    ) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(
      "ADMIN AUTH ERROR:",
      error
    );

    return false;
  }
}

/**
 * Logout admin
 */
export async function clearAdminSession() {
  const cookieStore =
    await cookies();

  cookieStore.delete(
    COOKIE_NAME
  );

  return true;
}