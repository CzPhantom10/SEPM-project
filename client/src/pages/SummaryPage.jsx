import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SummaryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const text = location.state?.text || sessionStorage.getItem('lexassist_source_text') || '';
    if (!text) {
      setSummary('Not Available');
      return;
    }

    const run = async () => {
      setLoading(true);
      setError('');
      try {
        const formData = new FormData();
        formData.append('text', text);
        const res = await fetch('/api/summary', { method: 'POST', body: formData });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || 'Summary failed');
        }
        const data = await res.json();
        setSummary(data.summary || 'Not Available');
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [location.state]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto py-10 px-10">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 mb-1">Plain Language Summary</h1>
            <p className="text-sm text-slate-500">Simplified explanation of the case</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-full border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            Back
          </button>
        </header>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 min-h-[260px]">
          {loading && <p className="text-sm text-slate-600">Generating summary...</p>}
          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
          {!loading && !error && (
            <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">{summary}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;
