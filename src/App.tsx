import tryLogo from "./assets/try.svg";
import { TodoList } from "./todo/todo-list";

function App() {
  return (
    <div className="bg-brand-base flex min-h-dvh flex-col gap-4 p-5 sm:p-16">
      <img src={tryLogo} alt="TRY logo" className="flex-none self-start" />
      <section className="flex w-full flex-auto flex-col justify-center self-center sm:max-w-xs">
        <h1 className="mb-6 whitespace-pre-wrap text-5xl leading-[1.185]">
          {"My\nTo-Do"}
        </h1>
        <TodoList />
      </section>
    </div>
  );
}

export default App;
