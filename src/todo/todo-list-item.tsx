import clsx from "clsx";
import {
  IconArrow,
  IconCheck,
  IconCirce,
  IconClose,
} from "../components/icons";
import { Todo } from "./todo.model";
import { useTodoStore } from "./todo.store";
import { IconButton } from "../components/icon-button";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const TodoListItem = ({
  todo,
  editMode,
}: {
  todo: Todo;
  editMode?: boolean;
}) => {
  const { updateStatus, deleteDodo } = useTodoStore(
    ({ updateStatus, deleteDodo }) => ({ updateStatus, deleteDodo }),
  );
  const [animateRef] = useAutoAnimate();
  const isDone = todo.status === "done";
  const isArchived = todo.status === "completed";

  const StatusIcon = isDone ? IconCheck : IconCirce;

  return (
    <li className="flex gap-1" ref={animateRef}>
      {editMode && (
        <IconButton
          label="Delete"
          onClick={() => deleteDodo(todo.id)}
          destructive
        >
          <IconClose />
        </IconButton>
      )}
      <button
        title={todo.title}
        role="checkbox"
        aria-checked={isArchived ? "mixed" : isDone}
        disabled={isArchived}
        onClick={() =>
          updateStatus({ id: todo.id, status: !isDone ? "done" : null })
        }
        className={clsx(
          "group",
          "flex h-[46px] w-full items-center justify-between",
          "rounded-xl border-2 border-current px-2.5 text-black",
          "transition-colors duration-300",
          "outline-none",
          "pointer-hover:bg-black pointer-hover:text-brand-base",
          "ring-black focus-visible:ring-2",
          "stroke-brand-positive pointer-hover:stroke-current", // <- inferred by status icons
          "disabled:text-brand-negative disabled:pointer-events-none",
          "disabled:line-through",
        )}
      >
        <div className="truncate text-2xl leading-[1.185]">{todo.title}</div>
        {!isArchived && <StatusIcon className="flex-none stroke-inherit" />}
      </button>
      {editMode && !isArchived && (
        <IconButton
          label="Archive"
          onClick={() => updateStatus({ id: todo.id, status: "completed" })}
        >
          <IconArrow className="rotate-90" />
        </IconButton>
      )}
    </li>
  );
};
