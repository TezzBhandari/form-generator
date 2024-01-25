"use client";
import { cn } from "@/lib/utils/classnames";
import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import ReactDom from "react-dom";

export interface ModalProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  ...props
}: ModalProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={React.Fragment}>
        {/* BACKDROP OVERLAY  */}
        <Dialog as="div" onClose={onClose} className="w-full bg-red-400">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="overlay fixed inset-0 bg-black/30" />
          </Transition.Child>
          {/* Modal  */}
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              {...props}
              className={cn(
                "bg-white w-full max-w-lg rounded-lg shadow-lg fixed top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 p-4",
                className,
                "z-[1000]"
              )}
            >
              {children}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export { Modal };
