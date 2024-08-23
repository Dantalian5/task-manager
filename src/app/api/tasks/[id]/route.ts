import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import prisma from '@/lib/prismaDB';
import { taskSchema } from '@/schemas/taskSchema';

export const PUT = auth(async function PUT(req, { params }) {
  const id = parseInt(params?.id as string, 10);
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
    const task = await prisma.task.findFirst({
      where: {
        id: id,
        userId: Number(userId),
      },
      include: {
        subTasks: true,
      },
    });

    if (!task) {
      return NextResponse.json(
        { error: 'Tarea no encontrada o no tienes permisos' },
        { status: 404 }
      );
    }

    if (subTasks) {
      const existingSubTasks = task.subTasks;
      const subTaskIds = subTasks
        .map((subTask) => subTask.id)
        .filter((id): id is number => !!id);

      const subTasksToDelete = existingSubTasks.filter(
        (subTask) => !subTaskIds.includes(subTask.id)
      );

      await prisma.subTask.deleteMany({
        where: { id: { in: subTasksToDelete.map((subTask) => subTask.id) } },
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id: id },
      data: {
        title,
        description,
        columnId,
        subTasks: {
          upsert:
            subTasks?.map((subTask) => ({
              where: { id: subTask.id || 0 },
              update: { title: subTask.title },
              create: { title: subTask.title, userId: Number(userId) }, // Asociar subtask al usuario
            })) || [],
        },
      },
      include: { subTasks: true },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});

export const DELETE = auth(async function DELETE(req, { params }) {
  const id = parseInt(params?.id as string, 10);
  const userId = req.auth?.user?.id;

  if (!userId) {
    return NextResponse.json(
      { error: 'Usuario no autenticado' },
      { status: 401 }
    );
  }

  try {
    const task = await prisma.task.delete({
      where: { id: id, userId: Number(userId) },
    });
    if (!task) {
      return NextResponse.json(
        { error: 'Tarea no encontrada' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Tarea eliminada exitosamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});
