import { Transition } from "@headlessui/react";
import { Close } from "@material-ui/icons";
import * as Dialog from "@radix-ui/react-dialog";
import React, { Fragment, useEffect, useState } from "react";

interface ModalProps {
  trigger?: React.ReactNode;
  title: string;
  description: React.ReactNode | string;
  children: (props: { open: boolean; setOpen: any }) => React.ReactNode;
  visible?: boolean;
  onCancel?: any;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  trigger,
  children,
  className,
  visible,
  onCancel,
}) => {
  const [open, setOpen] = useState(visible ? visible : false);

  useEffect(() => {
    if (visible !== undefined) {
      setOpen(visible);
    }
  }, [visible]);

  function stopPropagation(e: React.MouseEvent) {
    e.stopPropagation();
  }

  function handleOpenChange(open: boolean) {
    if (visible !== undefined && !open) {
      onCancel();
    } else {
      setOpen(open);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      {trigger}
      <Transition show={open}>
        <Dialog.Overlay forceMount>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as={Fragment}
          >
            <div className="fixed inset-0 h-screen w-screen bg-black/75" />
          </Transition.Child>
        </Dialog.Overlay>
        <Dialog.Content style={{ width: "100vw" }} forceMount>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            as={Fragment}
          >
            <div className="fixed z-50 inset-0">
              <div
                className="flex items-center justify-center min-h-screen p-4 text-center"
                onClick={() => handleOpenChange(false)}
              >
                <div
                  className={`relative z-50 inline-block w-full max-w-lg overflow-hidden text-left align-middle transition-all transform bg-white rounded-xl p-6 ${className}`}
                  onClick={stopPropagation}
                >
                  <Dialog.Title className="text-xl font-bold" asChild>
                    <h1>{title}</h1>
                  </Dialog.Title>
                  <Dialog.Description className="text-gray-500 mt-1">
                    {description}
                  </Dialog.Description>
                  <div className="mt-6">{children({ open, setOpen })}</div>
                  <button
                    className="absolute top-0 right-0 m-3"
                    onClick={() => handleOpenChange(false)}
                  >
                    <Close className="text-gray-400" fontSize="small" />
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog.Content>
      </Transition>
    </Dialog.Root>
  );
};

export const ModalTrigger: React.FC<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <Dialog.Trigger className={className} asChild>
      {children}
    </Dialog.Trigger>
  );
};
