import { NextResponse } from 'next/server';
import { createModule, getSubjects } from '@/lib/data-store';

export async function GET() {
  const subjects = await getSubjects();
  return NextResponse.json({ subjects });
}

export async function POST(request: Request) {
  const body = await request.json();
  const subjectId = String(body.subjectId || '').trim();
  const name = String(body.name || '').trim();

  if (!subjectId || !name) {
    return NextResponse.json({ error: 'Subject ID and module name are required.' }, { status: 400 });
  }

  const module = await createModule(subjectId, name);
  return NextResponse.json({ module }, { status: 201 });
}
