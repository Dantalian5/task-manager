import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaDB';

export async function PUT(
  req: NextRequest,
  { params }: { params?: { id?: string } }
) {
  const id = params?.id as string;
  const data = await req.json();

  try {
    const updatedTask = await prisma.subTask.update({
      where: { id: parseInt(id, 10) },
      data,
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
