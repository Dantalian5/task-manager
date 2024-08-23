import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prismaDB';
import { auth } from '@/auth';
import { boardSchema } from '@/schemas/boardSchema';

export const GET = auth(async function GET(request, { params }) {
  const id = params?.id as string;
  const userId = request.auth?.user?.id;
  const url = new URL(request.url);
  const includeQuery = url.searchParams.get('include');

  if (!userId) {
    return NextResponse.json(
      { error: 'Usuario no autenticado' },
      { status: 401 }
    );
  }

  try {
    const includeOptions: any = {};

    if (includeQuery === 'columns' || includeQuery === 'tasks') {
      includeOptions.columns = {
        orderBy: {
          createdAt: 'asc',
        },
      };
    }

    if (includeQuery === 'tasks') {
      includeOptions.columns.include = {
        tasks: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            subTasks: {
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
        },
      };
    }

    const board = await prisma.board.findFirst({
      where: {
        id: parseInt(id, 10),
        userId: Number(userId),
      },
      include: includeOptions,
    });

    if (!board) {
      return NextResponse.json(
        { error: 'Board no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(board);
  } catch (error) {
    console.error('Error al obtener el board:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});

export const PUT = auth(async function PUT(req, { params }) {
  const id = params?.id as string;
  const userId = req.auth?.user?.id;

  if (!userId) {
    return NextResponse.json(
      { error: 'Usuario no autenticado' },
      { status: 401 }
    );
  }

  const parsedData = boardSchema.safeParse(await req.json());
  if (!parsedData.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', issues: parsedData.error.format() },
      { status: 400 }
    );
  }
  const data = parsedData.data;

  try {
    const existingBoard = await prisma.board.findUnique({
      where: { id: parseInt(id, 10) },
      include: { columns: true },
    });

    if (!existingBoard) {
      return NextResponse.json(
        { error: 'Board no encontrado' },
        { status: 404 }
      );
    }

    if (existingBoard.userId !== Number(userId)) {
      return NextResponse.json(
        { error: 'No tienes permisos para actualizar este board' },
        { status: 403 }
      );
    }

    const columnIds = data.columns
      ?.map((col) => col.id)
      .filter((id): id is number => !!id);

    const updatedBoard = await prisma.$transaction(async (prisma) => {
      await prisma.column.deleteMany({
        where: {
          boardId: parseInt(id, 10),
          id: { notIn: columnIds },
        },
      });

      const board = await prisma.board.update({
        where: { id: parseInt(id, 10) },
        data: {
          title: data.title,
        },
      });

      for (const column of data.columns || []) {
        if (column.id) {
          await prisma.column.update({
            where: { id: Number(column.id) },
            data: { name: column.name },
          });
        } else {
          await prisma.column.create({
            data: {
              name: column.name,
              boardId: Number(id),
              userId: Number(userId),
            },
          });
        }
      }

      return prisma.board.findUnique({
        where: { id: parseInt(id, 10) },
        include: {
          columns: {
            include: {
              tasks: {
                include: {
                  subTasks: true,
                },
              },
            },
          },
        },
      });
    });

    return NextResponse.json(updatedBoard, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar el board:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});

export const DELETE = auth(async function DELETE(req, { params }) {
  const id = params?.id as string;
  const userId = req.auth?.user?.id;

  if (!userId) {
    return NextResponse.json(
      { error: 'Usuario no autenticado' },
      { status: 401 }
    );
  }

  try {
    const existingBoard = await prisma.board.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existingBoard) {
      return NextResponse.json(
        { error: 'Board no encontrado' },
        { status: 404 }
      );
    }

    if (existingBoard.userId !== Number(userId)) {
      return NextResponse.json(
        { error: 'No tienes permisos para eliminar este board' },
        { status: 403 }
      );
    }

    await prisma.board.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json(
      { message: 'Board eliminado exitosamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al eliminar el board:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});
