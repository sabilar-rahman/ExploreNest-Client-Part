import { getUserByEmail } from "../actions/user/user.action";

import { decode } from "./jwtHelper";

export const getUserByToken = async (token: string) => {
  if (token) {
    const userInfo = decode(token);

    if (userInfo) {
      const user = await getUserByEmail(userInfo?.email);

      return user?.data;
    }
  }
};