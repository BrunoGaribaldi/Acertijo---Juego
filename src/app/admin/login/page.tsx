import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <p className="text-red-700 text-xs tracking-[0.4em] mb-3">
            [ ZONA RESTRINGIDA ]
          </p>
          <h1 className="text-2xl tracking-widest text-green-400 mb-1 uppercase">
            Black Mirror List
          </h1>
          <p className="text-green-800 text-xs tracking-widest">
            AUTENTICACION REQUERIDA :: NIVEL ROOT
          </p>
        </div>

        <div className="border border-green-900 bg-zinc-950 p-8">
          <div className="mb-6 pb-4 border-b border-green-900">
            <p className="text-green-700 text-xs tracking-widest">
              // INGRESAR CREDENCIALES
            </p>
          </div>
          <LoginForm />
        </div>

        <div className="border border-red-950 bg-red-950/10 mt-4 px-4 py-3">
          <p className="text-red-900 text-xs tracking-widest text-center">
            [ ACCESO NO AUTORIZADO SERA REGISTRADO ]
          </p>
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
