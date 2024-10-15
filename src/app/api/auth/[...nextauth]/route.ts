import NextAuth from "next-auth";

import { AuthOptions } from "@/src/config/nextAuth.config";

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
