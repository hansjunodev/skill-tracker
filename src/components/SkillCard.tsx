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
  const [isEditing, setIsEditing] = useState(false);
  const [titleText, setTitleText] = useState("");

  const handleEditClick = () => {
    if (isEditing) {
      dispatch({
        type: SkillsActionType.CHANGE_TITLE,
        payload: { id: skill.id, title: titleText },
      });
    } else {
      setTitleText(skill.title);
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
      <div>
        Progress: {skill.currentEffort}/{skill.goalEFfort}
      </div>
      <button
        onClick={(e) =>
          dispatch({ type: SkillsActionType.START, payload: skill.id })
        }
      >
        Start
      </button>
      <button
        onClick={(e) =>
          dispatch({ type: SkillsActionType.STOP, payload: skill.id })
        }
      >
        Stop
      </button>
    </div>
  );
}
