"use client";

import { useTransition } from "react";
import { deleteRiddle } from "@/lib/actions/riddle";

export default function DeleteRiddleButton() {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("¿Seguro que querés eliminar el acertijo actual?")) return;
    startTransition(() => {
      deleteRiddle();
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
    >
      {isPending ? "Eliminando..." : "Eliminar acertijo"}
    </button>
  );
}
