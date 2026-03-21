import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UploadLogo from '../assets/upload logo.png';

function DashboardPage() {
  const [stats, setStats] = useState({
    totalDocuments: 0,
    successfulAnalyses: 0,
    thisWeek: 0,
    recent: []
  });

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('lexassist_history') || '[]');

      const totalDocuments = stored.length;
      const successfulAnalyses = stored.filter((item) => item.status === 'Completed').length;

      const now = new Date();
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      const thisWeek = stored.filter((item) => {
        const created = new Date(item.createdAt);
        return created >= weekAgo && created <= now;
      }).length;

      const recent = stored.slice(0, 3);

      setStats({ totalDocuments, successfulAnalyses, thisWeek, recent });
    } catch {
      // If parsing fails, keep defaults.
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
      <div className="max-w-6xl mx-auto py-10 px-10">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 mb-1">Welcome back, Prateek</h1>
          <p className="text-sm text-slate-500">
            Here&apos;s an overview of your legal document analysis activity
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between">
            <div className="text-sm text-slate-500 mb-3">Total Documents</div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-semibold text-slate-900">{stats.totalDocuments}</div>
                <div className="text-xs text-emerald-600 mt-1">
                  {stats.totalDocuments > 0 ? '+ Real-time from your uploads' : 'No documents yet'}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between">
            <div className="text-sm text-slate-500 mb-3">Successful Analyses</div>
            <div>
              <div className="text-3xl font-semibold text-slate-900">{stats.successfulAnalyses}</div>
              <div className="text-xs text-slate-500 mt-1">
                {stats.totalDocuments > 0
                  ? 'Completed analyses in this browser'
                  : 'Upload a document to see stats'}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between">
            <div className="text-sm text-slate-500 mb-3">This Week</div>
            <div>
              <div className="text-3xl font-semibold text-slate-900">{stats.thisWeek}</div>
              <div className="text-xs text-slate-500 mt-1">Documents analyzed</div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)] gap-6 items-start">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Recent Documents</h2>
            {stats.recent.length === 0 ? (
              <p className="text-xs text-slate-500">No documents analyzed yet.</p>
            ) : (
              <div className="space-y-3">
                {stats.recent.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500">{formatDate(item.createdAt)}</p>
                    </div>
                    <Link
                      to="/analysis"
                      className="px-3 py-1.5 rounded-full border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100"
                    >
                      View Analysis
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Quick Action</h2>
            <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-2xl py-10 mb-5">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 overflow-hidden">
                <img src={UploadLogo} alt="Upload" className="w-7 h-7 object-contain" />
              </div>
              <p className="text-sm font-medium text-slate-900 mb-1">Upload New Document</p>
              <p className="text-xs text-slate-500 mb-4">Start analyzing a new legal document</p>
              <Link
                to="/upload"
                className="px-4 py-2 rounded-full bg-teal-400 text-white text-sm font-medium hover:bg-teal-500"
              >
                Upload Document
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;
