import React from "react";
import { PROGRAMS } from "../data/site-data";
import {
  FaAppleWhole,
  FaLightbulb,
  FaBasketball,
  FaCalendarCheck,
} from "react-icons/fa6";

const iconMap = {
  apple: FaAppleWhole,
  lightbulb: FaLightbulb,
  basketball: FaBasketball,
  calendar: FaCalendarCheck,
};

export default function Programs() {
  return (
    <section id="programs" className="section-padding">
      <div className="container text-center mb-5">
        <h2 className="section-title mb-2">
          Our <span className="text-gradient-gold">Core Programs</span>
        </h2>
        <p className="section-subtitle">
          Discover the initiatives designed to uplift, educate, and provide
          opportunities for the residents of the Danzig community.
        </p>
      </div>

      <div className="container">
        <div className="program-grid">
          {PROGRAMS.map((program, idx) => {
            const IconComponent = iconMap[program.iconName];
            return (
              <div key={idx} className="program-card-luxury">
                <div className="program-gradient-accent" />
                <div className="card-icon-wrap">
                  <IconComponent className={program.accentColor} />
                </div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
