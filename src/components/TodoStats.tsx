'use client';

interface TodoStatsProps {
  total: number;
  completed: number;
  active: number;
}

export default function TodoStats({ total, completed, active }: TodoStatsProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
        <p className="text-2xl font-bold text-gray-800">{total}</p>
        <p className="text-xs text-gray-500 mt-1 font-medium">Total</p>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
        <p className="text-2xl font-bold text-violet-600">{active}</p>
        <p className="text-xs text-gray-500 mt-1 font-medium">Active</p>
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
        <p className="text-2xl font-bold text-green-500">{completed}</p>
        <p className="text-xs text-gray-500 mt-1 font-medium">Done</p>
      </div>

      {total > 0 && (
        <div className="col-span-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500 font-medium">Progress</p>
            <p className="text-xs font-bold text-violet-600">{percentage}%</p>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-violet-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
