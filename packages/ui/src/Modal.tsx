import { Transition } from "@headlessui/react";
import { IconX } from "@tabler/icons";
import * as Dialog from "@radix-ui/react-dialog";
import React, { Fragment, useEffect, useState } from "react";

interface ModalProps {
  trigger?: React.ReactNode;
  children:
    | React.ReactNode
    | ((props: { open: boolean; setOpen: any }) => React.ReactNode);
  visible?: boolean;
  onCancel?: any;
  className?: string;
  title?: string;
}

export const Modal: React.VFC<ModalProps> = ({
  trigger,
  children,
  className,
  visible,
  title,
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
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal forceMount>
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
              <div className="fixed inset-0 h-screen w-screen bg-black/75 z-50" />
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
                    className={`relative z-50 inline-block w-full max-w-xl overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-900 rounded-2xl ${className}`}
                    onClick={stopPropagation}
                  >
                    <div className="flex justify-between items-center p-5 border-b-2 border-gray-100 dark:border-gray-800">
                      <h2 className="leading-none text-gray-500 font-bold text-lg">
                        {title}
                      </h2>
                      <button onClick={() => handleOpenChange(false)}>
                        <IconX
                          className="text-gray-400 focus:outline-none"
                          size={20}
                        />
                      </button>
                    </div>
                    <div className="p-5">
                      {children instanceof Function
                        ? children({ open, setOpen })
                        : children}
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </Dialog.Content>
        </Transition>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
