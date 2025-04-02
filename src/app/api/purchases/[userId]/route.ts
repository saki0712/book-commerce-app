import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// get purchases log
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = await params;
  try {
    const purchases = await prisma.purchaseLog.findMany({
      where: { userId: userId },
    });
    return NextResponse.json(purchases, { status: 200 });
  } catch (err) {
    console.error("Failed to retrieve purchases:", err);
    return NextResponse.json(
      { error: "Failed to retrieve purchases" },
      { status: 500 }
    );
  }
}
