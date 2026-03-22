import React, { useEffect, useState } from 'react';

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('lexassist_history') || '[]');
      setHistory(stored);
    } catch {
      setHistory([]);
    }
  }, []);

  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto py-10 px-10">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Analysis History</h1>
        <p className="text-sm text-slate-500 mb-6">View your previous document analyses</p>

        <div className="bg-white rounded-2xl border border-slate-200">
          <div className="px-6 py-3 border-b border-slate-200 flex text-xs font-medium text-slate-500">
            <div className="flex-1">Document</div>
            <div className="w-32">Date</div>
            <div className="w-28">Status</div>
          </div>
          {history.length === 0 ? (
            <div className="px-6 py-4 text-xs text-slate-500">No analyses yet.</div>
          ) : (
            <div className="divide-y divide-slate-200 text-sm">
              {history.map((item) => (
                <div key={item.id} className="px-6 py-4 flex items-center text-slate-700">
                  <div className="flex-1">{item.title}</div>
                  <div className="w-32 text-xs text-slate-500">{formatDate(item.createdAt)}</div>
                  <div className="w-28">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                      {item.status || 'Completed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
