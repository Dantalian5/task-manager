import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import prisma from '@/lib/prismaDB';
import { columnSchema } from '@/schemas/columnSchema';

export const POST = auth(async function POST(req) {
  const userId = req.auth?.user?.id;

  if (!userId) {
    return NextResponse.json(
      { error: 'Usuario no autenticado' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    const parsedData = columnSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', issues: parsedData.error.format() },
        { status: 400 }
      );
    }
    const { name, boardId } = parsedData.data;

    const board = await prisma.board.findFirst({
      where: {
        id: boardId,
        userId: Number(userId),
      },
    });

    if (!board) {
      return NextResponse.json(
        { error: 'No tienes permisos para agregar columnas a este board' },
        { status: 403 }
      );
    }

    const newColumn = await prisma.column.create({
      data: {
        name,
        boardId,
        userId: Number(userId),
      },
    });

    return NextResponse.json(newColumn, { status: 201 });
  } catch (error) {
    console.error('Error al crear la columna:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});
