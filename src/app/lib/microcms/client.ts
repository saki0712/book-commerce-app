import { BookType } from "@/app/types/types";
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
});

export const getAllBooks = async () => {
  const allBooks = await client.getList<BookType>({
    endpoint: "ebook",
    customRequestInit: {
      cache: "no-store",
    },
  });
  return allBooks;
};

export const getBookContents = async (contentId: string) => {
  const bookContents = await client.getListDetail<BookType>({
    endpoint: "ebook",
    contentId,
    customRequestInit: {
      cache: "no-store",
    },
  });
  return bookContents;
};
