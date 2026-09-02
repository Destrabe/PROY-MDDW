import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      {/* Fondo cambiado a blanco e íconos/textos a oscuros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 flex items-center">
            <Link href="/" className="text-black text-xl font-instrument font-bold">
              LIMA BASICS
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/page01"
              className="text-gray-600 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              page01
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Contacto
            </Link>
            <Link
              href="/page03"
              className="text-gray-600 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              page03
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-5 text-gray-600">
            <button className="hover:text-black transition-colors focus:outline-none">
              xd
            </button>

            <button className="hover:text-black transition-colors focus:outline-none">
              <svg className="w-6 h-6" fill="currentColor">
                <use href="/sprite.svg#cart" />
              </svg>
            </button>

            <button className="hover:text-white transition-colors focus:outline-none">
              <svg className="w-6 h-6" fill="currentColor">
                <use href="/sprite.svg#user" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}