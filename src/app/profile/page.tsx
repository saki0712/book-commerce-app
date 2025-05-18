import { getServerSession } from "next-auth";
import Image from "next/image";
import { nextAuthOptions } from "../lib/next-auth/options";
import { Purchase, User } from "../types/types";
import { getBookContents } from "../lib/microcms/client";
import PurchasedBookGrid from "../components/PurchasedBookGrid";

async function getPurchasesData(userId: string): Promise<Purchase[] | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${userId}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      console.error("Failed to fetch purchases");
      return null;
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching purchase data:", err);
    return null;
  }
}

export default async function ProfilePage() {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;

  if (!user) {
    return (
      <div className="text-center mt-32 text-gray-500 text-sm">
        You must be logged in to view your profile.
      </div>
    );
  }

  const purchasesData = await getPurchasesData(user.id);
  if (purchasesData === null) {
    return (
      <div className="text-center mt-32 text-red-500">
        Failed to load your purchase history. Please try again later.
      </div>
    );
  }

  const purchasedBooksDetails = await Promise.all(
    purchasesData.map(async (purchase) => {
      try {
        const book = await getBookContents(purchase.bookId);
        return {
          ...book,
          purchaseDate: purchase.createdAt,
        };
      } catch {
        return null;
      }
    })
  );
  const validBooks = purchasedBooksDetails.filter((book) => book !== null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-gray-800">
      <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-6 mb-12">
        <Image
          src={user.image || "/default_icon.png"}
          alt="User avatar"
          width={72}
          height={72}
          className="rounded-full border border-gray-300"
        />
        <div>
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Your Library
        </h2>
        <span className="text-sm text-gray-400">
          {purchasedBooksDetails.length} books
        </span>
      </div>

      {purchasedBooksDetails.length !== validBooks.length && (
        <p className="text-sm text-red-400 mb-4">
          Some purchased books are no longer available. Contact support if you
          need help.
        </p>
      )}

      <PurchasedBookGrid books={validBooks} />
    </div>
  );
}
