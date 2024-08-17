import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import prisma from '@/lib/prismaDB';

export const GET = auth(async function GET(req) {
  if (req.auth) {
    return NextResponse.json(req.auth);
  }
  try {
    const boards = await prisma.board.findMany({
      where: {
        userId: 1,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(boards);
  } catch (error) {
    console.error('Error fetching boards:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
});
export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const newBoard = await prisma.board.create({
      data: {
        title: data.title,
        userId: 1,
        columns: {
          create: data.columns.map((column: { name: string }) => ({
            name: column.name,
          })),
        },
      },
    });

    return NextResponse.json(newBoard, { status: 201 });
  } catch (error) {
    console.error('Error creating board:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
