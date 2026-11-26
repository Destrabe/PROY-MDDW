"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginModal from "./loginModal";
import RegisterModal from "./registerModal";
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [user, setUser] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Catálogo", href: "/catalog" },
    { name: "Ofertas", href: "/offers" },
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Contacto", href: "/contact" },
  ];

  const handleOpenLogin = () => {
    setActiveModal("login");
    setIsMobileMenuOpen(false);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsUserMenuOpen(false);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  const userInitial = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : "U";

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
                <svg className="w-5 h-5">
                  <use href="/sprite.svg#search" />
                </svg>
              </Link>
              <Link
                href="#"
                className="flex items-center justify-center hover:text-black transition-colors focus:outline-none"
              >
                <svg className="w-5 h-5">
                  <use href="/sprite.svg#cart" />
                </svg>
              </Link>
              {user ? (
                <div className="relative hidden md:block" ref={dropdownRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2563eb] text-white font-bold text-sm focus:outline-none hover:bg-blue-700 transition-colors"
                  >
                    {userInitial}
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-[#eef0f2] md:bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">
                          Hola, {user.displayName || "Usuario"}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {user.email}
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <svg
                            className="w-4 h-4 mr-3 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            ></path>
                          </svg>
                          Mi perfil
                        </Link>
                        <Link
                          href="/favorites"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <svg
                            className="w-4 h-4 mr-3 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            ></path>
                          </svg>
                          Favoritos
                        </Link>
                      </div>

                      <div className="border-t border-gray-200 py-1">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left"
                        >
                          <svg
                            className="w-4 h-4 mr-3 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            ></path>
                          </svg>
                          Cerrar sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleOpenLogin}
                  className="hidden md:flex items-center justify-center hover:text-black transition-colors focus:outline-none p-0 m-0 border-none bg-transparent"
                >
                  <svg className="w-5 h-5">
                    <use href="/sprite.svg#user" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex md:hidden items-center justify-center text-black hover:text-[#7A7F9A] transition-colors focus:outline-none p-0 m-0 border-none bg-transparent"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-5 h-5">
                    <use href="/sprite.svg#close" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5">
                    <use href="/sprite.svg#menu" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#f8f9fa] md:bg-white w-full border-t border-gray-100 absolute left-0 top-14 shadow-lg">
            <nav className="flex flex-col px-6 pt-4 pb-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm text-[#4a4d5e] hover:text-black transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="w-full h-px bg-gray-200 shrink-0 my-3"></div>

              {user ? (
                <div className="flex flex-col space-y-3">
                  <div className="text-sm text-[#4a4d5e]">
                    Hola,{" "}
                    <span className="font-bold text-black">
                      {user.displayName || "Usuario"}
                    </span>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm text-[#4a4d5e] hover:text-black transition-colors"
                  >
                    Mi perfil
                  </Link>

                  <Link
                    href="/favorites"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm text-[#4a4d5e] hover:text-black transition-colors"
                  >
                    Favoritos
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-left text-sm text-[#4a4d5e] hover:text-black transition-colors bg-transparent border-none p-0 m-0"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleOpenLogin}
                  className="text-left text-sm text-[#4a4d5e] hover:text-black transition-colors bg-transparent border-none p-0 m-0"
                >
                  Iniciar sesión / Registrarse
                </button>
              )}
            </nav>
          </div>
        )}
      </header>
      {activeModal === "login" && (
        <LoginModal
          onClose={closeModal}
          onSwitchToRegister={() => setActiveModal("register")}
        />
      )}
      {activeModal === "register" && (
        <RegisterModal
          onClose={closeModal}
          onSwitchToLogin={() => setActiveModal("login")}
        />
      )}
    </>
  );
}
