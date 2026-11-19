"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode | string;
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  isFullscreen?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  title = '',
  showCloseButton = true,
  isFullscreen = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? "w-full h-full"
    : "relative w-full rounded-3xl bg-light-accent dark:bg-gray-dark";

  return (
    <div className="modal fixed inset-0 z-99999 flex items-center justify-center overflow-y-auto">
      {!isFullscreen && (
        <div
          className="fixed inset-0 h-full w-full bg-gray/50 backdrop-blur-[32px]"
          onClick={onClose}
        />
      )}
      <div
        ref={modalRef}
        className={`${contentClasses} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <header className="flex justify-between items-center pb-2">
            {title && title !== "" && <div>{title}</div>}
            {showCloseButton && (
              <div className="absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center">
                <button
                  onClick={onClose}
                  className="text-error hover:bg-error/10 p-1 rounded-full transition-colors cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="size-5 text-error" />
                </button>
              </div>
            )}
          </header>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};
