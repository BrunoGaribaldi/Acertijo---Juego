"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useState, useEffect, useRef } from "react";
import { checkGuess } from "@/lib/actions/guess";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
    >
      {pending ? "Verificando..." : "Intentar"}
    </button>
  );
}

export default function GuessForm() {
  const [state, formAction] = useActionState(checkGuess, null);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state !== null) {
      setAttempts((prev) => prev + 1);
      if (!state.correct && inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }
  }, [state]);

  if (state?.correct) {
    return (
      <div className="py-4">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-400 mb-2">¡Ganaste!</h2>
          <p className="text-slate-400">
            {attempts === 1
              ? "¡Lo lograste al primer intento!"
              : `Lo lograste en ${attempts} intentos.`}
          </p>
        </div>

        {state.secretText && (
          <div className="mt-6 p-5 bg-slate-700 border border-purple-500/40 rounded-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">
              🔓 Texto desbloqueado
            </p>
            <p className="text-slate-100 leading-relaxed whitespace-pre-wrap">
              {state.secretText}
            </p>
          </div>
        )}

        <button
          onClick={() => window.location.reload()}
          className="mt-6 w-full px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors text-sm"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <input
          ref={inputRef}
          name="guess"
          type="text"
          placeholder="Escribe tu respuesta..."
          autoComplete="off"
          required
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 focus:border-purple-500 focus:outline-none rounded-xl text-white placeholder-slate-400 transition-colors"
        />
      </div>

      {state && !state.correct && (
        <p className="text-red-400 text-sm flex items-center gap-2">
          <span>✗</span>
          <span>{state.message}</span>
          {attempts > 0 && (
            <span className="ml-auto text-slate-500">
              {attempts} {attempts === 1 ? "intento" : "intentos"}
            </span>
          )}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
