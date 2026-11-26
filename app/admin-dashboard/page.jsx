"use client";

import React, { useState } from "react";
import Header from "@/components/header";

// Datos de prueba (Mock Data) basados en la estructura de Java
const MOCK_PRODUCTOS = [
  {
    id: 1,
    nombre: "Polo Boxy Fit Heavyweight",
    categoria: "Polos",
    precio: 69.9,
    precioAnterior: 89.9,
    etiqueta: "Más vendido",
    claseEtiqueta: "bg-blue-600",
    colores: ["bg-white", "bg-black", "bg-[#d2b48c]"],
    imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80",
  },
  {
    id: 2,
    nombre: "Hoodie Oversized Essential",
    categoria: "Hoodies",
    precio: 149.0,
    precioAnterior: null,
    etiqueta: "Nuevo",
    claseEtiqueta: "bg-emerald-600",
    colores: ["bg-black", "bg-[#374151]"],
    imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&q=80",
  },
  {
    id: 3,
    nombre: "Cargo Pant Relaxed",
    categoria: "Pantalones",
    precio: 129.9,
    precioAnterior: 159.9,
    etiqueta: null,
    claseEtiqueta: "",
    colores: ["bg-[#4b5320]", "bg-black"],
    imagen: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&q=80",
  },
];

const MOCK_PEDIDOS = [
  {
    id: 14,
    estado: "En camino",
    fechaCreacion: "25/11/2026 14:30",
    total: 218.9,
    costoEnvio: 8.0,
    metodoEnvio: "Envío Express Lima",
    direccionEnvio: "Av. Próceres de la Independencia 1540, SJL",
    usuario: {
      id: 2,
      nombre: "Carlos Mendoza",
      email: "carlos.mendoza@correo.com",
    },
    detalles: [
      {
        id: 101,
        talla: "L",
        color: "Negro",
        cantidad: 1,
        subtotal: 69.9,
        producto: {
          nombre: "Polo Boxy Fit Heavyweight",
          imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80",
        },
      },
      {
        id: 102,
        talla: "M",
        color: "Carbón",
        cantidad: 1,
        subtotal: 149.0,
        producto: {
          nombre: "Hoodie Oversized Essential",
          imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&q=80",
        },
      },
    ],
  },
  {
    id: 13,
    estado: "Entregado",
    fechaCreacion: "20/11/2026 09:15",
    total: 129.9,
    costoEnvio: 0,
    metodoEnvio: "Recojo en Tienda",
    direccionEnvio: "Tienda Lima Basics - Miraflores",
    usuario: {
      id: 3,
      nombre: "Valeria Torres",
      email: "valeria.t@correo.com",
    },
    detalles: [
      {
        id: 103,
        talla: "30",
        color: "Verde Olivo",
        cantidad: 1,
        subtotal: 129.9,
        producto: {
          nombre: "Cargo Pant Relaxed",
          imagen: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&q=80",
        },
      },
    ],
  },
];

const MOCK_USUARIOS = [
  { id: 1, nombre: "Dajhana Huaccha", email: "admin@limabasics.pe", rol: "ADMIN" },
  { id: 2, nombre: "Carlos Mendoza", email: "carlos.mendoza@correo.com", rol: "USER" },
  { id: 3, nombre: "Valeria Torres", email: "valeria.t@correo.com", rol: "USER" },
];

const SESION_ACTUAL_ID = 1;

