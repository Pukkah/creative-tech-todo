import { useCallback, useRef } from "react";
import { useTodoStore } from "./todo.store";
import clsx from "clsx";

export const TodoInput = () => {
  const [addTodo, disabled] = useTodoStore(({ addTodo, todos }) => [
    addTodo,
    todos === null,
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const inputField = inputRef.current;
      if (!inputField) {
        return;
      }
      addTodo(inputField.value);
      inputField.value = "";
      inputField.focus();
    },
    [addTodo],
  );

  return (
    <form
      className={clsx(
        "flex h-[46px] items-stretch overflow-clip rounded-xl",
        "border-2 border-black ring-black has-[:focus-visible]:ring-2",
      )}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="todo-title"
        aria-label="Add a new todo item"
        placeholder="I need to..."
        className="w-full bg-white/10 px-2.5 text-2xl text-black outline-none placeholder:text-black/25"
        required
        maxLength={40}
        disabled={disabled}
        ref={inputRef}
      />
      <button
        type="submit"
        className={clsx(
          "bg-black px-3 text-2xl text-brand-base outline-none ring-black",
          "transition-colors duration-300 hover:text-white focus-visible:underline",
        )}
      >
        Add
      </button>
    </form>
  );
};
