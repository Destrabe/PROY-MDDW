"use client";

export default function RegisterModal({ onClose, onSwitchToLogin }) {
  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-100 rounded-xl p-8 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-black transition-colors"
        >
          <svg className="w-5 h-5">
            <use href="/sprite.svg#close" />
          </svg>
        </button>
        <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-semibold">
          CREAR CUENTA
        </p>
        <h2 className="text-2xl font-bold mb-6">Regístrate</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              placeholder="Ana García"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="ana@correo.pe"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="Mínimo 8 caracteres"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors mt-4"
          >
            CREAR CUENTA
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          ¿Ya tienes cuenta?
          <button
            onClick={onSwitchToLogin}
            className="text-black font-semibold hover:underline bg-transparent border-none p-0"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
}
