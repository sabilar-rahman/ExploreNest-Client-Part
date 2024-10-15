import { cookies } from "next/headers";

import { getUser } from "@/src/helpers/getUserInfo";
import NewsFeed from "@/src/components/modules/post/NewsFeed";
import BackToTopBtn from "@/src/components/shared/BackToTopBtn";

export default async function Home() {
  const token = cookies().get("accessToken");
  const user = await getUser(token as { value: string });

  return (
    <section className="flex flex-col items-center justify-center">
      <NewsFeed user={user} />
      <BackToTopBtn></BackToTopBtn>
    </section>
  );
}
