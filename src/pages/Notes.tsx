import React, { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";

interface Note {
  id: string;
  content: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

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

  const updateNote = (id: string, content: string) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, content } : note))
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Notes
      </h1>

      <div className="mb-6 space-y-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Write a new note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addNote}
            className="px-3 text-s whitespace-nowrap bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            style={{
              height: "calc(1.75rem + 1.5rem)",
            }}
          >
            Add Note
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={deleteNote}
            onUpdate={updateNote}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
