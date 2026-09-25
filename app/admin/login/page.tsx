"use client";

import { useState } from 'react';

export default function AdminLoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!captchaPassed) {
      setError('Please complete the QUAT CAPTCHA verification.');
      return;
    }

    if (form.username.toLowerCase() !== 'haresh' || form.password !== 'UETCO2007') {
      setError('Incorrect username or password.');
      return;
    }

    window.location.href = '/admin';
  };

  return (
    <main className="auth-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">U</div>
          <div className="brand-copy">
            <span>UNIFIED ENVIRONMENT FOR</span>
            <span>THEORIES AND CREATIVE OUTPUT</span>
          </div>
        </div>
      </header>

      <section className="auth-card">
        <h2>Three-Step Verification</h2>
        <input
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="Enter Name"
        />
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Enter Password"
        />

        <div className="captcha-box">
          <div className="captcha-title">Human Verification</div>
          <QuatCaptcha onPass={() => setCaptchaPassed(true)} />
        </div>

        {error && <div className="error-banner">{error}</div>}

        <button type="button" onClick={handleSubmit} disabled={!captchaPassed} className={captchaPassed ? 'btn-enabled' : ''}>
          Verify
        </button>
      </section>

      <footer className="global-footer">PAGE DEVELOPED AND MANAGED BY Dv.Haresh</footer>
    </main>
  );
}

function QuatCaptcha({ onPass }: { onPass: () => void }) {
  const correctSequence = [0, 2, 4, 5];
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (index: number) => {
    if (selected.includes(index)) {
      setSelected((prev) => prev.filter((item) => item !== index));
      return;
    }

    const next = [...selected, index];
    setSelected(next);

    if (next.length === correctSequence.length && next.every((item, i) => item === correctSequence[i])) {
      onPass();
    }
  };

  return (
    <div className="quat-grid">
      {Array.from({ length: 6 }, (_, index) => (
        <button
          key={index}
          type="button"
          className={`quat-dot ${selected.includes(index) ? 'active' : ''}`}
          onClick={() => toggle(index)}
        />
      ))}
    </div>
  );
}
