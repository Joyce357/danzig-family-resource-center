"use client";

import React, { useEffect, useRef } from "react";
import { FaXmark } from "react-icons/fa6";
import Image from "next/image";

interface GalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export default function GalleryLightbox({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  triggerRef,
}: GalleryLightboxProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen || !imageSrc) return;

    // 1. Lock background scrolling
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // 2. Save active element to restore it on close
    const previousFocus = document.activeElement as HTMLElement;
    const triggerEl = triggerRef?.current;

    // 3. Focus the close button
    closeBtnRef.current?.focus();

    // 4. Trap keyboard focus & Handle Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex="0"]'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
      // Restore focus
      if (triggerEl) {
        triggerEl.focus();
      } else if (previousFocus) {
        previousFocus.focus();
      }
    };
  }, [isOpen, imageSrc, onClose, triggerRef]);

  if (!isOpen || !imageSrc) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      id="lightbox"
      className="lightbox is-open"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery Image Detail View"
      ref={modalRef}
    >
      <button
        ref={closeBtnRef}
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
        style={{ background: "none", border: "none" }}
      >
        <FaXmark />
      </button>

      <div
        className="lightbox-content-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1200}
          height={800}
          className="lightbox-content"
          style={{
            objectFit: "contain",
            maxWidth: "90%",
            maxHeight: "80vh",
            display: "block",
            margin: "0 auto",
          }}
          priority
        />
      </div>
    </div>
  );
}
