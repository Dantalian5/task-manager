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
        tasks: {
          include: {
            subTasks: true,
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
    const updatedBoard = await prisma.board.update({
      where: { id: parseInt(id, 10) },
      data: {
        title: data.title,
        columns: data.columns,
      },
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
