import { useEffect, useRef, useState } from "react";
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

  return {
    todos,
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
