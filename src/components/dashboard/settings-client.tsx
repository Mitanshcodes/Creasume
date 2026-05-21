"use client";

import { useState, useTransition } from "react";
import { updateEmail, updatePassword, togglePublished } from "@/lib/actions/creator";
import { signOut } from "next-auth/react";

interface Props {
  email: string;
  hasPassword: boolean;
  isPublished: boolean;
}

export default function SettingsClient({ email, hasPassword, isPublished }: Props) {
  const [emailValue, setEmailValue] = useState(email);
  const [emailMsg, setEmailMsg] = useState<string | null>(null);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg] = useState<string | null>(null);

  const [published, setPublished] = useState(isPublished);
  const [isPending, startTransition] = useTransition();

  function handleEmailUpdate() {
    setEmailMsg(null);
    startTransition(async () => {
      const result = await updateEmail(emailValue);
      setEmailMsg("error" in result ? (result.error ?? "Unknown error") : "Email updated successfully!");
    });
  }

  function handlePasswordUpdate() {
    setPwMsg(null);
    if (newPw !== confirmPw) {
      setPwMsg("New passwords don't match");
      return;
    }
    if (newPw.length < 8) {
      setPwMsg("New password must be at least 8 characters");
      return;
    }
    startTransition(async () => {
      const result = await updatePassword(currentPw, newPw);
      if ("error" in result) {
        setPwMsg(result.error ?? "Unknown error");
      } else {
        setPwMsg("Password updated successfully!");
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
      }
    });
  }

  function handleVisibilityToggle() {
    const next = !published;
    setPublished(next);
    startTransition(async () => {
      await togglePublished(next);
    });
  }

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
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
        {emailMsg && (
          <p className={`text-sm ${emailMsg.includes("success") ? "text-[#10b981]" : "text-red-400"}`}>
            {emailMsg}
          </p>
        )}
        <button
          onClick={handleEmailUpdate}
          disabled={isPending}
          className="brand-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          Update Email
        </button>
      </section>

      {/* Password */}
      {hasPassword && (
        <section className="card-dark p-6 space-y-4">
          <h2 className="font-semibold text-white">Change Password</h2>
          {[
            { label: "Current Password", value: currentPw, setter: setCurrentPw, placeholder: "••••••••" },
            { label: "New Password", value: newPw, setter: setNewPw, placeholder: "At least 8 characters" },
            { label: "Confirm New Password", value: confirmPw, setter: setConfirmPw, placeholder: "Repeat new password" },
          ].map(({ label, value, setter, placeholder }) => (
            <div key={label}>
              <label className="block text-sm text-white/60 mb-1.5">{label}</label>
              <input
                type="password"
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          ))}
          {pwMsg && (
            <p className={`text-sm ${pwMsg.includes("success") ? "text-[#10b981]" : "text-red-400"}`}>
              {pwMsg}
            </p>
          )}
          <button
            onClick={handlePasswordUpdate}
            disabled={isPending}
            className="brand-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            Update Password
          </button>
        </section>
      )}

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
            <input
              type="checkbox"
              checked={published}
              onChange={handleVisibilityToggle}
              disabled={isPending}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/[0.06] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
          </label>
        </div>
      </section>

      {/* Sign out */}
      <section className="card-dark p-6">
        <h2 className="font-semibold text-white mb-3">Session</h2>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
        >
          Sign out
        </button>
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
