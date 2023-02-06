import { toTimeObject } from "@/utils/utils";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

function SkillCard({ title }) {
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleStartClick = () => {
    clearInterval(intervalRef.current);

    const checkpointTotal = totalElapsedTime;
    const intervalStartTime = Date.now();

    intervalRef.current = setInterval(() => {
      let timePassed = Date.now() - intervalStartTime;

      setTotalElapsedTime(checkpointTotal + timePassed);
    }, 1000);
  };

  const handleStopClick = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    const savedData = localStorage.getItem(title);
    if (savedData != null) {
      setTotalElapsedTime(parseInt(savedData));
    }
  }, [title]);

  useEffect(() => {
    if (totalElapsedTime > 0) {
      localStorage.setItem(title, totalElapsedTime);
    }
  }, [totalElapsedTime, title]);

  const timeObj = toTimeObject(totalElapsedTime)
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
        <SkillCard title="Learning Webdev" />
        <SkillCard title="Playing Piano" />
        <SkillCard title="Exercising" />
      </main>
    </>
  );
}
