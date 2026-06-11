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
      className="w-full py-3 px-6 border border-green-700 bg-black hover:bg-green-950 disabled:opacity-40 disabled:cursor-not-allowed text-green-400 tracking-widest text-sm transition-colors uppercase"
    >
      {pending ? "[ VERIFICANDO... ]" : "[ EJECUTAR ]"}
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
      <div className="space-y-6">
        <div className="border border-green-600 p-6 bg-green-950/20">
          <p className="text-green-700 text-xs tracking-widest mb-3">
            &gt; VERIFICANDO CONTRASEÑA...
          </p>
          <p className="text-green-400 text-xl tracking-widest glow-green mb-1">
            ██ ACCESO CONCEDIDO ██
          </p>
          <p className="text-green-700 text-xs tracking-widest">
            INTENTOS REQUERIDOS: {attempts} :: IDENTIDAD VERIFICADA
          </p>
        </div>

        {state.secretText && (
          <div className="border border-red-900 bg-red-950/10">
            {/* Header */}
            <div className="border-b border-red-900 px-6 py-3 flex items-center justify-between">
              <p className="text-red-600 text-xs tracking-widest">
                [!] CLASIFICADO :: NIVEL OMEGA
              </p>
              <p className="text-red-900 text-xs tracking-widest">
                ARCHIVO DESCIFRADO
              </p>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <p className="text-red-700 text-xs tracking-widest mb-5 uppercase">
                [[ CONTENIDO DESBLOQUEADO ]]
              </p>
              <p className="text-green-300 text-sm leading-7 whitespace-pre-wrap break-words">
                {state.secretText}
              </p>
            </div>

            {/* Footer */}
            <div className="border-t border-red-900 px-6 py-3">
              <p className="text-red-900 text-xs tracking-widest">
                [ ESTA INFORMACION ES CONFIDENCIAL ]
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => window.location.reload()}
          className="w-full py-2 border border-green-900 hover:border-green-700 text-green-800 hover:text-green-600 tracking-widest text-xs transition-colors uppercase"
        >
          [ REINICIAR SESION ]
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="flex items-center border border-green-800 bg-black focus-within:border-green-500 transition-colors">
        <span className="px-3 text-green-600 text-sm select-none">&gt;</span>
        <input
          ref={inputRef}
          name="guess"
          type="text"
          placeholder="INGRESAR CONTRASENA..."
          autoComplete="off"
          required
          className="flex-1 py-3 pr-4 bg-transparent text-green-400 placeholder-green-900 text-sm tracking-widest focus:outline-none uppercase"
        />
      </div>

      {state && !state.correct && (
        <div className="border border-red-900 px-4 py-2 flex items-center justify-between">
          <p className="text-red-500 text-xs tracking-widest">
            ACCESO DENEGADO :: {state.message.toUpperCase()}
          </p>
          {attempts > 0 && (
            <p className="text-red-900 text-xs tracking-widest">
              INTENTOS: {attempts}
            </p>
          )}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
