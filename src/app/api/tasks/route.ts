import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaDB';

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const newTask = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        columnId: data.columnId,
        subTasks: {
          create: data.subTasks.map(
            (subTask: { title: string; isCompleted: boolean }) => ({
              title: subTask.title,
              isCompleted: subTask.isCompleted,
            })
          ),
        },
      },
      include: { subTasks: true },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
