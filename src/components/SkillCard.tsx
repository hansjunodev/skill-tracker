import { Skill, SkillsAction, SkillsActionKind } from "@/types/skill";
import { toTimeObject } from "@/utils/utils";
import { useState, useEffect, useRef, Dispatch } from "react";

interface SkillCardProps {
  skill: Skill;
  dispatch: Dispatch<SkillsAction>;
}

export default function SkillCard({
  skill,
  dispatch,
}: SkillCardProps): JSX.Element {
  const intervalRef = useRef<number>(null);

  const handleStartClick = () => {
    clearInterval(intervalRef.current);

    let intervalStartTime = Date.now();

    intervalRef.current = setInterval(() => {
      const timePassed = Date.now() - intervalStartTime;

      dispatch({
        type: SkillsActionKind.ADD_DURATION,
        payload: {
          id: skill.id,
          duration: timePassed,
        },
      });

      intervalStartTime = Date.now();
    }, 1000);
  };

  const handleStopClick = () => {
    clearInterval(intervalRef.current);
  };

  const timeObj = toTimeObject(skill.duration);
  const timeString = `${timeObj.hours} h ${timeObj.minutes} m ${timeObj.seconds} s`;

  return (
    <div>
      <input type="text" defaultValue={skill.title} />
      <div>{timeString}</div>
      <button onClick={handleStartClick}>Start</button>
      <button onClick={handleStopClick}>Stop</button>
    </div>
  );
}
