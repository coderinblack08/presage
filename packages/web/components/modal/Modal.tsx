import { Transition } from "@headlessui/react";
import * as Portal from "@radix-ui/react-portal";
import { Close } from "@material-ui/icons";
import * as Dialog from "@radix-ui/react-dialog";
import React, { Fragment, useState } from "react";

interface ModalProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  trigger,
  children,
}) => {
  const [open, setOpen] = useState(false);

  function stopPropagation(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {trigger}
      <Portal.Root>
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
              <div className="fixed inset-0 h-screen w-screen bg-black/75 backdrop-blur-lg" />
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
                  className="flex items-center justify-center min-h-screen pt-4 px-6 pb-20 text-center"
                  onClick={() => setOpen(false)}
                >
                  <div
                    className={`relative z-50 inline-block w-full max-w-lg overflow-hidden text-left align-middle transition-all transform bg-white rounded-xl p-6`}
                    onClick={stopPropagation}
                  >
                    <Dialog.Title className="text-xl font-bold" as="h1">
                      {title}
                    </Dialog.Title>
                    <Dialog.Description className="text-gray-500 mt-1">
                      {description}
                    </Dialog.Description>
                    <div className="mt-6">{children}</div>
                    <Dialog.Close
                      as="button"
                      className="absolute top-0 right-0 m-3"
                    >
                      <Close className="text-gray-400" fontSize="small" />
                    </Dialog.Close>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </Dialog.Content>
        </Transition>
      </Portal.Root>
    </Dialog.Root>
  );
};

export const ModalTrigger: React.FC<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <Dialog.Trigger className={className} as="div">
      {children}
    </Dialog.Trigger>
  );
};
