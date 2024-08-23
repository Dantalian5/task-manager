import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prismaDB';
import { auth } from '@/auth';
import { taskSchema } from '@/schemas/taskSchema';

export const POST = auth(async function POST(req) {
  const userId = req.auth?.user?.id;

  if (!userId) {
    return NextResponse.json(
      { error: 'Usuario no autenticado' },
      { status: 401 }
    );
  }

  const parsedData = taskSchema.safeParse(await req.json());
  if (!parsedData.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', issues: parsedData.error.format() },
      { status: 400 }
    );
  }
  const { title, description, columnId, subTasks } = parsedData.data;

  try {
    const newTask = await prisma.task.create({
      data: {
        title: title,
        description: description,
        columnId: columnId,
        userId: Number(userId),
        subTasks: {
          create:
            subTasks?.map((subTask) => ({
              title: subTask.title,
              isCompleted: subTask.isCompleted || false,
              userId: Number(userId),
            })) || [],
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
});
