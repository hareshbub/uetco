import Link from 'next/link';
import './globals.css';

export default function HomePage() {
  return (
    <main className="landing-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">U</div>
          <div className="brand-copy">
            <span>UNIFIED ENVIRONMENT FOR</span>
            <span>THEORIES AND CREATIVE OUTPUT</span>
          </div>
        </div>
      </header>

      <section className="hero-panel">
        <Link href="/subjects" className="portal-btn primary">
          <span className="portal-icon">S</span>
        </Link>

        <Link href="/admin/login" className="portal-btn secondary">
          <span className="portal-icon">A</span>
        </Link>
      </section>

      <footer className="landing-footer">
        <div className="footer-head">Contact</div>
        <div>📧 hareshpolit@gmail.com</div>
        <div>📞 +91 9360015504</div>
        <div>Part of IO Technologies</div>
        <div>AN UNIT OF POLIT GROUP OF ORGANIZATION</div>
        <div>Special thanks to LEAP</div>
      </footer>
    </main>
  );
}
