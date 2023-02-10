import { useState } from "react";

interface AddSkillProps {
  onAddSkill: () => void;
}

export default function AddSkill({ onAddSkill }: AddSkillProps): JSX.Element {
  const [text, setText] = useState("");

  return (
    <>
      <input
        placeholder="Add skill"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText("");
          onAddSkill(text);
        }}
      >
        Add
      </button>
    </>
  );
}
