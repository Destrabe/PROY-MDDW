"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@/components/header";

const DISTRITOS_LIMA = [
  "Ancón",
  "Ate",
  "Barranco",
  "Breña",
  "Carabayllo",
  "Chaclacayo",
  "Chorrillos",
  "Cieneguilla",
  "Comas",
  "El Agustino",
  "Independencia",
  "Jesús María",
  "La Molina",
  "La Victoria",
  "Lima",
  "Lince",
  "Los Olivos",
  "Lurigancho",
  "Lurín",
  "Magdalena del Mar",
  "Miraflores",
  "Pachacámac",
  "Pucusana",
  "Pueblo Libre",
  "Puente Piedra",
  "Punta Hermosa",
  "Punta Negra",
  "Rímac",
  "San Bartolo",
  "San Borja",
  "San Isidro",
  "San Juan de Lurigancho",
  "San Juan de Miraflores",
  "San Luis",
  "San Martín de Porres",
  "San Miguel",
  "Santa Anita",
  "Santa María del Mar",
  "Santa Rosa",
  "Santiago de Surco",
  "Surquillo",
  "Villa El Salvador",
  "Villa María del Triunfo",
];

const METODOS_ENVIO = [
  {
    id: "estandar",
    nombre: "Envío Estándar en Lima",
    descripcion: "Entrega entre 2 a 3 días hábiles",
    costo: 8.0,
  },
  {
    id: "express",
    nombre: "Envío Express (24 horas)",
    descripcion: "Recíbelo mañana mismo en tu dirección",
    costo: 15.0,
  },
  {
    id: "tienda",
    nombre: "Retiro en tienda Lima Basics",
    descripcion: "Sede Miraflores o San Miguel (Listo en 2 horas)",
    costo: 0.0,
  },
];

// Datos de prueba (Mock Data) del resumen del pedido
const MOCK_ITEMS = [
  {
    id: 1,
    producto: {
      nombre: "Polo Boxy Fit Heavyweight",
      imagen:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80",
    },
    color: "bg-black",
    talla: "M",
    cantidad: 2,
    subtotal: 139.8,
  },
  {
    id: 2,
    producto: {
      nombre: "Hoodie Oversized Essential",
      imagen:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&q=80",
    },
    color: "bg-white",
    talla: "L",
    cantidad: 1,
    subtotal: 149.0,
  },
];

