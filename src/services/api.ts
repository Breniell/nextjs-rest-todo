import { Todo } from "@/types";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "todos_app";

function readStorage(): Todo[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeStorage(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export async function getTodos(): Promise<Todo[]> {
  return readStorage();
}

export async function createTodo(data: Omit<Todo, "id" | "status">): Promise<Todo> {
  const todos = readStorage();
  const newTodo: Todo = { 
    id: uuidv4(), 
    ...data, 
    status: data.done ? 'done' : 'pending' 
  };
  todos.push(newTodo);
  writeStorage(todos);
  return newTodo;
}

export async function updateTodo(
  id: string,
  updates: Partial<Omit<Todo, "id">>
): Promise<Todo | null> {
  const todos = readStorage();
  const idx = todos.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  todos[idx] = { ...todos[idx], ...updates };
  // if done/status changed, keep status in sync
  if (updates.done !== undefined) {
    todos[idx].status = updates.done ? 'done' : 'pending';
  }
  writeStorage(todos);
  return todos[idx];
}

export async function deleteTodo(id: string): Promise<void> {
  const todos = readStorage().filter((t) => t.id !== id);
  writeStorage(todos);
}
