import React, { useState } from 'react';
import UploadLogo from '../assets/upload logo.png';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      if (file) formData.append('file', file);
      if (text.trim()) formData.append('text', text.trim());

      if (!file && !text.trim()) {
        setError('Please provide a PDF file or paste text.');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // FastAPI returns errors in a `detail` field by default
        const message = data.message || data.detail || 'Analysis failed';
        throw new Error(message);
      }

      // Save current analysis
      sessionStorage.setItem('lexassist_analysis', JSON.stringify(data));
      sessionStorage.setItem('lexassist_source_text', text || '');

      // Build a history entry for dashboard and history pages
      const now = new Date();
      const historyEntry = {
        id: now.getTime(),
        title: file?.name || 'Pasted Document',
        createdAt: now.toISOString(),
        status: 'Completed'
      };

      try {
        const existing = JSON.parse(localStorage.getItem('lexassist_history') || '[]');
        const updated = [historyEntry, ...existing];
        localStorage.setItem('lexassist_history', JSON.stringify(updated));
        sessionStorage.setItem('lexassist_current_doc_id', String(historyEntry.id));
      } catch {
        // If localStorage is unavailable or corrupted, skip history persistence
      }

      window.location.href = '/analysis';
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto py-10 px-10">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Upload Document</h1>
        <p className="text-sm text-slate-500 mb-6">
          Upload your legal document for AI-powered analysis
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 overflow-hidden">
              <img src={UploadLogo} alt="Upload" className="w-7 h-7 object-contain" />
            </div>
            <p className="text-sm font-medium text-slate-900 mb-1">
              Drag and drop your file here
            </p>
            <p className="text-xs text-slate-500 mb-4">or</p>
            <label className="px-4 py-2 rounded-full border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100 cursor-pointer">
              Browse Files
              <input type="file" accept="application/pdf,text/plain" className="hidden" onChange={handleFileChange} />
            </label>
            {file && (
              <p className="mt-3 text-xs text-slate-500">
                Selected file: <span className="font-medium">{file.name}</span>
              </p>
            )}
            <p className="text-xs text-slate-500 mt-4">
              Supported formats: <span className="font-medium">PDF, TXT</span> • Maximum file size: 10MB
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Or paste document text</label>
            <textarea
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 resize-none"
              placeholder="Paste the contents of your legal document here..."
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-6 py-2.5 rounded-full bg-teal-400 text-white text-sm font-medium hover:bg-teal-500 disabled:opacity-60"
          >
            {loading ? 'Analyzing...' : 'Upload and Analyze'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadPage;
