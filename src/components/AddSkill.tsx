import { useState } from "react";

interface AddSkillProps {
  onAddSkill: () => void;
}

export default function AddSkill({ onAddSkill }: AddSkillProps): JSX.Element {
  const [text, setText] = useState("");

  return (
    <div className="flex w-full space-x-2">
      <input
        className="flex-1 px-3 py-1 shadow shadow-gray-400"
        placeholder="Add skill"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAddSkill(text);
            setText("");
          }
        }}
      />
      <button
        className="rounded px-1 text-black shadow  hover:shadow-black"
        type="submit"
        onClick={() => {
          setText("");
          onAddSkill(text);
        }}
      >
        Add
      </button>
    </div>
  );
}
