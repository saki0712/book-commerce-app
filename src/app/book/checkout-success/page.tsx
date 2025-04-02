"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";

const PurchaseSuccess = () => {
  const [bookUrl, setBookUrl] = useState(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    let attempts = 0;
    const maxAttempts = 5;
    const retryDelay = 3000;

    const poll = async () => {
      try {
        const res = await fetch(`/api/stripe/session/${sessionId}`);
        const data = await res.json();

        if (res.ok) {
          setBookUrl(data.bookId);
          setStatus("success");
        } else {
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(poll, retryDelay);
          } else {
            setStatus("error");
          }
        }
      } catch (err) {
        console.error("Failed to confirm purchase:", err);
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, retryDelay);
        } else {
          setStatus("error");
        }
      }
    };

    poll();
  }, [sessionId]);

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {status === "loading" && (
          <>
            <div className="flex justify-center">
              <FaSpinner className="fa-2x text-gray-500 animate-spin mb-4 text-5xl" />
            </div>
            <h2 className="text-lg font-semibold text-center text-gray-700">
              Confirming your purchase, please wait...
            </h2>
          </>
        )}

        {status === "success" && (
          <>
            <div className="flex justify-center mb-5">
              <FaRegCircleCheck className="text-emerald-500 text-7xl" />
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
              THANK YOU FOR YOUR PURCHASE!
            </h1>
            <p className="text-center text-gray-600">
              We will email you an order confirmation with details.
            </p>
            <div className="mt-7 flex flex-col items-center gap-4">
              <button
                disabled={!bookUrl}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => router.push(`/book/${bookUrl}`)}
              >
                {bookUrl ? "Start Reading Your Book" : "Loading..."}
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => router.push("/")}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}

        {status === "error" && (
          <div className="text-center text-red-600 mt-4">
            <h2 className="text-xl font-semibold mb-2">
              We couldn't confirm your purchase
            </h2>
            <p className="text-base mb-4">
              If you’ve been charged, please contact our support team.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => router.push("/")}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseSuccess;
