import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { getServerSession } from "next-auth";
import type { Session, NextAuthOptions, CallbacksOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import TwitterProvider from "next-auth/providers/twitter";
import { SiweMessage } from "siwe";
import { env } from "~/src/env.mjs";
import {
  createUserFromAddress,
  userDatabaseId,
} from "src/server/utils/user";
import { isAddress } from "ethers/lib/utils.js";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    TwitterProvider({
      // the app won't build if these are not found in the .env
      // see src/.env.mjs
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      version: "2.0",
    }),
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );
          const result = await siwe.validate(credentials?.signature || "");
          if (result.address) {
            await createUserFromAddress(result.address);
            return {
              id: siwe.address,
            };
          }
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ];

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth?.includes("signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    // removes the last element from an array
    providers.pop();
  }

  const config: NextAuthOptions = {
    providers,
    session: {
      strategy: "jwt",
    },
    secret: env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, account }) {
        if (account && token["sub"] && isAddress(token["sub"])) {
          // signin or sign up happening here
          const address = token["sub"];
          token["databaseId"] = await userDatabaseId(address);
        }
        return token;
      },
      async session({ session, token }: { session: Session; token: JWT }) {
        if (token.databaseId) {
          session.user.databseId = token.databaseId;
        }
        if (token.sub && isAddress(token.sub)) {
          // connecting web3 wallet
          session.user.address = token.sub;
        }
        return session;
      },
    },
  };

  const session = await getServerSession(req, res, config);
  const isWeb3Connected = session?.user.address;

  const signIn: CallbacksOptions["signIn"] = async () => {
    if (isWeb3Connected) {
      return "/";
    }
    return true;
  };

  return await NextAuth(req, res, {
    ...config,
    callbacks: {
      ...config.callbacks,
      signIn,
    },
  });
}
