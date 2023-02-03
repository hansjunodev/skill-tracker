import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const TOTAL_ELAPSED_TIME_KEY = "totalTime";

export default function Home() {
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
    }, 100);
  };

  const handleStopClick = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    const savedData = localStorage.getItem(TOTAL_ELAPSED_TIME_KEY);
    if (savedData != null) {
      setTotalElapsedTime(parseInt(savedData));
    }
  }, []);

  useEffect(() => {
    if (totalElapsedTime > 0) {
      localStorage.setItem(TOTAL_ELAPSED_TIME_KEY, totalElapsedTime);
    }
  }, [totalElapsedTime]);

  const elpasedSeconds = totalElapsedTime / 1000;

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
        <input type="text" defaultValue="Learning React" />
        <div>{elpasedSeconds.toFixed(3)} s</div>
        <button onClick={handleStartClick}>Start</button>
        <button onClick={handleStopClick}>Stop</button>
      </main>
    </>
  );
}
