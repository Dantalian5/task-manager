import React from 'react';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Button, ButtonGroup } from '@nextui-org/button';

interface ConfirmModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmModal({
  isOpen,
  onOpenChange,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmModalProps) {
  const handleAccept = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      className="w-[90%]"
      onClose={onClose}
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
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <p className="text-secondary">{message}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleAccept}
                aria-label="confirm button"
              >
                Accept
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
