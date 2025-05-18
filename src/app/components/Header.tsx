import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../lib/next-auth/options";
import { User } from "../types/types";

const Header = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;

  return (
    <header className="bg-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="ebook Logo" width={36} height={36} />
          <span className="text-lg font-semibold text-gray-800">ebook</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-green-600 transition-colors duration-200 text-sm"
          >
            Home
          </Link>

          <Link
            href={user ? "/profile" : "/login"}
            className="text-gray-600 hover:text-green-600 transition-colors duration-200 text-sm"
          >
            {user ? "Profile" : "Login"}
          </Link>

          {user && (
            <Link
              href="/api/auth/signout"
              className="text-gray-600 hover:text-red-500 transition-colors duration-200 text-sm"
            >
              Logout
            </Link>
          )}

          <Link href="/profile">
            <Image
              src={user?.image || "/default_icon.png"}
              alt="User Icon"
              width={32}
              height={32}
              className="rounded-full border border-gray-300 hover:scale-105 transition-transform"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
