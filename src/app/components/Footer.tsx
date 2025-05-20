import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-16 text-gray-600 text-sm pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-t border-gray-200 mb-8" />

        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <div className="flex mb-3">
              <Image src="/logo.png" alt="logo" width={28} height={28} />
              <span className="ml-2 font-semibold text-lg text-gray-800">
                ebook
              </span>
            </div>
            <p className="text-gray-400 max-w-md text-[15px] leading-relaxed">
              A clean, full-stack digital bookstore built with modern tools.
              Browse, purchase, and grow your personal library with ease.
            </p>
            <div className="flex gap-4 mt-4 text-xl text-gray-500">
              <a
                href="https://github.com/saki0712"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/sakitanaka"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="text-gray-800 font-semibold mb-2">Links</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/">Home</Link>
                </li>
                {/* <li>
                  <Link href="https://.com/" target="_blank">
                    Portfolio
                  </Link>
                </li> */}
              </ul>
            </div>
            <div>
              <h3 className="text-gray-800 font-semibold mb-2">Contact</h3>
              <ul className="space-y-1">
                <li>
                  <a href="mailto:saki.tanaka.7123@gmail.com">Email</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-800 font-semibold mb-2">Social</h3>
              <ul className="space-y-1">
                <li>
                  <a href="https://github.com/saki0712">Github</a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/sakitanaka">LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
