import Link from "next/link";
import Button from "@/components/admin/button";
import LogoutButton from "@/components/admin/logout-button";

import { auth } from "@/lib/auth";

export default async function RootAdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (<main>
    <header className="flex place-content-between m-2">
      <div></div>
      <div></div>
      <div className="flex">
        {session ? (
          <LogoutButton />
        ) : (
          <Button asChild variant="outline">
            <Link href="/admin/login">
              Login
            </Link>
          </Button>
        )}
      </div>
    </header>
    <div>{children}</div>
  </main>);
}
