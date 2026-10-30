"use client";

import { signOut } from "next-auth/react";
import Button from "@/components/admin/button";

export default function LogoutButton() {
  return (
    <Button
      variant="outline"
      onClick={async () => {
        await signOut({ redirect: false });
        window.location.href = "/admin/login";
      }}
    >
      Logout
    </Button>
  );
}
