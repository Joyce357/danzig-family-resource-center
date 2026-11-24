"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { FaMagnifyingGlassPlus } from "react-icons/fa6";
import { GALLERY_ITEMS } from "../data/site-data";
import GalleryLightbox from "./GalleryLightbox";

const THUMBNAIL_SIZES_STANDARD =
  "(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 384px";
const THUMBNAIL_SIZES_WIDE =
  "(max-width: 768px) 100vw, (max-width: 1100px) 100vw, 750px";

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleOpenLightbox = (index: number) => {
    activeTriggerRef.current = triggerRefs.current[index] ?? null;
    setSelectedIndex(index);
  };

  const handleCloseLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    );
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_ITEMS.length
    );
  }, []);

  return (
    <section id="gallery" className="section-padding">
      <div className="container text-center mb-5">
        <h2 className="section-title mb-2">
          Community <span className="text-gradient-gold">Gallery</span>
        </h2>
        <p className="section-subtitle">
          Moments captured from our programs and events.
        </p>
      </div>

      <div className="container">
        <div className="gallery-masonry">
          {GALLERY_ITEMS.map((item, index) => {
            const key = `${item.src}-${index}`;
            const isWide = item.aspectClass === "item-wide";
            return (
              <div
                key={key}
                className={`gallery-item ${item.aspectClass || ""}`}
              >
                <button
                  type="button"
                  ref={(el) => {
                    triggerRefs.current[index] = el;
                  }}
                  className="gallery-img-wrap"
                  onClick={() => handleOpenLightbox(index)}
                  style={{
                    border: "none",
                    padding: 0,
                    width: "100%",
                    height: "100%",
                    display: "block",
                  }}
                  aria-haspopup="dialog"
                  aria-label={`View full size image of ${item.alt}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={isWide ? THUMBNAIL_SIZES_WIDE : THUMBNAIL_SIZES_STANDARD}
                    quality={75}
                    loading="lazy"
                    decoding="async"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="gallery-overlay">
                    <FaMagnifyingGlassPlus className="zoom-icon" />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <GalleryLightbox
        items={GALLERY_ITEMS}
        currentIndex={selectedIndex}
        onClose={handleCloseLightbox}
        onPrevious={handlePrevious}
        onNext={handleNext}
        triggerRef={activeTriggerRef}
      />
    </section>
  );
}
