import { Modal, ModalContent } from '@nextui-org/modal';

export default function ModalView({
  isModalOpen,
  onModalClose,
  children,
}: any) {
  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={onModalClose}
      placement="center"
      className="w-[90%]"
    >
      <ModalContent>{(onClose) => children}</ModalContent>
    </Modal>
  );
}
