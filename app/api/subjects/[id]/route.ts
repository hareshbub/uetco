import { NextResponse } from 'next/server';
import { deleteSubject, getSubjectById, updateSubject } from '@/lib/data-store';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const subject = await getSubjectById(params.id);
  if (!subject) {
    return NextResponse.json({ error: 'Subject not found.' }, { status: 404 });
  }
  return NextResponse.json({ subject });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const name = String(body.name || '').trim();

  if (!name) {
    return NextResponse.json({ error: 'Subject name is required.' }, { status: 400 });
  }

  const updated = await updateSubject(params.id, name);
  if (!updated) {
    return NextResponse.json({ error: 'Subject not found.' }, { status: 404 });
  }

  return NextResponse.json({ subject: updated });
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const ok = await deleteSubject(params.id);
  if (!ok) {
    return NextResponse.json({ error: 'Subject not found.' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
