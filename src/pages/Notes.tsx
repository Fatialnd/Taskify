import React, { useState } from "react";

interface Note {
  id: string;
  content: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (newNote.trim()) {
      setNotes((prev) => [
        ...prev,
        { id: Date.now().toString(), content: newNote.trim() },
      ]);
      setNewNote("");
    }
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
        Notes
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Write a new note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={addNote}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Note
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="relative bg-yellow-100 text-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl"
          >
            <textarea
              value={note.content}
              onChange={(e) =>
                setNotes((prev) =>
                  prev.map((n) =>
                    n.id === note.id ? { ...n, content: e.target.value } : n
                  )
                )
              }
              className="w-full h-24 bg-transparent resize-none outline-none"
            />
            <button
              onClick={() => deleteNote(note.id)}
              className="absolute top-2 right-2 text-black text-sm"
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
