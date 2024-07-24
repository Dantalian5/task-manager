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
import { useDisclosure } from '@nextui-org/react';

import { useBoard } from '@/context/BoardProvider/BoardProvider';
import { useTask } from '@/context/TaskProvider';
import EditTask from '@/components/forms/EditTask/EditTask';

interface DetailsProps {
  isModalOpen: boolean;
  onModalClose: () => void;
}
export default function Details({ isModalOpen, onModalClose }: DetailsProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { task, updateSubTask } = useTask();
  const { columns, updateTask } = useBoard();
  const { title, description, status, subTasks } = task;
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
      isOpen={isModalOpen}
      onOpenChange={onModalClose}
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
              <Button color="primary" onClick={onOpen}>
                Edit
              </Button>
              <EditTask
                action="edit"
                isModalOpen={isOpen}
                onModalClose={onOpenChange}
                closeModal={onOpenChange}
              />
              <Button color="danger">Delete</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
