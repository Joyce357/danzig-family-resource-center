import React from "react";
import { FaBasketball, FaFutbol } from "react-icons/fa6";

export default function Sports() {
  return (
    <section id="sports" className="section-padding">
      <div className="container text-center mb-5">
        <h2 className="section-title mb-2">
          Sports & <span className="text-gradient-gold">Recreation</span>
        </h2>
        <p className="section-subtitle">
          Promoting physical wellness, teamwork, and leadership through active play.
        </p>
      </div>

      <div className="container">
        <div className="grid-2-col">
          <div className="glass-card text-center">
            <div
              className="card-icon-wrap mx-auto"
              style={{
                width: "80px",
                height: "80px",
                fontSize: "2.5rem",
                margin: "0 auto 1.5rem auto",
              }}
            >
              <FaBasketball className="text-blue" />
            </div>
            <h3 className="mb-3 text-dark">Youth Basketball</h3>
            <p className="text-muted text-dark">
              Weekly drop-in basketball sessions for different age groups. Build
              skills, make friends, and stay active on the court.
            </p>
          </div>

          <div className="glass-card text-center">
            <div
              className="card-icon-wrap mx-auto"
              style={{
                width: "80px",
                height: "80px",
                fontSize: "2.5rem",
                margin: "0 auto 1.5rem auto",
              }}
            >
              <FaFutbol className="text-green" />
            </div>
            <h3 className="mb-3 text-dark">Summer Soccer</h3>
            <p className="text-muted text-dark">
              Outdoor soccer programs designed to foster teamwork and
              sportsmanship in a fun, supportive environment outdoors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
