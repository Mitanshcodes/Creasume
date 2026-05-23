import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "./db";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await db.user.findUnique({ where: { email } });
        if (!user?.password) return null;

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;

        return { id: user.id, email: user.email, name: user.name, image: user.image };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
        let creator = await db.creator.findUnique({ where: { userId: user.id } });

        // Auto-create a Creator for OAuth sign-ins (Google etc.) that bypass signUpAction
        if (!creator) {
          const base = (user.email?.split("@")[0] ?? "creator")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "")
            .slice(0, 20) || "creator";
          let username = base;
          let suffix = 1;
          while (await db.creator.findUnique({ where: { username } })) {
            username = `${base}${suffix++}`;
          }
          creator = await db.creator.create({
            data: {
              userId: user.id,
              username,
              displayName: user.name ?? "Creator",
              isPublished: false,
            },
          });
        }

        token.creatorId = creator.id;
        token.username = creator.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.creatorId = token.creatorId as string | undefined;
        session.user.username = token.username as string | undefined;
      }
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      creatorId?: string;
      username?: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}
