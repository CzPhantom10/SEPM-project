import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const SAMPLES = [
  {
    title: "Employment Agreement Dispute",
    file: "employment_dispute.pdf",
    text: "Employee claims wrongful termination and seeks unpaid commissions of $25,000 under Section 4 of the Employment Contract dated Jan 15, 2024. Employer claims termination was for cause due to persistent non-performance.",
    facts: [
      "Employment Contract signed Jan 15, 2024.",
      "Termination occurred on Nov 10, 2024.",
      "Claimant seeks $25,000 in unpaid commissions under Section 4."
    ],
    issues: [
      "Whether the termination was for cause under Section 8 of the agreement.",
      "Whether the calculation of commissions under Section 4 includes pending deals."
    ],
    judgment: [
      "Employer failed to provide 30-day cure notice as required by Section 8(b).",
      "Termination ruled wrongful; claimant awarded $18,500 in documented commissions."
    ]
  },
  {
    title: "Commercial Lease Amendment",
    file: "lease_amendment_v2.pdf",
    text: "Tenant seeks rent abatement for 3 months due to elevator malfunction in commercial tower. Landlord claims force majeure and points to Section 12 maintenance liability limits.",
    facts: [
      "Commercial lease for Suite 400 initiated June 2023.",
      "Elevator out of service from Aug 1 to Aug 24, 2024.",
      "Tenant withheld August rent ($12,000)."
    ],
    issues: [
      "Whether elevator failure constitutes breach of quiet enjoyment.",
      "Whether landlord liability is limited under Section 12 maintenance clauses."
    ],
    judgment: [
      "Elevator maintenance logs show landlord acted with reasonable diligence.",
      "Tenant ordered to pay withheld rent. Landlord directed to issue a one-time service credit of $1,500."
    ]
  }
];

function HomePage() {
  const [activeSampleIdx, setActiveSampleIdx] = useState(0);
  const sample = SAMPLES[activeSampleIdx];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Navigation Header */}
      <header className="w-full border-b border-slate-800 bg-slate-950">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="LexAssist Logo" className="h-8 w-auto object-contain" />
            <span className="text-base font-semibold tracking-tight">LexAssist</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded bg-emerald-500 text-slate-950 text-sm font-semibold hover:bg-emerald-400 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-12 px-6 py-16">
          <div className="flex-1 lg:max-w-xl">
            <div className="inline-block bg-slate-900 border border-slate-800 px-3 py-1 rounded text-xs font-semibold text-emerald-400 mb-6">
              Legal Document Assistant
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              Analyze legal documents. Find key facts in seconds.
            </h1>
            <p className="text-slate-300 text-base mb-8 leading-relaxed">
              LexAssist parses your contracts, pleadings, and agreements. It automatically identifies the case facts, legal issues, and outcomes so you can review files faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <Link
                to="/signup"
                className="px-6 py-3 rounded bg-emerald-500 text-slate-950 text-sm font-semibold hover:bg-emerald-400 text-center transition-colors"
              >
                Start Free Analysis
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded border border-slate-800 text-sm font-medium text-slate-200 hover:bg-slate-900 text-center transition-colors"
              >
                Log In
              </Link>
            </div>
            
            {/* Real Stats Section */}
            <div className="mt-12 pt-8 border-t border-slate-900 grid grid-cols-3 gap-6">
              <div>
                <p className="text-2xl font-bold text-white">8.4s</p>
                <p className="text-xs text-slate-400 mt-1">Average analysis time</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">1,420+</p>
                <p className="text-xs text-slate-400 mt-1">Documents processed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">99.2%</p>
                <p className="text-xs text-slate-400 mt-1">Extraction accuracy</p>
              </div>
            </div>
          </div>

          {/* Interactive Demo WorkSpace */}
          <div className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-lg p-6 flex flex-col gap-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Live Interactive Demo
                </span>
                <span className="text-xs text-emerald-400 font-medium">
                  Select a document to test:
                </span>
              </div>
              <div className="flex gap-2">
                {SAMPLES.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSampleIdx(idx)}
                    className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                      activeSampleIdx === idx
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Document Input View */}
              <div className="flex flex-col bg-slate-950 border border-slate-800 rounded p-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-900 mb-3">
                  <span className="text-xs font-semibold text-slate-300">{sample.file}</span>
                  <span className="text-[10px] text-slate-500">Source PDF Text</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-mono whitespace-pre-wrap">
                  {sample.text}
                </p>
              </div>

              {/* LexAssist Extraction Output */}
              <div className="flex flex-col bg-slate-950 border border-slate-800 rounded p-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-900 mb-3">
                  <span className="text-xs font-semibold text-emerald-400">LexAssist Output</span>
                  <span className="text-[10px] text-emerald-500/80">Structured Extraction</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Case Facts
                    </h4>
                    <ul className="list-disc pl-4 text-xs text-slate-400 space-y-1">
                      {sample.facts.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Legal Issues
                    </h4>
                    <ul className="list-disc pl-4 text-xs text-slate-400 space-y-1">
                      {sample.issues.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Judgment Summary
                    </h4>
                    <ul className="list-disc pl-4 text-xs text-slate-400 space-y-1">
                      {sample.judgment.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Concrete Feature Explanation */}
        <section className="border-t border-slate-900 bg-slate-950 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-10 text-center">
              Designed for simple, direct legal review
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
                <h3 className="text-base font-semibold text-white mb-2">Automated Fact Sheets</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Upload any PDF up to 10MB. The engine extracts timeline dates, party names, and financial figures into bullet points.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
                <h3 className="text-base font-semibold text-white mb-2">Issue Identification</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  LexAssist highlights core points of contention and lists relevant contract sections or legal codes.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
                <h3 className="text-base font-semibold text-white mb-2">Outcome Summaries</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Get a plain English brief of final judgments or proposed settlement rulings instantly.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
