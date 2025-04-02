import { getServerSession } from "next-auth";
import Book from "./components/Book";
import { getAllBooks } from "./lib/microcms/client";
import { BookType, Purchase, User } from "./types/types";
import { nextAuthOptions } from "./lib/next-auth/options";

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
  const user = session?.user as User;

  if (user) {
    const purchaseBookIds = await getPurchaseBookIds(user.id);

    if (purchaseBookIds === null) {
      return (
        <main className="flex flex-col items-center justify-center mt-32 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Failed to load your purchase history
          </h2>
          <p className="text-gray-700">
            Please refresh the page or contact support if the problem persists.
          </p>
        </main>
      );
    }

    return (
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {contents.map((book: BookType) => (
          <Book
            key={book.id}
            book={book}
            isPurchased={purchaseBookIds.includes(book.id)}
          />
        ))}
      </main>
    );
  }

  return (
    <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
      <h2 className="text-center w-full font-bold text-3xl mb-2">
        Book Commerce
      </h2>
      {contents.map((book: BookType) => (
        <Book key={book.id} book={book} isPurchased={false} />
      ))}
    </main>
  );
}
