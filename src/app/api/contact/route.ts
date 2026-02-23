import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";


const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    services: z.string().min(1),
    message: z.string().min(5),
    website: z.string().optional(),
});


const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();

const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 1000;

export async function POST(req: Request) {
    console.log("POST /api/contact HIT");

    try {
        const ip =
            req.headers.get("x-forwarded-for") ||
            req.headers.get("x-real-ip") ||
            "unknown";

        console.log("IP:", ip);

        const now = Date.now();
        const record = rateLimitMap.get(ip);

        if (record) {
            if (now - record.lastRequest < WINDOW_MS) {
                if (record.count >= RATE_LIMIT) {
                    console.log("Rate limit exceeded");
                    return NextResponse.json(
                        { error: "Too many requests. Try again later." },
                        { status: 429 }
                    );
                }
                record.count += 1;
                record.lastRequest = now;
            } else {
                rateLimitMap.set(ip, { count: 1, lastRequest: now });
            }
        } else {
            rateLimitMap.set(ip, { count: 1, lastRequest: now });
        }

        const body = await req.json();
        console.log("Request body:", body);

        if (body.website) {
            console.log("Honeypot triggered");
            return NextResponse.json({ success: true });
        }

        const parsed = schema.safeParse(body);

        if (!parsed.success) {
            // ✅ Log exact field errors during development
            console.error("Zod validation errors:", parsed.error.flatten().fieldErrors);
            return NextResponse.json(
                {
                    error: "Invalid form data",
                    ...(process.env.NODE_ENV === "development" && {
                        fields: parsed.error.flatten().fieldErrors,
                    }),
                },
                { status: 400 }
            );
        }

        const { name, email, phone, services, message } = parsed.data;

        console.log("Sending email to owner...");

        const ownerResult = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: "mohamed.ismael.dev@outlook.com",
            subject: `New Inquiry from ${name}`,
            html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Services:</strong> ${services}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        console.log("Owner email result:", ownerResult);

        console.log("Sending auto-reply...");

        const autoReplyResult = await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: email,
            subject: "Received Your Inquiry",
            html: `
        <p>Hi ${name},</p>
        <p>Your message has been received. I will respond shortly.</p>
        <p>— Mohamed</p>
      `,
        });

        console.log("Auto-reply result:", autoReplyResult);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Email error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function GET() {
    console.log("GET /api/contact HIT");

    try {
        const result = await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: "mohamed.ismael.dev@outlook.com",
            subject: "Direct Test Email",
            html: "<p>This is a direct Resend test.</p>",
        });

        console.log("Direct test result:", result);

        return NextResponse.json({ result });
    } catch (error) {
        console.error("Direct test error:", error);
        return NextResponse.json(
            { error: "Direct test failed" },
            { status: 500 }
        );
    }
}
