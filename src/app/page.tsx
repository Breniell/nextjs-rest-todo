'use client';
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { createTodo, deleteTodo, getTodos, updateTodo } from "@/services/api";
import { Todo } from "@/types";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos().then((data) => {
      setTodos(data);
      setLoading(false);
    });
  }, []);

  const handleAdd = async ({
    title,
    description,
    dueDate,
  }: {
    title: string;
    description: string;
    dueDate: string;
  }) => {
    // on ne passe que le titre à l'API, on enrichit localement
    const newTodo = await createTodo(title);
    const todo: Todo = {
      id: newTodo.id,
      title: newTodo.data?.title || title,
      done: newTodo.data?.done || false,
      description,
      dueDate,
      author: "Anonyme",
      status: "pending",
    };
    setTodos((prev) => [...prev, todo]);
  };

  const handleUpdate = async (id: string, title: string, done: boolean) => {
    await updateTodo(id, title, done);
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              done,
              status: done ? "done" : t.status === "late" ? "late" : "pending",
            }
          : t
      )
    );
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // calcul de la dernière date valide pour l'en-tête
  const lastAdded = (() => {
    if (todos.length === 0) return null;
    const last = todos[todos.length - 1];
    if (!last.dueDate) return null;
    const d = new Date(last.dueDate);
    return isNaN(d.getTime()) ? null : d;
  })();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2">📝 Mes Tâches</h1>
        <p className="text-gray-600">
          {todos.length} tâche{todos.length > 1 ? "s" : ""} • Dernière ajout{" "}
          {lastAdded
            ? formatDistanceToNow(lastAdded, { addSuffix: true })
            : "—"}
        </p>
      </header>

      <section className="mb-8">
        <TodoForm onAdd={handleAdd} />
      </section>

      <section>
        {loading ? (
          <p className="text-center text-gray-500">Chargement…</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <TodoList
              todos={todos}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </div>
        )}
      </section>
    </main>
  );
}
