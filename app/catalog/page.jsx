"use client";
import React, { useState } from "react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="group flex flex-col gap-3">
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-md bg-gray-100">
        {product.badge && (
          <div
            className={`absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white
            ${product.badge === "NUEVO" ? "bg-emerald-600" : ""}
            ${product.badge === "MÁS VENDIDO" ? "bg-blue-600" : ""}
            ${product.badge === "ÚLTIMAS UNIDADES" ? "bg-slate-700" : ""}
          `}
          >
            {product.badge}
          </div>
        )}
        {product.stockWarning && (
          <div className="absolute top-3 right-3 z-10 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
            {product.stockWarning}
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button className="w-full rounded-md bg-slate-900/95 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-black">
            + Añadir al carrito
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {product.category}
        </span>
        <h3 className="text-base font-medium text-slate-900">
          <Link href={`/producto/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900">S/ {product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-slate-400 line-through">
              S/ {product.oldPrice}
            </span>
          )}
        </div>
        <div className="mt-2 flex gap-1.5">
          {product.colors.map((color, index) => (
            <div
              key={index}
              className="h-4 w-4 rounded-full border border-gray-200 shadow-sm"
              style={{ backgroundColor: color }}
              title={`Color ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default function CatalogoPage() {
  const [maxPrice, setMaxPrice] = useState(300);
  const products = [
    {
      id: 1,
      name: "Polo Lima Oversize",
      category: "POLOS",
      price: 89,
      oldPrice: 119,
      badge: "NUEVO",
      colors: ["#ffffff", "#000000", "#d8c8b8"],
      image:
        "https://media.sivasdescalzo.com/media/catalog/product/F/O/FOHSS24PP02-224_sivasdescalzo-Front_of_House_-POLO_PIQUE_OVERSIZE-1715879550-1.jpg?width=1920&q=72&optimize=high&format=auto",
    },
    {
      id: 2,
      name: "Hoodie Básico Urban",
      category: "HOODIES",
      price: 149,
      badge: "MÁS VENDIDO",
      colors: ["#6b705c", "#f4f4f4", "#1a1a1a"],
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Jogger Urban Slim",
      category: "PANTALONES",
      price: 129,
      colors: ["#222222", "#555555", "#a0785a"],
      image:
        "https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Cargo Lima Relaxed",
      category: "PANTALONES",
      price: 179,
      badge: "ÚLTIMAS UNIDADES",
      stockWarning: "Solo 3 left",
      colors: ["#556b2f", "#f5f5dc", "#000000"],
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Tee Gráfico Lima",
      category: "POLOS",
      price: 79,
      badge: "MÁS VENDIDO",
      colors: ["#ffffff", "#222222"],
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Chaqueta Miraflores",
      category: "CHAQUETAS",
      price: 229,
      oldPrice: 279,
      badge: "NUEVO",
      colors: ["#1a1a1a", "#4a5d23", "#2c3e50"],
      image:
        "https://tse1.mm.bing.net/th/id/OIP.zulJCuOIN5Map0EHJ5AjQgHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ];
  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen font-sans pb-24">
      <div className="max-w-360 mx-auto px-6 lg:px-12 pt-12 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-1">
            Catálogo
          </h1>
          <p className="text-slate-500 text-sm">8 productos encontrados</p>
        </div>
        <div className="w-full md:w-auto">
          <select className="w-full md:w-64 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500">
            <option>Relevancia</option>
            <option>Precio: de menor a mayor</option>
            <option>Precio: de mayor a menor</option>
            <option>Novedades</option>
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 md:hidden">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="max-w-360 mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-64 shrink-0 space-y-10">
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-900">
                Categoría
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="block rounded-md bg-[#0B101B] px-4 py-2.5 text-sm font-medium text-white transition-colors"
                  >
                    Todos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Polos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Hoodies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Pantalones
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Chaquetas
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Shorts
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-900">
                Talla
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {["XS", "S", "M", "L", "XL", "2XL"].map((size) => (
                  <button
                    key={size}
                    className="flex h-10 items-center justify-center rounded border border-gray-300 bg-white text-sm text-slate-600 transition-colors hover:border-slate-400 hover:bg-slate-50 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-900">
                Color
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "#000000",
                  "#ffffff",
                  "#6b705c",
                  "#c65d3b",
                  "#d8c8b8",
                  "#1c2841",
                ].map((color, idx) => (
                  <button
                    key={idx}
                    className="h-8 w-8 rounded-full border border-gray-300 shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                    style={{ backgroundColor: color }}
                    aria-label={`Filtrar por color ${idx}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">
                  Precio Máximo:
                </h3>
                <span className="text-sm font-semibold text-blue-600">
                  S/ {maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>S/ 50</span>
                <span>S/ 300</span>
              </div>
            </div>
          </aside>
          <main className="flex-1">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
