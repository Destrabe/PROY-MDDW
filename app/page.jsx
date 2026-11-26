"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function HomePage() {
  const [emailSuscripcion, setEmailSuscripcion] = useState("");
  const [suscrito, setSuscrito] = useState(false);

  const manejarSuscripcion = (e) => {
    e.preventDefault();
    if (!emailSuscripcion.trim()) return;
    setSuscrito(true);
    setEmailSuscripcion("");
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-sans antialiased flex flex-col min-h-screen">
      {/* <Header /> */}

      <main className="grow">
        {/* ================= HERO PRINCIPAL ================= */}
        <section className="relative w-full min-h-[calc(100dvh-65px)] lg:min-h-[calc(100dvh-71px)] bg-gray-900 flex items-center py-12">
          <img
            src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Lima Basics Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />

          <div className="relative z-10 px-6 md:px-12 w-full max-w-7xl mx-auto">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-0.5 bg-white"></div>
              <span className="text-white font-semibold tracking-[0.2em] text-sm">
                LIMA · PERÚ · 2026
              </span>
            </div>

            <h1 className="text-white font-black uppercase leading-[0.85] tracking-tighter mb-8 text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem]">
              <span className="block text-blue-600">LO BÁSICO,</span>
              <span className="block">ELEVADO.</span>
            </h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-8">
              <Link
                href="/catalog"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 flex items-center transition-all rounded-sm"
              >
                EXPLORAR COLECCIÓN <i className="fas fa-arrow-right ml-3"></i>
              </Link>
              <p className="text-gray-300 text-sm max-w-xs border-l border-gray-600 pl-4">
                Algodón pima peruano · Diseño contemporáneo · Hecho para Lima
              </p>
            </div>
          </div>
        </section>

        {/* ================= NUESTRA FILOSOFÍA ================= */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4 block">
                Nuestra filosofía
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                Ropa pensada
                <br />
                para el ritmo
                <br />
                <span className="text-blue-600">de Lima.</span>
              </h2>
            </div>
            <div className="space-y-6 text-gray-600">
              <p className="text-xl font-medium text-gray-900 leading-relaxed">
                Lima Basics nace de entender que la moda urbana local necesita
                su propia identidad. No seguimos tendencias importadas —
                construimos las nuestras desde el centro histórico hasta
                Miraflores.
              </p>
              <p className="text-sm leading-relaxed text-gray-500">
                Cada pieza está confeccionada con algodón pima peruano de
                primera calidad, diseñada para durar y adaptarse a los
                distintos momentos del día limeño.
              </p>
              <div className="pt-4">
                <Link
                  href="/catalog"
                  className="inline-flex items-center font-bold text-gray-900 border-b-2 border-gray-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors"
                >
                  Ver el catálogo completo
                  <i className="fas fa-arrow-right ml-2 text-sm"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TARJETAS DE CATEGORÍAS ================= */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Categoría 1: Esenciales */}
            <Link
              href="/catalog"
              className="relative group overflow-hidden bg-gray-100 aspect-4/5 rounded-sm cursor-pointer shadow-sm block"
            >
              <img
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Esenciales"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0f1115]/90 via-[#0f1115]/20 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                <span className="text-[10px] font-bold tracking-widest uppercase mb-2 block">
                  Categoría
                </span>
                <h3 className="text-3xl font-black tracking-tighter mb-1">
                  Esenciales
                </h3>
                <p className="text-sm text-gray-300 mb-4">Polos · Tees · Básicos</p>
                <span className="text-blue-400 font-bold text-xs tracking-widest uppercase group-hover:text-white transition-colors">
                  Ver todo <i className="fas fa-arrow-right ml-1"></i>
                </span>
              </div>
            </Link>

            {/* Categoría 2: Outerwear */}
            <Link
              href="/catalog"
              className="relative group overflow-hidden bg-gray-100 aspect-4/5 rounded-sm cursor-pointer shadow-sm block"
            >
              <span className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-full z-10 shadow-md">
                New
              </span>
              <img
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Outerwear"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0f1115]/90 via-[#0f1115]/20 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                <span className="text-[10px] font-bold tracking-widest uppercase mb-2 block">
                  Categoría
                </span>
                <h3 className="text-3xl font-black tracking-tighter mb-1">
                  Outerwear
                </h3>
                <p className="text-sm text-gray-300 mb-4">Chaquetas · Hoodies</p>
                <span className="text-blue-400 font-bold text-xs tracking-widest uppercase group-hover:text-white transition-colors">
                  Ver todo <i className="fas fa-arrow-right ml-1"></i>
                </span>
              </div>
            </Link>

            {/* Categoría 3: Bottoms */}
            <Link
              href="/catalog"
              className="relative group overflow-hidden bg-gray-100 aspect-4/5 rounded-sm cursor-pointer shadow-sm block"
            >
              <img
                src="https://images.unsplash.com/photo-1517438476312-10d79c077509?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Bottoms"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0f1115]/90 via-[#0f1115]/20 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                <span className="text-[10px] font-bold tracking-widest uppercase mb-2 block">
                  Categoría
                </span>
                <h3 className="text-3xl font-black tracking-tighter mb-1">
                  Bottoms
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  Pantalones · Cargos · Shorts
                </p>
                <span className="text-blue-400 font-bold text-xs tracking-widest uppercase group-hover:text-white transition-colors">
                  Ver todo <i className="fas fa-arrow-right ml-1"></i>
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* ================= BENEFICIOS DE MARCA ================= */}
        <section className="border-y border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
              <div className="text-center md:text-left">
                <i className="fas fa-leaf text-2xl mb-4 text-gray-900"></i>
                <h4 className="font-bold mb-2">Pima peruano</h4>
                <p className="text-sm text-gray-500">
                  Algodón de origen controlado, suave y duradero.
                </p>
              </div>
              <div className="text-center md:text-left">
                <i className="fas fa-box text-2xl mb-4 text-gray-900"></i>
                <h4 className="font-bold mb-2">Envío express</h4>
                <p className="text-sm text-gray-500">
                  Entrega en 2-4 horas dentro de Lima metropolitana.
                </p>
              </div>
              <div className="text-center md:text-left">
                <i className="fas fa-sync-alt text-2xl mb-4 text-gray-900"></i>
                <h4 className="font-bold mb-2">Cambios gratis</h4>
                <p className="text-sm text-gray-500">
                  Sin costo adicional durante 30 días desde tu compra.
                </p>
              </div>
              <div className="text-center md:text-left">
                <i className="fas fa-lock text-2xl mb-4 text-gray-900"></i>
                <h4 className="font-bold mb-2">Pago seguro</h4>
                <p className="text-sm text-gray-500">
                  Transacciones protegidas vía PayPal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BANNER TEMPORADA ================= */}
        <section className="bg-[#0f1115] text-white py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <span className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-3 block">
                Nueva Temporada
              </span>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
                Invierno 2026
                <br />
                ya disponible.
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link
                href="/catalog"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-sm transition-colors text-center text-sm uppercase tracking-wider"
              >
                Ir al catálogo
              </Link>
              <Link
                href="/offers"
                className="bg-transparent border border-gray-700 hover:border-white text-white font-bold py-4 px-8 rounded-sm transition-colors text-center text-sm uppercase tracking-wider"
              >
                Ver ofertas
              </Link>
            </div>
          </div>
        </section>

        {/* ================= NEWSLETTER ================= */}
        <section className="bg-gray-100 py-24 px-6 text-center border-b border-gray-200">
          <div className="max-w-xl mx-auto">
            <span className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4 block">
              Únete
            </span>
            <h2 className="text-3xl font-black tracking-tighter mb-3">
              Sé el primero en enterarte
            </h2>
            <p className="text-gray-500 mb-8 text-sm">
              Lanzamientos, descuentos exclusivos y novedades. Sin spam.
            </p>

            <form
              onSubmit={manejarSuscripcion}
              className="flex flex-col sm:flex-row w-full max-w-md mx-auto shadow-sm"
            >
              <input
                type="email"
                placeholder="tu@correo.pe"
                value={emailSuscripcion}
                onChange={(e) => setEmailSuscripcion(e.target.value)}
                className="grower border-gray-300 px-4 py-3 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 rounded-t-sm sm:rounded-l-sm sm:rounded-tr-none text-sm bg-white"
                required
              />
              <button
                type="submit"
                className="bg-[#0f1115] hover:bg-black text-white font-bold py-3 px-8 transition-colors rounded-b-sm sm:rounded-r-sm sm:rounded-bl-none text-sm"
              >
                Suscribirse
              </button>
            </form>

            {suscrito && (
              <p className="text-xs font-bold text-emerald-600 mt-3">
                ¡Gracias por suscribirte! Pronto recibirás nuestras novedades.
              </p>
            )}
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
}