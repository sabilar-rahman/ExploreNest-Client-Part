import { getUserByEmail } from "../actions/user/user.action";

import { decode } from "./jwtHelper";

export const getUser = async (token: { value: string }) => {
  if (token) {
    const userInfo = decode(token?.value);

    if (userInfo) {
      const user = await getUserByEmail(userInfo?.email);

      return user?.data;
    }
  }
};