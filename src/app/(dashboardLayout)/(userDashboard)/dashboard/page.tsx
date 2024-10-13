import { cookies } from "next/headers";

import UserDashboardProfile from "@/src/components/modules/dashboard/userDashboard/UserDashboardProfile";
import { getUser } from "@/src/helpers/getUserInfo";
import { getUserPost } from "@/src/actions/post/post.action";

const UserDashboard = async () => {
  const token = cookies().get("accessToken");
  const user = await getUser(token as { value: string });
  const posts = await getUserPost(user?.data?._id);

  return (
    <div>
      <UserDashboardProfile posts={posts} user={user} />
    </div>
  );
};

export default UserDashboard;
