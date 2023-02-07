import { toTimeObject } from "@/utils/utils";
import { useState, useEffect, useRef } from "react";

interface SkillCardProps {
  title: string;
}

export default function SkillCard({ title }: SkillCardProps): JSX.Element {
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

  const timeObj = toTimeObject(totalMilliseconds);
  const timeString = `${timeObj.hours} h ${timeObj.minutes} m ${timeObj.seconds} s`;

  return (
    <div>
      <input type="text" defaultValue={title} />
      <div>{timeString}</div>
      <button onClick={handleStartClick}>Start</button>
      <button onClick={handleStopClick}>Stop</button>
    </div>
  );
}
