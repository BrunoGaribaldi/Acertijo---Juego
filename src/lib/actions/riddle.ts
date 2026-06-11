"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "./auth";

async function requireAdmin() {
  const session = await getSession();
  if (!session.isAdmin) throw new Error("No autorizado");
}

export async function getCurrentRiddle() {
  return prisma.riddle.findFirst({
    select: { id: true, question: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCurrentRiddleForAdmin() {
  await requireAdmin();
  return prisma.riddle.findFirst({
    orderBy: { createdAt: "desc" },
  });
}

export type UpsertRiddleResult =
  | { success: true }
  | { success: false; error: string };

export async function upsertRiddle(
  _prevState: UpsertRiddleResult | null,
  formData: FormData
): Promise<UpsertRiddleResult> {
  await requireAdmin();

  const question = (formData.get("question") as string)?.trim();
  const answer = (formData.get("answer") as string)?.trim().toLowerCase();
  const secretText = (formData.get("secretText") as string)?.trim() || null;

  if (!question || !answer) {
    return { success: false, error: "La pregunta y la respuesta son requeridas." };
  }

  await prisma.$transaction([
    prisma.riddle.deleteMany(),
    prisma.riddle.create({ data: { question, answer, secretText } }),
  ]);

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteRiddle(_formData?: FormData): Promise<void> {
  await requireAdmin();
  await prisma.riddle.deleteMany();
  revalidatePath("/");
  revalidatePath("/admin");
}
