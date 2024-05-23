import { TodoListItem } from "./todo-list-item";
import { Todo } from "./todo.model";

export const TodoList = ({
  todos,
  onStatusChange,
}: {
  todos: Todo[];
  onStatusChange: (id: number, status: Todo["status"]) => void;
}) => {
  return (
    <ul className="flex flex-col gap-1.5 rounded-2xl empty:aspect-square empty:animate-pulse empty:bg-black/5">
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onStatusChange={onStatusChange}
        />
      ))}
    </ul>
  );
};
