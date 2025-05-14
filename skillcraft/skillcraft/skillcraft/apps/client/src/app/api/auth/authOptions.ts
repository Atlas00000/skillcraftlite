import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import axios from "axios";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("NextAuth authorize called with:", {
            email: credentials?.email,
            apiUrl: process.env.NEXT_PUBLIC_API_URL
          });

          const res = await axios.post(
            process.env.NEXT_PUBLIC_API_URL + "/auth/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          console.log("Login response:", res.data);

          if (res.data && res.data.user) {
            return res.data.user;
          }
          return null;
        } catch (e) {
          console.error("Login error:", e);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if ((token as any).user) session.user = (token as any).user;
      return session;
    },
  },
}; 