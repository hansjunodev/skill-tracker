import SkillCard from "@/components/SkillCard";
import Head from "next/head";

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Skill Tracker</title>
        <meta
          name="description"
          content="Keep track of the cumulative amount of time you've spent on learning something new"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SkillCard title="Learning Webdev" />
        <SkillCard title="Playing Piano" />
        <SkillCard title="Exercising" />
      </main>
    </>
  );
}
