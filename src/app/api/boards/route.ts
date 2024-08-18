import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import prisma from '@/lib/prismaDB';

export const GET = auth(async function GET(req) {
  const userId = req.auth?.user?.id;
  try {
    if (!userId) throw new Error('User not found');

    const boards = await prisma.board.findMany({
      where: {
        userId: Number(userId),
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

export const POST = auth(async function POST(req) {
  const data = await req.json();
  const userId = req.auth?.user?.id;

  try {
    if (!userId) throw new Error('User not found');
    const newBoard = await prisma.board.create({
      data: {
        title: data.title,
        userId: Number(userId),
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
});
