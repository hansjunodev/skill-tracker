import useOutsideClick from "@/hooks/useOutsideClick";
import { Skill, SkillsAction, SkillsActionType } from "@/types/skill";
import { toTimeObject } from "@/utils/utils";
import classNames from "classnames";
import {
  Dispatch,
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

  const handleTitleChange: InputEventHandler = (e) => {
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
  const timeString = `${timeObj.hours}h ${timeObj.minutes}m ${timeObj.seconds}s`;

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
        <input
          ref={ref}
          className="flex-1 border-b border-b-black bg-inherit hover:bg-none focus:bg-none focus:outline-none"
          type="text"
          onChange={handleTitleChange}
          onClick={(e) => e.stopPropagation()}
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
      <div className="text-center font-mono">{timeString} </div>
      <div className="text-center">
        Progress: {skill.currentEffort}/{skill.goalEFfort}
      </div>
    </div>
  );
}
