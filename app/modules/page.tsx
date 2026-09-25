import Link from 'next/link';
import { subjectsSeed } from '@/lib/mock-data';

export default function ModulesPage({ searchParams }: { searchParams: { subject?: string; index?: string } }) {
  const subjectName = searchParams.subject || 'tology';
  const index = Number(searchParams.index || 0);
  const subject = subjectsSeed[index] || subjectsSeed[0];

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
        <div className="panel-heading">Modules of {subjectName}</div>
        <div className="grid-layout">
          {subject.modules.map((module, idx) => (
            <Link
              key={module.name}
              href={`/files?subject=${encodeURIComponent(subjectName)}&module=${encodeURIComponent(module.name)}&index=${idx}`}
              className="tile-card"
            >
              {idx + 1}. {module.name}
            </Link>
          ))}
        </div>
      </section>

      <footer className="global-footer">PAGE DEVELOPED AND MANAGED BY Dv.Haresh</footer>
    </main>
  );
}
