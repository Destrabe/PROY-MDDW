import React from "react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="group flex flex-col gap-3">
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-md bg-gray-100">
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-emerald-600">
            {product.badge}
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

export default function OfertasPage() {
  const ofertas = [
    {
      id: 1,
      name: "Polo Lima Oversize",
      category: "POLOS",
      price: 89,
      oldPrice: 119,
      badge: "NUEVO",
      colors: ["#ffffff", "#000000", "#d8c8b8"],
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c028b?q=80&w=600&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full font-sans bg-slate-50 overflow-x-hidden">
      <section
        className="relative bg-[#0B101B] w-full pt-16 pb-20 px-6 lg:px-12"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
        }}
      >
        <div className="w-full max-w-360uto relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div>
            <div className="text-slate-500 text-sm mb-12">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <span className="mx-2">›</span>
              <span className="text-slate-400">Ofertas</span>
            </div>
            <div>
              <span className="text-blue-600 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                TIEMPO LIMITADO
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
                Ofertas <br />
                <span className="text-blue-600">hasta 25% off</span>
              </h1>
            </div>
          </div>
          <div className="flex gap-12 border-t border-slate-800 lg:border-none pt-8 lg:pt-0">
            <div className="text-right">
              <p className="text-4xl font-bold text-white mb-1">2</p>
              <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                PRODUCTOS EN OFERTA
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-white mb-1">25%</p>
              <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                DESCUENTO MÁXIMO
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-blue-600 w-full overflow-hidden py-3">
        <div className="animate-marquee flex w-max text-white text-sm font-bold tracking-widest uppercase">
          <span className="mx-4">
            OFERTA ESPECIAL · STOCK LIMITADO · ENVÍO GRATIS EN LIMA ·
          </span>
          <span className="mx-4">
            OFERTA ESPECIAL · STOCK LIMITADO · ENVÍO GRATIS EN LIMA ·
          </span>
          <span className="mx-4">
            OFERTA ESPECIAL · STOCK LIMITADO · ENVÍO GRATIS EN LIMA ·
          </span>
          <span className="mx-4">
            OFERTA ESPECIAL · STOCK LIMITADO · ENVÍO GRATIS EN LIMA ·
          </span>
          <span className="mx-4">
            OFERTA ESPECIAL · STOCK LIMITADO · ENVÍO GRATIS EN LIMA ·
          </span>
          <span className="mx-4">
            OFERTA ESPECIAL · STOCK LIMITADO · ENVÍO GRATIS EN LIMA ·
          </span>
        </div>
      </div>
      <section className="w-full py-16 px-6 lg:px-12 grow">
        <div className="w-full max-w-360 mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
            <p className="text-slate-600 text-lg">
              <span className="font-bold text-slate-900">2</span> productos en
              oferta
            </p>
            <div className="flex items-center gap-2 bg-blue-100/50 text-blue-700 px-4 py-2 rounded-full border border-blue-200 w-fit">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span className="text-sm font-semibold">
                Oferta por tiempo limitado
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ofertas.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#f4f6f9] w-full py-24 px-6 flex flex-col items-center justify-center text-center border-t border-slate-200">
        <span className="text-blue-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-4 block">
          SÉ EL PRIMERO
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
          Recibe ofertas antes que nadie
        </h2>
        <p className="text-slate-500 text-base mb-10">
          Suscríbete y te avisamos cuando haya descuentos nuevos.
        </p>
        <form className="flex flex-col sm:flex-row w-full max-w-lg gap-3">
          <input
            type="email"
            placeholder="tu@correo.pe"
            className="w-full sm:flex-1 px-4 py-3.5 bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm text-slate-800"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded font-bold tracking-wide transition-colors text-sm whitespace-nowrap"
          >
            SUSCRIBIRSE
          </button>
        </form>
      </section>
    </div>
  );
}
