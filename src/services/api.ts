const BASE_URL = "https://restful-api.dev/objects";

export async function getTodos() {
    
    const res= await fetch(BASE_URL);
    const data= await res.json();
    return data.data?.map((item: any) => ({
        id: item.id,
        title: item.data?.title || "",
        done: item.data?.done || false,
    }
    )
) || [];
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