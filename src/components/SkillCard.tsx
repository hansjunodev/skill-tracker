import { Skill, SkillsAction, SkillsActionType } from "@/types/skill";
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
  const [isEditing, setIsEditing] = useState(false);
  const [titleText, setTitleText] = useState("");

  const handleStartClick = () => {
    clearInterval(intervalRef.current);

    let intervalStartTime = Date.now();

    intervalRef.current = setInterval(() => {
      const timePassed = Date.now() - intervalStartTime;

      dispatch({
        type: SkillsActionType.ADD_DURATION,
        payload: { id: skill.id, durationToAdd: timePassed },
      });

      intervalStartTime = Date.now();
    }, 1000);
  };

  const handleStopClick = () => {
    clearInterval(intervalRef.current);
  };

  const handleEditClick = () => {
    if (isEditing) {
      dispatch({
        type: SkillsActionType.CHANGE_TITLE,
        payload: { id: skill.id, title: titleText },
      });
    }
    setIsEditing(!isEditing);
  };

  const timeObj = toTimeObject(skill.duration);
  const timeString = `${timeObj.hours} h ${timeObj.minutes} m ${timeObj.seconds} s`;

  let content;

  if (isEditing) {
    content = (
      <input
        type="text"
        onChange={(e) => setTitleText(e.target.value)}
        value={titleText}
      />
    );
  } else {
    content = <>{skill.title}</>;
  }

  return (
    <div>
      <div>
        {content}{" "}
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        <button
          onClick={() =>
            dispatch({
              type: SkillsActionType.DELETE_SKILL,
              payload: { id: skill.id },
            })
          }
        >
          Delete
        </button>
      </div>
      <div>{timeString} </div>
      <button onClick={handleStartClick}>Start</button>
      <button onClick={handleStopClick}>Stop</button>
    </div>
  );
}
