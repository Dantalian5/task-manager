import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaDB';

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
