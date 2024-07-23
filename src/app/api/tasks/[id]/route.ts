import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaDB';

interface SubTask {
  id: number | null;
  title: string;
}

export async function PUT(
  req: NextRequest,
  { params }: { params?: { id?: string } }
) {
  const id = params?.id as string;
  const data = await req.json();

  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id, 10) },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        subTasks: {
          upsert: data.subTasks.map((subTask: SubTask) => ({
            where: { id: subTask.id || 0 },
            update: { title: subTask.title },
            create: { title: subTask.title },
          })),
        },
      },
      include: { subTasks: true },
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
