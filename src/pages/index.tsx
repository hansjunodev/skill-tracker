import { toTimeObject } from "@/utils/utils";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";

interface SkillCardProps {
  title: string;
}

function SkillCard({ title }: SkillCardProps): JSX.Element {
  const [totalMilliseconds, setTotalMilliseconds] = useState(0);
  const intervalRef = useRef<number>(null);

  const handleStartClick = () => {
    clearInterval(intervalRef.current);

    const checkpointTotal = totalMilliseconds;
    const intervalStartTime = Date.now();

    intervalRef.current = setInterval(() => {
      const timePassed = Date.now() - intervalStartTime;

      setTotalMilliseconds(checkpointTotal + timePassed);
    }, 1000);
  };

  const handleStopClick = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    const savedData = localStorage.getItem(title);
    if (savedData != null) {
      setTotalMilliseconds(parseInt(savedData));
    }
  }, [title]);

  useEffect(() => {
    if (totalMilliseconds > 0) {
      localStorage.setItem(title, totalMilliseconds);
    }
  }, [totalMilliseconds, title]);

  const timeObj = toTimeObject(totalMilliseconds)
  const timeString = `${timeObj.hours} h ${timeObj.minutes} m ${timeObj.seconds} s`

  return (
    <div>
      <input type="text" defaultValue={title} />
      <div>{timeString}</div>
      <button onClick={handleStartClick}>Start</button>
      <button onClick={handleStopClick}>Stop</button>
    </div>
  );
}

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
