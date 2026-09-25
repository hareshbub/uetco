import { subjectsSeed } from '@/lib/mock-data';

export default function FilesPage({ searchParams }: { searchParams: { subject?: string; module?: string; index?: string } }) {
  const subjectName = searchParams.subject || 'tology';
  const moduleName = searchParams.module || 'mothaviyal';
  const subject = subjectsSeed.find((entry) => entry.name === subjectName) || subjectsSeed[0];
  const module = subject.modules.find((entry) => entry.name === moduleName) || subject.modules[0];

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
        <div className="panel-heading">Files in {module.name} ({subject.name})</div>
        <div className="file-list">
          {module.files.map((file, idx) => (
            <a key={file.name} href={file.url} target="_blank" rel="noreferrer" className="file-card" style={{ background: file.color }}>
              {idx + 1}. {file.name}
            </a>
          ))}
        </div>
      </section>

      <footer className="global-footer">PAGE DEVELOPED AND MANAGED BY Dv.Haresh</footer>
    </main>
  );
}
