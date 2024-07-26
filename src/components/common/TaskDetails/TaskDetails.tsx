import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Divider } from '@nextui-org/divider';
import { Checkbox } from '@nextui-org/checkbox';
import { Select, SelectItem } from '@nextui-org/select';
import { Button } from '@nextui-org/button';

import { useBoard } from '@/context/BoardProvider/BoardProvider';
import { useTask } from '@/context/TaskProvider';

interface DetailsProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onEdit: () => void;
}
export default function Details({
  isOpen,
  onOpenChange,
  onEdit,
}: DetailsProps) {
  const { task, updateSubTask } = useTask();
  const { columns, updateTask, deleteTask } = useBoard();
  const { id, title, description, status, subTasks } = task;
  const [localStatus, setLocalStatus] = useState(status);

  const completedSubTask = subTasks.filter(
    (subTask) => subTask.isCompleted
  ).length;

  const changeLocalStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!!e.target.value) {
      setLocalStatus(e.target.value);
    }
  };
  const updateState = () => {
    status !== localStatus && updateTask({ ...task, status: localStatus });
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      className="w-[90%]"
      onClose={updateState}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody className="mb-4">
              <p>{description}</p>
              <Divider />
              <p>{`Subtasks (${completedSubTask} of ${subTasks.length})`}</p>
              {subTasks.map((subTask) => (
                <Checkbox
                  key={subTask.id}
                  value={subTask.title}
                  aria-label={subTask.title}
                  isSelected={subTask.isCompleted}
                  lineThrough
                  classNames={{
                    base: 'bg-primary/10 rounded-lg w-full max-w-none m-0 p-3',
                  }}
                  onChange={() =>
                    updateSubTask(subTask.id, !subTask.isCompleted)
                  }
                >
                  {subTask.title}
                </Checkbox>
              ))}
              <Divider />
              <Select
                label="Current Status"
                classNames={{
                  value: 'capitalize',
                }}
                variant="bordered"
                size="lg"
                color="default"
                aria-label="Select Status"
                labelPlacement="outside"
                defaultSelectedKeys={[localStatus]}
                selectedKeys={[localStatus]}
                selectionMode="single"
                onChange={changeLocalStatus}
              >
                {columns.map((column) => (
                  <SelectItem key={column} className=" capitalize">
                    {column}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <Button color="primary" onClick={onEdit}>
                Edit
              </Button>
              <Button color="danger" onClick={() => deleteTask(id)}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
