"use server";

import { prisma } from "@/lib/prisma";

export type GuessResult =
  | { correct: true }
  | { correct: false; message: string };

export async function checkGuess(
  _prevState: GuessResult | null,
  formData: FormData
): Promise<GuessResult> {
  const userGuess = (formData.get("guess") as string)?.trim().toLowerCase();

  if (!userGuess) {
    return { correct: false, message: "Escribe una respuesta." };
  }

  const riddle = await prisma.riddle.findFirst({
    select: { answer: true },
    orderBy: { createdAt: "desc" },
  });

  if (!riddle) {
    return { correct: false, message: "No hay ningún acertijo activo." };
  }

  if (userGuess === riddle.answer) {
    return { correct: true };
  }

  return { correct: false, message: "Incorrecto. ¡Intenta de nuevo!" };
}
