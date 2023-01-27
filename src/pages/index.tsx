import Head from "next/head";
import Image from "next/image";

export default function Home() {
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
        <input type="text" defaultValue="Learning Piano"/>
        <div>1h : 39m : 12s</div>
        <button>Start</button>
        <button>Stop</button>
      </main>
    </>
  );
}
