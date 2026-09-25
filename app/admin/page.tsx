"use client";

import { useEffect, useMemo, useState } from 'react';
import '../admin.css';

export default function AdminDashboardPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [subjectName, setSubjectName] = useState('');
  const [moduleName, setModuleName] = useState('');
  const [moduleSubjectId, setModuleSubjectId] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileSubjectId, setFileSubjectId] = useState('');
  const [fileModuleId, setFileModuleId] = useState('');

  const refresh = async () => {
    const res = await fetch('/api/subjects');
    const data = await res.json();
    setSubjects(data.subjects || []);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const totalModules = useMemo(
    () => subjects.reduce((sum, subject) => sum + (subject.modules?.length || 0), 0),
    [subjects]
  );

  const totalFiles = useMemo(
    () => subjects.reduce(
      (sum, subject) => sum + (subject.modules?.reduce((modSum, mod) => modSum + (mod.files?.length || 0), 0) || 0),
      0
    ),
    [subjects]
  );

  const createSubject = async () => {
    if (!subjectName.trim()) return;
    await fetch('/api/subjects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: subjectName.trim() })
    });
    setSubjectName('');
    refresh();
  };

  const createModule = async () => {
    if (!moduleName.trim() || !moduleSubjectId) return;
    await fetch('/api/modules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectId: moduleSubjectId, name: moduleName.trim() })
    });
    setModuleName('');
    refresh();
  };

  const createFile = async () => {
    if (!fileName.trim() || !fileUrl.trim() || !fileSubjectId || !fileModuleId) return;
    await fetch('/api/files', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectId: fileSubjectId, moduleId: fileModuleId, name: fileName.trim(), url: fileUrl.trim() })
    });
    setFileName('');
    setFileUrl('');
    refresh();
  };

  const removeSubject = async (id: string) => {
    await fetch(`/api/subjects/${id}`, { method: 'DELETE' });
    refresh();
  };

  const removeModule = async (subjectId: string, moduleId: string) => {
    await fetch(`/api/modules/${moduleId}?subjectId=${subjectId}`, { method: 'DELETE' });
    refresh();
  };

  const removeFile = async (subjectId: string, moduleId: string, fileId: string) => {
    await fetch(`/api/files/${fileId}?subjectId=${subjectId}&moduleId=${moduleId}`, { method: 'DELETE' });
    refresh();
  };

  return (
    <main className="admin-shell">
      <header className="topbar admin-topbar">
        <div className="brand-wrap">
          <div className="brand-mark">U</div>
          <div className="brand-copy">
            <span>UNIFIED ENVIRONMENT FOR</span>
            <span>THEORIES AND CREATIVE OUTPUT</span>
          </div>
        </div>
      </header>

      <section className="admin-panel">
        <div className="panel-heading">Admin Dashboard</div>

        <div className="stats-row">
          <div className="stat-box"><span>{subjects.length}</span> subjects</div>
          <div className="stat-box"><span>{totalModules}</span> modules</div>
          <div className="stat-box"><span>{totalFiles}</span> files</div>
        </div>

        <div className="crud-grid">
          <div className="crud-card">
            <h3>Create subject</h3>
            <input value={subjectName} onChange={(e) => setSubjectName(e.target.value)} placeholder="Subject name" />
            <button onClick={createSubject}>Create subject</button>
          </div>

          <div className="crud-card">
            <h3>Create module</h3>
            <select value={moduleSubjectId} onChange={(e) => setModuleSubjectId(e.target.value)}>
              <option value="">Select subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
            <input value={moduleName} onChange={(e) => setModuleName(e.target.value)} placeholder="Module name" />
            <button onClick={createModule}>Create module</button>
          </div>

          <div className="crud-card">
            <h3>Create file</h3>
            <select value={fileSubjectId} onChange={(e) => { setFileSubjectId(e.target.value); setFileModuleId(''); }}>
              <option value="">Select subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
            <select value={fileModuleId} onChange={(e) => setFileModuleId(e.target.value)}>
              <option value="">Select module</option>
              {(subjects.find((subject) => subject.id === fileSubjectId)?.modules || []).map((module: any) => (
                <option key={module.id} value={module.id}>{module.name}</option>
              ))}
            </select>
            <input value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="File name" />
            <input value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder="File URL" />
            <button onClick={createFile}>Create file</button>
          </div>
        </div>

        <div className="records-panel">
          {loading ? <p>Loading records...</p> : subjects.map((subject) => (
            <div key={subject.id} className="record-box">
              <div className="record-header">
                <strong>{subject.name}</strong>
                <button className="danger" onClick={() => removeSubject(subject.id)}>Delete subject</button>
              </div>

              {subject.modules?.map((module: any) => (
                <div key={module.id} className="module-box">
                  <div className="record-header secondary">
                    <span>{module.name}</span>
                    <button className="danger" onClick={() => removeModule(subject.id, module.id)}>Delete module</button>
                  </div>

                  <ul>
                    {(module.files || []).map((file: any) => (
                      <li key={file.id}>
                        <span>{file.name}</span>
                        <a href={file.url} target="_blank" rel="noreferrer">Open</a>
                        <button className="danger" onClick={() => removeFile(subject.id, module.id, file.id)}>Delete</button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <footer className="global-footer">PAGE DEVELOPED AND MANAGED BY Dv.Haresh</footer>
    </main>
  );
}
