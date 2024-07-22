import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Checkbox } from '@nextui-org/checkbox';
import { Select, SelectItem } from '@nextui-org/select';
import { Button } from '@nextui-org/button';

import { useColumns } from '@/context/ColumnsProvider';
import { useTask } from '@/context/TaskProvider';
import { Divider } from '@nextui-org/divider';

interface DetailsProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export default function Details({ isOpen, onOpenChange }: DetailsProps) {
  const { task, updateSubTask } = useTask();
  const { columns } = useColumns();
  const { title, description, status, subTasks } = task;
  const completedSubTask = subTasks.filter(
    (subTask) => subTask.isCompleted
  ).length;

  const changeSubTaskStatus = async (subTaskId: number, status: boolean) => {
    try {
      const response = await fetch('/api/subtasks/' + subTaskId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isCompleted: status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update subtask');
      }
    } catch (error) {
      console.error('Error updating subtask:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      className="w-[90%]"
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
                defaultSelectedKeys={[status]}
                selectedKeys={[status]}
                selectionMode="single"
                onChange={(e) => console.log(e)}
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
              <Button color="primary">Edit</Button>
              <Button color="danger">Delete</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
