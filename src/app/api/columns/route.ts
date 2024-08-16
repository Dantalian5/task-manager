import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import prisma from '@/lib/prismaDB';

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
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
}
