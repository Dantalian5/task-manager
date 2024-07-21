// prisma/seed.mts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear usuario de prueba
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'securepassword', // Nota: en un entorno real, asegúrate de hashear las contraseñas
      boards: {
        create: [
          {
            title: 'Test Board 1',
            columns: ['Column 1', 'Column 2'],
            tasks: {
              create: [
                {
                  title: 'Task 1',
                  status: 'todo',
                  subTasks: {
                    create: [
                      { title: 'Subtask 1', status: 'incomplete' },
                      { title: 'Subtask 2', status: 'complete' },
                    ],
                  },
                },
                {
                  title: 'Task 2',
                  status: 'inprogress',
                  subTasks: {
                    create: [
                      { title: 'Subtask 3', status: 'incomplete' },
                      { title: 'Subtask 4', status: 'complete' },
                    ],
                  },
                },
                {
                  title: 'Task 3',
                  status: 'done',
                },
                {
                  title: 'Task 4',
                  status: 'todo',
                },
              ],
            },
          },
          {
            title: 'Test Board 2',
            columns: ['Column 3', 'Column 4'],
            tasks: {
              create: [
                {
                  title: 'Task 5',
                  status: 'inprogress',
                  subTasks: {
                    create: [
                      { title: 'Subtask 5', status: 'incomplete' },
                      { title: 'Subtask 6', status: 'complete' },
                    ],
                  },
                },
                {
                  title: 'Task 6',
                  status: 'todo',
                  subTasks: {
                    create: [
                      { title: 'Subtask 7', status: 'incomplete' },
                      { title: 'Subtask 8', status: 'complete' },
                    ],
                  },
                },
                {
                  title: 'Task 7',
                  status: 'done',
                },
                {
                  title: 'Task 8',
                  status: 'todo',
                },
              ],
            },
          },
          {
            title: 'Test Board 3',
            columns: ['Column 5', 'Column 6'],
            tasks: {
              create: [
                {
                  title: 'Task 9',
                  status: 'todo',
                  subTasks: {
                    create: [
                      { title: 'Subtask 9', status: 'incomplete' },
                      { title: 'Subtask 10', status: 'complete' },
                    ],
                  },
                },
                {
                  title: 'Task 10',
                  status: 'inprogress',
                  subTasks: {
                    create: [
                      { title: 'Subtask 11', status: 'incomplete' },
                      { title: 'Subtask 12', status: 'complete' },
                    ],
                  },
                },
                {
                  title: 'Task 11',
                  status: 'done',
                },
                {
                  title: 'Task 12',
                  status: 'todo',
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Seeded user with boards and tasks:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
