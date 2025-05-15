"use client";

import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Login() {
  const [providers, setProviders] = useState<Awaited<
    ReturnType<typeof getProviders>
  > | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-sm w-full space-y-8 bg-white p-6 rounded-xl shadow-md">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <Image
              src="/logo.png"
              alt="Book Commerce Logo"
              width={36}
              height={36}
            />
            <span className="ml-2 text-lg font-semibold text-gray-800">
              ebook
            </span>
          </div>

          <h1 className="text-xl font-semibold text-gray-800">
            Log in to your account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Please choose a provider to continue
          </p>
        </div>

        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.id} className="mt-6">
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md w-full flex items-center justify-center transition duration-150"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                >
                  <title>GitHub icon</title>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.723-4.042-1.608-4.042-1.608-.546-1.386-1.332-1.754-1.332-1.754-1.087-.743.083-.728.083-.728 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.42-1.305.763-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.956-.266 1.98-.398 3-.403 1.02.005 2.044.137 3 .403 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.768.838 1.234 1.91 1.234 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.824 1.102.824 2.222 0 1.604-.015 2.897-.015 3.29 0 .322.216.697.825.577C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Continue with GitHub
              </button>
            </div>
          ))}
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Login;
