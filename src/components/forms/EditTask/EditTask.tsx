import { ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import { Divider } from '@nextui-org/divider';
import { Checkbox } from '@nextui-org/checkbox';
import { Select, SelectItem } from '@nextui-org/select';
import { Input, Textarea } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { type TaskSchema, taskSchema } from '@/schemas/taskSchema';
import { useColumns } from '@/context/ColumnsProvider';
import { useTask } from '@/context/TaskProvider';
import { useModal } from '@/components/common/ModalContext/ModalContext';

const svgClose = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="m289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34Z"
    ></path>
  </svg>
);

export default function EditTask() {
  const { task, updateTask } = useTask();
  const { columns } = useColumns();

  const { onClose } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: task || {},
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subTasks',
  });

  const onSubmit: SubmitHandler<TaskSchema> = async (data) => {
    updateTask(data);
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Edit Task</ModalHeader>
      <ModalBody className="mb-4">
        <form
          id="task-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <Input
            type="text"
            labelPlacement="outside"
            label="Title"
            isInvalid={!!errors.title?.message}
            errorMessage={errors.title?.message}
            variant="bordered"
            radius="sm"
            {...register('title')}
          />
          <Textarea
            type="text"
            labelPlacement="outside"
            label="Description"
            isInvalid={!!errors.description}
            errorMessage={errors.description?.message}
            variant="bordered"
            radius="sm"
            minRows={4}
            {...register('description')}
          />
          <div className="flex flex-col gap-3">
            <label>SubTasks</label>
            {fields.map((subTask, index) => (
              <div
                key={subTask.id}
                className="flex gap-4 w-full items-center justify-center"
              >
                <Input
                  type="text"
                  isInvalid={!!errors.subTasks?.[index]?.title?.message}
                  errorMessage={errors.subTasks?.[index]?.title?.message}
                  variant="bordered"
                  radius="sm"
                  {...register(`subTasks.${index}.title` as const)}
                />
                <Button
                  isIconOnly
                  variant="light"
                  onClick={() => remove(index)}
                  aria-label="Remove subtask"
                  className="w-fit h-fit min-w-fit rounded-none text-2xl"
                >
                  {svgClose}
                </Button>
              </div>
            ))}
            <Button
              color="secondary"
              onClick={() => append({ id: null, title: '' })}
            >
              Add SubTask
            </Button>
          </div>
          <Select
            label="Status"
            classNames={{
              value: 'capitalize',
            }}
            variant="bordered"
            size="lg"
            color="default"
            aria-label="Select Status"
            labelPlacement="outside"
            selectionMode="single"
            radius="sm"
            {...register('status')}
          >
            {columns.map((column) => (
              <SelectItem key={column} className=" capitalize">
                {column}
              </SelectItem>
            ))}
          </Select>
        </form>
      </ModalBody>
      <Divider />
      <ModalFooter>
        <Button color="primary" form="task-form" type="submit">
          Save
        </Button>
        <Button color="danger" onClick={onClose}>
          Delete
        </Button>
      </ModalFooter>
    </>
  );
}
