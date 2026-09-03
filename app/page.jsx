import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen w-full font-sans">
      
      {/* 1. HERO SECTION (Imagen a pantalla completa) */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex flex-col justify-between pt-24 pb-12 px-6 lg:px-12 bg-black">
        {/* Imagen de fondo (Reemplaza la URL por tu imagen local) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2000&auto=format&fit=crop')" }}
        />
        {/* Capa de gradiente para oscurecer la imagen inferior */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#1a1511]/90" />

        {/* Contenido Superior Hero */}
        <div className="relative z-10 max-w-[1440px] mx-auto w-full flex-grow flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-blue-600"></div>
            <span className="text-blue-600 text-xs font-bold tracking-[0.3em] uppercase">
              Lima · Perú · 2024
            </span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter leading-[0.85] mb-10">
            LO <br />
            <span className="text-blue-600">BÁSICO,</span> <br />
            ELEVADO.
          </h1>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link 
              href="/catalogo" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded font-bold text-sm tracking-wide transition-colors flex items-center gap-2"
            >
              EXPLORAR COLECCIÓN 
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
            <p className="text-gray-300 text-sm max-w-xs leading-relaxed">
              Algodón pima peruano · Diseño contemporáneo · Hecho para Lima
            </p>
          </div>
        </div>

        {/* Stats Inferiores Hero */}
        <div className="relative z-10 max-w-[1440px] mx-auto w-full mt-16">
          <div className="border-t border-white/20 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-3xl font-bold text-white mb-1">100%</p>
              <p className="text-gray-400 text-sm">Algodón pima peruano</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white mb-1">+500</p>
              <p className="text-gray-400 text-sm">Clientes en Lima</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white mb-1">48h</p>
              <p className="text-gray-400 text-sm">Entrega express</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NUESTRA FILOSOFÍA */}
      <section className="w-full bg-white py-24 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-6 block">
              Nuestra Filosofía
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Ropa pensada <br />
              para el ritmo <br />
              <span className="text-blue-600">de Lima.</span>
            </h2>
          </div>
          <div className="space-y-6 text-lg">
            <p className="text-slate-700 font-medium leading-relaxed">
              Lima Basics nace de entender que la moda urbana local necesita su propia identidad. No seguimos tendencias importadas — construimos las nuestras desde el centro histórico hasta Miraflores.
            </p>
            <p className="text-slate-500 text-base leading-relaxed">
              Cada pieza está confeccionada con algodón pima peruano de primera calidad, diseñada para durar y adaptarse a los distintos momentos del día limeño.
            </p>
            <div className="pt-4">
              <Link href="/catalogo" className="inline-flex items-center gap-2 text-slate-900 font-bold border-b-2 border-slate-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors">
                Ver el catálogo completo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORÍAS (Tarjetas con imagen) */}
      <section className="w-full bg-slate-50 py-24 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tarjeta 1: Esenciales */}
          <Link href="/categoria/esenciales" className="group relative h-[500px] rounded-lg overflow-hidden bg-slate-900 block">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529139574466-a303027c028b?q=80&w=800&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <p className="text-gray-300 text-xs font-bold tracking-widest uppercase mb-2">Categoría</p>
              <h3 className="text-3xl font-bold text-white mb-2">Esenciales</h3>
              <p className="text-gray-400 text-sm mb-6">Polos · Tees · Básicos</p>
              <span className="text-blue-500 font-bold text-sm flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                VER TODO <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </div>
          </Link>

          {/* Tarjeta 2: Outerwear (Con Badge) */}
          <Link href="/categoria/outerwear" className="group relative h-[500px] rounded-lg overflow-hidden bg-slate-900 block">
            <div className="absolute top-4 right-4 z-20 bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider">
              NEW
            </div>
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <p className="text-gray-300 text-xs font-bold tracking-widest uppercase mb-2">Categoría</p>
              <h3 className="text-3xl font-bold text-white mb-2">Outerwear</h3>
              <p className="text-gray-400 text-sm mb-6">Chaquetas · Hoodies</p>
              <span className="text-blue-500 font-bold text-sm flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                VER TODO <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </div>
          </Link>

          {/* Tarjeta 3: Bottoms */}
          <Link href="/categoria/bottoms" className="group relative h-[500px] rounded-lg overflow-hidden bg-slate-900 block">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=800&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <p className="text-gray-300 text-xs font-bold tracking-widest uppercase mb-2">Categoría</p>
              <h3 className="text-3xl font-bold text-white mb-2">Bottoms</h3>
              <p className="text-gray-400 text-sm mb-6">Pantalones · Cargos · Shorts</p>
              <span className="text-blue-500 font-bold text-sm flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                VER TODO <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </div>
          </Link>

        </div>
      </section>

      {/* 4. BENEFICIOS */}
      <section className="w-full bg-slate-50 py-16 px-6 lg:px-12 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <span className="text-2xl block mb-4">🌿</span>
            <h4 className="font-bold text-slate-900 mb-2">Pima peruano</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Algodón de origen controlado, suave y duradero.</p>
          </div>
          <div>
            <span className="text-2xl block mb-4">📦</span>
            <h4 className="font-bold text-slate-900 mb-2">Envío express</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Entrega en 2–4 horas dentro de Lima metropolitana.</p>
          </div>
          <div>
            <span className="text-2xl block mb-4">🔄</span>
            <h4 className="font-bold text-slate-900 mb-2">Cambios gratis</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Sin costo adicional durante 30 días desde tu compra.</p>
          </div>
          <div>
            <span className="text-2xl block mb-4">🔒</span>
            <h4 className="font-bold text-slate-900 mb-2">Pago seguro</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Transacciones protegidas vía PayPal.</p>
          </div>
        </div>
      </section>

      {/* 5. CTA INVIERNO */}
      <section className="w-full bg-[#0B101B] py-24 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div>
            <span className="text-blue-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-4 block">
              NUEVA TEMPORADA
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              Invierno 2024 <br /> ya disponible.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <Link 
              href="/catalogo" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded font-bold text-sm tracking-wide transition-colors text-center"
            >
              IR AL CATÁLOGO
            </Link>
            <Link 
              href="/novedades" 
              className="bg-transparent border border-white/20 hover:border-white hover:bg-white/5 text-white px-8 py-4 rounded font-bold text-sm tracking-wide transition-all text-center"
            >
              VER NOVEDADES
            </Link>
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER (Puede omitirse si ya está en tu Footer global) */}
      <section className="bg-[#f4f5f7] w-full py-24 px-6 flex flex-col items-center justify-center text-center">
        <span className="text-xs font-semibold tracking-[0.2em] text-slate-400 mb-4 uppercase">
          ÚNETE
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">
          Sé el primero en enterarte
        </h2>
        <p className="text-slate-500 text-sm mb-8">
          Lanzamientos, descuentos exclusivos y novedades. Sin spam.
        </p>
        
        <form className="flex w-full max-w-md gap-2">
          <input
            type="email"
            placeholder="tu@correo.pe"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded focus:outline-none focus:border-slate-400 transition-colors text-sm text-slate-800"
            required
          />
          <button
            type="submit"
            className="bg-[#0B101B] hover:bg-black text-white px-6 py-3 rounded font-bold tracking-wide transition-colors text-sm whitespace-nowrap"
          >
            Suscribirse
          </button>
        </form>
      </section>

    </div>
  );
}