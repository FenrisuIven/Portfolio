'use client';

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (<div>
    <form
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
      <input type="text" name="email" />
      <input type="password" name="password" />
      <input type="submit" />
    </form>
  </div >);
}
