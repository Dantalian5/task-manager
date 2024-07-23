'use client';
import { ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import { Divider } from '@nextui-org/divider';
import { Checkbox } from '@nextui-org/checkbox';
import { Select, SelectItem } from '@nextui-org/select';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';

import { useColumns } from '@/context/ColumnsProvider';
import { useTask } from '@/context/TaskProvider';
import ModalView from '@/components/common/ModalView';
import EditTask from '@/components/forms/EditTask/EditTask';
import { useRouter } from 'next/navigation';

import ModalContext from '../ModalContext/ModalContext';

export default function Details() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { task, updateTask, updateSubTask } = useTask();
  const { columns } = useColumns();
  const { title, description, status, subTasks } = task;
  const completedSubTask = subTasks.filter(
    (subTask) => subTask.isCompleted
  ).length;

  const router = useRouter();
  const updateState = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTask({ ...task, status: e.target.value });
    router.refresh();
  };

  return (
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
            onChange={() => updateSubTask(subTask.id, !subTask.isCompleted)}
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
          defaultSelectedKeys={[status]}
          selectedKeys={[status]}
          selectionMode="single"
          onChange={updateState}
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
        <ModalView isModalOpen={isOpen} onModalClose={onOpenChange}>
          <EditTask closeModal={onClose} />
        </ModalView>
        {/* <ModalContext initialIsOpen={isOpen}>
          <EditTask />
        </ModalContext> */}
        <Button color="danger">Delete</Button>
      </ModalFooter>
    </>
  );
}
