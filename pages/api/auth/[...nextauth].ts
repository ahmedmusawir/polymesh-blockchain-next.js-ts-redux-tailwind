import { NextApiResponse } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { signIn } from "@/services/authService";

const options = {
  providers: [
    Providers.Credentials({
      name: "Sign in with Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
         */
        if (credentials == null) return null;
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */
        try {
          const { user, jwt } = await signIn({
            email: credentials.email,
            password: credentials.password,
          });

          return { ...user, jwt };
        } catch (error: any) {
          // Sign In Fail
          console.log("error", error.message, error.response?.data);
          return null;
        }
      },
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    jwt: true,
  },
  debug: true,
  callbacks: {
    session: async (session: any, user: any) => {
      session.jwt = user.jwt;
      session.id = user.id;

      return Promise.resolve(session);
    },
    jwt: async (token: any, user: any, account: any) => {
      const isSignIn = user ? true : false;

      if (isSignIn) {
        if (account?.provider === "google") {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/auth/${account.provider}/callback?access_token=${account?.accessToken}`
          );

          const data = await response.json();

          token.jwt = data?.jwt;
          token.id = data?.user?.id;
        } else {
          token.jwt = user?.jwt;
          token.id = user?.id;
          token.name = user.username;
        }
      }

      return Promise.resolve(token);
    },
  },
};

const Auth = (req: any, res: NextApiResponse) => NextAuth(req, res, options);

export default Auth;
