"use client";

import Image from "next/image";
import { BookType, User } from "../types/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PurchaseModal from "./PurchaseModal";

type BookProps = {
  book: BookType;
  isPurchased: boolean;
  user: User;
};

const Book = ({ book, isPurchased, user }: BookProps) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const isNew = (publishedAt: string) => {
    const publishedDate = new Date(publishedAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return publishedDate > sevenDaysAgo;
  };

  const startCheckout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: book.title,
            price: Math.round(book.price * 100),
            userId: user?.id,
            bookId: book.id,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.error("Checkout failed:", data.error);
        alert("Failed to start checkout");
        return;
      }
      if (data?.checkout_url) {
        router.push(data.checkout_url);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const handlePurchaseClick = () => {
    if (isPurchased) {
      alert("You already own this book.");
      return;
    }
    setShowModal(true);
  };

  const handleCancel = () => setShowModal(false);
  const handlePurchaseConfirm = () => {
    setShowModal(false);
    if (!user) {
      router.push("/login");
      return;
    }
    startCheckout();
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative w-full h-[220px]">
          {isNew(book.createdAt) && (
            <span className="absolute top-2 left-2 z-10 bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
              NEW
            </span>
          )}
          <Image
            src={book.thumbnail.url}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className="p-4 flex flex-col justify-between gap-2">
          <h3 className="text-base font-semibold text-gray-800 truncate">
            {book.title}
          </h3>

          <p className="text-sm text-gray-500">£ {book.price.toFixed(2)}</p>

          <button
            onClick={handlePurchaseClick}
            className={`mt-2 w-full py-2 text-sm font-medium rounded-md transition-colors
              ${
                isPurchased
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            disabled={isPurchased}
          >
            {isPurchased ? "Purchased" : "Buy"}
          </button>
        </div>
      </div>

      {showModal && (
        <PurchaseModal
          book={book}
          onCancel={handleCancel}
          onConfirm={handlePurchaseConfirm}
        />
      )}
    </>
  );
};

export default Book;
