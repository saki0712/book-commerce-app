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

      if (data && data.checkout_url) {
        router.push(data.checkout_url);
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const handlePurchaseClick = () => {
    if (!isPurchased) {
      setShowModal(true);
      return;
    }
    alert("You already own this book.");
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handlePurchaseConfirm = () => {
    setShowModal(false);
    if (!user) {
      alert("You need to log in to continue.");
      router.push("/login");
      return;
    }
    startCheckout();
  };

  return (
    <>
      <div className="flex flex-col items-center m-4">
        <button
          onClick={handlePurchaseClick}
          className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
        >
          <div className="relative w-[300px] h-[200px]">
            <Image
              priority
              src={book.thumbnail.url}
              alt={book.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-t-md"
            />
          </div>
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="mt-2 text-lg text-slate-600">This book is ...</p>
            <p className="mt-2 text-md text-slate-700">Price: £ {book.price}</p>
          </div>
        </button>

        {showModal && (
          <PurchaseModal
            book={book}
            onCancel={handleCancel}
            onConfirm={handlePurchaseConfirm}
          />
        )}
      </div>
    </>
  );
};

export default Book;
