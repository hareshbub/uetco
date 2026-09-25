import { NextResponse } from 'next/server';
import { deleteFile, deleteModule } from '@/lib/data-store';

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
