import { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Todo, todoSchema } from "./todo.model";

const TODO_API_URL = "https://creative-tech-code-quest.vercel.app/api/todo";
const LOCAL_STORAGE_KEY = "try-todos";

export function useTodos() {
  const isFetchingRef = useRef(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (isFetchingRef.current) {
      return;
    }
    isFetchingRef.current = true;

    const localTodos = getTodosFromLocalStorage();

    if (localTodos.length > 0) {
      return setTodos(localTodos);
    }

    fetch(TODO_API_URL)
      .then((res) => res.json())
      .then(z.array(todoSchema).parse)
      .then((fetchedTodos) => {
        setTodos(fetchedTodos);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fetchedTodos));
      })
      .catch((error) => console.warn(error));
  }, []);

  const changeStatus = useCallback(
    (id: number, status: Todo["status"]) =>
      setTodos((oldTodos) => {
        const existingIndex = oldTodos.findIndex((todo) => todo.id === id);
        if (existingIndex === -1) {
          return oldTodos;
        }
        const updatedTodo = { ...oldTodos[existingIndex], status };
        const newTodos = [...oldTodos];
        newTodos[existingIndex] = updatedTodo;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
        return newTodos;
      }),
    [],
  );

  return {
    todos,
    changeStatus,
  };
}

function getTodosFromLocalStorage() {
  const serializedLocalTodos = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!serializedLocalTodos) {
    return [];
  }

  const parsedTodos = z
    .array(todoSchema)
    .safeParse(JSON.parse(serializedLocalTodos));

  if (!parsedTodos.success) {
    return [];
  }

  return parsedTodos.data;
}
