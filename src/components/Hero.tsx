"use client";

import React, { useRef } from "react";
import { FaArrowRight } from "react-icons/fa6";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      // 1. Accessibility: Check for prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!prefersReducedMotion) {
        // Initial set to transparent/offset state
        gsap.set(".gs-reveal", { opacity: 0, y: 24 });

        // Staggered reveal timeline
        gsap.to(".gs-reveal", {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "all",
        });

        // 2. Magnetic Button Effect
        const magneticBtn = buttonRef.current;
        if (magneticBtn) {
          const onMouseMove = (e: MouseEvent) => {
            const rect = magneticBtn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(magneticBtn, {
              x: x * 0.2,
              y: y * 0.2,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const onMouseLeave = () => {
            gsap.to(magneticBtn, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "elastic.out(1, 0.3)",
            });
          };

          magneticBtn.addEventListener("mousemove", onMouseMove);
          magneticBtn.addEventListener("mouseleave", onMouseLeave);

          return () => {
            magneticBtn.removeEventListener("mousemove", onMouseMove);
            magneticBtn.removeEventListener("mouseleave", onMouseLeave);
          };
        }
      }
    },
    { scope: containerRef }
  );

  return (
    <section id="home" className="hero-section" ref={containerRef}>
      <div className="container relative z-10 text-center">
        <div className="hero-content mx-auto">
          <h1 className="hero-title gs-reveal">
            Danzig Family <br />
            <span className="text-gradient-gold">Resource Center</span>
          </h1>

          <p className="hero-subtitle gs-reveal">
            Stronger Together – Building a Better Danzig
          </p>

          <p className="hero-text gs-reveal">
            Danzig is a vibrant Toronto Community Housing community located in
            West Hill, Scarborough where families, youth, and residents work
            together to build a stronger and safer neighborhood.
          </p>

          <div className="gs-reveal">
            <a
              href="#programs"
              ref={buttonRef}
              className="btn btn-primary magnetic-btn"
            >
              Explore Programs{" "}
              <FaArrowRight
                style={{ marginLeft: "0.8rem", display: "inline-block" }}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
