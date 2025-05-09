"use client";

import { signOutAction } from "@/app/_actions/sign-out";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export const SignOutForm = () => {
  return (
    <form action={signOutAction}>
      <SignOutButton />
    </form>
  );
};

const SignOutButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2"
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Sign out
    </Button>
  );
};
