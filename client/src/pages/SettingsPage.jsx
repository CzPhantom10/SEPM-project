import React from 'react';

function Toggle({ label, description, defaultOn, onChange }) {
  const [isOn, setIsOn] = React.useState(!!defaultOn);

  const handleToggle = () => {
    const next = !isOn;
    setIsOn(next);
    if (onChange) {
      onChange(next);
    }
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
        {description && <p className="text-xs text-slate-500">{description}</p>}
      </div>
      <button
        type="button"
        onClick={handleToggle}
        className={`relative inline-flex h-5 w-9 items-center rounded-full border border-slate-200 transition-colors ${
          isOn ? 'bg-slate-900' : 'bg-slate-200'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
            isOn ? 'translate-x-3.5' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

function SettingsPage() {
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto py-10 px-10">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">Settings</h1>
        <p className="text-sm text-slate-500 mb-6">
          Manage your account settings and preferences
        </p>

        <div className="space-y-6">
          <section className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="Prateek"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="ps826105@gmail.com"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>
            </div>
            <button className="px-4 py-2 rounded-full bg-teal-400 text-white text-xs font-medium hover:bg-teal-500">
              Save Changes
            </button>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Notifications</h2>
            <Toggle
              label="Email Notifications"
              description="Receive notifications via email"
              defaultOn
            />
            <Toggle
              label="Analysis Completion"
              description="Get notified when document analysis is complete"
              defaultOn
            />
            <Toggle
              label="Weekly Reports"
              description="Receive weekly summary of your analysis activity"
              defaultOn={false}
            />
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Billing & Subscription</h2>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-900">Professional Plan</p>
                <p className="text-xs text-slate-500">$49.99 per month</p>
                <p className="text-xs text-slate-500 mt-1">Next billing date: March 9, 2026</p>
              </div>
              <div className="flex gap-3 items-center">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                  Active
                </span>
                <button className="px-4 py-2 rounded-full border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100">
                  Manage Subscription
                </button>
                <button className="px-4 py-2 rounded-full border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100">
                  Update Payment Method
                </button>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-red-200 p-6">
            <h2 className="text-sm font-semibold text-red-700 mb-1">Danger Zone</h2>
            <p className="text-xs text-red-500 mb-4">Irreversible actions for your account</p>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-900">Delete Account</p>
                <p className="text-xs text-slate-500">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <button className="px-4 py-2 rounded-full bg-red-600 text-white text-xs font-medium hover:bg-red-700">
                Delete Account
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
