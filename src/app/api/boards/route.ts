import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import prisma from '@/lib/prismaDB';
import { boardSchema, type BoardSchema } from '@/schemas/boardSchema';

export const POST = auth(async function POST(req) {
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
    const newBoard = await prisma.board.create({
      data: {
        title: data.title,
        userId: Number(userId),
        columns: {
          create:
            data.columns?.map((column) => ({
              name: column.name,
              userId: Number(userId),
            })) || [],
        },
      },
      include: {
        columns: true,
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

export const GET = auth(async function GET(req) {
  const userId = req.auth?.user?.id;

  if (!userId) {
    return NextResponse.json(
      { error: 'Usuario no autenticado' },
      { status: 401 }
    );
  }

  try {
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
