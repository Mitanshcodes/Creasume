import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/40 text-sm mt-1">Manage your account preferences.</p>
      </div>

      {/* Email */}
      <section className="card-dark p-6 space-y-4">
        <h2 className="font-semibold text-white">Email Address</h2>
        <div>
          <label className="block text-sm text-white/60 mb-1.5">Current Email</label>
          <input
            type="email"
            defaultValue="creator@example.com"
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
        <button className="brand-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
          Update Email
        </button>
      </section>

      {/* Password */}
      <section className="card-dark p-6 space-y-4">
        <h2 className="font-semibold text-white">Change Password</h2>
        {[
          { label: "Current Password", placeholder: "••••••••" },
          { label: "New Password", placeholder: "At least 8 characters" },
          { label: "Confirm New Password", placeholder: "Repeat new password" },
        ].map(({ label, placeholder }) => (
          <div key={label}>
            <label className="block text-sm text-white/60 mb-1.5">{label}</label>
            <input
              type="password"
              placeholder={placeholder}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        ))}
        <button className="brand-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
          Update Password
        </button>
      </section>

      {/* Visibility */}
      <section className="card-dark p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-white">Profile Visibility</h2>
            <p className="text-white/40 text-xs mt-0.5">
              When public, brands can find your Influence Card.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-white/[0.06] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
          </label>
        </div>
      </section>

      {/* Danger zone */}
      <section className="card-dark p-6 border-red-500/20">
        <h2 className="font-semibold text-red-400 mb-1">Danger Zone</h2>
        <p className="text-white/40 text-sm mb-4">
          Permanently delete your account and all associated data. This cannot be undone.
        </p>
        <button className="border border-red-500/30 text-red-400/70 hover:text-red-400 hover:border-red-500/50 text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">
          Delete Account
        </button>
      </section>
    </div>
  );
}
