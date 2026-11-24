"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";
import Image from "next/image";
import { GalleryItem } from "../data/site-data";

const LIGHTBOX_IMAGE_SIZES = "(max-width: 768px) 92vw, 90vw";

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export default function GalleryLightbox({
  items,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
  triggerRef,
}: GalleryLightboxProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [preloadedForIndex, setPreloadedForIndex] = useState<number | null>(null);

  const isOpen =
    currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const preloadReady = isOpen && preloadedForIndex === currentIndex;
  const currentItem = isOpen ? items[currentIndex] : null;
  const totalItems = items.length;

  const prevIndex = isOpen ? (currentIndex - 1 + totalItems) % totalItems : -1;
  const nextIndex = isOpen ? (currentIndex + 1) % totalItems : -1;
  const prevItem =
    isOpen && totalItems > 1 && prevIndex !== currentIndex
      ? items[prevIndex]
      : null;
  const nextItem =
    isOpen &&
    totalItems > 1 &&
    nextIndex !== currentIndex &&
    nextIndex !== prevIndex
      ? items[nextIndex]
      : null;

  // Preload only adjacent image items (never preload video files)
  const prevImageToPreload = prevItem?.type === "image" ? prevItem : null;
  const nextImageToPreload = nextItem?.type === "image" ? nextItem : null;

  const pauseActiveVideo = useCallback(() => {
    const videoEl = videoRef.current;
    if (videoEl && !videoEl.paused) {
      videoEl.pause();
    }
  }, []);

  const handleClose = useCallback(() => {
    pauseActiveVideo();
    onClose();
  }, [pauseActiveVideo, onClose]);

  const handlePrevious = useCallback(() => {
    pauseActiveVideo();
    onPrevious();
  }, [pauseActiveVideo, onPrevious]);

  const handleNext = useCallback(() => {
    pauseActiveVideo();
    onNext();
  }, [pauseActiveVideo, onNext]);

  // Pause video automatically whenever closing or switching items
  useEffect(() => {
    return () => {
      pauseActiveVideo();
    };
  }, [isOpen, currentIndex, pauseActiveVideo]);

  // Lock background scroll & manage initial/restored focus only on open/close
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const previousFocus = document.activeElement as HTMLElement | null;
    const triggerEl = triggerRef?.current;

    closeBtnRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      if (triggerEl) {
        triggerEl.focus();
      } else if (previousFocus) {
        previousFocus.focus();
      }
    };
  }, [isOpen, triggerRef]);

  // Keyboard navigation (Escape, ArrowLeft, ArrowRight) and Tab focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key === "ArrowLeft" && totalItems > 1) {
        e.preventDefault();
        handlePrevious();
        return;
      }

      if (e.key === "ArrowRight" && totalItems > 1) {
        e.preventDefault();
        handleNext();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), video[controls], [tabindex="0"]'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (
            document.activeElement === firstElement ||
            !modalRef.current.contains(document.activeElement)
          ) {
            lastElement.focus();
            e.preventDefault();
          }
        } else if (
          document.activeElement === lastElement ||
          !modalRef.current.contains(document.activeElement)
        ) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose, handlePrevious, handleNext, totalItems]);

  // Defer preloading adjacent images briefly so the active item gets priority first
  useEffect(() => {
    if (!isOpen || currentIndex === null) return;

    const timer = window.setTimeout(() => {
      setPreloadedForIndex(currentIndex);
    }, 150);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen, currentIndex]);

  if (!isOpen || !currentItem) return null;

  const mediaLabel =
    currentItem.type === "video" ? currentItem.title : currentItem.alt;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (
      !touchStartRef.current ||
      e.changedTouches.length !== 1 ||
      totalItems <= 1
    ) {
      touchStartRef.current = null;
      return;
    }

    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    // Trigger navigation on intentional horizontal swipes
    if (Math.abs(deltaX) >= 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        handlePrevious();
      } else {
        handleNext();
      }
    }
  };

  return (
    <div
      id="lightbox"
      className="lightbox gallery-lightbox is-open"
      onClick={handleBackdropClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery media ${currentIndex + 1} of ${totalItems}: ${mediaLabel}`}
      ref={modalRef}
    >
      <button
        type="button"
        ref={closeBtnRef}
        className="lightbox-close gallery-lightbox-close"
        onClick={handleClose}
        aria-label="Close lightbox"
      >
        <FaXmark aria-hidden="true" />
      </button>

      <div className="gallery-lightbox-stage" onClick={handleBackdropClick}>
        <div className="gallery-lightbox-figure">
          {currentItem.type === "image" ? (
            <Image
              key={currentItem.src}
              src={currentItem.src}
              alt={currentItem.alt}
              width={currentItem.width}
              height={currentItem.height}
              sizes={LIGHTBOX_IMAGE_SIZES}
              quality={85}
              loading="eager"
              fetchPriority="high"
              className="lightbox-content gallery-lightbox-img"
              onLoad={() => setPreloadedForIndex(currentIndex)}
            />
          ) : (
            <video
              key={currentItem.src}
              ref={videoRef}
              src={currentItem.src}
              poster={currentItem.poster}
              controls
              playsInline
              preload="metadata"
              aria-label={currentItem.title}
              className="lightbox-content gallery-lightbox-video"
            />
          )}
        </div>

        {currentItem.caption && (
          <p className="gallery-lightbox-caption">{currentItem.caption}</p>
        )}

        <div className="gallery-lightbox-controls">
          {totalItems > 1 && (
            <button
              type="button"
              className="gallery-lightbox-nav gallery-lightbox-prev"
              onClick={handlePrevious}
              aria-label="Previous media"
            >
              <FaChevronLeft aria-hidden="true" />
            </button>
          )}

          <div
            className="gallery-lightbox-counter"
            aria-live="polite"
            aria-atomic="true"
          >
            {currentIndex + 1} / {totalItems}
          </div>

          {totalItems > 1 && (
            <button
              type="button"
              className="gallery-lightbox-nav gallery-lightbox-next"
              onClick={handleNext}
              aria-label="Next media"
            >
              <FaChevronRight aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Preload only the immediate previous and next optimized images (never videos) */}
      {preloadReady && (prevImageToPreload || nextImageToPreload) && (
        <div className="gallery-lightbox-preload" aria-hidden="true">
          {prevImageToPreload && (
            <Image
              src={prevImageToPreload.src}
              alt=""
              width={prevImageToPreload.width}
              height={prevImageToPreload.height}
              sizes={LIGHTBOX_IMAGE_SIZES}
              quality={85}
              loading="eager"
              decoding="async"
            />
          )}
          {nextImageToPreload && (
            <Image
              src={nextImageToPreload.src}
              alt=""
              width={nextImageToPreload.width}
              height={nextImageToPreload.height}
              sizes={LIGHTBOX_IMAGE_SIZES}
              quality={85}
              loading="eager"
              decoding="async"
            />
          )}
        </div>
      )}
    </div>
  );
}
