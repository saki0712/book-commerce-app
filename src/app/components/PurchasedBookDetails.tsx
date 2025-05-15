import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookType } from "../types/types";

type Props = {
  purchasedBookDetails: BookType;
};

const PurchasedBookDetails = ({ purchasedBookDetails }: Props) => {
  return (
    <Link
      href={`/book/${purchasedBookDetails.id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative w-full h-[220px]">
        <Image
          src={purchasedBookDetails.thumbnail.url}
          alt={purchasedBookDetails.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <p className="text-base font-semibold text-gray-800 truncate">
          {purchasedBookDetails.title}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          £ {purchasedBookDetails.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default PurchasedBookDetails;
