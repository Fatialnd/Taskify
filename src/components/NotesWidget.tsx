import React from "react";

interface Note {
  id: string;
  content: string;
}

interface NotesWidgetProps {
  notes: Note[];
}

const NotesWidget: React.FC<NotesWidgetProps> = ({ notes }) => {
  return (
    <div className="bg-gradient-to-r from-green-100 to-green-300 dark:from-green-900 dark:to-green-700 rounded-lg shadow-lg p-6 w-full h-full max-w-xs mx-auto">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Your Notes
      </h3>
      <div className="space-y-2">
        {notes.slice(0, 3).map((note) => (
          <div
            key={note.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow dark:text-gray-100"
          >
            <p className="text-gray-800 dark:text-gray-100">{note.content}</p>
          </div>
        ))}
      </div>
      {notes.length > 3 && (
        <p className="text-gray-500 dark:text-gray-300 mt-4 text-center">
          ...and more
        </p>
      )}
    </div>
  );
};

export default NotesWidget;
