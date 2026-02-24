import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter
const rateMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5; // max submissions
const RATE_WINDOW = 60 * 60 * 1000; // per hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Try to send email via Nodemailer (if configured)
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (gmailUser && gmailPass) {
      const nodemailer = await import("nodemailer");

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      });

      const htmlBody = `
        <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <div style="border-bottom: 2px solid #B87A5E; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="color: #2C2420; font-size: 20px; margin: 0;">New Consultation Inquiry</h1>
            <p style="color: #9B8E82; font-size: 13px; margin: 4px 0 0;">via Plastic Love (plasticluv.com)</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #E2DBD3;">
              <td style="padding: 10px 0; color: #9B8E82; width: 130px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; color: #2C2420; font-weight: 500;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E2DBD3;">
              <td style="padding: 10px 0; color: #9B8E82; vertical-align: top;">Email</td>
              <td style="padding: 10px 0; color: #2C2420;"><a href="mailto:${email}" style="color: #B87A5E;">${email}</a></td>
            </tr>
            ${phone ? `<tr style="border-bottom: 1px solid #E2DBD3;">
              <td style="padding: 10px 0; color: #9B8E82; vertical-align: top;">Phone</td>
              <td style="padding: 10px 0; color: #2C2420;">${phone}</td>
            </tr>` : ""}
            ${service ? `<tr style="border-bottom: 1px solid #E2DBD3;">
              <td style="padding: 10px 0; color: #9B8E82; vertical-align: top;">Service</td>
              <td style="padding: 10px 0; color: #2C2420;">${service}</td>
            </tr>` : ""}
          </table>

          <div style="margin-top: 20px; padding: 16px; background: #F5F0EB; border-radius: 12px;">
            <p style="color: #9B8E82; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px;">Message</p>
            <p style="color: #2C2420; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="color: #9B8E82; font-size: 11px; margin-top: 24px; text-align: center;">
            This inquiry was submitted through the Plastic Love contact form.
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: `"Plastic Love" <${gmailUser}>`,
        to: "popokorea89@gmail.com",
        replyTo: email,
        subject: `Consultation Inquiry from ${name}${service ? ` — ${service}` : ""}`,
        html: htmlBody,
      });
    } else {
      // If email not configured, log to console (useful for development)
      console.log("=== NEW CONSULTATION INQUIRY ===");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Phone:", phone || "—");
      console.log("Service:", service || "—");
      console.log("Message:", message);
      console.log("================================");
      console.log("Note: Set GMAIL_USER and GMAIL_APP_PASSWORD env vars to enable email delivery.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry." },
      { status: 500 }
    );
  }
}
