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
    <div className="relative bg-yellow-100 text-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl">
      <textarea
        value={note.content}
        onChange={(e) => onUpdate(note.id, e.target.value)}
        className="w-full h-24 bg-transparent resize-none outline-none"
      />
      <button
        onClick={() => onDelete(note.id)}
        className="absolute top-2 right-2 text-black text-sm"
      >
        ✖
      </button>
    </div>
  );
};

export default NoteCard;
