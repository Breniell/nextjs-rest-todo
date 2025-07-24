import { Todo } from "@/types";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  onUpdate: (id: string, title: string, done: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onUpdate, onDelete }: Props) {
  if (todos.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-500 text-lg">Aucune tâche pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
