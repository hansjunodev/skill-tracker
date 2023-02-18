import { Skill, SkillsAction, SkillsActionType } from "@/types/skill";
import { toTimeObject } from "@/utils/utils";
import { useState, useEffect, useRef, Dispatch } from "react";
import classNames from "classnames";

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
  const timeString = `${timeObj.hours}h ${timeObj.minutes}m ${timeObj.seconds}s`;

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
    <div
      className={classNames(
        "flex w-full flex-col border-2 border-solid border-black p-2",
        {
          "bg-green-100": skill.isRunning,
          "bg-white": !skill.isRunning,
        }
      )}
    >
      <div className="flex space-x-2">
        <div className="flex-1">{content} </div>
        <button
          className="border border-solid border-black bg-white px-1 text-black hover:bg-gray-50"
          onClick={handleEditClick}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          className="border border-solid border-black bg-white px-1 text-black hover:bg-gray-50"
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
      <div className="text-center font-mono">{timeString} </div>
      <div className="text-center">
        Progress: {skill.currentEffort}/{skill.goalEFfort}
      </div>
      <div className="flex">
        <button
          className={classNames("flex-1 border border-solid border-black", {
            "cursor-default bg-gray-200 text-gray-300": skill.isRunning,
            "bg-white text-black hover:bg-gray-50": !skill.isRunning,
          })}
          onClick={() =>
            dispatch({ type: SkillsActionType.START, payload: skill.id })
          }
        >
          Start
        </button>
        <button
          className={classNames("flex-1 border border-solid border-black", {
            "bg-white text-black hover:bg-gray-50": skill.isRunning,
            "cursor-default bg-gray-200 text-gray-300": !skill.isRunning,
          })}
          onClick={() =>
            dispatch({ type: SkillsActionType.STOP, payload: skill.id })
          }
        >
          Stop
        </button>
      </div>
    </div>
  );
}
