import clsx from "clsx";

export const IconButton = (props: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  destructive?: boolean;
}) => (
  <button
    aria-label={props.label}
    onClick={props.onClick}
    className={clsx(
      "grid size-[46px] flex-none place-items-center text-black",
      "rounded-xl outline-none ring-inset ring-black focus-visible:ring-4",
      "transition-colors duration-300",
      props.destructive
        ? "hover:text-brand-negative"
        : "hover:text-brand-positive",
    )}
  >
    {props.children}
  </button>
);
