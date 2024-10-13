import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

// import { getUserByToken } from "../helpers/getUser";

import nexiosInstance from "./nexios.config";
import { getUserByToken } from "../helpers/getUser";

export const AuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile, account }: any) {
      try {
        if (!profile || !account) {
          return false;
        }

        if (account.provider === "google") {
          const res: any = await nexiosInstance.post("/auth/login", {
            name: profile?.name,
            email: profile?.email,
            img: profile?.picture,
          });

          if (res?.data?.data?.accessToken || res?.data?.data?.refreshToken) {
            cookies().set("accessToken", res?.data?.data?.accessToken);
            cookies().set("refreshToken", res?.data?.data?.refreshToken);
            const user = await getUserByToken(res?.data?.data?.accessToken);

            if (user) {
              await nexiosInstance.put(
                `/auth/last-login/${user?.data?._id}`,
                {}
              );
            }

            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);

        return false;
      }
    },
  },

  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};