import { Todo } from "@/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  todo: Todo;
  onUpdate: (id: string, title: string, done: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: Props) {
  // Calcul du statut "late"
  const now = new Date();
  const due = todo.dueDate ? new Date(todo.dueDate) : null;
  const isLate = due ? due < now && !todo.done : false;
  const status = isLate
    ? "late"
    : todo.status || (todo.done ? "done" : "pending");

  return (
    <Card className="flex flex-col justify-between bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <div className="mb-3 sm:mb-0 sm:flex-1">
          <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            🕒{" "}
            {due
              ? format(due, "dd/MM/yyyy")
              : "—"}
          </p>
        </div>
        <Badge
          variant={
            status === "done"
              ? "success"
              : status === "late"
              ? "destructive"
              : "outline"
          }
        >
          {status}
        </Badge>
      </div>

      <CardContent className="px-4 pb-4 pt-0 text-gray-700 flex-1">
        <p className="line-clamp-3">{todo.description || "Pas de description."}</p>
      </CardContent>

      <div className="px-4 pb-4 pt-0 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <span className="text-xs text-gray-500">👤 {todo.author || "Anonyme"}</span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdate(todo.id, todo.title, !todo.done)}
          >
            {todo.done ? "Relancer" : "Terminer"}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(todo.id)}
          >
            Supprimer
          </Button>
        </div>
      </div>
    </Card>
  );
}
