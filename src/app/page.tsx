import { getCurrentRiddle } from "@/lib/actions/riddle";
import GuessForm from "@/components/GuessForm";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const riddle = await getCurrentRiddle();

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-400 mb-1">🧩 Acertijos</h1>
          <p className="text-slate-500 text-sm">Descubrí la palabra correcta</p>
        </div>

        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          {riddle ? (
            <>
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">
                  Acertijo
                </p>
                <p className="text-lg leading-relaxed text-slate-100">
                  {riddle.question}
                </p>
              </div>
              <GuessForm />
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🔒</div>
              <p className="text-slate-400 text-lg">
                No hay ningún acertijo activo en este momento.
              </p>
              <p className="text-slate-600 text-sm mt-2">
                Volvé más tarde.
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-slate-700 text-xs mt-6">
          <a href="/admin/login" className="hover:text-slate-500 transition-colors">
            Administración
          </a>
        </p>
      </div>
    </main>
  );
}
