import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-black shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/page01"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              page01
            </Link>
            <Link
              href="/page02"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              page02
            </Link>
            <Link
              href="/page03"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              page03
            </Link>
          </nav>
          <div className="hidden md:flex items-center space-x-5 text-gray-400">
            <button className="hover:text-white transition-colors focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <button className="hover:text-white transition-colors focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            <button className="hover:text-white transition-colors focus:outline-none">
              <svg
                className="w-6 h-6"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 13V13.5H4V13H3ZM11 13V13.5H12V13H11ZM4 13V12.4999H3V13H4ZM6.5 10H8.5V9H6.5V10ZM11 12.4999V13H12V12.4999H11ZM8.5 10C9.88074 10 11 11.1192 11 12.4999H12C12 10.5668 10.433 9 8.5 9V10ZM4 12.4999C4 11.1192 5.11926 10 6.5 10V9C4.56703 9 3 10.5668 3 12.4999H4ZM7.5 3C6.11929 3 5 4.11929 5 5.5H6C6 4.67157 6.67157 4 7.5 4V3ZM10 5.5C10 4.11929 8.88071 3 7.5 3V4C8.32843 4 9 4.67157 9 5.5H10ZM7.5 8C8.88071 8 10 6.88071 10 5.5H9C9 6.32843 8.32843 7 7.5 7V8ZM7.5 7C6.67157 7 6 6.32843 6 5.5H5C5 6.88071 6.11929 8 7.5 8V7ZM7.5 14C3.91015 14 1 11.0899 1 7.5H0C0 11.6421 3.35786 15 7.5 15V14ZM14 7.5C14 11.0899 11.0899 14 7.5 14V15C11.6421 15 15 11.6421 15 7.5H14ZM7.5 1C11.0899 1 14 3.91015 14 7.5H15C15 3.35786 11.6421 0 7.5 0V1ZM7.5 0C3.35786 0 0 3.35786 0 7.5H1C1 3.91015 3.91015 1 7.5 1V0Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
