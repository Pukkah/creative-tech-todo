import clsx from "clsx";

export const TextButton = (props: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={props.onClick}
    className={clsx(
      "mt-5 place-self-center rounded px-1",
      "text-sm text-black underline outline-none",
      "ring-black focus-visible:ring-4 pointer-hover:no-underline",
    )}
  >
    {props.children}
  </button>
);
