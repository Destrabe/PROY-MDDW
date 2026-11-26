"use client";

import React, { useState, useRef } from "react";

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
  const [productos, setProductos] = useState(MOCK_PRODUCTOS);
  const [pedidos, setPedidos] = useState(MOCK_PEDIDOS);
  const [usuarios, setUsuarios] = useState(MOCK_USUARIOS);

  const [activeTab, setActiveTab] = useState("productos");
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
  });
  const [coloresActuales, setColoresActuales] = useState(["bg-white", "bg-black"]);
  const [colorHexInput, setColorHexInput] = useState("#000000");

  // Estados para subida de archivo de imagen
  const [imagenVistaPrevia, setImagenVistaPrevia] = useState("");
  const fileInputRef = useRef(null);

  // Estados del Modal de Usuario
  const [modalUsuarioAbierto, setModalUsuarioAbierto] = useState(false);
  const [formUsuario, setFormUsuario] = useState({
    id: null,
    nombre: "",
    email: "",
    rol: "USER",
    password: "",
  });

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

  // --- HANDLERS DE IMAGEN ---
  const procesarArchivoImagen = (archivo) => {
    if (!archivo) return;
    if (!archivo.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen válido (JPG, PNG, WEBP).");
      return;
    }
    setImagenVistaPrevia(URL.createObjectURL(archivo));
  };

  const manejarSeleccionImagen = (e) => {
    procesarArchivoImagen(e.target.files?.[0]);
  };

  const manejarSoltarImagen = (e) => {
    e.preventDefault();
    procesarArchivoImagen(e.dataTransfer.files?.[0]);
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
    });
    setColorHexInput("#000000");
    setColoresActuales(["bg-white", "bg-black"]);
    setImagenVistaPrevia("");
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
    });
    setColorHexInput("#000000");
    setColoresActuales(producto.colores ? [...producto.colores] : []);
    setImagenVistaPrevia(producto.imagen || "");
    setModalProductoAbierto(true);
  };

  const agregarColorHex = () => {
    let hex = colorHexInput.trim().toUpperCase();
    if (!hex.startsWith("#")) hex = "#" + hex;
    if (!/^#([0-9A-F]{3}|[0-9A-F]{6})$/.test(hex)) {
      alert("Ingresa un código HEX válido (por ejemplo: #DDBEA9)");
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
    if (!imagenVistaPrevia) {
      alert("Por favor sube una imagen para el producto.");
      return;
    }

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
      imagen: imagenVistaPrevia,
    };

    if (productoEditandoId) {
      setProductos(
        productos.map((p) => (p.id === productoEditandoId ? nuevoObj : p))
      );
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
      pedidos.map((ped) =>
        ped.id === id ? { ...ped, estado: nuevoEstado } : ped
      )
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
    <div className="bg-gray-50 text-gray-900 font-sans antialiased flex flex-col min-h-screen w-full overflow-x-hidden">
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
      <main className="grow max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <span className="text-blue-600 text-xs font-bold tracking-widest uppercase block mb-1">
              GESTIÓN INTERNA
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter">
              Panel Central
            </h1>
          </div>

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
              Productos ({productos.length})
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
              Pedidos ({pedidos.length})
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
              Usuarios ({usuarios.length})
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
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>+</span> Nuevo Producto
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
                            className="w-11 h-14 object-cover rounded border border-gray-200 shrink-0 bg-gray-50"
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
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => eliminarProducto(p.id)}
                          className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors"
                        >
                          Borrar
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
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="font-bold text-lg">Gestión Avanzada de Pedidos</h2>
              <p className="text-xs text-gray-500">
                Revisa los detalles de cada compra y actualiza el estado de
                envío.
              </p>
            </div>

            <div className="space-y-4">
              {pedidos.map((pedido) => {
                const estaAbierto = !!detallesAbiertos[pedido.id];
                return (
                  <div
                    key={pedido.id}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                  >
                    <div className="p-5 flex flex-col lg:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-black text-lg text-gray-900">
                            LB-2026-0{pedido.id}
                          </span>
                          <span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                            {pedido.estado}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {pedido.fechaCreacion} · {pedido.detalles.length}{" "}
                          productos
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={pedido.estado}
                          onChange={(e) =>
                            actualizarEstadoPedido(pedido.id, e.target.value)
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs font-bold rounded-lg py-2 px-3"
                        >
                          <option value="Confirmado">Confirmado</option>
                          <option value="En camino">En camino</option>
                          <option value="Entregado">Entregado</option>
                          <option value="Cancelado">Cancelado</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => toggleDetalle(pedido.id)}
                          className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg"
                        >
                          {estaAbierto ? "Ocultar detalle" : "Ver detalle"}
                        </button>
                      </div>
                    </div>

                    {estaAbierto && (
                      <div className="p-5 bg-gray-50 border-t border-gray-100 text-xs text-gray-600 space-y-2">
                        <p>
                          <strong>Cliente:</strong> {pedido.usuario.nombre} (
                          {pedido.usuario.email})
                        </p>
                        <p>
                          <strong>Envío:</strong> {pedido.metodoEnvio} —{" "}
                          {pedido.direccionEnvio}
                        </p>
                        <p>
                          <strong>Total:</strong> S/{" "}
                          {Number(pedido.total).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ================= SECCIÓN USUARIOS ================= */}
        {activeTab === "usuarios" && (
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  <th className="p-4">ID</th>
                  <th className="p-4">Usuario</th>
                  <th className="p-4">Correo</th>
                  <th className="p-4">Rol</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {usuarios.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="p-4 font-mono text-xs text-gray-400">
                      #{u.id}
                    </td>
                    <td className="p-4 font-bold text-gray-900">{u.nombre}</td>
                    <td className="p-4 text-gray-600">{u.email}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-full">
                        {u.rol}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => abrirModalEditarUsuario(u)}
                        className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold"
                      >
                        Editar
                      </button>
                      {SESION_ACTUAL_ID !== u.id && (
                        <button
                          type="button"
                          onClick={() => eliminarUsuario(u.id)}
                          className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold"
                        >
                          Eliminar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>

      {/* ================= MODAL CREAR / EDITAR PRODUCTO (FIJO Y COMPACTO) ================= */}
      {modalProductoAbierto && (
        <div
          onClick={() => setModalProductoAbierto(false)}
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
            className="bg-white rounded-2xl w-full max-w-md p-5 relative shadow-2xl mx-auto"
          >
            {/* Botón cerrar */}
            <button
              type="button"
              onClick={() => setModalProductoAbierto(false)}
              aria-label="Cerrar modal"
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black flex items-center justify-center transition-colors font-bold text-xs"
            >
              ✕
            </button>

            <h3 className="text-lg font-black tracking-tight mb-3 pr-8">
              {productoEditandoId
                ? `Editar Producto #${productoEditandoId}`
                : "Nuevo Producto"}
            </h3>

            <form onSubmit={guardarProducto} className="space-y-2.5">
              {/* Fila 1: Nombre y Categoría */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={formProducto.nombre}
                    onChange={(e) =>
                      setFormProducto({ ...formProducto, nombre: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
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
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs bg-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="Polos">Polos</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Pantalones">Pantalones</option>
                    <option value="Chaquetas">Chaquetas</option>
                    <option value="Shorts">Shorts</option>
                  </select>
                </div>
              </div>

              {/* Fila 2: Precio y Precio Anterior */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
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
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                    Precio Anterior
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formProducto.precioAnterior || ""}
                    onChange={(e) =>
                      setFormProducto({
                        ...formProducto,
                        precioAnterior: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Fila 3: Etiqueta y Color HEX */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                    Etiqueta
                  </label>
                  <select
                    value={formProducto.etiqueta || ""}
                    onChange={(e) =>
                      setFormProducto({
                        ...formProducto,
                        etiqueta: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs bg-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="">Sin etiqueta</option>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Más vendido">Más vendido</option>
                    <option value="Últimas unidades">Últimas unidades</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                    Agregar Color (HEX)
                  </label>
                  <div className="flex items-center gap-1">
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
                      className="w-7 h-7 rounded border border-gray-300 cursor-pointer p-0 bg-white shrink-0"
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
                      className="min-w-0 flex-1 border border-gray-300 rounded-lg px-2 py-1.5 text-xs font-mono uppercase focus:outline-none focus:border-blue-600"
                    />
                    <button
                      type="button"
                      onClick={agregarColorHex}
                      className="w-7 h-7 flex items-center justify-center bg-[#0f1115] hover:bg-black text-white rounded-lg text-xs font-bold shrink-0"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Fila 4: Colores seleccionados */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                  Colores seleccionados
                </label>
                <div className="flex flex-wrap gap-1.5 p-1.5 min-h-[34px] border border-gray-200 rounded-lg bg-gray-50 items-center">
                  {coloresActuales.length === 0 ? (
                    <span className="text-[11px] text-gray-400 italic px-1">
                      Sin colores asignados
                    </span>
                  ) : (
                    coloresActuales.map((clase, index) => {
                      const hex = tailwindAHex(clase);
                      return (
                        <div
                          key={index}
                          className="inline-flex items-center gap-1 bg-white border border-gray-300 rounded-full pl-1 pr-2 py-0.5 text-[10px] font-mono shadow-sm"
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-gray-300"
                            style={{ backgroundColor: hex }}
                          />
                          <span className="text-gray-700 font-bold">{hex}</span>
                          <button
                            type="button"
                            onClick={() => eliminarColor(index)}
                            className="text-gray-400 hover:text-red-500 ml-0.5 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Fila 5: Subir Archivo de Imagen (compacto) */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                  Imagen del Producto *
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={manejarSoltarImagen}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-xl px-3 py-2.5 cursor-pointer transition-colors bg-gray-50 flex items-center justify-between gap-3"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/jpeg,image/png,image/webp"
                    onChange={manejarSeleccionImagen}
                    className="hidden"
                  />

                  {imagenVistaPrevia ? (
                    <>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={imagenVistaPrevia}
                          alt="Vista previa"
                          className="w-9 h-11 object-cover rounded border border-gray-300 shrink-0 bg-white"
                        />
                        <div className="truncate">
                          <p className="text-xs font-bold text-gray-800 truncate">
                            Imagen seleccionada
                          </p>
                          <p className="text-[10px] text-blue-600 font-medium">
                            Clic para reemplazar archivo
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase bg-white border border-gray-200 px-2 py-1 rounded text-gray-600 shrink-0">
                        Cambiar
                      </span>
                    </>
                  ) : (
                    <div className="flex items-center gap-2.5 w-full">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
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
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-700">
                          Subir archivo de imagen o arrastrar aquí
                        </p>
                        <p className="text-[10px] text-gray-400">
                          JPG, PNG o WEBP
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalProductoAbierto(false)}
                  className="px-4 py-1.5 rounded-lg border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
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
        <div
          onClick={() => setModalUsuarioAbierto(false)}
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
            className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl mx-auto"
          >
            <button
              type="button"
              onClick={() => setModalUsuarioAbierto(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-xs"
            >
              ✕
            </button>
            <h3 className="text-lg font-black mb-4">Editar Usuario</h3>
            <form onSubmit={guardarUsuario} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formUsuario.nombre}
                  onChange={(e) =>
                    setFormUsuario({ ...formUsuario, nombre: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={formUsuario.email}
                  onChange={(e) =>
                    setFormUsuario({ ...formUsuario, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">
                  Rol *
                </label>
                <select
                  value={formUsuario.rol}
                  onChange={(e) =>
                    setFormUsuario({ ...formUsuario, rol: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs bg-white"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalUsuarioAbierto(false)}
                  className="px-4 py-1.5 border border-gray-300 rounded-lg text-xs font-bold text-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold"
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