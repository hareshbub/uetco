import { NextResponse } from 'next/server';
import { deleteModule, getSubjectById, updateSubject } from '@/lib/data-store';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(request.url);
  const subjectId = searchParams.get('subjectId');

  if (!subjectId) {
    return NextResponse.json({ error: 'Subject ID is required.' }, { status: 400 });
  }

  const deleted = await deleteModule(subjectId, params.id);
  if (!deleted) {
    return NextResponse.json({ error: 'Module not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const name = String(body.name || '').trim();

  if (!name) {
    return NextResponse.json({ error: 'Module name is required.' }, { status: 400 });
  }

  const subject = await getSubjectById(body.subjectId || '');
  if (!subject) {
    return NextResponse.json({ error: 'Subject not found.' }, { status: 404 });
  }

  const updated = subject.modules.find((module) => module.id === params.id);
  if (!updated) {
    return NextResponse.json({ error: 'Module not found.' }, { status: 404 });
  }

  updated.name = name;
  const saved = await updateSubject(subject.id, subject.name);

  return NextResponse.json({ module: updated, subject: saved });
}
