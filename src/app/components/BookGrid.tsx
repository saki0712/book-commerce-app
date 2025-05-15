"use client";

import { useState } from "react";
import Book from "./Book";
import { BookType, User } from "../types/types";

type Props = {
  books: BookType[];
  user: User | null;
  purchasedIds: string[];
};

export default function BookGrid({ books, user, purchasedIds }: Props) {
  const [sortBy, setSortBy] = useState<"price" | "date">("price");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedBooks = [...books].sort((a, b) => {
    if (sortBy === "price") {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    } else {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }
  });

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-end mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "price" | "date")}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="price">Price</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Order:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {sortBy === "price" ? (
              <>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </>
            ) : (
              <>
                <option value="desc">Newest</option>
                <option value="asc">Oldest</option>
              </>
            )}
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedBooks.map((book) => (
          <Book
            key={book.id}
            book={book}
            user={user!}
            isPurchased={purchasedIds.includes(book.id)}
          />
        ))}
      </div>
    </>
  );
}
