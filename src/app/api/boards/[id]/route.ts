import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaDB';
import { auth } from '@/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const board = await prisma.board.findUnique({
      where: {
        id: parseInt(id, 10),
      },
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

    if (!board) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }

    return NextResponse.json(board);
  } catch (error) {
    console.error('Error fetching boards:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await request.json();

  try {
    const currentBoard = await prisma.board.findUnique({
      where: { id: parseInt(id, 10) },
      include: { columns: true },
    });

    if (!currentBoard) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }

    const columnIds = data.columns
      .map((col: { id?: string }) => col.id)
      .filter(Boolean);

    const updatedBoard = await prisma.$transaction(async (prisma) => {
      const deletedColumns = await prisma.column.deleteMany({
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

      for (const column of data.columns) {
        if (column.id) {
          await prisma.column.update({
            where: { id: column.id },
            data: { name: column.name },
          });
        } else {
          await prisma.column.create({
            data: {
              name: column.name,
              boardId: parseInt(id, 10),
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
    console.error('Error updating board:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const existingBoard = await prisma.board.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!existingBoard) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }
    await prisma.board.delete({
      where: { id: parseInt(id, 10) },
    });
    return NextResponse.json(
      { message: 'Board deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting board:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
