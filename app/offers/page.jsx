"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
// Descomenta estas líneas cuando tengas listos tus componentes en components/
// import Header from "@/components/header";
// import Footer from "@/components/footer";

const TALLAS = ["XS", "S", "M", "L", "XL", "2XL"];

const MOCK_OFERTAS = [
  {
    id: 1,
    nombre: "Polo Boxy Fit Heavyweight",
    categoria: "Polos",
    precio: 69.9,
    precioAnterior: 89.9,
    etiqueta: "-22% OFF",
    claseEtiqueta: "bg-red-600",
    colores: ["bg-white", "bg-black", "bg-[#8b7355]"],
    imagen:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  },
  {
    id: 3,
    nombre: "Cargo Pant Relaxed",
    categoria: "Pantalones",
    precio: 129.9,
    precioAnterior: 159.9,
    etiqueta: "Oferta",
    claseEtiqueta: "bg-blue-600",
    colores: ["bg-[#6b705c]", "bg-black"],
    imagen:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
  },
  {
    id: 5,
    nombre: "Short Algodón Pima Terry",
    categoria: "Shorts",
    precio: 79.9,
    precioAnterior: 99.0,
    etiqueta: "Últimas unidades",
    claseEtiqueta: "bg-amber-600",
    colores: ["bg-gray-200", "bg-black"],
    imagen:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
  },
  {
    id: 7,
    nombre: "Hoodie Zip-Up Midweight",
    categoria: "Hoodies",
    precio: 119.0,
    precioAnterior: 149.0,
    etiqueta: "-20% OFF",
    claseEtiqueta: "bg-red-600",
    colores: ["bg-black", "bg-[#1b263b]", "bg-gray-500"],
    imagen:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
  },
];

