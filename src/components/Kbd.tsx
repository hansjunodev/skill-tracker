interface KbdProps {
  children: Any;
}

export default function Kbd({ children }: KbdProps): JSX.Element {
  return (
    <kbd className="m-auto cursor-default select-none whitespace-nowrap rounded border border-solid border-black bg-gray-100 px-2 py-1 text-sm font-medium leading-none text-black shadow-kbd">
      {children}
    </kbd>
  );
}
