'use client';
import { useState } from "react";

interface Props {
  onAdd: (todo: {
    title: string;
    description: string;
    dueDate: string;
    done: boolean;
    author: string;
  }) => void;
}

export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;
    onAdd({
      title,
      description,
      dueDate,
      done: false,
      author: "" // sera remplacé dans Home
    });
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg space-y-6"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ajouter une tâche..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            placeholder="Détails de la tâche..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date limite <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Ajouter
        </button>
      </div>
    </form>
  );
}
