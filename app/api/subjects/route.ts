import { NextResponse } from 'next/server';
import { createSubject, getSubjects } from '@/lib/data-store';

export async function GET() {
  const subjects = await getSubjects();
  return NextResponse.json({ subjects });
}

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name || '').trim();

  if (!name) {
    return NextResponse.json({ error: 'Subject name is required.' }, { status: 400 });
  }

  const subject = await createSubject(name);
  return NextResponse.json({ subject }, { status: 201 });
}
