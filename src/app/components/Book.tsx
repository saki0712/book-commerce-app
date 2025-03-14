"use client";

import Image from "next/image";
import { BookType } from "../types/types";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PurchaseModal from "./PurchaseModal";

type BookProps = {
  book: BookType;
};

const Book = ({ book }: BookProps) => {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const user = useMemo(() => session?.user, [session]);
  const router = useRouter();

  const handlePurchaseClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handlePurchaseConfirm = () => {
    if (!user) {
      setShowModal(false);
      router.push("/login");
      return;
    }
    // pay by Stripe
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
