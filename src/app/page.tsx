import { getCurrentRiddle } from "@/lib/actions/riddle";
import GuessForm from "@/components/GuessForm";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const riddle = await getCurrentRiddle();

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="w-full max-w-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-green-700 text-xs tracking-[0.4em] mb-2">
            ██ SISTEMA RESTRINGIDO ██
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-green-400 tracking-widest glitch mb-1">
            BLACK MIRROR LIST
          </h1>
          <p className="text-green-800 text-xs tracking-[0.3em]">
            ACCESO :: NIVEL MÁXIMO REQUERIDO
          </p>
        </div>

        {/* Main card */}
        <div className="border border-green-900 bg-zinc-950 p-8">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-green-900">
            <span className="text-green-700 text-xs tracking-widest">
              [ARCHIVO_CLASIFICADO]
            </span>
            <span className="text-green-800 text-xs blink">█</span>
          </div>

          {riddle ? (
            <>
              <div className="mb-8">
                <p className="text-green-700 text-xs tracking-widest mb-4">
                  &gt; CARGANDO ARCHIVO...
                </p>
                <div className="border-l-2 border-green-700 pl-4">
                  <p className="text-green-300 leading-relaxed text-base flicker">
                    {riddle.question}
                  </p>
                </div>
                <p className="text-green-800 text-xs mt-4 tracking-widest">
                  &gt; INGRESÁ LA CONTRASEÑA DE ACCESO PARA DESENCRIPTAR
                </p>
              </div>
              <GuessForm />
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-red-700 text-4xl mb-4 tracking-widest">
                [404]
              </p>
              <p className="text-red-500 text-sm tracking-widest mb-2">
                ARCHIVO NO ENCONTRADO
              </p>
              <p className="text-green-900 text-xs tracking-widest">
                BASE DE DATOS VACÍA :: CONTACTAR ADMINISTRADOR
              </p>
            </div>
          )}

          {/* Bottom bar */}
          <div className="mt-8 pt-4 border-t border-green-900">
            <p className="text-green-900 text-xs tracking-widest text-right">
              CONEXIÓN ENCRIPTADA :: TOR v2.9.1
            </p>
          </div>
        </div>

        <p className="text-center mt-4">
          <a
            href="/admin/login"
            className="text-green-900 hover:text-green-700 text-xs tracking-widest transition-colors"
          >
            &gt; ACCESO RAÍZ
          </a>
        </p>
      </div>
    </main>
  );
}
