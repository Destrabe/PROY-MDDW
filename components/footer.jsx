import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full font-sans relative">
      <div className="bg-[#0f0f0f] w-full text-gray-400">
        <div className="w-full max-w-360 mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight font-instrument select-none">
                LIMA BASICS
              </h3>
              <p className="text-sm text-gray-400 mb-8 leading-relaxed pr-4">
                Moda urbana y contemporánea hecha para el día a día limeño.
                <br />
                Calidad pima, diseño local, precio justo.
              </p>
              <div className="mb-6">
                <h4 className="text-[10px] font-semibold text-gray-500 tracking-widest uppercase mb-3">
                  Pagos seguros con
                </h4>
                <div className="bg-[#003087] w-fit rounded flex items-center justify-center px-4 py-2.5 mb-2">
                  <svg className="w-5 h-5">
                    <use href="/sprite.svg#paypal" />
                  </svg>
                  <span className="text-white font-bold italic text-sm tracking-wide">
                    PayPal
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Pago 100% seguro · Sin datos de tarjeta
                </p>
              </div>
              <div className="flex gap-4 text-sm">
                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-gray-600 underline-offset-4 hover:text-white transition-colors"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-gray-600 underline-offset-4 hover:text-white transition-colors"
                >
                  TikTok
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-[11px] font-semibold text-gray-500 tracking-widest uppercase mb-6">
                TIENDA
              </h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Catálogo completo
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Novedades
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Esenciales
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Outerwear
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Bottoms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] font-semibold text-gray-500 tracking-widest uppercase mb-6">
                AYUDA
              </h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Guía de tallas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Envíos y plazos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Devoluciones
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Garantía
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Preguntas frecuentes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] font-semibold text-gray-500 tracking-widest uppercase mb-6">
                CONTACTO
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#d93a64]" fill="currentColor">
                    <use href="/sprite.svg#location" />
                  </svg>
                  <span>Av. Larco 821, Miraflores</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#d93a64]" fill="currentColor">
                    <use href="/sprite.svg#phone" />
                  </svg>
                  <span>+51 963 228 979</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-[#d93a64]" fill="currentColor">
                    <use href="/sprite.svg#mail" />
                  </svg>
                  <span>limabasics@gmail.com</span>
                </li>
                <li className="flex items-center gap-3 pt-2">
                  <svg className="w-6 h-6 text-[#d93a64]" fill="currentColor">
                    <use href="/sprite.svg#clock" />
                  </svg>
                  <span>Lun-Vie 9:00–19:00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full max-w-360 mx-auto px-6 lg:px-12">
          <div className="border-t border-[#222222] py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
            <p>© 2024 Lima Basics SAC · RUC 20601234567</p>
            <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
              <Link href="#" className="hover:text-white transition-colors">
                Términos y condiciones
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacidad
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Libro de reclamaciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
