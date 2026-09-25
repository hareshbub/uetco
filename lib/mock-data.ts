import { NextResponse } from 'next/server';
import { deleteFile } from '@/lib/data-store';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(request.url);
  const subjectId = searchParams.get('subjectId');
  const moduleId = searchParams.get('moduleId');

  if (!subjectId || !moduleId) {
    return NextResponse.json({ error: 'Subject ID and Module ID are required.' }, { status: 400 });
  }

  const deleted = await deleteFile(subjectId, moduleId, params.id);
  if (!deleted) {
    return NextResponse.json({ error: 'File not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
