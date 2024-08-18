import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import prisma from '@/lib/prismaDB';

export const POST = auth(async function POST(req) {
  const data = await req.json();
  const userId = req.auth?.user?.id;

  try {
    if (!userId) throw new Error('User not found');
    const newColumn = await prisma.column.create({
      data: data,
    });

    return NextResponse.json(newColumn, { status: 201 });
  } catch (error) {
    console.error('Error creating column:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
});
