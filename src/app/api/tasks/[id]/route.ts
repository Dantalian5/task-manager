import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismaDB';

interface SubTask {
  id: number | null;
  title: string;
}

export async function PUT(
  req: NextRequest,
  { params }: { params?: { id?: string } }
) {
  const id = params?.id as string;
  const data = await req.json();

  console.log('data:', data);

  try {
    if (data.subTasks) {
      const existingSubTasks = await prisma.subTask.findMany({
        where: { taskId: parseInt(id, 10) },
      });

      const subTaskIds = data.subTasks
        .map((subTask: SubTask) => subTask.id)
        .filter((id: number) => id !== null);

      const subTasksToDelete = existingSubTasks.filter(
        (subTask) => !subTaskIds.includes(subTask.id)
      );

      await prisma.subTask.deleteMany({
        where: { id: { in: subTasksToDelete.map((subTask) => subTask.id) } },
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id, 10) },
      data: {
        title: data.title,
        description: data.description,
        columnId: Number(data.columnId),
        subTasks: {
          upsert: data.subTasks?.map((subTask: SubTask) => ({
            where: { id: subTask.id || 0 },
            update: { title: subTask.title },
            create: { title: subTask.title },
          })),
        },
      },
      include: { subTasks: true },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params?: { id?: string } }
) {
  const id = parseInt(params?.id as string, 10);

  try {
    await prisma.task.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: 'Task deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
