"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { NAV_LINKS } from "../data/site-data";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef<HTMLDivElement>(null);

  // Handle Scroll events for active link highlighting and navbar background
  useEffect(() => {
    const handleScroll = () => {
      // 1. Scrolled state
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Active section tracking
      const sections = document.querySelectorAll("section");
      let current = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        // Adjust offset to detect earlier
        if (window.scrollY >= sectionTop - 160) {
          const id = section.getAttribute("id");
          if (id) current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run initially

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle keyboard interaction (Escape to close mobile menu)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // Toggle menu and prevent body scrolling when menu is open
  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    if (nextState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  // Inline styling for hamburger pseudo elements to mimic original JS styles
  const hamburgerStyles = isMenuOpen
    ? ({
        background: "transparent",
        "--pseudo-transform-before": "rotate(45deg) translate(5px, 6px)",
        "--pseudo-transform-after": "rotate(-45deg) translate(4px, -6px)",
        "--pseudo-top": "0",
        "--pseudo-bottom": "0",
      } as React.CSSProperties)
    : ({} as React.CSSProperties);

  return (
    <header id="header" className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="nav-container glass">
        <a
          href="#home"
          className="logo-link"
          aria-label="Danzig Family Resource Center home"
          onClick={closeMenu}
        >
          <Image
            src="/images/danzig-logo.jpeg"
            alt="Danzig Family Resource Center Logo"
            width={120}
            height={48}
            className="logo"
            priority
            style={{ objectFit: "contain" }}
          />
        </a>

        <button
          className="mobile-menu-btn"
          aria-expanded={isMenuOpen}
          aria-controls="main-nav"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="hamburger" style={hamburgerStyles} />
        </button>

        <div
          id="main-nav"
          ref={navRef}
          className={`main-nav ${isMenuOpen ? "active" : ""}`}
        >
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link ${
                    activeSection === link.href.slice(1) ? "active" : ""
                  }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
