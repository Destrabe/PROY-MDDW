"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Catálogo", href: "/catalog" },
    { name: "Ofertas", href: "/offers" },
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Contacto", href: "/contact" },
  ];
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 w-full">
      <div className="w-full px-6">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center space-x-12">
            <Link
              href="/"
              className="text-black text-xl font-bold font-instrument tracking-tight shrink-0"
            >
              LIMA BASICS
            </Link>
            <nav className="hidden md:flex space-x-8 mt-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`pb-1 text-sm font-medium transition-colors border-b-2 ${
                      isActive
                        ? "text-black border-black"
                        : "text-[#7A7F9A] border-transparent hover:text-black"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-[#7A7F9A]">
            <Link
              href="#"
              className="flex items-center justify-center hover:text-black transition-colors focus:outline-none"
            >
              <svg className="w-5 h-5" fill="currentColor">
                <use href="/sprite.svg#search" />
              </svg>
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center hover:text-black transition-colors focus:outline-none"
            >
              <svg className="w-5 h-5" fill="currentColor">
                <use href="/sprite.svg#cart" />
              </svg>
            </Link>
            <Link
              href="#"
              className="flex items-center justify-center hover:text-black transition-colors focus:outline-none"
            >
              <svg className="w-5 h-5" fill="currentColor">
                <use href="/sprite.svg#user" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
