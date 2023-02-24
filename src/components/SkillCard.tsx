import { Skill, SkillsAction, SkillsActionType } from "@/types/skill";
import { toTimeObject } from "@/utils/utils";
import classNames from "classnames";
import { Dispatch, MouseEventHandler, useState } from "react";

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

  const handleActionClick: MouseEventHandler = (e) => {
    if (skill.isRunning) {
      dispatch({ type: SkillsActionType.STOP, payload: skill.id });
    } else {
      dispatch({ type: SkillsActionType.START, payload: skill.id });
    }
    e.stopPropagation();
  };

  const handleEditClick: MouseEventHandler = (e) => {
    if (isEditing) {
      dispatch({
        type: SkillsActionType.CHANGE_TITLE,
        payload: { id: skill.id, title: titleText },
      });
    } else {
      setTitleText(skill.title);
    }
    setIsEditing(!isEditing);
    e.stopPropagation();
  };

  const handleDeleteClick: MouseEventHandler = (e) => {
    const goAhead = confirm(
      "Are you sure you want to DELETE this skill? There is no going back."
    );

    if (goAhead) {
      dispatch({
        type: SkillsActionType.DELETE_SKILL,
        payload: { id: skill.id },
      });
    }
    e.stopPropagation();
  };

  // let total = 0;
  // for (let i = 1; i < skill.history.length; i += 2) {
  //   const from = skill.history[i - 1];
  //   const to = skill.history[i];
  //   const duration = to.timestamp - from.timestamp;
  //   total += duration;
  // }
  // const timeObj = toTimeObject(total);

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
    content = skill.title;
  }

  return (
    <div
      className={classNames(
        "flex w-full select-none flex-col p-2 shadow shadow-black",
        {
          "bg-green-100 hover:bg-green-200": skill.isRunning,
          "bg-white hover:bg-gray-100": !skill.isRunning,
        }
      )}
      role="button"
      tabIndex={0}
      onClick={handleActionClick}
    >
      <div className="flex space-x-2">
        <div className="flex-1">{content} </div>
        <button
          className="rounded px-1 text-black hover:shadow hover:shadow-black"
          onClick={handleEditClick}
          type="button"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          className="rounded px-1 text-black hover:shadow hover:shadow-black"
          onClick={handleDeleteClick}
          type="button"
        >
          Delete
        </button>
        <button
          className="rounded px-1 text-black hover:shadow hover:shadow-black"
          onClick={(e) => {
            dispatch({ type: SkillsActionType.UNDO, payload: skill.id });
            e.stopPropagation();
          }}
          type="button"
        >
          Rollback
        </button>
      </div>
      <div className="text-center font-mono">{timeString} </div>
      <div className="text-center">
        Progress: {skill.currentEffort}/{skill.goalEFfort}
      </div>
    </div>
  );
}
