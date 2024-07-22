import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { useDisclosure } from '@nextui-org/react';

import Details from '@/components/modals/Details';
import { useTask } from '@/context/TaskProvider';
import type { Task } from '@/types/global';

export default function TaskCard() {
  const { task } = useTask();
  const { title, subTasks } = task;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const completedSubTask = subTasks.filter(
    (subTask) => subTask.isCompleted
  ).length;

  return (
    <>
      <Card
        shadow="sm"
        fullWidth
        radius="sm"
        className="p-4"
        isPressable
        onPress={onOpen}
      >
        <CardHeader className="p-0 mb-2">
          <p className="font-bold text-base">{title}</p>
        </CardHeader>
        <CardBody className="p-0">
          <p className="font-bold text-xs opacity-50">
            {completedSubTask} of {subTasks.length} substasks
          </p>
        </CardBody>
      </Card>
      <Details isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
