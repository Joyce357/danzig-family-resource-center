import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Zod validation schema on the server
const contactServerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .min(5, "Email is too short.")
    .max(100, "Email cannot exceed 100 characters."),
  subject: z
    .string()
    .min(1, "Subject selection is required."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message cannot exceed 5000 characters."),
  website: z.string().optional(), // Honeypot
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Zod validation
    const parsed = contactServerSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });

      return NextResponse.json(
        {
          success: false,
          message: "Please correct the highlighted fields.",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message, website } = parsed.data;

    // 2. Honeypot check: silently drop spam
    if (website && website.trim() !== "") {
      // Return a simulated success to the spam bot
      return NextResponse.json(
        {
          success: true,
          message: "Message sent successfully.",
        },
        { status: 200 }
      );
    }

    // 3. Environment Variables check
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      console.error(
        "[API/Contact] Missing configuration environment variables. " +
        `RESEND_API_KEY: ${apiKey ? "SET" : "MISSING"}, ` +
        `CONTACT_TO_EMAIL: ${toEmail ? "SET" : "MISSING"}, ` +
        `CONTACT_FROM_EMAIL: ${fromEmail ? "SET" : "MISSING"}`
      );
      
      return NextResponse.json(
        {
          success: false,
          message: "Contact form is currently misconfigured. Please try again later.",
        },
        { status: 500 }
      );
    }

    // 4. Send email via Resend
    const resend = new Resend(apiKey);
    const subjectLine = `[Danzig Family Resource Center] New Contact Form Message: ${subject}`;

    const emailBody = `
You have received a new message from the Danzig Family Resource Center website contact form.
──────────────────────────────────────────
Name:    ${name}
Email:   ${email}
Subject: ${subject}
──────────────────────────────────────────
Message:
${message}
──────────────────────────────────────────
    `;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: subjectLine,
      text: emailBody,
      replyTo: email,
    });

    if (error) {
      console.error("[API/Contact] Resend API error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Unable to deliver email. Please try again later.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully.",
      },
      { status: 200 }
    );

  } catch (err) {
    console.error("[API/Contact] Internal server error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
