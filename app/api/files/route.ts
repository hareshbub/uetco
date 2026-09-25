import { NextResponse } from 'next/server';
import { createFileRecord, getSubjects } from '@/lib/data-store';

export async function GET() {
  const subjects = await getSubjects();
  return NextResponse.json({ subjects });
}

export async function POST(request: Request) {
  const body = await request.json();
  const subjectId = String(body.subjectId || '').trim();
  const moduleId = String(body.moduleId || '').trim();
  const name = String(body.name || '').trim();
  const url = String(body.url || '').trim();

  if (!subjectId || !moduleId || !name || !url) {
    return NextResponse.json({ error: 'Subject, module, name and URL are required.' }, { status: 400 });
  }

  const file = await createFileRecord(subjectId, moduleId, name, url);
  return NextResponse.json({ file }, { status: 201 });
}
