import tryLogo from "./assets/try.svg";
import { TodoInput } from "./todo/todo-input";
import { TodoList } from "./todo/todo-list";
import { TextButton } from "./components/text-button";
import { useTodoStore } from "./todo/todo.store";

function App() {
  const [hasTodos, isEditMode, toggleEditMode] = useTodoStore((state) => [
    !!state.todos?.length,
    state.isEditMode,
    state.toggleEditMode,
  ]);

  return (
    <div className="flex min-h-dvh flex-col gap-4 bg-brand-base p-5 sm:p-16">
      <img src={tryLogo} alt="TRY logo" className="flex-none self-start" />
      <section className="flex w-full flex-auto flex-col justify-center self-center sm:max-w-xs">
        <h1 className="mb-6 whitespace-pre-wrap text-5xl leading-[1.185]">
          {"My\nTo-Do"}
        </h1>
        <div className="pb-1.5">
          <TodoInput />
        </div>
        <TodoList editMode={isEditMode} />
        {hasTodos && (
          <TextButton onClick={toggleEditMode}>
            {isEditMode ? "Done" : "Delete / Archive"}
          </TextButton>
        )}
      </section>
    </div>
  );
}

export default App;
