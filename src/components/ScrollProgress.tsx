"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [width, setWidth] = useState("0%");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollTop;
          const windowHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
          if (windowHeight > 0) {
            setWidth(`${(totalScroll / windowHeight) * 100}%`);
          } else {
            setWidth("0%");
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width }}
      role="progressbar"
      aria-label="Scroll progress indicator"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={parseFloat(width)}
    />
  );
}
