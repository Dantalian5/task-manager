import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaDB';
import { auth } from '@/auth';
import { z } from 'zod';

const subTaskSchema = z.object({
  title: z.string().min(1, 'El título del subtask es requerido').optional(),
  isCompleted: z.boolean().optional(),
});

export const PUT = auth(async function PUT(req, { params }) {
  const id = Number(params?.id as string);
  const userId = req.auth?.user?.id;

  const parsedData = subTaskSchema.safeParse(await req.json());
  if (!parsedData.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', issues: parsedData.error.format() },
      { status: 400 }
    );
  }
  const { title, isCompleted } = parsedData.data;

  try {
    const updatedSubTask = await prisma.subTask.update({
      where: { id: id, userId: Number(userId) },
      data: {
        title,
        isCompleted,
      },
    });
    if (!updatedSubTask) {
      return NextResponse.json(
        { error: 'Subtask no encontrado o no tienes permisos' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedSubTask, { status: 200 });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
});
