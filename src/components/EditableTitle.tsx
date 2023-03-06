import useOutsideClick from "@/hooks/useOutsideClick";
import { useCallback, useEffect, useState } from "react";

export default function EditableTitle(): JSX.Element {
  const [titleText, setTitleText] = useState("Untitled");
  const [isEditing, setIsEditing] = useState(false);
  const handleOutsideClick = useCallback(() => {
    if (isEditing) setIsEditing(false);
  }, [isEditing]);
  const ref = useOutsideClick(handleOutsideClick);

  const handleTextChange = (e: InputEvent) => {
    setTitleText(e.target.value);
    e.stopPropagation();
  };

  const handleInputClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleLabelClick = (e: MouseEvent) => {
    setIsEditing(!isEditing);
    e.stopPropagation();
  };

  useEffect(() => ref.current?.focus(), [ref, isEditing]);

  let content;

  if (isEditing) {
    content = (
      <input
        ref={ref}
        className="bg-none"
        type="text"
        onChange={handleTextChange}
        onClick={handleInputClick}
        value={titleText}
      />
    );
  } else {
    // content = skill.title;
    content = (
      <button
        className="cursor-text rounded px-1 text-black hover:shadow hover:shadow-black"
        onClick={handleLabelClick}
        type="button"
      >
        {titleText}
      </button>
    );
  }

  return content;
}
