import { useCallback, useRef } from "react";
import { useTodoStore } from "./todo.store";

export const TodoInput = () => {
  const addTodo = useTodoStore(({ addTodo }) => addTodo);
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
      className="flex h-[46px] items-stretch overflow-clip rounded-xl border-2 border-black ring-black has-[:focus-visible]:ring-2"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="todo-title"
        placeholder="I need to..."
        className="w-full bg-white/10 px-2.5 text-2xl text-black outline-none placeholder:text-black/25"
        required
        maxLength={40}
        ref={inputRef}
      />
      <button
        type="submit"
        className="bg-black px-3 text-2xl text-brand-base outline-none ring-black hover:text-white focus-visible:underline"
      >
        Add
      </button>
    </form>
  );
};
