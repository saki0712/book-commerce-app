import { getServerSession } from "next-auth";
import Image from "next/image";
import { nextAuthOptions } from "../lib/next-auth/options";
import { BookType, Purchase, User } from "../types/types";
import { getBookContents } from "../lib/microcms/client";
import PurchasedBookDetails from "../components/PurchasedBookDetails";

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
    const purchasesData = await response.json();
    return purchasesData;
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
      <div className="text-center mt-10 text-gray-600">
        You must be logged in to view your profile.
      </div>
    );
  }

  const purchasesData = await getPurchasesData(user.id);
  if (!purchasesData) {
    return (
      <div className="text-center mt-10 text-red-600">
        Failed to load purchase history. Please try again later.
      </div>
    );
  }

  const purchasedBooksDetails: BookType[] = await Promise.all(
    purchasesData.map((purchase) => getBookContents(purchase.bookId))
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Profile</h1>

      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <Image
            priority
            src={user.image || "/default_icon.png"}
            alt="user profile_icon"
            width={60}
            height={60}
            className="rounded-t-md"
          />
          <h2 className="text-lg ml-4 font-semibold">{user.name}</h2>
        </div>
      </div>

      <span className="font-medium text-lg mb-4 mt-4 block">Your Library</span>
      <div className="flex flex-wrap gap-6">
        {purchasedBooksDetails.map((purchasedBookDetails: BookType) => (
          <PurchasedBookDetails
            key={purchasedBookDetails.id}
            purchasedBookDetails={purchasedBookDetails}
          />
        ))}
      </div>
    </div>
  );
}
