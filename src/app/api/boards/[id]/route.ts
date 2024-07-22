import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import prisma from '@/lib/prismaDB';

export const GET = auth(async function GET(
  req,
  { params }: { params?: { id?: string } }
) {
  const id = params?.id;
  if (!id) {
    return NextResponse.json(
      { error: 'Board ID is required' },
      { status: 400 }
    );
  }

  if (req.auth) {
    return NextResponse.json(req.auth);
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        boardId: Number(id),
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        subTasks: true,
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
});
