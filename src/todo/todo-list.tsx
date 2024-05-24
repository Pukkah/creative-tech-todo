import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TodoListItem } from "./todo-list-item";
import { useTodoStore } from "./todo.store";

export const TodoList = ({ editMode }: { editMode?: boolean }) => {
  const { todos, hasFetchError } = useTodoStore(({ todos, hasFetchError }) => ({
    todos,
    hasFetchError,
  }));
  const [animateRef] = useAutoAnimate();
  const isFetching = todos === null && !hasFetchError;

  return (
    <>
      <ul
        className="flex flex-col gap-1.5"
        aria-busy={isFetching}
        ref={animateRef}
      >
        {todos?.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} editMode={editMode} />
        ))}
      </ul>
      {isFetching && <LoadingMessage />}
      {hasFetchError && <FetchErrorMessage />}
    </>
  );
};

const LoadingMessage = () => (
  <p className="animate-pulse text-sm text-black">Loading...</p>
);

const FetchErrorMessage = () => (
  <p className="text-brand-negative text-sm">
    Failed to initialize todos. Please try again.
  </p>
);
