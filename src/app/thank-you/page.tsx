import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { FaCheck, FaHouse } from "react-icons/fa6";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BackgroundLayers from "../../components/BackgroundLayers";

export const metadata: Metadata = {
  title: "Message Sent – Danzig Family Resource Center",
  description: "Thank you for contacting the Danzig Family Resource Center. We'll be in touch soon.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <>
      <BackgroundLayers />
      <Header />
      
      <main>
        <section className="thankyou-section">
          <div className="glass-card thankyou-card">
            <div className="check-circle" aria-hidden="true">
              <FaCheck />
            </div>

            <h1 className="text-dark">
              Message <span className="text-gradient-gold">Sent!</span>
            </h1>

            <p className="text-dark">
              Thank you for reaching out to the Danzig Family Resource Center.
              We&apos;ve received your message and will get back to you as soon as possible.
            </p>

            <Link href="/#home" className="btn btn-primary">
              <FaHouse style={{ marginRight: "0.6rem", display: "inline-block" }} />
              Back to Home
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
