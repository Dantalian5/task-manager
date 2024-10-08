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
import { Spinner } from '@nextui-org/spinner';

import { useSelectedBoard } from '@/context/BoardsProvider';
import { useTask } from '@/context/TaskProvider';
import { svgDelete } from '@/utils/svgIcons';
import BtnConfirm from '@/components/common/BtnConfirm';

interface DetailsProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  onEdit: () => void;
}
export default function Details({
  isOpen,
  onOpenChange,
  onClose,
  onEdit,
}: DetailsProps) {
  const { task, setTask } = useTask();
  const { columns, reload } = useSelectedBoard();
  const [isSaving, setIsSaving] = useState(false);

  const { id, title, description, subTasks, columnId } = task;
  const [localColumn, setLocalColumn] = useState(columnId.toString());

  const completedSubTask = subTasks.filter(
    (subTask) => subTask.isCompleted
  ).length;

  const toogleSubtask = async (subTaskId: number, status: boolean) => {
    try {
      const response = await fetch(`/api/subtasks/${subTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isCompleted: status }),
      });
      if (!response.ok) {
        throw new Error('Failed to update subtask');
      }
      const updatedSubTask = await response.json();
      setTask((prevTask) => {
        const updatedSubTasks = prevTask.subTasks.map((subTask) =>
          subTask.id === subTaskId ? updatedSubTask : subTask
        );
        return { ...prevTask, subTasks: updatedSubTasks };
      });
    } catch (error) {
      console.error('Error updating subtask:', error);
    }
  };

  const changeColumn = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!!e.target.value) {
      setLocalColumn(e.target.value);
    }
  };

  const deleteTask = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      reload();
      onClose();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
    setIsSaving(false);
  };
  const updateState = async () => {
    if (columnId.toString() !== localColumn) {
      try {
        const response = await fetch(`/api/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...task, columnId: Number(localColumn) }),
        });

        if (!response.ok) {
          throw new Error('Failed to update task');
        }

        const data = await response.json();
        reload();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      onClose={updateState}
      backdrop="blur"
      scrollBehavior="inside"
      classNames={{
        wrapper: 'w-full',
        base: 'p-2 w-[90%] max-w-[480px] bg-card-gradient from-background to-background-light',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {isSaving && (
              <div className="inset-0 absolute bg-background/50 z-50 flex items-center justify-center backdrop-blur-sm">
                <Spinner size="lg" />
              </div>
            )}
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
                    toogleSubtask(subTask.id, !subTask.isCompleted)
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
                defaultSelectedKeys={[localColumn]}
                selectedKeys={[localColumn]}
                selectionMode="single"
                onChange={changeColumn}
              >
                {columns.map((column) => (
                  <SelectItem key={column.id} className=" capitalize">
                    {column.name}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <BtnConfirm
                onConfirm={deleteTask}
                color="danger"
                type="button"
                startContent={svgDelete}
                className="mr-auto text-lg"
                isIconOnly
                aria-label="delete task"
                title="Delete Task"
                message="Are you sure you want to delete this task?"
              />
              <Button color="default" onClick={onClose}>
                Close
              </Button>
              <Button color="primary" onClick={onEdit}>
                Edit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
