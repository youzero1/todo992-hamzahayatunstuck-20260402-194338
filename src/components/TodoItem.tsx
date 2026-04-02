'use client';

import { useState } from 'react';
import { Todo, Priority } from '@/app/page';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const priorityConfig: Record<Priority, { dot: string; label: string; bg: string }> = {
  low: { dot: 'bg-green-400', label: 'Low', bg: 'bg-green-50' },
  medium: { dot: 'bg-yellow-400', label: 'Med', bg: 'bg-yellow-50' },
  high: { dot: 'bg-red-400', label: 'High', bg: 'bg-red-50' },
};

const categoryEmoji: Record<string, string> = {
  Personal: '👤',
  Work: '💼',
  Shopping: '🛒',
  Health: '❤️',
  Other: '📌',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleEdit();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(todo.id), 300);
  };

  const config = priorityConfig[todo.priority];

  return (
    <div
      className={`group bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-200 ${
        isDeleting ? 'opacity-0 scale-95 translate-x-4' : 'opacity-100 scale-100'
      } ${todo.completed ? 'opacity-75' : ''}`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? 'bg-gradient-to-br from-violet-500 to-indigo-600 border-transparent'
              : 'border-gray-300 hover:border-violet-400'
          }`}
        >
          {todo.completed && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleEdit}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full text-sm text-gray-700 bg-violet-50 border border-violet-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
          ) : (
            <p
              className={`text-sm font-medium leading-relaxed break-words ${
                todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
              }`}
            >
              {todo.text}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
              <span className="text-gray-600">{config.label}</span>
            </span>
            <span className="text-xs text-gray-400">
              {categoryEmoji[todo.category] || '📌'} {todo.category}
            </span>
            <span className="text-xs text-gray-300">
              {new Date(todo.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {!todo.completed && (
            <button
              onClick={() => setIsEditing(true)}
              className="w-7 h-7 rounded-lg hover:bg-violet-50 flex items-center justify-center text-gray-400 hover:text-violet-500 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          <button
            onClick={handleDelete}
            className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
