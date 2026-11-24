import React from "react";
import Image from "next/image";
import {
  FaGamepad,
  FaDesktop,
  FaBookOpen,
  FaHandshakeAngle,
  FaPizzaSlice,
} from "react-icons/fa6";

export default function YouthHub() {
  return (
    <section id="youth-hub" className="section-padding">
      <div className="container">
        <div className="grid-2-col align-center reverse-mobile">
          <div className="image-box">
            <Image
              src="/images/Danzig-bs-c.png"
              alt="Youth playing basketball and gathering at the Danzig Family Resource Center"
              width={600}
              height={450}
              className="poster-img"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="content-box glass-card">
            <h2 className="section-title mb-3">
              Danzig <span className="text-gradient-gold">Youth Hub</span>
            </h2>
            <h3 className="section-subtitle-large mb-3 text-white">
              A Space to Learn, Play, and Grow
            </h3>
            <p className="lead mb-4">
              The Youth Hub is a vibrant drop-in center providing young residents
              with resources, entertainment, and a safe environment after school
              hours.
            </p>

            <div className="feature-pills mb-4">
              <span className="pill">
                <FaGamepad className="text-blue" /> PS5 Gaming
              </span>
              <span className="pill">
                <FaDesktop className="text-blue" /> High-Speed PCs
              </span>
              <span className="pill">
                <FaBookOpen className="text-green" /> Homework Help
              </span>
              <span className="pill">
                <FaHandshakeAngle className="text-gold" /> Mentorship
              </span>
              <span className="pill">
                <FaPizzaSlice className="text-dark" /> Snacks Provided
              </span>
            </div>

            <a href="#contact" className="btn btn-primary mt-3">
              Join the Hub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
