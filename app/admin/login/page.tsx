'use client';

import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { SubmitInput } from "@/components/ui/submit-input";

export default function LoginPage() {
  return (<div className="flex flex-col w-full items-center justify-center">
    <form
      className="flex flex-col gap-4 items-center"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const result = await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          redirect: false,
        });

        if (result?.error) {
          console.error("login failed:", result.error);
        } else {
          window.location.href = "/admin";
        }
      }}
    >
      <Input type="text" name="email" label="Email" />
      <Input type="password" name="password" label="Password" />
      <SubmitInput type="submit" />
    </form>
  </div >);
}
