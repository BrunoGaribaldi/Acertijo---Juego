import { getCurrentRiddleForAdmin } from "@/lib/actions/riddle";
import { logout } from "@/lib/actions/auth";
import AdminRiddleForm from "@/components/AdminRiddleForm";
import DeleteRiddleButton from "@/components/DeleteRiddleButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const riddle = await getCurrentRiddleForAdmin();

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-purple-400">⚙️ Administración</h1>
            <p className="text-slate-500 text-sm mt-0.5">Panel de control</p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-xl transition-colors"
            >
              Cerrar sesión
            </button>
          </form>
        </div>

        {riddle && (
          <div className="bg-slate-800 rounded-2xl shadow-xl p-6 border border-slate-700 mb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
                  Acertijo actual
                </p>
                <p className="text-slate-200 leading-relaxed">{riddle.question}</p>
                <p className="text-sm text-slate-400 mt-3">
                  Respuesta:{" "}
                  <span className="text-yellow-400 font-mono font-semibold">
                    {riddle.answer}
                  </span>
                </p>
                {riddle.secretText && (
                  <p className="text-sm text-slate-400 mt-2">
                    Texto secreto:{" "}
                    <span className="text-purple-300">{riddle.secretText}</span>
                  </p>
                )}
              </div>
              <DeleteRiddleButton />
            </div>
          </div>
        )}

        <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-6">
            {riddle ? "Reemplazar acertijo" : "Crear acertijo"}
          </h2>
          <AdminRiddleForm key={riddle?.id ?? "new"} riddle={riddle ?? null} />
        </div>

        <p className="text-center mt-6">
          <a href="/" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
            ← Ver juego
          </a>
        </p>
      </div>
    </main>
  );
}
