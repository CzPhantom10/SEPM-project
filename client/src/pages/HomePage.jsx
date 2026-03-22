import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-50">
      <header className="w-full border-b border-slate-800/70 bg-slate-950/60 backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="LexAssist" className="h-9 w-auto object-contain" />
            <span className="text-lg font-semibold tracking-tight">LexAssist</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-full text-sm font-medium text-slate-100 hover:bg-slate-800/80"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 hover:from-teal-300 hover:to-emerald-300 shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {/* Hero section */}
        <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6 py-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/40 px-3 py-1 text-xs font-medium text-emerald-200 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              New · AI-powered legal assistant for law teams
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight">
              AI-Powered Legal
              <span className="block text-teal-300">Document Analysis</span>
            </h1>
            <p className="text-slate-300 text-base mb-6 max-w-xl">
              LexAssist helps lawyers, firms, and legal teams quickly review contracts, pleadings,
              and case documents with structured case facts, legal issues, and judgments — in
              seconds instead of hours.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 text-sm font-semibold hover:from-teal-300 hover:to-emerald-300 shadow-md shadow-emerald-500/20"
              >
                Get Started for Free
              </Link>
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-full border border-slate-700 text-sm font-medium text-slate-100 hover:bg-slate-900/50"
              >
                Log In
              </Link>
              <span className="text-[11px] text-slate-400">
                No credit card required · Secure & private
              </span>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="bg-slate-950/70 border border-slate-700/70 rounded-3xl shadow-xl shadow-slate-950/40 p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                    Recent Analysis
                  </p>
                  <p className="text-sm font-medium text-slate-50">
                    Smith v. Jones Contract Dispute
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-400/15 text-emerald-200 border border-emerald-400/40">
                  Completed
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl bg-slate-900/60 px-3 py-3 border border-slate-700/70">
                  <p className="text-slate-400">Total Documents</p>
                  <p className="mt-1 text-xl font-semibold text-slate-50">24</p>
                  <p className="text-[11px] text-emerald-300 mt-1">+3 from last month</p>
                </div>
                <div className="rounded-xl bg-slate-900/60 px-3 py-3 border border-slate-700/70">
                  <p className="text-slate-400">Success Rate</p>
                  <p className="mt-1 text-xl font-semibold text-slate-50">91.7%</p>
                  <p className="text-[11px] text-slate-400 mt-1">AI-powered insights</p>
                </div>
                <div className="rounded-xl bg-slate-900/60 px-3 py-3 border border-slate-700/70">
                  <p className="text-slate-400">This Week</p>
                  <p className="mt-1 text-xl font-semibold text-slate-50">5</p>
                  <p className="text-[11px] text-slate-400 mt-1">Documents analyzed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section className="max-w-6xl mx-auto px-6 pb-14">
          <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">Built for modern legal teams</h2>
              <p className="text-sm text-slate-300 max-w-xl">
                Whether you&apos;re at a large firm, in-house, or a solo practitioner, LexAssist helps
                you move from raw documents to clear answers in minutes.
              </p>
            </div>
            <p className="text-xs text-slate-400">
              SOC2-ready infrastructure · Data stays private · No training on your documents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 p-5 flex flex-col gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-300">
                Law Firms
              </p>
              <h3 className="text-sm font-semibold text-slate-50">Accelerate case prep</h3>
              <p className="text-xs text-slate-300">
                Upload pleadings, discovery, and motions to instantly surface case facts and
                contested issues your team can build strategy around.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 p-5 flex flex-col gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-300">
                In‑House Counsel
              </p>
              <h3 className="text-sm font-semibold text-slate-50">Triage contracts faster</h3>
              <p className="text-xs text-slate-300">
                Spot key terms, risks, and unusual clauses across NDAs, MSAs, and vendor
                agreements without reading every line.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 p-5 flex flex-col gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-300">
                Solo & Boutique
              </p>
              <h3 className="text-sm font-semibold text-slate-50">Do more with less</h3>
              <p className="text-xs text-slate-300">
                Turn long documents into focused summaries and next steps so you can serve more
                clients without burning out.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-slate-800/70 bg-slate-950/40">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3">
              <h2 className="text-xl font-semibold text-white mb-2">How LexAssist works</h2>
              <p className="text-sm text-slate-300">
                From upload to insight in three simple steps. No complex setup, just sign in and
                start analyzing.
              </p>
            </div>
            <ol className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
              <li className="flex flex-col gap-2">
                <div className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-teal-400 text-slate-950 text-xs font-bold">
                  1
                </div>
                <p className="font-semibold text-slate-50">Upload a document</p>
                <p className="text-xs text-slate-300">
                  Drag in a PDF or paste raw text from your contract, pleading, or agreement.
                </p>
              </li>
              <li className="flex flex-col gap-2">
                <div className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-teal-400 text-slate-950 text-xs font-bold">
                  2
                </div>
                <p className="font-semibold text-slate-50">Let the AI analyze</p>
                <p className="text-xs text-slate-300">
                  Our Groq‑powered engine extracts case facts, legal issues, and likely outcomes in
                  a structured view.
                </p>
              </li>
              <li className="flex flex-col gap-2">
                <div className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-teal-400 text-slate-950 text-xs font-bold">
                  3
                </div>
                <p className="font-semibold text-slate-50">Share & take action</p>
                <p className="text-xs text-slate-300">
                  Save the analysis, generate plain‑language summaries, and align quickly with
                  clients and colleagues.
                </p>
              </li>
            </ol>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
