import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;
        if (email !== process.env.ADMIN_EMAIL) return null;

        const valid = await bcrypt.compare(
          password,
          process.env.ADMIN_PASSWORD_HASH as string
        );
        if (!valid) return null;

        return { id: "admin", email };
      },
    }),
  ],
});
