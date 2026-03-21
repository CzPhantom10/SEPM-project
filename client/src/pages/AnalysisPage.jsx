import React, { useEffect, useState } from 'react';

function SectionCard({ title, items, iconBg }) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg}`}>
          
        </div>
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      </div>
      <ul className="list-disc list-outside pl-5 space-y-1 text-sm text-slate-700">
        {(items && items.length ? items : ['Not Available']).map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function AnalysisPage() {
  const [analysis, setAnalysis] = useState(null);
  const [meta, setMeta] = useState({ title: 'Latest Analysis', createdAt: '' });

  useEffect(() => {
    const saved = sessionStorage.getItem('lexassist_analysis');
    if (saved) {
      setAnalysis(JSON.parse(saved));
    }

    // Load metadata for the current document from history
    try {
      const history = JSON.parse(localStorage.getItem('lexassist_history') || '[]');
      const currentId = sessionStorage.getItem('lexassist_current_doc_id');
      let entry = null;
      if (currentId) {
        entry = history.find((h) => String(h.id) === String(currentId));
      }
      if (!entry && history.length > 0) {
        entry = history[0];
      }
      if (entry) {
        setMeta({ title: entry.title, createdAt: entry.createdAt });
      }
    } catch {
      // keep default meta
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto py-10 px-10">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-900">Plain Text Summary</h2>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
              Completed
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 mb-1">{meta.title}</h1>
            <p className="text-xs text-slate-500">
              Completed
              {meta.createdAt &&
                ` · ${new Date(meta.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}`}
            </p>
          </div>
        </header>

        <SectionCard
          title="Case Facts"
          items={analysis?.caseFacts}
          iconBg="bg-slate-100 text-slate-700"
        />
        <SectionCard
          title="Legal Issues"
          items={analysis?.legalIssues}
          iconBg="bg-emerald-50 text-emerald-700"
        />
        <SectionCard
          title="Judgment"
          items={analysis?.judgment}
          iconBg="bg-sky-50 text-sky-700"
        />
      </div>
    </div>
  );
}

export default AnalysisPage;
