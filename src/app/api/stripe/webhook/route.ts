import { NextRequest } from "next/server";
import { stripe } from "@/app/lib/stripe";
import { prisma } from "@/app/lib/prisma";

// save purchase log
export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const userId = session.client_reference_id;
      const bookId = session.metadata?.bookId;

      if (!userId || !bookId) {
        return new Response("Missing required data", { status: 400 });
      }

      const existing = await prisma.purchaseLog.findUnique({
        where: {
          userId_bookId: {
            userId,
            bookId,
          },
        },
      });

      if (!existing) {
        await prisma.purchaseLog.create({
          data: { userId, bookId },
        });
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    // TODO: slack notification for refunding
    return new Response("Webhook error", { status: 400 });
  }
}
