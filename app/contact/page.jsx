import React from 'react';

export default function ContactoPage() {
  return (
    <div className="flex flex-col min-h-screen w-full font-sans">
      
      {/* 1. HERO OSCURO (Azul Marino Profundo) */}
      <section className="bg-[#0B101B] w-full pt-16 pb-24 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Breadcrumb */}
          <div className="text-slate-500 text-sm mb-12">
            <a href="#" className="hover:text-white transition-colors">Inicio</a>
            <span className="mx-2">›</span>
            <span className="text-slate-400">Contacto</span>
          </div>

          <div className="max-w-2xl">
            <span className="text-blue-600 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
              Escríbenos
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Hablemos.
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Preguntas sobre pedidos, tallas, envíos o simplemente quieres saludar — respondemos en menos de 24 horas.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN PRINCIPAL: INFO + FORMULARIO */}
      <section className="w-full bg-white py-20 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Columna Izquierda: Información */}
          <div className="lg:col-span-5">
            <h3 className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-10">
              Información
            </h3>
            
            <div className="space-y-8">
              {/* Tienda Física */}
              <div className="flex items-start gap-5">
                {/* Ícono con fondo celeste claro y azul royal */}
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor"><use href="/sprite.svg#location" /></svg>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-1">Tienda Física</h4>
                  <p className="text-slate-800 font-medium">Av. Larco 821, Miraflores<br />Lima, Perú</p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor"><use href="/sprite.svg#phone" /></svg>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-1">Teléfono / WhatsApp</h4>
                  <p className="text-slate-800 font-medium">+51 991 234 567</p>
                </div>
              </div>

              {/* Correo */}
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor"><use href="/sprite.svg#mail" /></svg>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-1">Correo Electrónico</h4>
                  <p className="text-slate-800 font-medium">hola@limabasics.pe</p>
                </div>
              </div>

              {/* Horario */}
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor"><use href="/sprite.svg#clock" /></svg>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-1">Horario de Atención</h4>
                  <p className="text-slate-800 font-medium">Lunes a Viernes<br />9:00 am – 6:00 pm</p>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-slate-100 my-10"></div>

            {/* Redes Sociales */}
            <h3 className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-6">
              Síguenos
            </h3>
            <div className="flex gap-4">
              <a href="#" className="border border-slate-200 rounded p-4 w-32 hover:border-blue-300 transition-colors group">
                <p className="font-bold text-slate-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">Instagram</p>
                <p className="text-xs text-slate-500">@limabasics</p>
              </a>
              <a href="#" className="border border-slate-200 rounded p-4 w-32 hover:border-blue-300 transition-colors group">
                <p className="font-bold text-slate-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">TikTok</p>
                <p className="text-xs text-slate-500">@limabasics</p>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="lg:col-span-7">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nombre completo <span className="text-blue-600">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Ana García"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Correo electrónico <span className="text-blue-600">*</span></label>
                  <input 
                    type="email" 
                    placeholder="ana@correo.pe"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors text-slate-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Asunto</label>
                <div className="relative">
                  <select 
                    defaultValue="" 
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors appearance-none text-slate-700"
                  >
                    <option value="" disabled>Seleccionar motivo...</option>
                    <option value="pedido">Consulta sobre mi pedido</option>
                    <option value="envios">Información de envíos</option>
                    <option value="tallas">Guía de tallas</option>
                    <option value="otro">Otro</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Mensaje <span className="text-blue-600">*</span></label>
                <textarea 
                  rows="5"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors resize-y text-slate-800"
                  required
                ></textarea>
                <div className="text-right mt-1 text-xs text-slate-400">0/500</div>
              </div>

              {/* Botón de Enviar (Tono gris/azulado sutil) */}
              <button 
                type="submit" 
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 font-bold text-sm tracking-wider uppercase py-4 rounded transition-colors mt-2"
              >
                Enviar Mensaje
              </button>

              <p className="text-center text-xs text-slate-400 leading-relaxed px-4">
                Al enviar aceptas nuestra <a href="#" className="underline hover:text-slate-600">Política de privacidad</a>. No compartimos tu información con terceros.
              </p>
            </form>
          </div>

        </div>
      </section>

      {/* 3. PREGUNTAS FRECUENTES (Fondo azul/gris extra claro) */}
      <section className="w-full bg-slate-50 py-20 px-6 lg:px-12 border-t border-slate-100 flex-grow">
        <div className="max-w-[1440px] mx-auto">
          <h3 className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-10">
            Preguntas Frecuentes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-slate-800 mb-3 text-sm">¿Cuánto demora el envío en Lima?</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Entre 2 y 4 horas con Lima Express, o hasta 8 horas con motorizado. Puedes elegir al hacer checkout.
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-slate-800 mb-3 text-sm">¿Puedo cambiar mi talla?</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Sí, tienes 30 días para hacer el cambio sin costo adicional. Solo necesitas el número de pedido.
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-slate-800 mb-3 text-sm">¿Envían a provincias?</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Sí, enviamos a todo el Perú vía Olva Courier. El plazo estimado es de 3 a 5 días hábiles.
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-slate-800 mb-3 text-sm">¿Qué métodos de pago aceptan?</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Aceptamos pagos seguros exclusivamente vía PayPal, que permite usar tarjeta de crédito o débito.
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-slate-800 mb-3 text-sm">¿Las tallas son estándar peruanas?</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Sí. Consulta nuestra guía de tallas en la ficha de cualquier producto para medidas exactas en centímetros.
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-slate-800 mb-3 text-sm">¿Tienen tienda física?</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Sí, puedes visitarnos en Av. Larco 821, Miraflores, de lunes a viernes de 9am a 6pm.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}