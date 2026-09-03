"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HamburgerMenu from "./hamburgerMenu";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Catálogo", href: "/catalog" },
    { name: "Ofertas", href: "/offers" },
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Contacto", href: "/contact" },
  ];

  return (
    <>
      <div className="h-14 w-full shrink-0"></div>
      <header className="bg-white border-b border-gray-100 fixed top-0 left-0 z-50 w-full">
        <div className="w-full px-6">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-12">
              <Link
                href="/"
                className="text-black text-xl font-bold font-instrument tracking-tight shrink-0 select-none"
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
            <div className="flex items-center gap-6 text-[#7A7F9A]">
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
                className="hidden md:flex items-center justify-center hover:text-black transition-colors focus:outline-none"
              >
                <svg className="w-5 h-5" fill="currentColor">
                  <use href="/sprite.svg#user" />
                </svg>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex md:hidden items-center justify-center hover:text-black transition-colors focus:outline-none p-0 m-0 border-none bg-transparent"
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="w-5 h-5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <div className="w-5 h-5">
                    <HamburgerMenu />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white w-full border-t border-gray-100 absolute left-0 top-14 shadow-lg h-66.5">
            <nav className="flex flex-col h-full px-6 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-1 items-center text-sm text-[#4a4d5e] hover:text-black transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="w-full h-px bg-gray-100 shrink-0 my-1"></div>
              <Link
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex flex-1 items-center text-sm text-[#4a4d5e] hover:text-black transition-colors"
              >
                Iniciar sesión / Registrarse
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
