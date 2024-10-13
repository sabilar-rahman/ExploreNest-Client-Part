import { cookies } from "next/headers";

import UserProfile from "@/src/components/modules/profile/UserProfile";
import { getUser } from "@/src/helpers/getUserInfo";
import { getUserPost } from "@/src/actions/post/post.action";

const ProfilePage = async () => {
  const token = cookies().get("accessToken");
  const user = await getUser(token as { value: string });
  const posts = await getUserPost(user?.data?._id);

  return (
    <div>
      <UserProfile posts={posts} user={user} />
    </div>
  );
};

export default ProfilePage;
