"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Datos de prueba (Mock Data) para visualizar el carrito lleno
const MOCK_CART_ITEMS = [
  {
    id: 1,
    producto: {
      id: 101,
      nombre: "Polo Boxy Fit Heavyweight",
      precio: 69.9,
      imagen:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80",
    },
    talla: "M",
    color: "bg-black",
    cantidad: 2,
  },
  {
    id: 2,
    producto: {
      id: 102,
      nombre: "Hoodie Oversized Essential",
      precio: 149.0,
      imagen:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&q=80",
    },
    talla: "L",
    color: "bg-white",
    cantidad: 1,
  },
];

export default function CartPage() {
  const [items, setItems] = useState(MOCK_CART_ITEMS);

  // Convierte clases de Tailwind (ej. bg-black, bg-[#d2b48c]) a color CSS válido
  const obtenerColorHex = (clase) => {
    const limpia = (clase || "").trim();
    if (limpia === "bg-white") return "#FFFFFF";
    if (limpia === "bg-black") return "#000000";
    const match = limpia.match(/bg-\[(#[0-9a-fA-F]{3,6})\]/);
    if (match) return match[1].toUpperCase();
    if (limpia.startsWith("#")) return limpia.toUpperCase();
    return "#000000";
  };

  // Actualizar cantidad (+ / -) sin recargar la página
  const actualizarCantidad = (productoId, color, talla, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarItem(productoId, color, talla);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.producto.id === productoId &&
        item.color === color &&
        item.talla === talla
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  // Eliminar prenda del carrito
  const eliminarItem = (productoId, color, talla) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.producto.id === productoId &&
            item.color === color &&
            item.talla === talla
          )
      )
    );
  };

  // Cálculo dinámico del total del carrito
  const carritoTotal = items.reduce(
    (acc, item) => acc + item.producto.precio * item.cantidad,
    0
  );

  return (
    <div className="bg-gray-50 text-gray-900 font-sans antialiased flex flex-col min-h-screen">
      {/* <Header /> */}

      <main className="grow max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 w-full">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-8">
          Tu Carrito
        </h1>

        {/* Estado: Carrito vacío */}
        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <i className="fas fa-shopping-cart text-4xl text-gray-300 mb-4 block"></i>
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              Tu carrito está vacío
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Explora nuestro catálogo y descubre las mejores prendas.
            </p>
            <Link
              href="/catalog"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg transition-colors"
            >
              Ver catálogo
            </Link>
          </div>
        ) : (
          /* Estado: Carrito con prendas */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Lista de ítems */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => {
                const subtotal = item.producto.precio * item.cantidad;
                return (
                  <div
                    key={`${item.producto.id}-${item.talla}-${item.color}`}
                    className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={item.producto.imagen}
                        alt={item.producto.nombre}
                        className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl border border-gray-100 bg-gray-50 shrink-0"
                      />
                      <div className="grow">
                        <h3 className="font-bold text-base sm:text-lg text-gray-900 leading-snug">
                          {item.producto.nombre}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 mt-1.5">
                          <span>
                            Talla: <strong>{item.talla}</strong>
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            Color:
                            <span
                              style={{
                                backgroundColor: obtenerColorHex(item.color),
                              }}
                              className="w-3.5 h-3.5 rounded-full border border-gray-300 inline-block"
                            ></span>
                          </span>
                        </div>

                        {/* Selector editable de cantidad */}
                        <div className="flex items-center gap-3 mt-3">
                          <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                            <button
                              type="button"
                              onClick={() =>
                                actualizarCantidad(
                                  item.producto.id,
                                  item.color,
                                  item.talla,
                                  item.cantidad - 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              <i className="fas fa-minus text-[10px]"></i>
                            </button>

                            <span className="w-9 text-center text-xs font-bold text-gray-900">
                              {item.cantidad}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                actualizarCantidad(
                                  item.producto.id,
                                  item.color,
                                  item.talla,
                                  item.cantidad + 1
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              <i className="fas fa-plus text-[10px]"></i>
                            </button>
                          </div>

                          <p className="font-black text-blue-600 text-base sm:text-lg">
                            S/ {subtotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Botón Eliminar */}
                    <button
                      type="button"
                      onClick={() =>
                        eliminarItem(item.producto.id, item.color, item.talla)
                      }
                      className="self-end sm:self-center text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <i className="fas fa-trash-alt text-[11px]"></i>
                      <span>Eliminar</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-4">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Resumen
                </h3>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-gray-700 text-base">
                    Total
                  </span>
                  <span className="font-black text-xl text-gray-900">
                    S/ {carritoTotal.toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors text-sm uppercase tracking-wider shadow-md"
                >
                  PROCEDER AL PAGO
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* <Footer /> */}
    </div>
  );
}