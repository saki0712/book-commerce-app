import { getBookContents } from "@/app/lib/microcms/client";
import Image from "next/image";
import React from "react";

const BookContents = async ({ params }: { params: { bookId: string } }) => {
  try {
    const { bookId } = await params;
    const book = await getBookContents(bookId);
    if (!book) {
      return <p className="text-center text-gray-500">Book not found</p>;
    }
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src={book.thumbnail.url}
            alt={book.title}
            className="w-full h-80 object-cover object-center"
            width={700}
            height={700}
            priority
          />
          <div className="p-4">
            <h2 className="text-2xl font-bold">{book.title}</h2>
            <div
              className="text-gray-700 mt-2"
              dangerouslySetInnerHTML={{ __html: book.content }}
            />

            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                Published on:{" "}
                {
                  new Date(String(book.publishedAt))
                    .toLocaleDateString("en-GB")
                    .split("T")[0]
                }
              </span>
              <span className="text-sm text-gray-500">
                Last updated:{" "}
                {
                  new Date(String(book.updatedAt))
                    .toLocaleDateString("en-GB")
                    .split("T")[0]
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.error("Failed to fetch book contents:", err);
    return (
      <p className="text-center text-red-500">Error loading book contents</p>
    );
  }
};

export default BookContents;
