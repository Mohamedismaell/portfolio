import { NextResponse } from "next/server";

const MESSAGE =
  "This endpoint is disabled. The contact form now submits directly to Web3Forms from the client.";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: MESSAGE,
    },
    { status: 410 },
  );
}

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: MESSAGE,
    },
    { status: 410 },
  );
}