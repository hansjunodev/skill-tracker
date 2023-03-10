import useOutsideClick from "@/hooks/useOutsideClick";
import { Skill, SkillsAction, SkillsActionType } from "@/types/skill";
import { toTimeObject } from "@/utils/utils";
import classNames from "classnames";
import {
  Dispatch,
  EventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState
} from "react";

interface SkillCardProps {
  skill: Skill;
  dispatch: Dispatch<SkillsAction>;
}

export default function SkillCard({
  skill,
  dispatch,
}: SkillCardProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [titleText, setTitleText] = useState(skill.title);
  const handleOutsideClick = useCallback(() => {
    if (isEditing)
      dispatch({
        type: SkillsActionType.CHANGE_TITLE,
        payload: { id: skill.id, title: titleText },
      });
    setIsEditing(!isEditing);
  }, [dispatch, isEditing, skill.id, titleText]);

  const ref = useOutsideClick(handleOutsideClick);

  const handleActionClick: MouseEventHandler = (e) => {
    const action = skill.isRunning
      ? SkillsActionType.STOP
      : SkillsActionType.START;
    dispatch({ type: action, payload: skill.id });
    e.stopPropagation();
  };

  const handleDeleteClick: MouseEventHandler = (e) => {
    dispatch({
      type: SkillsActionType.DELETE_SKILL,
      payload: { id: skill.id },
    });
    e.stopPropagation();
  };

  const handleTitleChange: EventHandler = (e: InputEvent) => {
    setTitleText(e.target.value);
    e.stopPropagation();
  };

  useEffect(
    () =>
      dispatch({
        type: SkillsActionType.CHANGE_TITLE,
        payload: { id: skill.id, title: titleText },
      }),
    [dispatch, skill.id, titleText]
  );

  const timeObj = toTimeObject(skill.duration);
  // const timeString = `${timeObj.hours}h ${timeObj.minutes}m ${timeObj.seconds}s`;
  const timeString = `${timeObj.hours
    .toString()
    .padStart(2, "0")}:${timeObj.minutes
    .toString()
    .padStart(2, "0")}:${timeObj.seconds.toString().padStart(2, "0")}`;

  return (
    <div
      className={classNames(
        "flex h-20 w-full select-none flex-col p-2 shadow shadow-black",
        {
          "bg-green-100 hover:bg-green-200": skill.isRunning,
          "bg-white hover:bg-gray-100": !skill.isRunning,
        }
      )}
      role="button"
      tabIndex={0}
      onClick={handleActionClick}
    >
      <div className="flex justify-between space-x-2">
        <input
          ref={ref}
          className="w-1/4 bg-inherit text-sm text-gray-600 focus:border-b focus:border-b-black focus:bg-none focus:outline-none"
          type="text"
          onChange={handleTitleChange}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          value={titleText}
        />
        <button
          className="rounded px-1 text-gray-300 hover:text-black hover:shadow"
          onClick={handleDeleteClick}
          type="button"
        >
          X
        </button>
      </div>
      <div className="text-center text-lg">{timeString} </div>
    </div>
  );
}
