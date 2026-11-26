"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Datos de prueba (Mock Data) basados en la estructura de pedidos
const MOCK_PEDIDOS = [
  {
    id: 14,
    estado: "En camino",
    fechaCreacion: "25 nov 2026",
    total: 218.9,
    costoEnvio: 8.0,
    metodoEnvio: "Envío Estándar en Lima",
    direccionEnvio: "Av. Próceres de la Independencia 1540, SJL",
    detalles: [
      {
        id: 101,
        talla: "M",
        color: "Negro",
        cantidad: 1,
        subtotal: 69.9,
        producto: {
          nombre: "Polo Boxy Fit Heavyweight",
          imagen:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80",
        },
      },
      {
        id: 102,
        talla: "L",
        color: "Carbón",
        cantidad: 1,
        subtotal: 149.0,
        producto: {
          nombre: "Hoodie Oversized Essential",
          imagen:
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&q=80",
        },
      },
    ],
  },
  {
    id: 13,
    estado: "Entregado",
    fechaCreacion: "20 nov 2026",
    total: 129.9,
    costoEnvio: 0,
    metodoEnvio: "Retiro en tienda Lima Basics",
    direccionEnvio: "Sede Miraflores",
    detalles: [
      {
        id: 103,
        talla: "30",
        color: "Verde Olivo",
        cantidad: 1,
        subtotal: 129.9,
        producto: {
          nombre: "Cargo Pant Relaxed",
          imagen:
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&q=80",
        },
      },
    ],
  },
];

