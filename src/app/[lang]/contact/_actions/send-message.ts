"use server";

import { headers } from "next/headers";
import { resend } from "@/lib/resend";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { buildContactEmailHtml } from "@/lib/email-templates/contact-notification";

export type SendMessageResult =
  | { success: true; error?: never }
  | { success?: never; error: string };

// In-memory rate limiting (resets on server restart)
// In production, consider using Redis or a database
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes in ms
const RATE_LIMIT_MAX = 5; // max 5 submissions per window

async function getRateLimitKey(): Promise<string> {
  const headersList = await headers();
  const forwarded = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  const ip = forwarded?.split(",")[0] || realIp || "unknown";
  return ip;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(key) || [];

  // Remove timestamps outside the window
  const validTimestamps = timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (validTimestamps.length >= RATE_LIMIT_MAX) {
    return false; // Rate limit exceeded
  }

  // Add current timestamp
  validTimestamps.push(now);
  rateLimitMap.set(key, validTimestamps);

  return true;
}

export async function sendMessage(
  data: ContactFormData
): Promise<SendMessageResult> {
  try {
    // 1. Honeypot check (silent success for bots)
    if (data.website && data.website.length > 0) {
      return { success: true };
    }

    // 2. Server-side validation
    const validation = contactSchema.safeParse(data);
    if (!validation.success) {
      const firstError = validation.error.issues?.[0];
      return {
        error: firstError?.message || "Invalid form data",
      };
    }

    // 3. Rate limiting
    const rateLimitKey = await getRateLimitKey();
    if (!checkRateLimit(rateLimitKey)) {
      return {
        error:
          "Prea multe cereri. Te rugam sa astepti cateva minute inainte sa incerci din nou.",
      };
    }

    // 4. Prepare email content
    const validData = validation.data;
    const emailHtml = buildContactEmailHtml({
      name: validData.name,
      email: validData.email,
      phone: validData.phone,
      company: validData.company,
      service: validData.service,
      budget: validData.budget,
      message: validData.message,
    });

    const subject = `[Rammer Tech] Mesaj nou de la ${validData.name}`;

    
    // 5. Send email via Resend
    const { error: resendError } = await resend.emails.send({
      from: "Rammer Tech <office@mail.rammertech.ro>",
      to: process.env.CONTACT_EMAIL_TO || "office@rammertech.ro",
      replyTo: validData.email,
      subject,
      html: emailHtml,
    });

    if (resendError) {
      console.error("Resend error:", resendError);
      return {
        error:
          "A aparut o eroare la trimiterea mesajului. Te rugam sa incerci din nou.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Server action error:", error);
    return {
      error:
        "A aparut o eroare neasteptata. Te rugam sa incerci din nou mai tarziu.",
    };
  }
}
