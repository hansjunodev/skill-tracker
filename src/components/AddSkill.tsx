import { useState } from "react";

interface AddSkillProps {
  onAddSkill: () => void;
}

export default function AddSkill({ onAddSkill }: AddSkillProps): JSX.Element {
  const [text, setText] = useState("");

  return (
    <div className="flex w-full">
      <input
        className="flex-1 rounded-l-full border border-black px-3 py-1"
        placeholder="Add skill"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={(e) => e.stopPropagation()}
      />
      <button
        className="border border-solid border-black px-2 hover:bg-gray-50"
        type="button"
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