const claseTailwindAColorCSS = (clase) => {
  const limpia = (clase || "").trim().toLowerCase();

  const colores = {
    "bg-white": { hex: "#FFFFFF", nombre: "Blanco" },
    "bg-black": { hex: "#000000", nombre: "Negro" },
    "bg-gray-200": { hex: "#E5E7EB", nombre: "Gris Claro" },
    "bg-gray-400": { hex: "#9CA3AF", nombre: "Gris" },
    "bg-gray-500": { hex: "#6B7280", nombre: "Gris Oscuro" },
    "bg-red-500": { hex: "#EF4444", nombre: "Rojo" },
    "bg-[#ff0000]": { hex: "#FF0000", nombre: "Rojo" },
    "bg-[#8b7355]": { hex: "#8B7355", nombre: "Marrón" },
    "bg-[#6b705c]": { hex: "#6B705C", nombre: "Verde Oliva" },
    "bg-[#1b263b]": { hex: "#1B263B", nombre: "Azul Marino" },
    "bg-[#fbff00]": { hex: "#FBFF00", nombre: "Amarillo" },
  };

  if (colores[limpia]) {
    return {
      hex: colores[limpia].hex,
      nombre: colores[limpia].nombre,
      clave: clase,
    };
  }

  const match = limpia.match(/bg-\[(#[0-9a-f]{3,6})\]/);
  if (match) {
    const hexUpper = match[1].toUpperCase();
    return { hex: hexUpper, nombre: "Color " + hexUpper, clave: clase };
  }

  if (limpia.startsWith("#")) {
    return {
      hex: limpia.toUpperCase(),
      nombre: "Color " + limpia.toUpperCase(),
      clave: clase,
    };
  }

  return { hex: "#000000", nombre: clase, clave: clase };
};

export default function OffersPage() {
  const [ofertas] = useState(MOCK_OFERTAS);
  const [usuarioLogueado] = useState(true);

  const [productoModal, setProductoModal] = useState(null);
  const [colorSeleccionado, setColorSeleccionado] = useState("");
  const [tallaSeleccionada, setTallaSeleccionada] = useState("M");

  const [emailSuscripcion, setEmailSuscripcion] = useState("");
  const [suscrito, setSuscrito] = useState(false);

  const [toastInfo, setToastInfo] = useState({ visible: false, detalle: "" });
  const toastTimerRef = useRef(null);

  const abrirModalInteres = (producto) => {
    const listaColores =
      producto.colores && producto.colores.length > 0
        ? producto.colores
        : ["bg-black"];

    setProductoModal(producto);
    setColorSeleccionado(listaColores[0]);
    setTallaSeleccionada("M");
  };

  const cerrarModalInteres = () => {
    setProductoModal(null);
  };

  const agregarAlCarritoSinRecargar = (e) => {
    e.preventDefault();
    if (!productoModal) return;

    const detalle = `${productoModal.nombre} (Talla ${tallaSeleccionada})`;
    cerrarModalInteres();

    setToastInfo({ visible: true, detalle });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastInfo((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const manejarSuscripcion = (e) => {
    e.preventDefault();
    if (!emailSuscripcion.trim()) return;
    setSuscrito(true);
    setEmailSuscripcion("");
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-sans antialiased flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* <Header /> */}

      <main className="flex-grow w-full">
        {/* ================= HERO OFERTAS ================= */}
        <section className="bg-[#0f1115] text-white py-14 sm:py-16 px-6 md:px-12 relative overflow-hidden w-full">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
            <div>
              <div className="text-sm text-gray-400 mb-5 font-medium flex items-center gap-2">
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
                <span>&gt;</span>
                <span className="text-gray-200">Ofertas</span>
              </div>
              <span className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-3 block">
                Tiempo Limitado
              </span>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.95]">
                Ofertas
                <span className="block text-blue-600">especiales</span>
              </h1>
            </div>

            <div className="flex items-center gap-8 sm:gap-12 pb-2 flex-shrink-0">
              <div className="text-left md:text-right">
                <span className="block text-3xl sm:text-4xl font-black">
                  {ofertas.length}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  Productos en oferta
                </span>
              </div>
              <div className="text-left md:text-right border-l border-gray-800 pl-8 sm:pl-12">
                <span className="block text-3xl sm:text-4xl font-black">
                  OFF
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  Descuentos activos
                </span>
              </div>
            </div>
          </div>

          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)",
              backgroundSize: "60px 60px",
            }}
          />
        </section>

        {/* ================= CINTA PROMOCIONAL ================= */}
        <div className="bg-blue-600 text-white py-2.5 px-6 overflow-hidden w-full">
          <div className="max-w-7xl mx-auto font-bold text-xs uppercase tracking-widest flex items-center justify-between gap-6 whitespace-nowrap overflow-hidden">
            <span>· OFERTA ESPECIAL</span>
            <span>· STOCK LIMITADO</span>
            <span>· ENVÍO GRATIS EN LIMA</span>
            <span className="hidden sm:inline">· OFERTA ESPECIAL</span>
            <span className="hidden md:inline">· STOCK LIMITADO</span>
            <span className="hidden lg:inline">· ENVÍO GRATIS EN LIMA</span>
          </div>
        </div>

        {/* ================= LISTADO DE OFERTAS ================= */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-4 border-b border-gray-200">
            <p className="text-lg">
              <span className="font-bold">{ofertas.length}</span> productos en
              oferta
            </p>
            <div className="inline-flex items-center text-blue-600 bg-blue-50 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
              <i className="far fa-clock mr-2"></i> Oferta por tiempo limitado
            </div>
          </div>

          {ofertas.length === 0 ? (
            <div className="text-center py-20 px-4 bg-white rounded-2xl border border-gray-200">
              <i className="fas fa-tag text-3xl text-gray-300 mb-3 block"></i>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                No hay ofertas activas en este momento
              </h3>
              <p className="text-sm text-gray-500 mb-5">
                Explora nuestro catálogo completo para ver todas las prendas
                disponibles.
              </p>
              <Link
                href="/catalog"
                className="inline-block bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-colors"
              >
                Ir al catálogo
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {ofertas.map((producto) => (
                <div
                  key={producto.id}
                  onClick={() => abrirModalInteres(producto)}
                  className="group cursor-pointer flex flex-col"
                >
                  <div className="relative bg-gray-100 aspect-[3/4] mb-4 overflow-hidden rounded-lg">
                    {producto.etiqueta && (
                      <span
                        className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider rounded z-10 ${producto.claseEtiqueta}`}
                      >
                        {producto.etiqueta}
                      </span>
                    )}

                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Overlay y botón corregidos para hover limpio */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          abrirModalInteres(producto);
                        }}
                        className="w-full bg-white hover:bg-[#0f1115] text-gray-900 hover:text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-md shadow-lg transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <span>Agregar al carrito</span>
                        <i className="fas fa-arrow-right text-[11px]"></i>
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest mb-1">
                    {producto.categoria}
                  </p>
                  <h3 className="font-bold text-base sm:text-lg leading-tight mb-1 text-gray-900 line-clamp-1">
                    {producto.nombre}
                  </h3>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="font-black text-base sm:text-lg text-red-600">
                      S/ {Number(producto.precio).toFixed(2)}
                    </span>
                    {producto.precioAnterior && (
                      <span className="text-gray-400 line-through text-xs sm:text-sm">
                        S/ {Number(producto.precioAnterior).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {producto.colores && (
                    <div className="flex gap-1.5 mt-auto">
                      {producto.colores.map((color, idx) => (
                        <div
                          key={idx}
                          style={{
                            backgroundColor: claseTailwindAColorCSS(color).hex,
                          }}
                          className="w-4 h-4 rounded-full border border-gray-300"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ================= NEWSLETTER OFERTAS ================= */}
        <section className="bg-white py-20 px-6 mt-8 border-t border-gray-100">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4 block">
              Sé el primero
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">
              Recibe ofertas antes que nadie
            </h2>
            <p className="text-gray-500 mb-8">
              Suscríbete y te avisamos cuando haya descuentos nuevos.
            </p>

            <form
              onSubmit={manejarSuscripcion}
              className="flex flex-col sm:flex-row gap-4"
            >
              <input
                type="email"
                placeholder="tu@correo.pe"
                value={emailSuscripcion}
                onChange={(e) => setEmailSuscripcion(e.target.value)}
                className="flex-grow border border-gray-300 px-4 py-3 rounded focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded transition-colors whitespace-nowrap"
              >
                SUSCRIBIRSE
              </button>
            </form>

            {suscrito && (
              <p className="text-xs font-bold text-emerald-600 mt-3">
                ¡Listo! Te avisaremos apenas lancemos nuevos descuentos.
              </p>
            )}
          </div>
        </section>
      </main>

      {/* ================= MODAL DE SELECCIÓN DE PRENDA ================= */}
      {productoModal && (
        <div
          onClick={cerrarModalInteres}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-[2px] px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl"
          >
            <button
              type="button"
              onClick={cerrarModalInteres}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center z-10 transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>

            <form onSubmit={agregarAlCarritoSinRecargar} className="p-6">
              <div className="flex gap-4 items-center pb-5 border-b border-gray-100">
                <img
                  src={productoModal.imagen}
                  alt={productoModal.nombre}
                  className="w-20 h-24 object-cover rounded-lg border border-gray-200 flex-shrink-0 bg-gray-100"
                />
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 block mb-0.5">
                    {productoModal.categoria}
                  </span>
                  <h3 className="text-xl font-black tracking-tight text-gray-900 leading-snug">
                    {productoModal.nombre}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-black text-lg text-red-600">
                      S/ {Number(productoModal.precio).toFixed(2)}
                    </span>
                    {productoModal.precioAnterior && (
                      <span className="text-gray-400 line-through text-sm">
                        S/ {Number(productoModal.precioAnterior).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="py-5 border-b border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Escoge el color de la prenda
                  </label>
                  <span className="text-xs font-mono text-gray-500">
                    {claseTailwindAColorCSS(colorSeleccionado).nombre}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {(productoModal.colores || ["bg-black"]).map(
                    (claseColor, index) => {
                      const infoColor = claseTailwindAColorCSS(claseColor);
                      const activo = colorSeleccionado === claseColor;
                      return (
                        <button
                          key={index}
                          type="button"
                          title={infoColor.nombre}
                          style={{ backgroundColor: infoColor.hex }}
                          onClick={() => setColorSeleccionado(claseColor)}
                          className={`w-9 h-9 rounded-full border border-gray-300 transition-all flex items-center justify-center focus:outline-none ${
                            activo
                              ? "ring-2 ring-offset-2 ring-blue-600 scale-110"
                              : ""
                          }`}
                        />
                      );
                    }
                  )}
                </div>
              </div>

              <div className="py-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2.5">
                  Talla
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {TALLAS.map((talla) => {
                    const activa = tallaSeleccionada === talla;
                    return (
                      <button
                        key={talla}
                        type="button"
                        onClick={() => setTallaSeleccionada(talla)}
                        className={`py-2 text-xs font-bold rounded transition-colors ${
                          activa
                            ? "border-2 border-gray-900 bg-gray-900 text-white"
                            : "border border-gray-300 hover:border-gray-900"
                        }`}
                      >
                        {talla}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3">
                {usuarioLogueado ? (
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                  >
                    <i className="fas fa-shopping-cart"></i>
                    <span>Agregar al carrito</span>
                  </button>
                ) : (
                  <div className="space-y-2.5">
                    <p className="text-xs text-center text-gray-500">
                      Debes iniciar sesión para agregar prendas a tu carrito.
                    </p>
                    <button
                      type="button"
                      onClick={cerrarModalInteres}
                      className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                    >
                      <i className="fas fa-sign-in-alt"></i>
                      <span>Iniciar sesión para comprar</span>
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= TOAST FLOTANTE ================= */}
      {toastInfo.visible && (
        <div className="fixed bottom-6 right-6 z-[110] bg-gray-900 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center space-x-3 transition-all duration-300">
          <div className="w-7 h-7 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0">
            <i className="fas fa-check text-sm"></i>
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">
              ¡Agregado al carrito!
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{toastInfo.detalle}</p>
          </div>
          <Link
            href="/cart"
            className="ml-3 text-xs font-bold text-blue-400 hover:text-blue-300 underline uppercase tracking-wider"
          >
            Ver carrito
          </Link>
        </div>
      )}

      {/* <Footer /> */}
    </div>
  );
}