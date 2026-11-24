"use client";

import React, { useState, useRef } from "react";
import {
  FaBurger,
  FaTree,
  FaBroom,
  FaGraduationCap,
} from "react-icons/fa6";
import { EVENTS, CommunityEvent } from "../data/site-data";
import EventModal from "./EventModal";

const iconMap = {
  burger: FaBurger,
  tree: FaTree,
  broom: FaBroom,
  graduation: FaGraduationCap,
};

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Track the ref of the button that opened the modal to restore focus
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);
  const triggerRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleOpenModal = (eventItem: CommunityEvent) => {
    activeTriggerRef.current = triggerRefs.current[eventItem.id];
    setSelectedEvent(eventItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Focus restoration is handled by EventModal itself, but we can also do it here
    setSelectedEvent(null);
  };

  return (
    <section id="events" className="section-padding">
      <div className="container relative z-10 text-center text-white">
        <h2 className="section-title mb-4">
          Community <span className="text-gold">Events</span>
        </h2>
        <p
          className="lead text-white mb-5"
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          We regularly host events that bring the neighborhood together. Join us
          and be a part of the Danzig family.
        </p>

        <div className="events-masonry">
          {EVENTS.map((eventItem) => {
            const IconComponent = iconMap[eventItem.iconName];
            return (
              <button
                key={eventItem.id}
                ref={(el) => {
                  triggerRefs.current[eventItem.id] = el;
                }}
                className="event-pill-large"
                style={{
                  cursor: "pointer",
                  border: "none",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
                onClick={() => handleOpenModal(eventItem)}
                aria-haspopup="dialog"
                aria-label={`View details for ${eventItem.title}`}
              >
                <IconComponent className={`event-icon ${eventItem.accentColor}`} />{" "}
                {eventItem.pillLabel}
              </button>
            );
          })}
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
        triggerRef={activeTriggerRef}
      />
    </section>
  );
}
