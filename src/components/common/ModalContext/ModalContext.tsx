'use client';
import { Modal, ModalContent } from '@nextui-org/modal';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDisclosure } from '@nextui-org/react';

interface ModalContextProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
}
export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);

export default function ModalView({
  children,
  initialIsOpen,
}: {
  children: React.ReactNode;
  initialIsOpen: boolean;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  useEffect(() => {
    initialIsOpen && onOpen();
  }, [initialIsOpen, onOpen]);

  console.log(initialIsOpen);

  return (
    <ModalContext.Provider value={{ isOpen, onOpen, onClose, onOpenChange }}>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="w-[90%]"
      >
        <ModalContent>{(onClose) => children}</ModalContent>
      </Modal>
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
};
