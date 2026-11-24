import React from "react";
import Image from "next/image";
import { FaClock, FaLocationDot } from "react-icons/fa6";

export default function BreakfastProgram() {
  return (
    <section id="breakfast-program" className="section-padding">
      <div className="container relative z-10">
        <div className="grid-2-col align-center">
          <div className="content-box glass-card">
            <h2 className="section-title mb-3 text-dark">
              Danzig <span className="text-gradient">Breakfast</span>
            </h2>
            <p className="lead mb-5 font-medium text-dark">
              Free daily breakfast for children and youth living in the Danzig
              community. Start your day with a healthy meal.
            </p>

            <div className="info-cards-modern">
              <div className="info-card-luxury hover-lift">
                <div className="icon-circle">
                  <FaClock className="text-blue" />
                </div>
                <div>
                  <span className="info-label">Time</span>
                  <span className="info-value">8:00 AM – 9:00 AM</span>
                </div>
              </div>

              <div className="info-card-luxury hover-lift">
                <div className="icon-circle">
                  <FaLocationDot className="text-gold" />
                </div>
                <div>
                  <span className="info-label">Where</span>
                  <span className="info-value">Danzig House / Youth Hub</span>
                </div>
              </div>
            </div>
          </div>

          <div className="image-box">
            <Image
              src="/images/happy-kids.png"
              alt="Children receiving nutritious breakfast bags at the Danzig Family Resource Center Breakfast Program"
              width={450}
              height={600}
              className="poster-img"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
