import { Todo } from "@/types";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  onUpdate: (id: string, title: string, done: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onUpdate, onDelete }: Props) {
  if (todos.length === 0)
    return <p className="text-gray-500 mt-4">Aucune tâche pour le moment.</p>;

  return (
    <div>
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
