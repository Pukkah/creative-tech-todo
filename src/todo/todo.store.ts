import { create } from "zustand";
import { Todo, todoSchema } from "./todo.model";
import { persist } from "zustand/middleware";
import { z } from "zod";

const TODO_API_URL = "https://creative-tech-code-quest.vercel.app/api/todo";
const LOCAL_STORAGE_KEY = "try-todos";

type TodoStore = {
  /** null if there is no initial data form API */
  todos: Todo[] | null;
  /* -1 if there is no initial data form API */
  maxId: number;
  isEditMode: boolean;
  hasFetchError: boolean;
  updateStatus: (args: Pick<Todo, "id" | "status">) => void;
  addTodo: (title: string) => void;
  deleteDodo: (id: number) => void;
  toggleEditMode: () => void;
};

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: null,
      maxId: -1,
      isEditMode: false,
      hasFetchError: false,
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
        set({ todos: optimisticTodos.sort(sortTodos) });

        // "update" API
        const res = await fetch(`${TODO_API_URL}/${id}`, { method: "POST" });
        if (!res.ok) {
          // Revert to previous state
          // TODO: handle race conditions
          return set({ todos });
        }
      },
      addTodo: (title) => {
        // don't add new todo if initial data is not fetched yet
        if (!get().todos) {
          return;
        }
        set((state) => ({
          todos: [
            ...(state.todos ?? []),
            { id: state.maxId + 1, title, status: null },
          ].sort(sortTodos),
          maxId: state.maxId + 1,
        }));
      },
      deleteDodo: (id) =>
        set((state) => {
          const remainingTodos =
            state.todos?.filter((todo) => todo.id !== id) ?? [];
          return {
            todos: remainingTodos,
            isEditMode: !!remainingTodos.length,
          };
        }),
      toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
    }),
    {
      name: LOCAL_STORAGE_KEY,
      partialize: (state) => ({ todos: state.todos, maxId: state.maxId }),
      onRehydrateStorage: () => (storedState) => {
        if (!storedState?.todos) {
          // Fetch initial data from API
          // Since API is immutable, we use it only as initial state
          fetch(TODO_API_URL)
            .then((res) => res.json())
            .then(z.array(todoSchema).parse)
            .then((fetchedTodos) =>
              useTodoStore.setState({
                todos: fetchedTodos.sort(sortTodos),
                maxId: Math.max(...fetchedTodos.map((x) => x.id)),
                hasFetchError: false,
              }),
            )
            .catch((error) => {
              console.error("Failed to fetch or parse API data", error);
              useTodoStore.setState({ hasFetchError: true });
            });
        }
      },
    },
  ),
);

function sortTodos(a: Todo, b: Todo) {
  if (a.status === null && b.status !== null) {
    return -1;
  }
  if (a.status !== null && b.status === null) {
    return 1;
  }
  if (a.status === "done" && b.status !== "done") {
    return -1;
  }
  if (a.status !== "done" && b.status === "done") {
    return 1;
  }
  return a.id - b.id;
}
