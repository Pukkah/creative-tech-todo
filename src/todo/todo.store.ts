import { create } from "zustand";
import { Todo, todoSchema } from "./todo.model";
import { persist } from "zustand/middleware";
import { z } from "zod";

const TODO_API_URL = "https://creative-tech-code-quest.vercel.app/api/todo";
const LOCAL_STORAGE_KEY = "try-todos";

type TodoStore = {
  todos: Todo[] | null;
  updateStatus: (args: Pick<Todo, "id" | "status">) => void;
};

export const useTodoStore = create(
  persist<TodoStore>(
    (set, get) => ({
      todos: null,
      updateStatus: async ({ id, status }) => {
        const { todos } = get();
        if (!todos) {
          return;
        }
        const existingIndex = todos.findIndex((todo) => todo.id === id);
        if (existingIndex === -1) {
          return;
        }
        // optimistic update
        const optimisticTodos = [...todos];
        optimisticTodos[existingIndex] = { ...todos[existingIndex], status };
        set({ todos: optimisticTodos });

        // "update" API
        const res = await fetch(`${TODO_API_URL}/${id}`, { method: "POST" });
        if (!res.ok) {
          // Revert to previous state
          // TODO: handle race conditions
          return set({ todos });
        }
      },
    }),
    {
      name: LOCAL_STORAGE_KEY,
      onRehydrateStorage: () => (storedState) => {
        if (!storedState?.todos) {
          // Fetch initial data from API
          // Since API is immutable, we use it only as initial state only
          fetch(TODO_API_URL)
            .then((res) => res.json())
            .then(z.array(todoSchema).parse)
            .then((fetchedTodos) =>
              useTodoStore.setState({ todos: fetchedTodos }),
            )
            .catch((error) => console.warn(error));
        }
      },
    },
  ),
);
