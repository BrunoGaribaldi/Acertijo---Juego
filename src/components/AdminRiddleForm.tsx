"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { upsertRiddle } from "@/lib/actions/riddle";

interface Riddle {
  id: string;
  question: string;
  answer: string;
  secretText: string | null;
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-6 border border-green-700 bg-black hover:bg-green-950 disabled:opacity-40 disabled:cursor-not-allowed text-green-400 tracking-widest text-sm transition-colors uppercase"
    >
      {pending
        ? "[ CARGANDO... ]"
        : isEdit
        ? "[ SOBREESCRIBIR ARCHIVO ]"
        : "[ CARGAR ARCHIVO ]"}
    </button>
  );
}

export default function AdminRiddleForm({ riddle }: { riddle: Riddle | null }) {
  const [state, formAction] = useActionState(upsertRiddle, null);
  const isEdit = !!riddle;

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="block text-xs tracking-widest text-green-700 mb-2 uppercase">
          &gt; Descripción del archivo
        </label>
        <textarea
          name="question"
          defaultValue={riddle?.question ?? ""}
          placeholder="INGRESAR TEXTO DEL ACERTIJO..."
          rows={4}
          required
          className="w-full px-4 py-3 bg-black border border-green-800 focus:border-green-500 focus:outline-none text-green-400 placeholder-green-900 text-sm tracking-wide transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-xs tracking-widest text-green-700 mb-2 uppercase">
          &gt; Clave de acceso
        </label>
        <div className="flex items-center border border-green-800 bg-black focus-within:border-green-500 transition-colors">
          <span className="px-3 text-green-600 text-sm select-none">&gt;</span>
          <input
            name="answer"
            type="text"
            defaultValue={riddle?.answer ?? ""}
            placeholder="PALABRA CLAVE..."
            required
            className="flex-1 py-3 pr-4 bg-transparent text-green-400 placeholder-green-900 text-sm tracking-widest focus:outline-none"
          />
        </div>
        <p className="text-green-900 text-xs tracking-widest mt-1">
          // INSENSIBLE A MAYÚSCULAS
        </p>
      </div>

      <div>
        <label className="block text-xs tracking-widest text-green-700 mb-2 uppercase">
          &gt; Contenido clasificado{" "}
          <span className="text-green-900 normal-case">(se revela al acceder)</span>
        </label>
        <textarea
          name="secretText"
          defaultValue={riddle?.secretText ?? ""}
          placeholder="DATOS SECRETOS QUE SE DESBLOQUEAN AL GANAR..."
          rows={3}
          className="w-full px-4 py-3 bg-black border border-red-950 focus:border-red-800 focus:outline-none text-green-400 placeholder-green-900 text-sm tracking-wide transition-colors resize-none"
        />
        <p className="text-red-900 text-xs tracking-widest mt-1">
          // CLASIFICADO :: SOLO VISIBLE TRAS VERIFICACIÓN
        </p>
      </div>

      {state && !state.success && (
        <div className="border border-red-900 px-4 py-2">
          <p className="text-red-500 text-xs tracking-widest">
            ERROR :: {state.error.toUpperCase()}
          </p>
        </div>
      )}

      {state?.success && (
        <div className="border border-green-800 px-4 py-2">
          <p className="text-green-500 text-xs tracking-widest">
            [OK] ARCHIVO {isEdit ? "ACTUALIZADO" : "CARGADO"} :: OPERACION EXITOSA
          </p>
        </div>
      )}

      <SubmitButton isEdit={isEdit} />
    </form>
  );
}
