"use client";

import React, { useEffect, useRef } from "react";
import { FaRegCalendar, FaLocationDot, FaXmark } from "react-icons/fa6";
import { CommunityEvent } from "../data/site-data";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CommunityEvent | null;
  triggerRef: React.RefObject<HTMLElement | null>;
}

export default function EventModal({
  isOpen,
  onClose,
  event,
  triggerRef,
}: EventModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Lock scroll, trap focus, restore focus, close on escape
  useEffect(() => {
    if (!isOpen || !event) return;

    // 1. Lock background scrolling
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // 2. Remember focused element / trigger element to restore it on close
    const previousFocus = document.activeElement as HTMLElement;
    const triggerEl = triggerRef?.current;

    // 3. Focus the close button first
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
      // Restore focus to the trigger element (or default back to previous focus)
      if (triggerEl) {
        triggerEl.focus();
      } else if (previousFocus) {
        previousFocus.focus();
      }
    };
  }, [isOpen, event, onClose, triggerRef]);

  if (!isOpen || !event) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      id="event-modal"
      className="lightbox is-open"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      ref={modalRef}
    >
      <button
        ref={closeBtnRef}
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close modal"
        style={{ background: "none", border: "none" }}
      >
        <FaXmark />
      </button>

      <div
        className="lightbox-content glass-card"
        style={{
          maxWidth: "600px",
          padding: "3rem",
          textAlign: "left",
          margin: "10vh auto",
        }}
      >
        <h3
          id="event-modal-title"
          className="mb-3 text-dark font-bold"
          style={{ fontSize: "2rem" }}
        >
          {event.title}
        </h3>
        <div className="mb-4" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <span
            className="pill"
            style={{
              background: "rgba(15, 61, 94, 0.1)",
              border: "none",
              padding: "0.5rem 1rem",
            }}
          >
            <FaRegCalendar className="text-blue" />{" "}
            <span className="text-dark">{event.date}</span>
          </span>
          <span
            className="pill"
            style={{
              background: "rgba(46, 139, 87, 0.1)",
              border: "none",
              padding: "0.5rem 1rem",
            }}
          >
            <FaLocationDot className="text-green" />{" "}
            <span className="text-dark">{event.location}</span>
          </span>
        </div>
        <p className="text-dark lead" style={{ fontSize: "1.1rem" }}>
          {event.desc}
        </p>
        <button
          onClick={onClose}
          className="btn btn-primary mt-4 w-100"
        >
          Close Details
        </button>
      </div>
    </div>
  );
}