export default function OrdersPage() {
  const [pedidos] = useState(MOCK_PEDIDOS);
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [detallesAbiertos, setDetallesAbiertos] = useState({});

  // Cálculo del total histórico de prendas adquiridas
  const totalProductos = pedidos.reduce(
    (acc, pedido) =>
      acc +
      pedido.detalles.reduce((subAcc, det) => subAcc + det.cantidad, 0),
    0
  );

  // Filtrado de pedidos según el botón activo
  const pedidosFiltrados = pedidos.filter((pedido) => {
    if (filtroEstado === "Todos") return true;
    return pedido.estado === filtroEstado;
  });

  // Alternar despliegue del detalle de un pedido
  const toggleDetalle = (id) => {
    setDetallesAbiertos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-sans antialiased flex flex-col min-h-screen">
      {/* <Header /> */}

      {/* Banner Superior */}
      <div className="bg-[#0f1115] text-white pt-10 pb-12 px-4 sm:px-6 md:px-12 w-full">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[13px] text-gray-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-gray-200">Mi cuenta</span>
            </div>
            <span className="text-[11px] font-bold tracking-[0.15em] text-blue-500 uppercase block mb-3">
              Mi Cuenta
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
              Mis pedidos
            </h1>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Revisa el estado de tus compras, los productos incluidos y los
              detalles de entrega.
            </p>
          </div>

          <div className="flex border border-gray-700/60 rounded-xl overflow-hidden self-start md:self-end bg-[#171a21]">
            <div className="px-8 py-5 border-r border-gray-700/60 text-center">
              <span className="block text-2xl font-black mb-1">
                {pedidos.length}
              </span>
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                Pedidos
              </span>
            </div>
            <div className="px-8 py-5 text-center">
              <span className="block text-2xl font-black mb-1">
                {totalProductos}
              </span>
              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                Productos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <main className="grow max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-10 w-full -mt-4">
        {/* Barra de Filtros y Contador */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="inline-flex bg-gray-100/80 p-1 rounded-lg border border-gray-200/50">
            {[
              { label: "Todos", valor: "Todos" },
              { label: "En camino", valor: "En camino" },
              { label: "Entregados", valor: "Entregado" },
            ].map((tab) => {
              const activo = filtroEstado === tab.valor;
              return (
                <button
                  key={tab.valor}
                  type="button"
                  onClick={() => setFiltroEstado(tab.valor)}
                  className={`px-6 py-2 text-sm transition-colors rounded-md ${
                    activo
                      ? "font-bold bg-white text-gray-900 shadow-sm"
                      : "font-medium text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <span className="text-sm text-gray-500 font-medium">
            {pedidosFiltrados.length === 1
              ? "1 pedido"
              : `${pedidosFiltrados.length} pedidos`}
          </span>
        </div>

        {/* Estado 1: No hay NINGÚN pedido registrado */}
        {pedidos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <i className="fas fa-box-open text-4xl text-gray-300 mb-4 block"></i>
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              Aún no tienes pedidos registrados
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Cuando realices una compra, aparecerá aquí.
            </p>
            <Link
              href="/catalog"
              className="inline-block bg-[#1d4ed8] hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg transition-colors"
            >
              Ir a la tienda
            </Link>
          </div>
        ) : (
          /* Contenedor de Pedidos */
          <div className="space-y-5">
            {/* Estado 2: El filtro seleccionado no devuelve resultados */}
            {pedidosFiltrados.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <i className="fas fa-search text-3xl text-gray-300 mb-3 block"></i>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  No hay pedidos con este estado
                </h3>
              </div>
            ) : (
              /* Tarjetas de Pedido */
              pedidosFiltrados.map((pedido) => {
                const estaAbierto = !!detallesAbiertos[pedido.id];

                return (
                  <div
                    key={pedido.id}
                    className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden"
                  >
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1d4ed8] flex items-center justify-center shrink-0 mt-0.5">
                            <i className="fas fa-cube text-sm"></i>
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-black text-lg text-gray-900">
                                LB-2026-0{pedido.id}
                              </span>

                              {/* Etiquetas de estado */}
                              {(pedido.estado === "Completado" ||
                                pedido.estado === "Confirmado") && (
                                <span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                                  {pedido.estado}
                                </span>
                              )}
                              {pedido.estado === "En camino" && (
                                <span className="bg-[#1d4ed8] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                                  En camino
                                </span>
                              )}
                              {pedido.estado === "Entregado" && (
                                <span className="bg-emerald-100 text-emerald-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                                  Entregado
                                </span>
                              )}
                              {pedido.estado === "Cancelado" && (
                                <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                                  Cancelado
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-gray-500 mb-4">
                              <span>{pedido.fechaCreacion}</span> ·{" "}
                              <span>{pedido.detalles.length} productos</span>
                            </p>

                            {/* Miniaturas circulares apiladas */}
                            <div className="flex items-center -space-x-2">
                              {pedido.detalles.slice(0, 4).map((detalle, idx) =>
                                detalle.producto.imagen ? (
                                  <img
                                    key={idx}
                                    src={detalle.producto.imagen}
                                    alt={detalle.producto.nombre}
                                    className="inline-block w-9 h-9 rounded-full ring-2 ring-white object-cover border border-gray-100 bg-white"
                                  />
                                ) : (
                                  <div
                                    key={idx}
                                    className="inline-flex w-9 h-9 rounded-full ring-2 ring-white bg-gray-200 items-center justify-center text-[10px]"
                                  >
                                    <i className="fas fa-tshirt text-gray-400"></i>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Total y botón desplegable */}
                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto h-full">
                          <div className="text-left sm:text-right">
                            <span className="font-black text-lg text-gray-900 block">
                              S/ {Number(pedido.total).toFixed(2)}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleDetalle(pedido.id)}
                            className="text-xs font-bold text-gray-700 flex items-center gap-1.5 hover:text-black transition-colors sm:mt-8 pt-4"
                          >
                            <span>
                              {estaAbierto ? "Ocultar detalle" : "Ver detalle"}
                            </span>
                            <i
                              className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${
                                estaAbierto ? "rotate-180" : "rotate-0"
                              }`}
                            ></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Detalle Desplegable */}
                    {estaAbierto && (
                      <div className="bg-[#f8f9fc] border-t border-gray-100">
                        <div className="p-5 sm:p-6 border-b border-gray-100">
                          <div className="space-y-4">
                            {pedido.detalles.map((detalle) => (
                              <div
                                key={detalle.id}
                                className="flex items-center justify-between border-b border-gray-200/60 pb-4 last:border-0 last:pb-0"
                              >
                                <div className="flex items-center gap-4">
                                  {detalle.producto.imagen ? (
                                    <img
                                      src={detalle.producto.imagen}
                                      alt={detalle.producto.nombre}
                                      className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-lg shrink-0 border border-gray-200 shadow-sm"
                                    />
                                  ) : (
                                    <div className="w-16 h-20 sm:w-20 sm:h-24 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
                                      <i className="fas fa-tshirt text-gray-400"></i>
                                    </div>
                                  )}
                                  <div>
                                    <h4 className="font-bold text-sm sm:text-base text-gray-900">
                                      {detalle.producto.nombre}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                      Talla {detalle.talla} · {detalle.color}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      Cantidad: {detalle.cantidad}
                                    </p>
                                  </div>
                                </div>
                                <span className="font-bold text-sm sm:text-base text-gray-900">
                                  S/ {Number(detalle.subtotal).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-5 sm:p-6 bg-white flex flex-col md:flex-row justify-between items-start gap-6">
                          <div>
                            <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block mb-1.5">
                              Información de Envío
                            </span>
                            <p className="text-sm font-bold text-blue-600 mb-0.5">
                              <i
                                className={`${
                                  pedido.costoEnvio === 0
                                    ? "fas fa-store mr-1.5"
                                    : "fas fa-truck mr-1.5"
                                }`}
                              ></i>
                              <span>
                                {pedido.metodoEnvio || "Envío Estándar"}
                              </span>
                              <span>
                                {pedido.costoEnvio === 0
                                  ? " (Gratis)"
                                  : pedido.costoEnvio != null
                                  ? ` (S/ ${Number(pedido.costoEnvio).toFixed(2)})`
                                  : " (S/ 8.00)"}
                              </span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Dirección:{" "}
                              {pedido.direccionEnvio || "Pendiente"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* CTA Inferior */}
        {pedidos.length > 0 && (
          <div className="mt-12 pt-8 flex flex-col items-center justify-center text-center">
            <h4 className="font-bold text-lg text-gray-900 mb-1">
              ¿Buscas algo nuevo?
            </h4>
            <p className="text-sm text-gray-500 mb-6">
              Descubre los últimos básicos de la colección.
            </p>
            <Link
              href="/catalog"
              className="bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-sm transition-colors shadow-sm"
            >
              Ir al catálogo
            </Link>
          </div>
        )}
      </main>

      {/* <Footer /> */}
    </div>
  );
}