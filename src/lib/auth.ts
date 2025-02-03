import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { type ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
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

export const getCurrentUser = async (incomingHeaders?: ReadonlyHeaders) => {
  const reqHeaders = await (() => {
    if (incomingHeaders) return incomingHeaders;

    return headers();
  })();
  const session = await auth.api.getSession({ headers: reqHeaders });
  return session?.user;
};
