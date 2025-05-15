"use client";

import { useState } from "react";
import PurchasedBookDetails from "./PurchasedBookDetails";
import { BookType } from "../types/types";

type BookWithDate = BookType & { purchaseDate: string };

type Props = {
  books: BookWithDate[];
};

export default function PurchasedBookGrid({ books }: Props) {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const sortedBooks = [...books].sort((a, b) => {
    const dateA = new Date(a.purchaseDate).getTime();
    const dateB = new Date(b.purchaseDate).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <label className="text-sm text-gray-600 mr-2">Sort by:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedBooks.map((book) => (
          <PurchasedBookDetails key={book.id} purchasedBookDetails={book} />
        ))}
      </div>
    </div>
  );
}
