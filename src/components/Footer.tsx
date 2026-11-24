import React from "react";
import Image from "next/image";
import { FaInstagram, FaFacebookF } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-premium relative z-10">
      <div className="container border-bottom-subtle pb-5 mb-4">
        <div className="grid-2-col">
          <div className="footer-info">
            <Image
              src="/images/danzig-logo.jpeg"
              alt="Danzig Family Resource Center Logo"
              width={160}
              height={70}
              className="footer-logo mb-4"
              style={{ objectFit: "contain" }}
            />
            <p className="text-white-70 mb-4" style={{ maxWidth: "400px" }}>
              Danzig Family Resource Center is building a better, stronger, and
              more connected Danzig community. Empowering youth, supporting
              families, and creating opportunities together.
            </p>
            <div className="social-icons-premium small-icons">
              <a
                href="#"
                className="social-icon"
                aria-label="Danzig Family Resource Center on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="social-icon"
                aria-label="Danzig Family Resource Center on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>

          <div style={{ display: "flex", gap: "4rem" }}>
            <div className="footer-links">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-nav">
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#events">Community Events</a>
                </li>
                <li>
                  <a href="#gallery">Gallery</a>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              <h4 className="footer-heading">Programs</h4>
              <ul className="footer-nav">
                <li>
                  <a href="#youth-hub">Youth Hub</a>
                </li>
                <li>
                  <a href="#breakfast-program">Breakfast Program</a>
                </li>
                <li>
                  <a href="#sports">Sports & Rec</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          &copy; {year} Danzig Family Resource Center. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
