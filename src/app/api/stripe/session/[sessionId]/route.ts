import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/app/lib/stripe";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const bookId = session.metadata?.bookId;
    const userId = session.client_reference_id;

    if (!userId || !bookId) {
      return NextResponse.json(
        { error: "Missing data from session" },
        { status: 400 }
      );
    }

    const purchase = await prisma.purchaseLog.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });

    if (!purchase) {
      return NextResponse.json(
        { error: "Purchase not found in DB" },
        { status: 404 }
      );
    }

    return NextResponse.json({ bookId }, { status: 200 });
  } catch (err) {
    console.error("Failed to retrieve session or purchase:", err);
    return NextResponse.json(
      { error: "Failed to retrieve Stripe session or purchase" },
      { status: 500 }
    );
  }
}
