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
        columns: true,
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
