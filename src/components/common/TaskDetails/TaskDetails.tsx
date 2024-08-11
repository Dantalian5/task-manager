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
      onClose={updateState}
      classNames={{
        wrapper: 'w-full',
        base: 'p-2 w-[90%] max-w-[480px]',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody className="mb-4">
              <p className="text-sm text-secondary">{description}</p>
              <Divider className="my-2" />
              <p className="text-xs text-secondary font-bold">{`Subtasks (${completedSubTask} of ${subTasks.length})`}</p>
              {subTasks.map((subTask) => (
                <Checkbox
                  key={subTask.id}
                  value={subTask.title}
                  aria-label={subTask.title}
                  isSelected={subTask.isCompleted}
                  lineThrough
                  classNames={{
                    base: 'bg-primary/5 rounded-lg w-full max-w-none m-0 p-3',
                    label: 'text-sm font-semibold text-secondary',
                  }}
                  onChange={() =>
                    updateSubTask(subTask.id, !subTask.isCompleted)
                  }
                >
                  {subTask.title}
                </Checkbox>
              ))}
              <Divider className="my-2" />
              <Select
                label="Current Status"
                classNames={{
                  value: 'capitalize text-foreground text-sm',
                  label: 'text-xs text-secondary font-bold',
                  listbox: 'text-secondary text-sm',
                }}
                variant="bordered"
                size="lg"
                color="secondary"
                aria-label="Select Status"
                labelPlacement="outside"
                defaultSelectedKeys={[localStatus]}
                selectedKeys={[localStatus]}
                selectionMode="single"
                onChange={changeLocalStatus}
              >
                {columns.map((column: string) => (
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
