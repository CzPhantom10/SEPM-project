import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

function SignupPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now we skip real signup and go straight to the dashboard.
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-slate-200 px-10 py-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <img src={Logo} alt="LexAssist" className="h-10 w-auto object-contain" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 mb-1">LexAssist</h1>
          <p className="text-sm text-slate-500">Create your account</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="text-left">
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              placeholder="John Doe"
            />
          </div>
          <div className="text-left">
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              placeholder="name@example.com"
            />
          </div>
          <div className="text-left">
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 rounded-xl bg-slate-900 text-white text-sm font-medium py-2.5 hover:bg-slate-800"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-slate-900 font-medium">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
