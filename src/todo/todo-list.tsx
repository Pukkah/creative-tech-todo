import { TodoListItem } from "./todo-list-item";
import { useTodoStore } from "./todo.store";

export const TodoList = () => {
  const { todos, updateStatus } = useTodoStore();

  return (
    <ul className="flex flex-col gap-1.5 rounded-2xl empty:aspect-square empty:animate-pulse empty:bg-black/5">
      {todos?.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onStatusChange={(id, status) => updateStatus({ id, status })}
        />
      ))}
    </ul>
  );
};
