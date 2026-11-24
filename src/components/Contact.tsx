import React from "react";
import {
  FaEnvelope,
  FaLocationDot,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa6";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <div className="grid-2-col">
          <div className="contact-info-premium">
            <div className="contact-glow-bg" />
            <div className="relative z-10">
              <h2 className="section-title mb-2 text-white">
                Get in <span className="text-gold">Touch</span>
              </h2>
              <p className="lead text-white-80 mb-5">
                Have questions about Danzig Family Resource Center programs or
                want to get involved? We&apos;d love to hear from you.
              </p>

              <div
                className="mb-5"
                style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
              >
                <a href="mailto:danzig.cdp@gmail.com" className="contact-link-modern">
                  <div className="icon-circle-small">
                    <FaEnvelope />
                  </div>
                  <div className="link-text">
                    <span className="label">Email Us</span>
                    <span className="value">danzig.cdp@gmail.com</span>
                  </div>
                </a>

                <div className="contact-link-modern">
                  <div className="icon-circle-small">
                    <FaLocationDot />
                  </div>
                  <div className="link-text">
                    <span className="label">Location</span>
                    <span className="value">West Hill, Scarborough, ON</span>
                  </div>
                </div>
              </div>

              <h4 className="mb-3 text-white font-medium">Follow Our Journey</h4>
              <div className="social-icons-premium">
                <a
                  href="#"
                  className="social-icon"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
