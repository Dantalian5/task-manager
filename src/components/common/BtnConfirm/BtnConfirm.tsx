import React from 'react';

import { Button, type ButtonProps } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';

import ConfirmModal from '@/components/common/ConfirmModal';

type btn = typeof Button;

interface BtnConfirmProps extends ButtonProps {
  onConfirm: () => void;
  title: string;
  message: string;
  label: string;
}

export default function BtnConfirm({
  onConfirm,
  title,
  message,
  label,
  ...props
}: BtnConfirmProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button {...props} onPress={onOpen}>
        {label}
      </Button>
      <ConfirmModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        onConfirm={onConfirm}
        title={title}
        message={message}
      />
    </>
  );
}
