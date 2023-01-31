import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [timeInvested, setTimeInvested] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  function handleStartClick() {
    setStartTime(Date.now());
    setIsRunning(true);
  }

  function handleStopClick() {
    setIsRunning(false);
  }

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => {
        setTimeInvested(timeInvested + Date.now() - startTime);
        // setCookie('timeInvested', timeInvested)
        setStartTime(Date.now());
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [startTime, timeInvested, isRunning]);

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
        <input type="text" defaultValue="Learning Piano" />
        <div>{Math.floor(timeInvested / 1000)} s</div>
        <button onClick={handleStartClick}>Start</button>
        <button onClick={handleStopClick}>Stop</button>
      </main>
    </>
  );
}
