import Link from 'next/link';
import './globals.css';

export default function SubjectsPage() {
  const subjects = ['tology', 'tamil', 'english', 'mathematics', 'science', 'history', 'arts', 'languages'];

  return (
    <main className="content-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">U</div>
          <div className="brand-copy">
            <span>UNIFIED ENVIRONMENT FOR</span>
            <span>THEORIES AND CREATIVE OUTPUT</span>
          </div>
        </div>
      </header>

      <section className="module-panel">
        <div className="panel-heading">Subjects</div>
        <div className="grid-layout">
          {subjects.map((subject, index) => (
            <Link key={subject} href={`/modules?subject=${encodeURIComponent(subject)}&index=${index}`} className="tile-card">
              {index + 1}. {subject}
            </Link>
          ))}
        </div>
      </section>

      <footer className="global-footer">PAGE DEVELOPED AND MANAGED BY Dv.Haresh</footer>
    </main>
  );
}
