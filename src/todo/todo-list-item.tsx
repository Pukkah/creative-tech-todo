import clsx from "clsx";
import { IconCheck, IconCirce } from "../components/icons";
import { Todo } from "./todo.model";

export const TodoListItem = ({
  todo,
  onStatusChange,
}: {
  todo: Todo;
  onStatusChange: (id: number, status: Todo["status"]) => void;
}) => {
  const isDone = todo.status === "done";
  const isArchived = todo.status === "completed";

  const StatusIcon = isDone ? IconCheck : IconCirce;

  return (
    <li>
      <button
        title={todo.title}
        role="checkbox"
        aria-checked={isArchived ? "mixed" : isDone}
        disabled={isArchived}
        onClick={() => onStatusChange(todo.id, !isDone ? "done" : null)}
        className={clsx(
          "group",
          "flex h-[46px] w-full items-center justify-between",
          "rounded-xl border-2 border-current px-2.5 text-black",
          "transition-colors duration-300",
          "outline-none",
          "hover:text-brand-base hover:bg-black",
          "ring-black focus-visible:ring-2",
          "stroke-brand-accent hover:stroke-current", // <- inferred by status icons
          "disabled:text-brand-pink disabled:pointer-events-none",
          "disabled:line-through",
        )}
      >
        <div className="truncate text-2xl leading-[1.185]">{todo.title}</div>
        {!isArchived && <StatusIcon className="flex-none stroke-inherit" />}
      </button>
    </li>
  );
};
