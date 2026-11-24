import React from "react";
import Image from "next/image";
import { FaHandsHoldingChild, FaUsers, FaShieldHeart } from "react-icons/fa6";

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container">
        <div className="grid-2-col align-center">
          <div className="content-box">
            <div className="glass-card">
              <h2 className="section-title mb-3">
                About <span className="text-gradient-gold">Our Community</span>
              </h2>
              <p className="lead mb-4">
                Located in West Hill, Scarborough, the Danzig Family Resource
                Center is dedicated to fostering a supportive, engaging, and thriving
                environment for all residents of our Toronto Community Housing neighborhood.
              </p>

              <ul className="modern-list mt-4">
                <li>
                  <div className="list-icon">
                    <FaHandsHoldingChild />
                  </div>
                  Empowering local youth through mentorship and recreation.
                </li>
                <li>
                  <div className="list-icon">
                    <FaUsers />
                  </div>
                  Building strong bonds among families and neighbors.
                </li>
                <li>
                  <div className="list-icon">
                    <FaShieldHeart />
                  </div>
                  Creating a safe, welcoming space for everyone.
                </li>
              </ul>
            </div>
          </div>
          <div className="image-box">
            <Image
              src="/images/Bunny-and-friends.png"
              alt="Danzig Family Resource Center community leaders and residents at 230 Danzig Street"
              width={450}
              height={450}
              className="poster-img"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
