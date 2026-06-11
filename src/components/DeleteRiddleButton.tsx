"use client";

import { useTransition } from "react";
import { deleteRiddle } from "@/lib/actions/riddle";

export default function DeleteRiddleButton() {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("PURGAR ARCHIVO ACTIVO?\n\nEsta operacion es irreversible.")) return;
    startTransition(() => {
      deleteRiddle();
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="px-4 py-2 border border-red-900 hover:border-red-600 hover:bg-red-950/20 disabled:opacity-40 disabled:cursor-not-allowed text-red-700 hover:text-red-500 text-xs tracking-widest transition-colors uppercase"
    >
      {isPending ? "[ PURGANDO... ]" : "[ PURGAR ]"}
    </button>
  );
}
