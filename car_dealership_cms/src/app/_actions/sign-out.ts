// src/app/_actions/sign-out.ts
"use server";
import { routes } from "@/config/routes";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth, signOut } from "../auth";

export const signOutAction = async () => {
  const session = await auth();
  if (session) {
    await signOut({
      redirect: true,
      redirectTo: routes.signIn,
    });
  }
};

export const logoutOfAllSessions = async () => {
  const session = await auth();
  if (!session?.user?.id) return null;
  await prisma.session.deleteMany({
    where: { userId: session.user.id },
  });

  redirect(routes.signIn);
};
