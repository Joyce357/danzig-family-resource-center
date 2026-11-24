"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { FaMagnifyingGlassPlus } from "react-icons/fa6";
import { GALLERY_ITEMS, GalleryItem } from "../data/site-data";
import GalleryLightbox from "./GalleryLightbox";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);
  const triggerRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleOpenLightbox = (item: GalleryItem, index: number) => {
    const key = `${item.src}-${index}`;
    activeTriggerRef.current = triggerRefs.current[key];
    setSelectedImage(item);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

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
            return (
              <div
                key={key}
                className={`gallery-item ${item.aspectClass || ""}`}
              >
                <button
                  ref={(el) => {
                    triggerRefs.current[key] = el;
                  }}
                  className="gallery-img-wrap"
                  onClick={() => handleOpenLightbox(item, index)}
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
                    width={index < 4 ? 600 : 400} // Prioritize size for early images
                    height={index < 4 ? 600 : 400}
                    loading="lazy"
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
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
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
        imageSrc={selectedImage ? selectedImage.src : ""}
        imageAlt={selectedImage ? selectedImage.alt : ""}
        triggerRef={activeTriggerRef}
      />
    </section>
  );
}
