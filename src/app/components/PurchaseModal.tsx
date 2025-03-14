import { BookType } from "../types/types";
import Image from "next/image";

type PurchaseModalProps = {
  book: BookType;
  onCancel: () => void;
  onConfirm: () => void;
};

const PurchaseModal = ({ book, onCancel, onConfirm }: PurchaseModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white pt-10 pb-8 px-10 rounded-lg shadow-lg border border-gray-300 w-[500px] h-auto relative">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="flex flex-col items-center">
          <div className="relative w-[250px] h-[180px] mb-4 flex items-center justify-center rounded-md">
            <Image
              src={book.thumbnail.url}
              alt={book.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-md object-contain"
            />
          </div>

          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">{book.title}</h2>
            <p className="text-gray-600 text-sm">Price: £ {book.price}</p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded w-full max-w-[450px]"
          >
            Proceed to check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
