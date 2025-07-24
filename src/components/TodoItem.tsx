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
  const now = new Date();
  const due = new Date(todo.dueDate);
  const isLate = due < now && !todo.done;
  const status = isLate ? "late" : todo.status || (todo.done ? "done" : "pending");

  return (
    <Card className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden min-h-[300px]">
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between gap-4 p-6">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 whitespace-normal">
            {todo.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            🕒 {format(due, "dd/MM/yyyy")}
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
      </CardHeader>

      <CardContent className="px-6 pt-0 pb-6 text-gray-700 flex-1">
        <p className="whitespace-pre-wrap">{todo.description}</p>
      </CardContent>

      <div className="flex flex-wrap justify-between items-center gap-4 px-6 pb-6 pt-0">
        <span className="text-xs text-gray-500 whitespace-normal">
          👤 {todo.author}
        </span>
        <div className="flex flex-wrap gap-3">
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
