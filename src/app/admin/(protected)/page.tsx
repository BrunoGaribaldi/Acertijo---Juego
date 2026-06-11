import { getCurrentRiddleForAdmin } from "@/lib/actions/riddle";
import { logout } from "@/lib/actions/auth";
import AdminRiddleForm from "@/components/AdminRiddleForm";
import DeleteRiddleButton from "@/components/DeleteRiddleButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const riddle = await getCurrentRiddleForAdmin();

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-green-800 text-xs tracking-widest mb-1">
              BLACK MIRROR LIST ::
            </p>
            <h1 className="text-xl tracking-widest text-green-400 uppercase">
              ROOT PANEL
            </h1>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="px-4 py-2 border border-green-900 hover:border-green-700 text-green-800 hover:text-green-600 text-xs tracking-widest transition-colors uppercase"
            >
              [ DESCONECTAR ]
            </button>
          </form>
        </div>

        {/* Current file */}
        {riddle && (
          <div className="border border-green-900 bg-zinc-950 p-6 mb-6">
            <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-green-900">
              <p className="text-green-700 text-xs tracking-widest">
                // ARCHIVO ACTIVO
              </p>
              <DeleteRiddleButton />
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-green-800 text-xs tracking-widest mb-1">
                  DESCRIPCIÓN:
                </p>
                <p className="text-green-300 text-sm leading-relaxed border-l border-green-800 pl-3">
                  {riddle.question}
                </p>
              </div>
              <div>
                <p className="text-green-800 text-xs tracking-widest mb-1">
                  CLAVE:
                </p>
                <p className="text-yellow-500 text-sm font-mono tracking-widest">
                  {riddle.answer}
                </p>
              </div>
              {riddle.secretText && (
                <div>
                  <p className="text-red-900 text-xs tracking-widest mb-1">
                    CONTENIDO CLASIFICADO:
                  </p>
                  <p className="text-red-700 text-sm leading-relaxed border-l border-red-900 pl-3">
                    {riddle.secretText}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Form */}
        <div className="border border-green-900 bg-zinc-950 p-8">
          <div className="mb-6 pb-4 border-b border-green-900">
            <p className="text-green-700 text-xs tracking-widest">
              {riddle ? "// SOBREESCRIBIR ARCHIVO ACTIVO" : "// CARGAR NUEVO ARCHIVO"}
            </p>
          </div>
          <AdminRiddleForm key={riddle?.id ?? "new"} riddle={riddle ?? null} />
        </div>

        <p className="text-center mt-4">
          <a
            href="/"
            className="text-green-900 hover:text-green-700 text-xs tracking-widest transition-colors"
          >
            &lt; VOLVER AL SISTEMA
          </a>
        </p>
      </div>
    </main>
  );
}
