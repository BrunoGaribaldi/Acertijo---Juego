import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-purple-400">🔐 Administración</h1>
          <p className="text-slate-500 text-sm mt-1">Ingresá con tus credenciales</p>
        </div>

        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          <LoginForm />
        </div>

        <p className="text-center mt-6">
          <a href="/" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
            ← Volver al juego
          </a>
        </p>
      </div>
    </main>
  );
}
