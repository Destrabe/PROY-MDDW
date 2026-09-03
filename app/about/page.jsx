import React from "react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen w-full font-sans">
      <section
        className="relative bg-[#0B101B] w-full pt-16 pb-32 px-6 lg:px-12 border-b border-slate-800"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
        }}
      >
        <div className="max-w-360 mx-auto relative z-10">
          <div className="text-slate-500 text-sm mb-16">
            <a href="/" className="hover:text-white transition-colors">
              Inicio
            </a>
            <span className="mx-2">›</span>
            <span className="text-slate-400">Sobre Nosotros</span>
          </div>
          <div className="max-w-3xl">
            <span className="text-blue-600 text-xs font-bold tracking-[0.2em] uppercase mb-6 block">
              LIMA, PERÚ · EST. 2021
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
              Ropa hecha para <br />
              <span className="text-blue-600">el ritmo</span> de Lima.
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl">
              Nació de una pregunta simple: ¿por qué en Lima es tan difícil
              encontrar ropa de calidad sin pagar precios de importación?
            </p>
          </div>
        </div>
      </section>
      <section className="w-full bg-slate-50 py-24 px-6 lg:px-12">
        <div className="max-w-360 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <h3 className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-8">
              NUESTRA HISTORIA
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
              Empezamos con tres prendas y una mesa en Barranco.
            </h2>
            <div className="space-y-6 text-slate-600 text-base leading-relaxed">
              <p>
                En 2021, dos amigos hartos de la ropa "básica" que no duraba más
                de tres lavadas decidieron hacerlo diferente. Sin inversores,
                sin local, con proveedores locales y mucho ensayo y error.
              </p>
              <p>
                Hoy Lima Basics viste a más de 500 personas en toda la ciudad.
                Seguimos trabajando con los mismos talleres de Gamarra con los
                que empezamos — solo que ahora les podemos hacer pedidos más
                grandes.
              </p>
              <p>
                Lo que no ha cambiado: cada pieza pasa por nuestras manos antes
                de llegar a las tuyas.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-100/80 p-8 rounded-xl border border-slate-200/60">
              <h4 className="text-4xl font-bold text-slate-900 mb-2">2021</h4>
              <p className="font-semibold text-slate-800 text-sm">
                Año de fundación
              </p>
              <p className="text-xs text-slate-500 mt-1">Barranco, Lima</p>
            </div>
            <div className="bg-slate-100/80 p-8 rounded-xl border border-slate-200/60">
              <h4 className="text-4xl font-bold text-slate-900 mb-2">500+</h4>
              <p className="font-semibold text-slate-800 text-sm">
                Clientes activos
              </p>
              <p className="text-xs text-slate-500 mt-1">En toda la ciudad</p>
            </div>
            <div className="bg-slate-100/80 p-8 rounded-xl border border-slate-200/60">
              <h4 className="text-4xl font-bold text-slate-900 mb-2">100%</h4>
              <p className="font-semibold text-slate-800 text-sm">
                Talleres locales
              </p>
              <p className="text-xs text-slate-500 mt-1">Gamarra y Ate</p>
            </div>
            <div className="bg-slate-100/80 p-8 rounded-xl border border-slate-200/60">
              <h4 className="text-4xl font-bold text-slate-900 mb-2">48h</h4>
              <p className="font-semibold text-slate-800 text-sm">
                Envío express
              </p>
              <p className="text-xs text-slate-500 mt-1">
                En Lima Metropolitana
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-slate-100/50 py-24 px-6 lg:px-12 border-t border-slate-200">
        <div className="max-w-360 mx-auto">
          <h3 className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-12">
            LO QUE NOS MUEVE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200/60">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <h4 className="font-bold text-slate-900 mb-3">
                Calidad sin excusas
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Usamos telas que sobreviven el clima de Lima — el frío garúa de
                julio y el calor de enero. Sin atajos.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200/60">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <h4 className="font-bold text-slate-900 mb-3">
                Producción local
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                El 100% de nuestras prendas se confecciona en Lima. Apoyamos
                talleres independientes de Gamarra y Ate.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200/60">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  ></path>
                </svg>
              </div>
              <h4 className="font-bold text-slate-900 mb-3">
                Diseño intencional
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Nada está de más. Cada bolsillo, costuras, proporción tiene una
                razón. Lo básico, pero pensado.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200/60">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
              </div>
              <h4 className="font-bold text-slate-900 mb-3">Precio justo</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Sin intermediarios que inflen el precio. Del taller a tu puerta,
                con un margen que nos permite seguir.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200/60">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <h4 className="font-bold text-slate-900 mb-3">
                Comunidad primero
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Nuestros mejores diseños nacen de conversaciones con clientes en
                el feed, en la tienda, en la calle.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200/60">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg>
              </div>
              <h4 className="font-bold text-slate-900 mb-3">
                Devoluciones sin drama
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                30 días para cambios sin preguntas. Si no te quedó bien, lo
                arreglamos.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-white py-24 px-6 lg:px-12 border-t border-slate-200">
        <div className="max-w-360 mx-auto">
          <h3 className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-12">
            EL EQUIPO
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
                MQ
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">
                  Mateo Quispe
                </h4>
                <p className="text-slate-500 text-sm">Co-fundador & Diseño</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-xl shrink-0">
                SH
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">
                  Sofía Herrera
                </h4>
                <p className="text-slate-500 text-sm">
                  Co-fundadora & Operaciones
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold text-xl shrink-0">
                DV
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">
                  Diego Vargas
                </h4>
                <p className="text-slate-500 text-sm">Producción & Calidad</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#0B101B] py-32 px-6 flex flex-col items-center justify-center text-center grow">
        <span className="text-blue-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-4 block">
          ¿LISTO?
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-tight">
          Conoce la colección.
        </h2>
        <a
          href="/catalog"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md font-semibold text-sm tracking-wide transition-colors flex items-center gap-2"
        >
          VER CATÁLOGO
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
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </a>
      </section>
    </div>
  );
}
