import { Todo } from "@/types";

const BASE_URL = "https://api.restful-api.dev/objects";

export async function getTodos() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return (data.data || []).map((item: any) => {
    const done = item.data?.done || false;
    return {
      id: item.id,
      title: item.data?.title || "",
      done,
      // valeurs par défaut pour l'exemple
      description: item.data?.description || "Pas de description fournie.",
      dueDate: item.data?.dueDate || new Date(Date.now() + 86400000).toISOString(), // demain
      author: item.data?.author || "Anonyme",
      status: done ? "done" : "pending",
    } as Todo;
  });
}

export async function createTodo(title: string) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "todo",
      data: { title, done: false },
    }),
  });
  return res.json();
}

export async function updateTodo(id: string, title: string, done: boolean) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "todo",
      data: { title, done },
    }),
  });
  return res.json();
}

export async function deleteTodo(id: string) {
  return fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}