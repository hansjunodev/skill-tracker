import classNames from "classnames";

interface AddSkillProps {
  onAddSkill: () => void;
}

export default function AddSkill({ onAddSkill }: AddSkillProps): JSX.Element {
  return (
    <div
      className={classNames(
        "flex w-full select-none flex-col p-2 shadow shadow-black hover:bg-gray-100 text-center"
      )}
      role="button"
      tabIndex={0}
      onClick={onAddSkill}
    >
      Add Skill
    </div>
  );
}
