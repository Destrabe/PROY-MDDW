"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
// Descomenta estas líneas si aún no tienes Header y Footer en tu app/layout.jsx:
// import Header from "@/components/header";
// import Footer from "@/components/footer";

const CATEGORIAS = [
  "Todos",
  "Polos",
  "Hoodies",
  "Pantalones",
  "Chaquetas",
  "Shorts",
];

const TALLAS = ["XS", "S", "M", "L", "XL", "2XL"];

const MOCK_PRODUCTOS = [
  {
    id: 1,
    nombre: "Polo Boxy Fit Heavyweight",
    categoria: "Polos",
    precio: 69.9,
    precioAnterior: 89.9,
    etiqueta: "Más vendido",
    claseEtiqueta: "bg-blue-600",
    colores: ["bg-white", "bg-black", "bg-[#ddbea9]"],
    tallas: ["XS", "S", "M", "L", "XL", "2XL"],
    imagen:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  },
  {
    id: 2,
    nombre: "Hoodie Oversized Essential",
    categoria: "Hoodies",
    precio: 149.0,
    precioAnterior: null,
    etiqueta: "Nuevo",
    claseEtiqueta: "bg-emerald-600",
    colores: ["bg-black", "bg-gray-500", "bg-[#1b263b]"],
    tallas: ["XS", "S", "M", "L", "XL", "2XL"],
    imagen:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
  },
  {
    id: 3,
    nombre: "Cargo Pant Relaxed",
    categoria: "Pantalones",
    precio: 129.9,
    precioAnterior: 159.9,
    etiqueta: null,
    claseEtiqueta: "",
    colores: ["bg-[#6b705c]", "bg-black"],
    tallas: ["XS", "S", "M", "L", "XL", "2XL"],
    imagen:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
  },
  {
    id: 4,
    nombre: "Chaqueta Bomber Urbana",
    categoria: "Chaquetas",
    precio: 189.0,
    precioAnterior: null,
    etiqueta: "Nuevo",
    claseEtiqueta: "bg-blue-600",
    colores: ["bg-black", "bg-[#8b7355]"],
    tallas: ["XS", "S", "M", "L", "XL", "2XL"],
    imagen:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
  },
  {
    id: 5,
    nombre: "Short Algodón Pima Terry",
    categoria: "Shorts",
    precio: 79.9,
    precioAnterior: 99.0,
    etiqueta: "Últimas unidades",
    claseEtiqueta: "bg-amber-600",
    colores: ["bg-gray-200", "bg-black", "bg-[#cb997e]"],
    tallas: ["XS", "S", "M", "L", "XL", "2XL"],
    imagen:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&q=80",
  },
  {
    id: 6,
    nombre: "Polo Básico Cuello Redondo",
    categoria: "Polos",
    precio: 54.9,
    precioAnterior: null,
    etiqueta: null,
    claseEtiqueta: "",
    colores: ["bg-white", "bg-black", "bg-[#1b263b]"],
    tallas: ["XS", "S", "M", "L", "XL", "2XL"],
    imagen:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
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
    "bg-[#cb997e]": { hex: "#CB997E", nombre: "Arcilla" },
    "bg-[#ddbea9]": { hex: "#DDBEA9", nombre: "Beige" },
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

export default function CatalogPage() {
  const [usuarioLogueado] = useState(true);

  const maxPrecioDetectado = useMemo(() => {
    let max = 300;
    MOCK_PRODUCTOS.forEach((p) => {
      if (p.precio > max) max = Math.ceil(p.precio / 10) * 10;
    });
    return max;
  }, []);

  const coloresDisponibles = useMemo(() => {
    const mapa = new Map();
    MOCK_PRODUCTOS.forEach((p) => {
      (p.colores || []).forEach((clase) => {
        const info = claseTailwindAColorCSS(clase);
        if (!mapa.has(info.hex)) {
          mapa.set(info.hex, info);
        }
      });
    });
    return Array.from(mapa.values());
  }, []);

  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [tallaActiva, setTallaActiva] = useState(null);
  const [colorActivo, setColorActivo] = useState(null);
  const [precioMax, setPrecioMax] = useState(maxPrecioDetectado);
  const [orden, setOrden] = useState("relevancia");

  const [filtrosMobileAbierto, setFiltrosMobileAbierto] = useState(false);

  const [productoModal, setProductoModal] = useState(null);
  const [colorSeleccionado, setColorSeleccionado] = useState("");
  const [tallaSeleccionada, setTallaSeleccionada] = useState("M");
  const [cantidadModal, setCantidadModal] = useState(1);

  const [toastInfo, setToastInfo] = useState({ visible: false, detalle: "" });
  const toastTimerRef = useRef(null);

  const productosFiltrados = useMemo(() => {
    const filtrados = MOCK_PRODUCTOS.filter((prod) => {
      const cumpleCategoria =
        categoriaActiva === "Todos" ||
        prod.categoria.toLowerCase() === categoriaActiva.toLowerCase();
      const cumplePrecio = prod.precio <= precioMax;
      const cumpleTalla =
        !tallaActiva || (prod.tallas || []).includes(tallaActiva);
      const coloresHexProd = (prod.colores || []).map(
        (c) => claseTailwindAColorCSS(c).hex
      );
      const cumpleColor =
        !colorActivo || coloresHexProd.includes(colorActivo.hex);

      return cumpleCategoria && cumplePrecio && cumpleTalla && cumpleColor;
    });

    return [...filtrados].sort((a, b) => {
      if (orden === "menor-precio") return a.precio - b.precio;
      if (orden === "mayor-precio") return b.precio - a.precio;
      if (orden === "nuevo") {
        const esNuevoA = (a.etiqueta || "").toLowerCase() === "nuevo" ? 1 : 0;
        const esNuevoB = (b.etiqueta || "").toLowerCase() === "nuevo" ? 1 : 0;
        if (esNuevoB !== esNuevoA) return esNuevoB - esNuevoA;
        return b.id - a.id;
      }
      return 0;
    });
  }, [categoriaActiva, tallaActiva, colorActivo, precioMax, orden]);

  const hayFiltroActivo =
    categoriaActiva !== "Todos" ||
    tallaActiva !== null ||
    colorActivo !== null ||
    precioMax < maxPrecioDetectado;

  const restablecerFiltros = () => {
    setCategoriaActiva("Todos");
    setTallaActiva(null);
    setColorActivo(null);
    setPrecioMax(maxPrecioDetectado);
    setOrden("relevancia");
  };

  const abrirModalInteres = (producto) => {
    const listaColores =
      producto.colores && producto.colores.length > 0
        ? producto.colores
        : ["bg-black"];

    let colorInicial = listaColores[0];
    if (colorActivo) {
      const encontrado = listaColores.find(
        (c) => claseTailwindAColorCSS(c).hex === colorActivo.hex
      );
      if (encontrado) colorInicial = encontrado;
    }

    setProductoModal(producto);
    setColorSeleccionado(colorInicial);
    setTallaSeleccionada(tallaActiva || "M");
    setCantidadModal(1);
  };

  const cerrarModalInteres = () => {
    setProductoModal(null);
  };

  const cambiarCantidad = (delta) => {
    setCantidadModal((prev) => {
      const nuevo = prev + delta;
      if (nuevo < 1) return 1;
      if (nuevo > 99) return 99;
      return nuevo;
    });
  };

  const agregarAlCarritoSinRecargar = (e) => {
    e.preventDefault();
    if (!productoModal) return;

    const detalle = `${cantidadModal}x ${productoModal.nombre} (Talla ${tallaSeleccionada})`;
    cerrarModalInteres();

    setToastInfo({ visible: true, detalle });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastInfo((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  return (
    <div className="bg-white text-gray-900 font-sans antialiased flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* <Header /> */}

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full py-6 md:py-10">
        {/* Encabezado del Catálogo */}
        <div className="flex flex-row justify-between items-start md:items-end mb-6 md:mb-10 pb-5 md:pb-6 border-b border-gray-200 gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter leading-none">
              Catálogo
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-snug max-w-[140px] sm:max-w-none">
              {productosFiltrados.length === 1
                ? "1 producto encontrado"
                : `${productosFiltrados.length} productos encontrados`}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <label
              htmlFor="select-orden"
              className="text-xs font-bold uppercase tracking-wider text-gray-400 hidden md:block"
            >
              Ordenar por:
            </label>
            <select
              id="select-orden"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className="border border-gray-200 rounded-lg px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm text-gray-700 focus:outline-none focus:border-gray-900 bg-white cursor-pointer"
            >
              <option value="relevancia">Relevancia</option>
              <option value="menor-precio">Menor precio</option>
              <option value="mayor-precio">Mayor precio</option>
              <option value="nuevo">Lo más nuevo</option>
            </select>

            <button
              type="button"
              onClick={() => setFiltrosMobileAbierto(true)}
              className="lg:hidden inline-flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white transition-colors"
            >
              <svg
                className="w-3.5 h-3.5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h10M4 18h6"
                />
              </svg>
              <span>Filtros</span>
            </button>
          </div>
        </div>

        {/* Overlay Filtros Mobile */}
        {filtrosMobileAbierto && (
          <div
            onClick={() => setFiltrosMobileAbierto(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[80] lg:hidden transition-opacity"
          />
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          {/* ================= SIDEBAR DE FILTROS ================= */}
          <aside
            className={`fixed inset-y-0 left-0 z-[90] w-[78%] max-w-[310px] bg-white flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:w-64 lg:max-w-none lg:bg-transparent lg:z-auto flex-shrink-0 shadow-2xl lg:shadow-none ${
              filtrosMobileAbierto ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Cabecera Mobile */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 lg:hidden">
              <span className="font-bold text-base text-gray-900">Filtros</span>
              <button
                type="button"
                onClick={() => setFiltrosMobileAbierto(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Cerrar filtros"
              >
                ✕
              </button>
            </div>

            <div className="p-5 lg:p-0 overflow-y-auto flex-grow">
              {/* Filtro: Categoría */}
              <div className="mb-7">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold uppercase tracking-wider text-[11px] text-gray-500 lg:text-sm lg:text-gray-900">
                    Categoría
                  </h3>
                  {hayFiltroActivo && (
                    <button
                      type="button"
                      onClick={restablecerFiltros}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      Limpiar todo
                    </button>
                  )}
                </div>
                <ul className="space-y-1">
                  {CATEGORIAS.map((cat) => {
                    const activa = categoriaActiva === cat;
                    return (
                      <li key={cat}>
                        <button
                          type="button"
                          onClick={() => setCategoriaActiva(cat)}
                          className={`w-full text-left block px-3.5 py-2 rounded-lg text-sm transition-colors ${
                            activa
                              ? "bg-gray-900 text-white font-bold"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          {cat}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Filtro: Talla */}
              <div className="mb-7">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold uppercase tracking-wider text-[11px] text-gray-500 lg:text-sm lg:text-gray-900">
                    Talla
                  </h3>
                  {tallaActiva && (
                    <span className="text-xs text-blue-600 font-bold">
                      Talla {tallaActiva}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 lg:grid lg:grid-cols-3">
                  {TALLAS.map((talla) => {
                    const activa = tallaActiva === talla;
                    return (
                      <button
                        key={talla}
                        type="button"
                        onClick={() => setTallaActiva(activa ? null : talla)}
                        className={`min-w-[44px] py-2 px-2.5 text-xs sm:text-sm text-center rounded-md transition-colors ${
                          activa
                            ? "border-2 border-gray-900 bg-gray-900 text-white font-bold"
                            : "border border-gray-200 hover:border-gray-900"
                        }`}
                      >
                        {talla}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filtro: Color */}
              <div className="mb-7">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold uppercase tracking-wider text-[11px] text-gray-500 lg:text-sm lg:text-gray-900">
                    Color
                  </h3>
                  <span className="text-xs font-mono text-gray-500">
                    {colorActivo ? colorActivo.nombre : "Todos"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {coloresDisponibles.map((info) => {
                    const seleccionado =
                      colorActivo && colorActivo.hex === info.hex;
                    return (
                      <button
                        key={info.hex}
                        type="button"
                        title={info.nombre}
                        style={{ backgroundColor: info.hex }}
                        onClick={() =>
                          setColorActivo(
                            seleccionado
                              ? null
                              : { hex: info.hex, nombre: info.nombre }
                          )
                        }
                        className={`w-8 h-8 rounded-full border border-gray-300 transition-all focus:outline-none hover:scale-105 ${
                          seleccionado
                            ? "ring-2 ring-offset-2 ring-gray-900 scale-110"
                            : ""
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Filtro: Precio Máximo */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <h3 className="font-bold uppercase tracking-wider text-[11px] text-gray-500 lg:text-sm lg:text-gray-900">
                    Precio Máximo:
                  </h3>
                  <span className="text-blue-600 font-bold text-xs lg:text-sm">
                    S/ {precioMax}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max={maxPrecioDetectado}
                  step="5"
                  value={precioMax}
                  onChange={(e) => setPrecioMax(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-2">
                  <span>S/ 50</span>
                  <span>S/ {maxPrecioDetectado}</span>
                </div>
              </div>
            </div>

            {/* Botón Aplicar en Mobile */}
            <div className="p-5 border-t border-gray-100 lg:hidden bg-white">
              <button
                type="button"
                onClick={() => setFiltrosMobileAbierto(false)}
                className="w-full bg-[#0f1115] hover:bg-black text-white font-bold text-xs py-3.5 rounded-lg transition-colors"
              >
                {productosFiltrados.length === 1
                  ? "Ver 1 producto"
                  : `Ver ${productosFiltrados.length} productos`}
              </button>
            </div>
          </aside>

          {/* ================= CUADRÍCULA DE PRODUCTOS ================= */}
          <div className="flex-grow">
            {productosFiltrados.length === 0 ? (
              <div className="text-center py-20 px-4 bg-gray-50 rounded-2xl border border-gray-100">
                <i className="fas fa-search text-3xl text-gray-300 mb-3 block"></i>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  No encontramos prendas con esos filtros
                </h3>
                <p className="text-sm text-gray-500 mb-5">
                  Prueba ajustando el rango de precio, el color o la categoría
                  seleccionada.
                </p>
                <button
                  type="button"
                  onClick={restablecerFiltros}
                  className="bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-colors"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3.5 sm:gap-x-6 gap-y-7 sm:gap-y-10">
                {productosFiltrados.map((producto) => (
                  <div
                    key={producto.id}
                    onClick={() => abrirModalInteres(producto)}
                    className="group cursor-pointer"
                  >
                    <div className="relative bg-gray-100 aspect-[3/4] mb-2.5 sm:mb-4 overflow-hidden rounded-lg">
                      {producto.etiqueta && (
                        <span
                          className={`absolute top-2.5 left-2.5 text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-full z-[1] ${producto.claseEtiqueta}`}
                        >
                          {producto.etiqueta}
                        </span>
                      )}

                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5 sm:p-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            abrirModalInteres(producto);
                          }}
                          className="w-full bg-white hover:bg-[#0f1115] text-gray-900 hover:text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider py-2.5 sm:py-3.5 px-2 sm:px-4 rounded shadow-lg transition-colors duration-200 flex items-center justify-center gap-1.5"
                        >
                          <span>Agregar al carrito</span>
                          <i className="fas fa-arrow-right text-[10px]"></i>
                        </button>
                      </div>
                    </div>

                    <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest mb-0.5">
                      {producto.categoria}
                    </p>
                    <h3 className="font-semibold sm:font-bold text-xs sm:text-lg leading-snug mb-1 text-gray-900 line-clamp-1">
                      {producto.nombre}
                    </h3>
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                      <span className="font-black text-xs sm:text-lg text-gray-900">
                        S/ {Number(producto.precio).toFixed(2)}
                      </span>
                      {producto.precioAnterior && (
                        <span className="text-gray-400 line-through text-[11px] sm:text-sm">
                          S/ {Number(producto.precioAnterior).toFixed(2)}
                        </span>
                      )}
                    </div>

                    {producto.colores && (
                      <div className="flex gap-1.5">
                        {producto.colores.map((color, idx) => (
                          <div
                            key={idx}
                            style={{
                              backgroundColor: claseTailwindAColorCSS(color).hex,
                            }}
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-gray-300"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ================= MODAL DE SELECCIÓN DE PRENDA (CENTRADO Y SOBRE HEADER) ================= */}
      {productoModal && (
        <div
          onClick={cerrarModalInteres}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(2px)",
            padding: "16px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl mx-auto"
          >
            {/* Botón cerrar modal */}
            <button
              type="button"
              onClick={cerrarModalInteres}
              aria-label="Cerrar modal"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black flex items-center justify-center z-20 transition-colors font-bold text-sm"
            >
              ✕
            </button>

            <form onSubmit={agregarAlCarritoSinRecargar} className="p-6">
              {/* Cabecera Producto */}
              <div className="flex gap-4 items-center pb-5 border-b border-gray-100 pr-6">
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
                    <span className="font-black text-lg text-gray-900">
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

              {/* Selección de Color */}
              <div className="py-4 border-b border-gray-100">
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

              {/* Selección de Talla */}
              <div className="py-4 border-b border-gray-100">
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
                            : "border border-gray-300 hover:border-gray-900 text-gray-800"
                        }`}
                      >
                        {talla}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selector de Cantidad */}
              <div className="py-4 flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Cantidad
                </label>
                <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                  <button
                    type="button"
                    onClick={() => cambiarCantidad(-1)}
                    aria-label="Disminuir cantidad"
                    className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors font-bold text-base select-none"
                  >
                    −
                  </button>
                  <span className="w-11 text-center text-sm font-bold text-gray-900 select-none">
                    {cantidadModal}
                  </span>
                  <button
                    type="button"
                    onClick={() => cambiarCantidad(1)}
                    aria-label="Aumentar cantidad"
                    className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors font-bold text-base select-none"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Botón de Acción */}
              <div className="pt-2">
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
        <div
          style={{ zIndex: 9999 }}
          className="fixed bottom-6 right-6 bg-gray-900 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center space-x-3 transition-all duration-300"
        >
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