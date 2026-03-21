import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

const navItemClasses = ({ isActive }) =>
  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? 'bg-slate-900 text-white'
      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
  }`;

function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="LexAssist" className="h-8 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900">LexAssist</span>
              <span className="text-xs text-slate-500">Legal AI Assistant</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 text-slate-700">
          <NavLink to="/dashboard" className={navItemClasses}>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/upload" className={navItemClasses}>
            <span>Upload Document</span>
          </NavLink>
          <NavLink to="/history" className={navItemClasses}>
            <span>Analysis History</span>
          </NavLink>
          <NavLink to="/settings" className={navItemClasses}>
            <span>Settings</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
