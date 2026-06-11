"use server";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, type SessionData } from "@/lib/session";

export type LoginResult =
  | { success: true }
  | { success: false; error: string };

export async function login(
  _prevState: LoginResult | null,
  formData: FormData
): Promise<LoginResult> {
  const username = (formData.get("username") as string)?.trim();
  const password = formData.get("password") as string;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return { success: false, error: "Credenciales incorrectas." };
  }

  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.isAdmin = true;
  await session.save();

  return { success: true };
}

export async function logout(_formData?: FormData): Promise<void> {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.destroy();
}

export async function getSession(): Promise<SessionData> {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  return { isAdmin: session.isAdmin ?? false };
}
