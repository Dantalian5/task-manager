'use client';
import { useState } from 'react';

import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { useDisclosure } from '@nextui-org/react';

import TaskDetails from '@/components/common/TaskDetails';
import TaskEdit from '@/components/common/TaskEdit';
import { useTask } from '@/context/TaskProvider';

export default function TaskCard() {
  const { task, setTask } = useTask();
  const { title, subTasks } = task;
  const completedSubTask = subTasks.filter(
    (subTask) => subTask.isCompleted
  ).length;

  const {
    isOpen: isTaskEditOpen,
    onOpen: onTaskEditOpen,
    onOpenChange: onTaskEditOpenChange,
    onClose: onTaskEditClose,
  } = useDisclosure();
  const {
    isOpen: isTaskDetailsOpen,
    onOpen: onTaskDetailsOpen,
    onOpenChange: onTaskDetailsOpenChange,
    onClose: onTaskDetailsClose,
  } = useDisclosure();

  return (
    <>
      <Card
        shadow="sm"
        fullWidth
        radius="sm"
        className="p-4"
        isPressable
        onPress={onTaskDetailsOpen}
        classNames={{ base: 'bg-card-gradient from-card to-card-light' }}
      >
        <CardHeader className="p-0 mb-2">
          <p className="font-bold text-base text-start">{title}</p>
        </CardHeader>
        <CardBody className="p-0">
          <p className="font-bold text-xs text-secondary">
            {completedSubTask} of {subTasks.length} substasks
          </p>
        </CardBody>
      </Card>
      <TaskDetails
        isOpen={isTaskDetailsOpen}
        onOpenChange={onTaskDetailsOpenChange}
        onClose={onTaskDetailsClose}
        onEdit={onTaskEditOpen}
      />
      <TaskEdit
        isOpen={isTaskEditOpen}
        onOpenChange={onTaskEditOpenChange}
        onClose={onTaskEditClose}
        task={task}
        setTask={setTask}
      />
    </>
  );
}
