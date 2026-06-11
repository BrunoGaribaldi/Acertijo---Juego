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
      className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
    >
      {pending ? "Ingresando..." : "Ingresar"}
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
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Usuario
        </label>
        <input
          name="username"
          type="text"
          autoComplete="username"
          required
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 focus:border-purple-500 focus:outline-none rounded-xl text-white placeholder-slate-400 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Contraseña
        </label>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 focus:border-purple-500 focus:outline-none rounded-xl text-white placeholder-slate-400 transition-colors"
        />
      </div>

      {state && !state.success && (
        <p className="text-red-400 text-sm">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}
