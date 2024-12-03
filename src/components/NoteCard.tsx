import React from "react";

interface Note {
  id: string;
  content: string;
}

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onUpdate: (id: string, content: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onUpdate }) => {
  return (
    <div className="relative bg-yellow-100 text-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <textarea
        value={note.content}
        onChange={(e) => onUpdate(note.id, e.target.value)}
        className="w-full h-24 bg-transparent resize-none outline-none p-2 text-gray-700"
        placeholder="Write your note here..."
      />
      <button
        onClick={() => onDelete(note.id)}
        className="absolute top-2 right-2 text-black text-xl hover:text-red-600 transition-colors"
      >
        ✖
      </button>
    </div>
  );
};

export default NoteCard;