export default function CheckoutPage() {
  // Estados de navegación de pasos (1: Datos, 2: Envío, 3: Pago)
  const [pasoActual, setPasoActual] = useState(1);

  // Estados Paso 1: Datos y Comprobante
  const [tipoComprobante, setTipoComprobante] = useState("boleta");
  const [tipoDoc, setTipoDoc] = useState("DNI");
  const [razonSocial, setRazonSocial] = useState("");
  const [numeroDoc, setNumeroDoc] = useState("");
  const [celular, setCelular] = useState("");
  const [nombres, setNombres] = useState("Dajhana");
  const [apellidos, setApellidos] = useState("Huaccha Egoavil");
  const [correo, setCorreo] = useState("dajhana@limabasics.pe");
  const [direccion, setDireccion] = useState("");
  const [distrito, setDistrito] = useState("");
  const [referencia, setReferencia] = useState("");

  // Dropdown de distritos
  const [distritosAbierto, setDistritosAbierto] = useState(false);
  const distritoContainerRef = useRef(null);

  // Estados Paso 2: Envío
  const [metodoEnvioId, setMetodoEnvioId] = useState("estandar");

  // Estados Paso 3: Pago y Modal
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [vencimientoTarjeta, setVencimientoTarjeta] = useState("");
  const [cvcTarjeta, setCvcTarjeta] = useState("");
  const [nombreTarjeta, setNombreTarjeta] = useState("");
  const [procesandoPago, setProcesandoPago] = useState(false);
  const [modalExitoAbierto, setModalExitoAbierto] = useState(false);

  // Cerrar dropdown de distritos al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        distritoContainerRef.current &&
        !distritoContainerRef.current.contains(event.target)
      ) {
        setDistritosAbierto(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Cálculos dinámicos del resumen
  const subtotalGlobal = MOCK_ITEMS.reduce(
    (acc, item) => acc + item.subtotal,
    0
  );
  const metodoSeleccionado =
    METODOS_ENVIO.find((m) => m.id === metodoEnvioId) || METODOS_ENVIO[0];
  const costoEnvioGlobal = metodoSeleccionado.costo;
  const igvCalculado =
    tipoComprobante === "factura"
      ? subtotalGlobal - subtotalGlobal / 1.18
      : 0;
  const totalFinal = subtotalGlobal + costoEnvioGlobal;

  // Cambio entre Boleta y Factura
  const seleccionarComprobante = (tipo) => {
    setTipoComprobante(tipo);
    if (tipo === "factura") {
      setTipoDoc("RUC");
      setNumeroDoc("");
    } else {
      setRazonSocial("");
      setTipoDoc("DNI");
      setNumeroDoc("");
    }
  };

  const cambiarTipoDoc = (nuevoTipo) => {
    setTipoDoc(nuevoTipo);
    setNumeroDoc("");
  };

  // Navegación entre pasos con validaciones visuales
  const irAPaso = (paso, e) => {
    if (e) e.preventDefault();

    if (paso === 2 && pasoActual === 1) {
      if (celular.length !== 9) {
        alert(
          "Por favor, ingresa un número de celular válido de exactamente 9 dígitos."
        );
        return;
      }
      if (!distrito) {
        alert("Por favor, selecciona un distrito para la entrega.");
        return;
      }
    }

    setPasoActual(paso);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Simulación visual de pago exitoso
  const finalizarCompra = (e) => {
    e.preventDefault();
    setProcesandoPago(true);
    setTimeout(() => {
      setProcesandoPago(false);
      setModalExitoAbierto(true);
    }, 600);
  };

  const obtenerNombreColor = (colorClase) => {
    if (colorClase === "bg-white") return "Blanco";
    if (colorClase === "bg-black") return "Negro";
    return "Elegido";
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-sans antialiased min-h-screen flex flex-col">
      {/* <Header /> */}

      <main className="grow max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-8 sm:pt-12 pb-8 w-full flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* ================= COLUMNA IZQUIERDA: PASOS Y FORMULARIOS ================= */}
        <div className="w-full lg:w-3/5 order-2 lg:order-1">
          {/* Indicador de 3 pasos */}
          <div className="flex items-center justify-between mb-8 sm:mb-10 px-2">
            {/* Paso 1 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center transition-colors ${
                  pasoActual >= 1
                    ? "bg-[#1d4ed8] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                1
              </div>
              <span
                className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase mt-2 ${
                  pasoActual >= 1 ? "text-gray-900" : "text-gray-400"
                }`}
              >
                Datos
              </span>
            </div>

            <div
              className={`w-16 sm:w-28 md:w-32 h-0.5 mx-2 sm:mx-4 -mt-4 sm:-mt-5 transition-colors ${
                pasoActual >= 2 ? "bg-[#1d4ed8]" : "bg-gray-200"
              }`}
            ></div>

            {/* Paso 2 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center transition-colors ${
                  pasoActual >= 2
                    ? "bg-[#1d4ed8] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
              <span
                className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase mt-2 ${
                  pasoActual >= 2 ? "text-gray-900" : "text-gray-400"
                }`}
              >
                Envío
              </span>
            </div>

            <div
              className={`w-16 sm:w-28 md:w-32 h-0.5 mx-2 sm:mx-4 -mt-4 sm:-mt-5 transition-colors ${
                pasoActual >= 3 ? "bg-[#1d4ed8]" : "bg-gray-200"
              }`}
            ></div>

            {/* Paso 3 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center transition-colors ${
                  pasoActual >= 3
                    ? "bg-[#1d4ed8] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>
              <span
                className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase mt-2 ${
                  pasoActual >= 3 ? "text-gray-900" : "text-gray-400"
                }`}
              >
                Pago
              </span>
            </div>
          </div>

          {/* Contenedor del Formulario Activo */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
            {/* ---------- FORMULARIO PASO 1: DATOS ---------- */}
            {pasoActual === 1 && (
              <form onSubmit={(e) => irAPaso(2, e)}>
                {/* Selector Boleta / Factura */}
                <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 mb-6 bg-gray-100 p-1.5 rounded-lg w-full sm:w-fit mx-auto sm:mx-0">
                  <button
                    type="button"
                    onClick={() => seleccionarComprobante("boleta")}
                    className={`w-full sm:w-auto px-6 sm:px-8 py-2.5 rounded-md text-sm font-bold transition-all ${
                      tipoComprobante === "boleta"
                        ? "bg-[#0f1115] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Boleta
                  </button>
                  <button
                    type="button"
                    onClick={() => seleccionarComprobante("factura")}
                    className={`w-full sm:w-auto px-6 sm:px-8 py-2.5 rounded-md text-sm font-bold transition-all ${
                      tipoComprobante === "factura"
                        ? "bg-[#0f1115] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Factura
                  </button>
                </div>

                <div className="space-y-5">
                  {/* Tipo de documento */}
                  <div>
                    <span className="block text-xs font-bold text-gray-900 mb-2.5">
                      Tipo de documento
                    </span>
                    <div className="flex items-center gap-6">
                      <label
                        className={`flex items-center gap-2 cursor-pointer text-sm font-medium ${
                          tipoDoc === "DNI" ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        <input
                          type="radio"
                          name="tipo_doc"
                          value="DNI"
                          checked={tipoDoc === "DNI"}
                          onChange={() => cambiarTipoDoc("DNI")}
                          className="accent-[#1d4ed8] w-4 h-4"
                        />
                        DNI
                      </label>
                      <label
                        className={`flex items-center gap-2 cursor-pointer text-sm font-medium ${
                          tipoDoc === "RUC" ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        <input
                          type="radio"
                          name="tipo_doc"
                          value="RUC"
                          checked={tipoDoc === "RUC"}
                          onChange={() => cambiarTipoDoc("RUC")}
                          className="accent-[#1d4ed8] w-4 h-4"
                        />
                        RUC
                      </label>
                    </div>
                  </div>

                  {/* Razón Social (solo si es Factura) */}
                  {tipoComprobante === "factura" && (
                    <div>
                      <label className="block text-xs font-bold text-gray-900 mb-1.5">
                        Razón Social
                      </label>
                      <input
                        type="text"
                        required
                        value={razonSocial}
                        onChange={(e) => setRazonSocial(e.target.value)}
                        placeholder="Ej. Mi Empresa S.A.C."
                        className="w-full bg-[#f3f4f6] text-gray-900 text-sm rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#1d4ed8] transition-colors"
                      />
                    </div>
                  )}

                  {/* Documento y Celular */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-900 mb-1.5">
                        {tipoDoc === "RUC"
                          ? "RUC (11 dígitos)"
                          : "DNI (8 dígitos)"}
                      </label>
                      <input
                        type="text"
                        placeholder="Número de documento"
                        required
                        pattern={
                          tipoDoc === "RUC" ? "[0-9]{11}" : "[0-9]{8}"
                        }
                        maxLength={tipoDoc === "RUC" ? 11 : 8}
                        value={numeroDoc}
                        onChange={(e) =>
                          setNumeroDoc(e.target.value.replace(/[^0-9]/g, ""))
                        }
                        className="w-full bg-[#f3f4f6] text-gray-900 text-sm font-medium rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#1d4ed8] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-900 mb-1.5">
                        Celular (9 dígitos)
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. 987654321"
                        required
                        pattern="[0-9]{9}"
                        maxLength={9}
                        value={celular}
                        onChange={(e) =>
                          setCelular(e.target.value.replace(/[^0-9]/g, ""))
                        }
                        className="w-full bg-[#f3f4f6] text-gray-900 text-sm font-medium rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#1d4ed8] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Nombres y Apellidos */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-900 mb-1.5">
                        Nombres
                      </label>
                      <input
                        type="text"
                        placeholder="Tus nombres"
                        required
                        value={nombres}
                        onChange={(e) => setNombres(e.target.value)}
                        className="w-full bg-[#f3f4f6] text-gray-900 text-sm font-medium rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#1d4ed8] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-900 mb-1.5">
                        Apellidos
                      </label>
                      <input
                        type="text"
                        placeholder="Tus apellidos completos"
                        required
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        className="w-full bg-[#f3f4f6] text-gray-900 text-sm font-medium rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#1d4ed8] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Correo electrónico */}
                  <div>
                    <label className="block text-xs font-bold text-gray-900 mb-1.5">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      required
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      className="w-full bg-[#f3f4f6] text-gray-900 text-sm font-medium rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#1d4ed8] transition-colors"
                    />
                  </div>

                  {/* Dirección de entrega */}
                  <div>
                    <label className="block text-xs font-bold text-gray-900 mb-1.5">
                      Dirección de entrega
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Av. Javier Prado Este 123, Dpto 401"
                      required
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      className="w-full bg-[#f3f4f6] text-gray-900 text-sm font-medium rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#1d4ed8] transition-colors"
                    />
                  </div>

                  {/* Distrito y Referencia */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-900 mb-1.5">
                        Distrito
                      </label>
                      <div className="relative" ref={distritoContainerRef}>
                        <button
                          type="button"
                          onClick={() => setDistritosAbierto(!distritosAbierto)}
                          className="w-full bg-white text-gray-900 text-sm font-medium rounded-lg px-4 py-3 outline-none border border-gray-300 focus:border-[#1d4ed8] transition-colors cursor-pointer flex justify-between items-center shadow-sm"
                        >
                          <span
                            className={
                              distrito ? "text-gray-900" : "text-gray-500"
                            }
                          >
                            {distrito || "Selecciona un distrito"}
                          </span>
                          <i
                            className={`fas fa-chevron-down text-gray-500 text-xs transition-transform duration-200 ${
                              distritosAbierto ? "rotate-180" : "rotate-0"
                            }`}
                          ></i>
                        </button>

                        {distritosAbierto && (
                          <ul className="absolute bottom-full mb-1 z-10 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-56 overflow-y-auto">
                            {DISTRITOS_LIMA.map((dist) => (
                              <li
                                key={dist}
                                onClick={() => {
                                  setDistrito(dist);
                                  setDistritosAbierto(false);
                                }}
                                className="px-4 py-2.5 text-sm hover:bg-[#f3f4f6] cursor-pointer transition-colors text-gray-700 font-medium"
                              >
                                {dist}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-900 mb-1.5">
                        Referencia (opcional)
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Frente al parque principal"
                        value={referencia}
                        onChange={(e) => setReferencia(e.target.value)}
                        className="w-full bg-[#f3f4f6] text-gray-900 text-sm font-medium rounded-lg px-4 py-3 outline-none border border-transparent focus:border-[#1d4ed8] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1d4ed8] hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-xl mt-8 text-sm transition-colors shadow-md"
                >
                  Continuar con el envío &rarr;
                </button>
              </form>
            )}

            {/* ---------- FORMULARIO PASO 2: ENVÍO ---------- */}
            {pasoActual === 2 && (
              <form onSubmit={(e) => irAPaso(3, e)}>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">
                  Método de envío
                </h2>

                <div className="space-y-4 mb-6">
                  {METODOS_ENVIO.map((metodo) => {
                    const seleccionado = metodoEnvioId === metodo.id;
                    return (
                      <label
                        key={metodo.id}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border-2 bg-white cursor-pointer transition-all gap-3 ${
                          seleccionado
                            ? "border-[#1d4ed8]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start sm:items-center gap-3.5">
                          <input
                            type="radio"
                            name="metodoEnvio"
                            value={metodo.nombre}
                            checked={seleccionado}
                            onChange={() => setMetodoEnvioId(metodo.id)}
                            className="accent-[#1d4ed8] w-4 h-4 mt-1 sm:mt-0 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-sm text-gray-900">
                              {metodo.nombre}
                            </p>
                            <p className="text-xs text-gray-500">
                              {metodo.descripcion}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`font-bold text-sm sm:text-right pl-7 sm:pl-0 ${
                            metodo.costo === 0
                              ? "text-green-600"
                              : "text-gray-900"
                          }`}
                        >
                          {metodo.costo === 0
                            ? "Gratis"
                            : `S/ ${metodo.costo.toFixed(2)}`}
                        </span>
                      </label>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => irAPaso(1)}
                    className="w-1/3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl text-sm transition-colors"
                  >
                    &larr; Volver
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-[#1d4ed8] hover:bg-blue-800 text-white font-bold py-4 rounded-xl text-sm transition-colors shadow-md"
                  >
                    Continuar al pago &rarr;
                  </button>
                </div>
              </form>
            )}

            {/* ---------- FORMULARIO PASO 3: PAGO ---------- */}
            {pasoActual === 3 && (
              <form autoComplete="off" onSubmit={finalizarCompra}>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">
                  Método de pago
                </h2>

                <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 mb-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-credit-card text-[#1d4ed8] text-xl"></i>
                      <span className="font-bold text-sm text-gray-900">
                        Tarjeta de crédito o débito
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-8 h-5 bg-gray-200 rounded text-[8px] flex items-center justify-center font-bold text-gray-500">
                        VISA
                      </div>
                      <div className="w-8 h-5 bg-gray-200 rounded text-[8px] flex items-center justify-center font-bold text-gray-500">
                        MC
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                      Número de tarjeta
                    </label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      autoComplete="cc-number"
                      required
                      value={numeroTarjeta}
                      onChange={(e) =>
                        setNumeroTarjeta(
                          e.target.value.replace(/[^0-9\s]/g, "")
                        )
                      }
                      className="w-full bg-[#f9fafb] text-gray-900 text-sm font-medium rounded-lg px-4 py-3 outline-none border border-gray-200 focus:border-[#1d4ed8] transition-colors font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                        Vencimiento
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        maxLength={5}
                        autoComplete="cc-exp"
                        required
                        value={vencimientoTarjeta}
                        onChange={(e) =>
                          setVencimientoTarjeta(
                            e.target.value.replace(/[^0-9/]/g, "")
                          )
                        }
                        className="w-full bg-[#f9fafb] text-gray-900 text-sm font-medium rounded-lg px-4 py-3 outline-none border border-gray-200 focus:border-[#1d4ed8] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        autoComplete="cc-csc"
                        required
                        value={cvcTarjeta}
                        onChange={(e) =>
                          setCvcTarjeta(e.target.value.replace(/[^0-9]/g, ""))
                        }
                        className="w-full bg-[#f9fafb] text-gray-900 text-sm font-medium rounded-lg px-4 py-3 outline-none border border-gray-200 focus:border-[#1d4ed8] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                      Nombre en la tarjeta
                    </label>
                    <input
                      type="text"
                      placeholder="Como aparece en la tarjeta"
                      autoComplete="cc-name"
                      required
                      value={nombreTarjeta}
                      onChange={(e) => setNombreTarjeta(e.target.value)}
                      className="w-full bg-[#f9fafb] text-gray-900 text-sm font-medium rounded-lg px-4 py-3 outline-none border border-gray-200 focus:border-[#1d4ed8] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => irAPaso(2)}
                    className="w-1/3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-xl text-sm transition-colors"
                  >
                    &larr; Envío
                  </button>
                  <button
                    type="submit"
                    disabled={procesandoPago}
                    className="w-2/3 bg-[#0f1115] hover:bg-black text-white font-bold py-4 rounded-xl text-sm transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {procesandoPago ? (
                      "Procesando..."
                    ) : (
                      <>
                        <i className="fas fa-lock text-xs text-gray-400"></i>{" "}
                        Pagar ahora
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ================= COLUMNA DERECHA: RESUMEN DEL PEDIDO ================= */}
        <div className="w-full lg:w-2/5 order-1 lg:order-2">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm sticky top-24 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 p-5">
              <h3 className="font-black tracking-tight text-lg text-gray-900">
                Resumen del pedido
              </h3>
            </div>

            <div className="p-6">
              <div className="max-h-80 overflow-y-auto pr-2 space-y-4 mb-6">
                {MOCK_ITEMS.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-20 shrink-0">
                      {item.producto.imagen ? (
                        <img
                          src={item.producto.imagen}
                          alt={item.producto.nombre}
                          className="w-full h-full object-cover rounded-lg border border-gray-200"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                          <i className="fas fa-tshirt text-gray-300"></i>
                        </div>
                      )}
                      <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                        {item.cantidad}
                      </span>
                    </div>

                    <div className="grow flex flex-col justify-center">
                      <h4 className="font-bold text-sm text-gray-900 leading-tight mb-1">
                        {item.producto.nombre}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-medium">
                        <span>
                          Color · {obtenerNombreColor(item.color)}
                        </span>
                        <span className="mx-1">|</span>
                        <span>Talla · {item.talla}</span>
                      </p>
                    </div>

                    <div className="flex flex-col justify-center items-end">
                      <span className="font-bold text-sm text-gray-900">
                        S/ {item.subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900">
                    S/ {subtotalGlobal.toFixed(2)}
                  </span>
                </div>

                {tipoComprobante === "factura" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">IGV (18%)</span>
                    <span className="font-bold text-gray-900">
                      S/ {igvCalculado.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Envío</span>
                  <span className="font-bold text-gray-900">
                    {costoEnvioGlobal === 0
                      ? "Gratis"
                      : `S/ ${costoEnvioGlobal.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-5 pt-5 flex justify-between items-end">
                <span className="font-black text-lg text-gray-900">Total</span>
                <span className="font-black text-2xl text-[#1d4ed8]">
                  S/ {totalFinal.toFixed(2)}
                </span>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 bg-gray-50 py-2.5 rounded-lg border border-gray-100 uppercase tracking-wider">
                <i className="fas fa-lock"></i> Transacción protegida · SSL 256-bit
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ================= MODAL DE PAGO EXITOSO ================= */}
      {modalExitoAbierto && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl text-center transform scale-100 transition-transform">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-check text-4xl text-green-500"></i>
            </div>
            <h3 className="text-3xl font-black tracking-tight mb-2">
              ¡Pago exitoso!
            </h3>
            <p className="text-gray-500 text-sm mb-8">
              Tu pedido ha sido procesado correctamente. Recibirás un correo con
              los detalles de tu compra.
            </p>
            <Link
              href="/orders"
              className="block w-full bg-[#1d4ed8] hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-colors shadow-md"
            >
              Ver mis pedidos
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}