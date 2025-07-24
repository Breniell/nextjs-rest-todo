'use client';
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "@/services/api";
import { Todo } from "@/types";
import LoginForm from "@/components/LoginForm";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getTodos().then((data) => {
        setTodos(data);
        setLoading(false);
      });
    }
  }, [user]);

  if (!user) {
    return <LoginForm />;
  }

  const handleAdd = async ({
    title,
    description,
    dueDate,
  }: {
    title: string;
    description: string;
    dueDate: string;
  }) => {
    const newTodo = await createTodo({
      title,
      description,
      dueDate,
      done: false,
      author: user,
    });
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleUpdate = async (id: string, title: string, done: boolean) => {
    const updated = await updateTodo(id, { done });
    if (updated) {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
    }
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const lastAddedDate = (() => {
    if (!todos.length) return null;
    const d = new Date(todos[todos.length - 1].dueDate);
    return isNaN(d.getTime()) ? null : d;
  })();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold mb-1">📝 Mes Tâches</h1>
          <p className="text-gray-600">
            Connecté en tant que <strong>{user}</strong>
          </p>
          <p className="text-gray-600">
            {todos.length} tâche{todos.length > 1 ? "s" : ""} • Dernière ajout{" "}
            {lastAddedDate
              ? formatDistanceToNow(lastAddedDate, { addSuffix: true })
              : "—"}
          </p>
        </div>
        <button
          onClick={logout}
          className="text-red-500 hover:underline"
        >
          Déconnexion
        </button>
      </header>

      <section className="mb-8">
        <TodoForm onAdd={handleAdd} />
      </section>

      <section>
        {loading ? (
          <p className="text-center text-gray-500">Chargement…</p>
        ) : (
          <TodoList
            todos={todos}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </section>
    </main>
  );
}
