import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TodoListItem } from "./todo-list-item";
import { useTodoStore } from "./todo.store";

export const TodoList = ({ editMode }: { editMode?: boolean }) => {
  const todos = useTodoStore(({ todos }) => todos);
  const [animateRef] = useAutoAnimate();

  return (
    <ul
      className="flex flex-col gap-1.5 rounded-2xl empty:aspect-square empty:animate-pulse empty:bg-black/5"
      ref={animateRef}
    >
      {todos?.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} editMode={editMode} />
      ))}
    </ul>
  );
};
