import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookType } from "../types/types";

type PurchasedBookDetailsProps = {
  purchasedBookDetails: BookType;
};

const PurchasedBookDetails = ({
  purchasedBookDetails,
}: PurchasedBookDetailsProps) => {
  return (
    <Link
      href={`/book/${purchasedBookDetails.id}`}
      className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
    >
      <Image
        priority
        src={purchasedBookDetails.thumbnail.url}
        alt={purchasedBookDetails.title}
        width={450}
        height={350}
        className="rounded-t-md object-cover"
      />
      <div className="px-4 py-4 bg-slate-100 rounded-b-md">
        <h2 className="text-lg font-semibold">{purchasedBookDetails.title}</h2>
        <p className="mt-2 text-md text-slate-700">
          Price: £ {purchasedBookDetails.price}
        </p>
      </div>
    </Link>
  );
};

export default PurchasedBookDetails;