export default function AdminDashboardPage() {
  // Estados principales de datos (Mock interactivo)
  const [productos, setProductos] = useState(MOCK_PRODUCTOS);
  const [pedidos, setPedidos] = useState(MOCK_PEDIDOS);
  const [usuarios, setUsuarios] = useState(MOCK_USUARIOS);

  // Estado de navegación por pestañas
  const [activeTab, setActiveTab] = useState("productos");

  // Estado para desplegar detalles de pedidos
  const [detallesAbiertos, setDetallesAbiertos] = useState({});

  // Estados del Modal de Producto
  const [modalProductoAbierto, setModalProductoAbierto] = useState(false);
  const [productoEditandoId, setProductoEditandoId] = useState(null);
  const [formProducto, setFormProducto] = useState({
    nombre: "",
    categoria: "Polos",
    precio: "",
    precioAnterior: "",
    etiqueta: "",
    imagen: "",
  });
  const [coloresActuales, setColoresActuales] = useState(["bg-white", "bg-black"]);
  const [colorHexInput, setColorHexInput] = useState("#000000");

  // Estados del Modal de Usuario
  const [modalUsuarioAbierto, setModalUsuarioAbierto] = useState(false);
  const [formUsuario, setFormUsuario] = useState({
    id: null,
    nombre: "",
    email: "",
    rol: "USER",
    password: "",
  });

  // --- FUNCIONES DE CONVERSIÓN DE COLORES ---
  const tailwindAHex = (clase) => {
    const limpia = clase.trim();
    if (limpia === "bg-white") return "#FFFFFF";
    if (limpia === "bg-black") return "#000000";
    const match = limpia.match(/bg-\[(#[0-9a-fA-F]{3,6})\]/);
    if (match) return match[1].toUpperCase();
    if (limpia.startsWith("#")) return limpia.toUpperCase();
    return "#000000";
  };

  const hexATailwind = (hex) => {
    const h = hex.trim().toUpperCase();
    if (h === "#FFFFFF") return "bg-white";
    if (h === "#000000") return "bg-black";
    return `bg-[${h.toLowerCase()}]`;
  };

  const obtenerClaseEtiqueta = (etiqueta) => {
    if (etiqueta === "Nuevo") return "bg-emerald-600";
    if (etiqueta === "Más vendido") return "bg-blue-600";
    if (etiqueta === "Últimas unidades") return "bg-amber-600";
    return "bg-gray-800";
  };

  // --- HANDLERS DE PRODUCTOS ---
  const abrirModalCrearProducto = () => {
    setProductoEditandoId(null);
    setFormProducto({
      nombre: "",
      categoria: "Polos",
      precio: "",
      precioAnterior: "",
      etiqueta: "",
      imagen: "",
    });
    setColorHexInput("#000000");
    setColoresActuales(["bg-white", "bg-black"]);
    setModalProductoAbierto(true);
  };

  const abrirModalEditarProducto = (producto) => {
    setProductoEditandoId(producto.id);
    setFormProducto({
      nombre: producto.nombre || "",
      categoria: producto.categoria || "Polos",
      precio: producto.precio || "",
      precioAnterior: producto.precioAnterior || "",
      etiqueta: producto.etiqueta || "",
      imagen: producto.imagen || "",
    });
    setColorHexInput("#000000");
    setColoresActuales(producto.colores ? [...producto.colores] : []);
    setModalProductoAbierto(true);
  };

  const agregarColorHex = () => {
    let hex = colorHexInput.trim().toUpperCase();
    if (!hex.startsWith("#")) hex = "#" + hex;
    if (!/^#([0-9A-F]{3}|[0-9A-F]{6})$/.test(hex)) {
      alert("Ingresa un código HEX válido (por ejemplo: #DDBEA9 o #000000)");
      return;
    }
    const claseTailwind = hexATailwind(hex);
    if (!coloresActuales.includes(claseTailwind)) {
      setColoresActuales([...coloresActuales, claseTailwind]);
    }
  };

  const eliminarColor = (index) => {
    setColoresActuales(coloresActuales.filter((_, i) => i !== index));
  };

  const guardarProducto = (e) => {
    e.preventDefault();
    const nuevoObj = {
      id: productoEditandoId ? productoEditandoId : Date.now(),
      nombre: formProducto.nombre,
      categoria: formProducto.categoria,
      precio: parseFloat(formProducto.precio),
      precioAnterior: formProducto.precioAnterior
        ? parseFloat(formProducto.precioAnterior)
        : null,
      etiqueta: formProducto.etiqueta || null,
      claseEtiqueta: obtenerClaseEtiqueta(formProducto.etiqueta),
      colores: coloresActuales,
      imagen: formProducto.imagen,
    };

    if (productoEditandoId) {
      setProductos(productos.map((p) => (p.id === productoEditandoId ? nuevoObj : p)));
    } else {
      setProductos([...productos, nuevoObj]);
    }
    setModalProductoAbierto(false);
  };

  const eliminarProducto = (id) => {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      setProductos(productos.filter((p) => p.id !== id));
    }
  };

  // --- HANDLERS DE PEDIDOS ---
  const toggleDetalle = (id) => {
    setDetallesAbiertos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const actualizarEstadoPedido = (id, nuevoEstado) => {
    setPedidos(
      pedidos.map((ped) => (ped.id === id ? { ...ped, estado: nuevoEstado } : ped))
    );
  };

  // --- HANDLERS DE USUARIOS ---
  const abrirModalEditarUsuario = (usuario) => {
    setFormUsuario({
      id: usuario.id,
      nombre: usuario.nombre || "",
      email: usuario.email || "",
      rol: usuario.rol || "USER",
      password: "",
    });
    setModalUsuarioAbierto(true);
  };

  const guardarUsuario = (e) => {
    e.preventDefault();
    setUsuarios(
      usuarios.map((u) =>
        u.id === formUsuario.id
          ? {
              ...u,
              nombre: formUsuario.nombre,
              email: formUsuario.email,
              rol: formUsuario.rol,
            }
          : u
      )
    );
    setModalUsuarioAbierto(false);
  };

  const eliminarUsuario = (id) => {
    if (confirm("¿Seguro que deseas eliminar esta cuenta de usuario?")) {
      setUsuarios(usuarios.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-sans antialiased flex flex-col min-h-screen">
      {/* <Header /> */}

      {/* Banner Superior */}
      <div className="bg-[#0f1115] text-white pt-10 pb-12 px-4 sm:px-6 md:px-12 w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] font-bold tracking-[0.15em] text-blue-500 uppercase block mb-3">
              Panel de Control
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
              Dashboard Admin
            </h1>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Gestiona los pedidos de la tienda, actualiza los estados de envío y
              administra la plataforma.
            </p>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <main className="grow max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 w-full -mt-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <span className="text-blue-600 text-xs font-bold tracking-widest uppercase block mb-1">
              GESTIÓN INTERNA
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter">
              Panel Central
            </h1>
          </div>

          {/* Navegación por Tabs */}
          <div className="inline-flex bg-gray-200 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab("productos")}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "productos"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <i className="fas fa-box-open mr-2"></i>Productos ({productos.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("pedidos")}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "pedidos"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <i className="fas fa-shopping-bag mr-2"></i>Pedidos ({pedidos.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("usuarios")}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === "usuarios"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <i className="fas fa-users mr-2"></i>Usuarios ({usuarios.length})
            </button>
          </div>
        </div>

        {/* ================= SECCIÓN PRODUCTOS ================= */}
        {activeTab === "productos" && (
          <section className="space-y-6">
            <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div>
                <h2 className="font-bold text-lg">Inventario de Productos</h2>
                <p className="text-xs text-gray-500">
                  Agrega, consulta, actualiza o elimina prendas del catálogo en
                  tiempo real.
                </p>
              </div>
              <button
                type="button"
                onClick={abrirModalCrearProducto}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors flex items-center shadow-sm"
              >
                <i className="fas fa-plus mr-2"></i> Nuevo Producto
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    <th className="p-4">ID</th>
                    <th className="p-4">Producto</th>
                    <th className="p-4">Categoría</th>
                    <th className="p-4">Precio</th>
                    <th className="p-4">Etiqueta</th>
                    <th className="p-4">Colores</th>
                    <th className="p-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {productos.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-mono text-xs text-gray-400">
                        #{p.id}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={p.imagen}
                            alt={p.nombre}
                            className="w-11 h-14 object-cover rounded border border-gray-200 shrink-0"
                          />
                          <span className="font-bold text-gray-900">
                            {p.nombre}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                          {p.categoria}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-black text-gray-900">
                          S/ {Number(p.precio).toFixed(2)}
                        </span>
                        {p.precioAnterior && (
                          <span className="text-xs text-gray-400 line-through ml-1">
                            S/ {Number(p.precioAnterior).toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        {p.etiqueta ? (
                          <span
                            className={`text-white text-[10px] font-bold px-2.5 py-1 uppercase rounded-sm ${p.claseEtiqueta}`}
                          >
                            {p.etiqueta}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400 italic">
                            Sin etiqueta
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1.5">
                          {p.colores.map((c, idx) => (
                            <span
                              key={idx}
                              style={{ backgroundColor: tailwindAHex(c) }}
                              className="w-4 h-4 rounded-full border border-gray-300"
                            />
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => abrirModalEditarProducto(p)}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors"
                        >
                          <i className="fas fa-pen mr-1"></i> Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => eliminarProducto(p.id)}
                          className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors"
                        >
                          <i className="fas fa-trash mr-1"></i> Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ================= SECCIÓN PEDIDOS ================= */}
        {activeTab === "pedidos" && (
          <section className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
              <div>
                <h2 className="font-bold text-lg">Gestión Avanzada de Pedidos</h2>
                <p className="text-xs text-gray-500">
                  Revisa los detalles de cada compra, los productos solicitados y
                  actualiza el estado de envío.
                </p>
              </div>
            </div>

            {pedidos.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <i className="fas fa-inbox text-4xl text-gray-300 mb-3 block"></i>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  No hay pedidos registrados
                </h3>
                <p className="text-sm text-gray-500">
                  Las compras de tus clientes aparecerán aquí automáticamente.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {pedidos.map((pedido) => {
                  const estaAbierto = !!detallesAbiertos[pedido.id];
                  return (
                    <div
                      key={pedido.id}
                      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 flex flex-col lg:flex-row justify-between gap-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1d4ed8] flex items-center justify-center shrink-0">
                            <i className="fas fa-shopping-bag text-lg"></i>
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-black text-lg text-gray-900">
                                LB-2026-0{pedido.id}
                              </span>
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
                            <p className="text-xs text-gray-500 mb-3">
                              <span>{pedido.fechaCreacion}</span> ·{" "}
                              <span>{pedido.detalles.length} productos</span>
                            </p>

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

                        <div className="flex flex-col items-start lg:items-end justify-between border-t border-gray-100 lg:border-0 pt-4 lg:pt-0 gap-4 lg:gap-0 w-full lg:w-auto">
                          <div className="flex items-center gap-2 w-full lg:w-auto">
                            <select
                              value={pedido.estado}
                              onChange={(e) =>
                                actualizarEstadoPedido(pedido.id, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs font-bold rounded-lg focus:ring-[#1d4ed8] focus:border-[#1d4ed8] block py-2 px-3 outline-none cursor-pointer grow lg:grow-0"
                            >
                              <option value="Confirmado">Confirmado</option>
                              <option value="En camino">En camino</option>
                              <option value="Entregado">Entregado</option>
                              <option value="Cancelado">Cancelado</option>
                            </select>
                            <button
                              type="button"
                              onClick={() =>
                                alert(`Estado de pedido LB-2026-0${pedido.id} actualizado`)
                              }
                              className="bg-[#0f1115] hover:bg-black text-white font-bold py-2 px-4 rounded-lg text-xs transition-colors shadow-sm whitespace-nowrap"
                            >
                              Actualizar
                            </button>
                          </div>

                          <div className="flex items-end justify-between w-full lg:w-auto lg:flex-col lg:items-end gap-2 mt-2">
                            <div className="text-left lg:text-right">
                              <span className="font-black text-xl text-gray-900 block">
                                S/ {Number(pedido.total).toFixed(2)}
                              </span>
                              <span className="text-[10px] text-gray-400 uppercase tracking-wider block mt-0.5">
                                Pagado vía Web
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleDetalle(pedido.id)}
                              className="text-xs font-bold text-[#1d4ed8] flex items-center gap-1.5 hover:text-blue-800 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg"
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
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                              Productos del Pedido
                            </h4>
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
                                        className="w-16 h-20 object-cover rounded-lg shrink-0 border border-gray-200 bg-white shadow-sm"
                                      />
                                    ) : (
                                      <div className="w-16 h-20 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
                                        <i className="fas fa-tshirt text-gray-400"></i>
                                      </div>
                                    )}
                                    <div>
                                      <h4 className="font-bold text-sm text-gray-900">
                                        {detalle.producto.nombre}
                                      </h4>
                                      <p className="text-xs text-gray-500 mt-1">
                                        Talla {detalle.talla} · {detalle.color}
                                      </p>
                                      <p className="text-xs font-medium text-gray-600 mt-1">
                                        Cantidad: {detalle.cantidad}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="font-bold text-sm text-gray-900">
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
                            <div className="md:text-right border-t border-gray-100 md:border-0 w-full md:w-auto pt-4 md:pt-0">
                              <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block mb-1.5">
                                Datos del Cliente
                              </span>
                              <p className="text-sm font-bold text-gray-900 mb-0.5">
                                {pedido.usuario.nombre}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                ID: #{pedido.usuario.id} ·{" "}
                                {pedido.usuario.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* ================= SECCIÓN USUARIOS ================= */}
        {activeTab === "usuarios" && (
          <section className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
              <div>
                <h2 className="font-bold text-lg">Usuarios Registrados</h2>
                <p className="text-xs text-gray-500">
                  Visualiza las cuentas registradas, modifica sus datos/roles o
                  da de baja usuarios.
                </p>
              </div>
              <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-medium hidden sm:block">
                El registro de nuevas cuentas se realiza desde el formulario
                público.
              </span>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    <th className="p-4">ID</th>
                    <th className="p-4">Usuario</th>
                    <th className="p-4">Correo Electrónico</th>
                    <th className="p-4">Rol</th>
                    <th className="p-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {usuarios.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-mono text-xs text-gray-400">
                        #{u.id}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                            <span>
                              {u.nombre && u.nombre.length > 0
                                ? u.nombre.charAt(0).toUpperCase()
                                : "U"}
                            </span>
                          </div>
                          <span className="font-bold text-gray-900">
                            {u.nombre}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{u.email}</td>
                      <td className="p-4">
                        {u.rol === "ADMIN" ? (
                          <span className="px-2.5 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-full">
                            ADMIN
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 font-medium text-xs rounded-full">
                            {u.rol}
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => abrirModalEditarUsuario(u)}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors"
                        >
                          <i className="fas fa-user-pen mr-1"></i> Editar
                        </button>
                        {SESION_ACTUAL_ID !== u.id ? (
                          <button
                            type="button"
                            onClick={() => eliminarUsuario(u.id)}
                            className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors"
                          >
                            <i className="fas fa-trash mr-1"></i> Eliminar
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400 italic px-2">
                            Sesión actual
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      {/* ================= MODAL CREAR / EDITAR PRODUCTO ================= */}
      {modalProductoAbierto && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px] px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-7 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setModalProductoAbierto(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-black"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
            <h3 className="text-2xl font-black tracking-tight mb-5">
              {productoEditandoId
                ? `Editar Producto #${productoEditandoId}`
                : "Nuevo Producto"}
            </h3>
            <form onSubmit={guardarProducto} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={formProducto.nombre}
                    onChange={(e) =>
                      setFormProducto({ ...formProducto, nombre: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Categoría *
                  </label>
                  <select
                    value={formProducto.categoria}
                    onChange={(e) =>
                      setFormProducto({
                        ...formProducto,
                        categoria: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm bg-white"
                  >
                    <option value="Polos">Polos</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Pantalones">Pantalones</option>
                    <option value="Chaquetas">Chaquetas</option>
                    <option value="Shorts">Shorts</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Precio (S/) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formProducto.precio}
                    onChange={(e) =>
                      setFormProducto({ ...formProducto, precio: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Precio Anterior
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formProducto.precioAnterior}
                    onChange={(e) =>
                      setFormProducto({
                        ...formProducto,
                        precioAnterior: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Etiqueta
                  </label>
                  <select
                    value={formProducto.etiqueta}
                    onChange={(e) =>
                      setFormProducto({
                        ...formProducto,
                        etiqueta: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm bg-white"
                  >
                    <option value="">Sin etiqueta</option>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Más vendido">Más vendido</option>
                    <option value="Últimas unidades">Últimas unidades</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Agregar Color (HEX)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={
                        /^#[0-9A-Fa-f]{6}$/.test(colorHexInput)
                          ? colorHexInput
                          : "#000000"
                      }
                      onChange={(e) =>
                        setColorHexInput(e.target.value.toUpperCase())
                      }
                      className="w-10 h-10.5 rounded-lg border border-gray-300 cursor-pointer p-0.5 bg-white shrink-0"
                    />
                    <input
                      type="text"
                      value={colorHexInput}
                      placeholder="#000000"
                      maxLength={7}
                      onChange={(e) => setColorHexInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          agregarColorHex();
                        }
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-mono uppercase"
                    />
                    <button
                      type="button"
                      onClick={agregarColorHex}
                      className="px-3.5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-lg text-sm font-bold transition-colors shrink-0"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  Colores seleccionados
                </label>
                <div className="flex flex-wrap gap-2 p-2.5 min-h-11 border border-gray-200 rounded-lg bg-gray-50 items-center">
                  {coloresActuales.length === 0 ? (
                    <span className="text-xs text-gray-400 italic">
                      Sin colores asignados. Agrega uno arriba.
                    </span>
                  ) : (
                    coloresActuales.map((clase, index) => {
                      const hex = tailwindAHex(clase);
                      return (
                        <div
                          key={index}
                          className="inline-flex items-center gap-1.5 bg-white border border-gray-300 rounded-full pl-1.5 pr-2.5 py-1 text-xs font-mono shadow-sm"
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: hex }}
                          />
                          <span className="text-gray-700 font-bold">{hex}</span>
                          <button
                            type="button"
                            onClick={() => eliminarColor(index)}
                            className="text-gray-400 hover:text-red-500 ml-1 focus:outline-none"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  URL de Imagen *
                </label>
                <input
                  type="url"
                  required
                  value={formProducto.imagen}
                  onChange={(e) =>
                    setFormProducto({ ...formProducto, imagen: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalProductoAbierto(false)}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-bold text-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL EDITAR USUARIO ================= */}
      {modalUsuarioAbierto && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px] px-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-7 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setModalUsuarioAbierto(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-black"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
            <h3 className="text-2xl font-black tracking-tight mb-5">
              Editar Usuario
            </h3>
            <form onSubmit={guardarUsuario} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formUsuario.nombre}
                  onChange={(e) =>
                    setFormUsuario({ ...formUsuario, nombre: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={formUsuario.email}
                  onChange={(e) =>
                    setFormUsuario({ ...formUsuario, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Rol *
                </label>
                <select
                  value={formUsuario.rol}
                  onChange={(e) =>
                    setFormUsuario({ ...formUsuario, rol: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm bg-white"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Nueva Contraseña (Opcional)
                </label>
                <input
                  type="password"
                  placeholder="Dejar en blanco para mantener actual"
                  value={formUsuario.password}
                  onChange={(e) =>
                    setFormUsuario({ ...formUsuario, password: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalUsuarioAbierto(false)}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-bold text-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}