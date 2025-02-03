import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { admin } from "better-auth/plugins";
import { headers } from "next/headers";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  plugins: [
    admin({
      adminRole: "admin",
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
});

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user;
};
