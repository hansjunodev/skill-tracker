import { MouseEventHandler, useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
  // From https://www.robinwieruch.de/react-hook-detect-click-outside-component/

  const ref = useRef<Element>();

  useEffect(() => {
    const handleClick: MouseEventHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [ref, callback]);

  return ref;
};

export default useOutsideClick;
