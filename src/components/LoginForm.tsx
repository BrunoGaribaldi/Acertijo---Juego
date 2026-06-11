"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-6 border border-green-700 bg-black hover:bg-green-950 disabled:opacity-40 disabled:cursor-not-allowed text-green-400 tracking-widest text-sm transition-colors uppercase"
    >
      {pending ? "[ AUTENTICANDO... ]" : "[ AUTENTICAR ]"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(login, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/admin");
      router.refresh();
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="block text-xs tracking-widest text-green-700 mb-2 uppercase">
          &gt; ID de usuario
        </label>
        <div className="flex items-center border border-green-800 bg-black focus-within:border-green-500 transition-colors">
          <span className="px-3 text-green-600 text-sm select-none">_</span>
          <input
            name="username"
            type="text"
            autoComplete="username"
            required
            className="flex-1 py-3 pr-4 bg-transparent text-green-400 text-sm tracking-widest focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-widest text-green-700 mb-2 uppercase">
          &gt; Contraseña
        </label>
        <div className="flex items-center border border-green-800 bg-black focus-within:border-green-500 transition-colors">
          <span className="px-3 text-green-600 text-sm select-none">_</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="flex-1 py-3 pr-4 bg-transparent text-green-400 text-sm tracking-widest focus:outline-none"
          />
        </div>
      </div>

      {state && !state.success && (
        <div className="border border-red-900 px-4 py-2">
          <p className="text-red-500 text-xs tracking-widest">
            ERROR :: {state.error.toUpperCase()}
          </p>
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
