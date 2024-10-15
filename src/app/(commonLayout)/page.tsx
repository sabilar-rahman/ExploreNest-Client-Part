// import { cookies } from "next/headers";

// import { getUser } from "@/src/helpers/getUserInfo";
// import NewsFeed from "@/src/components/modules/post/NewsFeed";
// import BackToTopBtn from "@/src/components/shared/BackToTopBtn";

// export default async function Home() {
//   const token = cookies().get("accessToken");
//   const user = await getUser(token as { value: string });

//   return (
//     <section className="flex flex-col items-center justify-center">
//       <NewsFeed user={user} />
//       <BackToTopBtn></BackToTopBtn>
//     </section>
//   );
// }
"use client"

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/src/config/site";
import { subtitle, title } from "@/src/components/shared/primitives";
// import { title, subtitle } from "@/src/components/primitives";


export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Greetings from &nbsp;</span>
        <br />
        <span className={title({ color: "violet" })}>Explore Nest!&nbsp;</span>
        <br />
       
        <div className={subtitle({ class: "mt-4" })}>
        Your adventure begins here! Dive into our curated travel tips and destination guides designed to make your next trip extraordinary. Whether you're a seasoned traveler or a first-time explorer, we're here to help you discover new horizons and create unforgettable experiences.
        </div>
      </div>


      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
          Let the exploration begin!
          </span>
        </Snippet>
      </div>
    </section>
  );
}

