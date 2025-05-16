import { getAllBooks } from "./lib/microcms/client";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./lib/next-auth/options";
import BookGrid from "./components/BookGrid";
import { User, Purchase } from "./types/types";
import Slideshow from "./components/Slideshow";

async function getPurchaseBookIds(userId: string): Promise<string[] | null> {
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
    return purchasesData.map((purchaseBook: Purchase) => purchaseBook.bookId);
  } catch (err) {
    console.error("Error fetching purchase data:", err);
    return null;
  }
}

export default async function Home() {
  const { contents } = await getAllBooks();
  const session = await getServerSession(nextAuthOptions);
  const user = (session?.user as User) || null;

  if (user) {
    const purchasedIds = await getPurchaseBookIds(user.id);

    if (purchasedIds === null) {
      return (
        <main className="flex flex-col items-center justify-center mt-32 text-center px-4">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Failed to load your purchase history
          </h2>
          <p className="text-gray-600 max-w-md">
            Please refresh the page or contact support if the problem persists.
          </p>
        </main>
      );
    }

    return (
      <main className="max-w-7xl mx-auto px-4 py-12">
        <Slideshow />
        <h2 className="text-sm text-gray-500 uppercase tracking-widest mb-6">
          Featured Books
        </h2>
        <BookGrid books={contents} user={user} purchasedIds={purchasedIds} />
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <Slideshow />
      <h2 className="text-sm text-gray-500 uppercase tracking-widest mb-6">
        Featured Books
      </h2>
      <BookGrid books={contents} user={user} purchasedIds={[]} />
    </main>
  );
}
