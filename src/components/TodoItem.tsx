import { Todo } from "@/types";

interface Props {
  todo: Todo;
  onUpdate: (id: string, title: string, done: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg shadow-sm bg-white mb-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onUpdate(todo.id, todo.title, !todo.done)}
        />
        <span className={todo.done ? "line-through text-gray-500" : ""}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:underline"
      >
        Supprimer
      </button>
    </div>
  );
}
