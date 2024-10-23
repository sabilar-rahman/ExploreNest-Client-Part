import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/src/config/site";
import { title, subtitle } from "@/src/components/primitives";
import { GithubIcon } from "@/src/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center mt-10">
        <span className={title()}>Greetings from&nbsp;</span>
        <span className={title({ color: "violet" })}>Explore Nest!&nbsp;</span>
        <br />
        {/* <span className={title()}>
          websites regardless of your design experience.
        </span> */}
        <div className={subtitle({ class: "mt-10" })}>
          Your adventure begins here! Dive into our curated travel tips and
          destination guides designed to make your next trip extraordinary.
          Whether you're a seasoned traveler or a first-time explorer, we're
          here to help you discover new horizons and create unforgettable
          experiences.
        </div>
      </div>

      {/* <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div> */}

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
