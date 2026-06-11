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
      className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
    >
      {pending
        ? "Guardando..."
        : isEdit
        ? "Actualizar acertijo"
        : "Crear acertijo"}
    </button>
  );
}

export default function AdminRiddleForm({ riddle }: { riddle: Riddle | null }) {
  const [state, formAction] = useActionState(upsertRiddle, null);
  const isEdit = !!riddle;

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Pregunta / Acertijo
        </label>
        <textarea
          name="question"
          defaultValue={riddle?.question ?? ""}
          placeholder="Escribe el acertijo aquí..."
          rows={4}
          required
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 focus:border-purple-500 focus:outline-none rounded-xl text-white placeholder-slate-400 transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Respuesta
        </label>
        <input
          name="answer"
          type="text"
          defaultValue={riddle?.answer ?? ""}
          placeholder="Palabra respuesta..."
          required
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 focus:border-purple-500 focus:outline-none rounded-xl text-white placeholder-slate-400 transition-colors"
        />
        <p className="text-xs text-slate-500 mt-1">
          La comparación es insensible a mayúsculas/minúsculas.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1">
          Texto secreto{" "}
          <span className="text-slate-600 font-normal">(se revela al ganar)</span>
        </label>
        <textarea
          name="secretText"
          defaultValue={riddle?.secretText ?? ""}
          placeholder="Este texto solo aparece cuando el jugador adivina correctamente..."
          rows={3}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 focus:border-purple-500 focus:outline-none rounded-xl text-white placeholder-slate-400 transition-colors resize-none"
        />
      </div>

      {state && !state.success && (
        <p className="text-red-400 text-sm">{state.error}</p>
      )}

      {state?.success && (
        <p className="text-green-400 text-sm">
          ✓ Acertijo {isEdit ? "actualizado" : "creado"} correctamente.
        </p>
      )}

      <SubmitButton isEdit={isEdit} />
    </form>
  );
}
