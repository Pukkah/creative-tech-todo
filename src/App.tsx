import tryLogo from "./assets/try.svg";
import { TodoTiem } from "./todo/todo-item";
import { useTodos } from "./todo/use-todos.hook";

function App() {
  const { todos } = useTodos();

  return (
    <div className="flex min-h-svh flex-col gap-4 bg-[#FFDE03] p-5 sm:p-16">
      <img src={tryLogo} alt="TRY logo" className="flex-none self-start" />
      <section className="flex w-full flex-auto flex-col justify-center self-center sm:max-w-xs">
        <h1 className="mb-6 whitespace-pre-wrap text-5xl leading-[1.185]">
          {"My\nTo-Do"}
        </h1>
        <ul className="flex flex-col gap-1.5 rounded-2xl empty:aspect-square empty:animate-pulse empty:bg-black/5">
          {todos.map((todo) => (
            <TodoTiem key={todo.id} title={todo.title} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
