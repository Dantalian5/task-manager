import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prismaDB';
import { auth } from '@/auth';

export const GET = auth(async function GET(request, { params }) {
  const id = Number(params?.id);
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
    const column = await prisma.column.findFirst({
      where: {
        id: id,
        userId: Number(userId),
      },
      include: {
        tasks:
          includeQuery === 'tasks'
            ? {
                orderBy: { createdAt: 'asc' },
                include: {
                  subTasks: { orderBy: { createdAt: 'asc' } },
                },
              }
            : false,
      },
    });

    if (!column) {
      return NextResponse.json(
        { error: 'Columna no encontrada o no tienes permisos' },
        { status: 404 }
      );
    }

    return NextResponse.json(column);
  } catch (error) {
    console.error('Error al obtener la columna:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
});
