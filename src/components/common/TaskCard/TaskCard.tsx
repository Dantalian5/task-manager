'use client';
import { useState } from 'react';

import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { useDisclosure } from '@nextui-org/react';

import TaskDetails from '@/components/common/TaskDetails';
import TaskEdit from '@/components/common/TaskEdit';
import { useTask } from '@/context/TaskProvider';

export default function TaskCard() {
  const { task } = useTask();
  const { title, subTasks } = task;
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [modal, setModal] = useState<'edit' | 'details' | null>(null);

  const completedSubTask = subTasks.filter(
    (subTask) => subTask.isCompleted
  ).length;

  const openDetails = () => {
    isOpen && onClose();
    setModal('details');
    onOpen();
  };
  const openEdit = () => {
    isOpen && onClose();
    setModal('edit');
    onOpen();
  };

  return (
    <>
      <Card
        shadow="sm"
        fullWidth
        radius="sm"
        className="p-4"
        isPressable
        onPress={openDetails}
      >
        <CardHeader className="p-0 mb-2">
          <p className="font-bold text-base text-start">{title}</p>
        </CardHeader>
        <CardBody className="p-0">
          <p className="font-bold text-xs opacity-50">
            {completedSubTask} of {subTasks.length} substasks
          </p>
        </CardBody>
      </Card>
      {modal === 'details' && (
        <TaskDetails
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onEdit={openEdit}
        />
      )}
      {modal === 'edit' && (
        <TaskEdit
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={openDetails}
          action="edit"
          task={task}
        />
      )}
    </>
  );
}
