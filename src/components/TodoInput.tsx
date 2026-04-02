'use client';

import { useState } from 'react';
import { Priority } from '@/app/page';

interface TodoInputProps {
  onAdd: (text: string, priority: Priority, category: string) => void;
}

const CATEGORIES = ['Personal', 'Work', 'Shopping', 'Health', 'Other'];

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('Personal');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim(), priority, category);
    setText('');
    setPriority('medium');
    setCategory('Personal');
    setExpanded(false);
  };

  const priorityColors: Record<Priority, string> = {
    low: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    high: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-violet-300 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-violet-400" />
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setExpanded(true)}
          placeholder="Add a new task..."
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition-all hover:scale-105 active:scale-95"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-3">
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">Priority</p>
              <div className="flex gap-2">
                {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                      priority === p
                        ? priorityColors[p] + ' shadow-sm scale-105'
                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">Category</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                      category === cat
                        ? 'bg-violet-100 text-violet-700 border-violet-200 shadow-sm scale-105'
                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
