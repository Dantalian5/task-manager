import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaDB';
import { auth } from '@/auth';

export const PUT = auth(async function PUT(req, { params }) {
  const id = params?.id as string;
  const data = await req.json();
  const userId = req.auth?.user?.id;

  try {
    if (!userId) throw new Error('User not found');
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
});
