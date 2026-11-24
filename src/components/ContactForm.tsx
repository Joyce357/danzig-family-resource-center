"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

// Zod Schema for validation
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .min(5, "Email is too short.")
    .max(100, "Email cannot exceed 100 characters."),
  subject: z
    .string()
    .min(1, "Please select a subject."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message cannot exceed 5000 characters."),
  website: z.string().optional(), // Honeypot field
});

type FormFields = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const router = useRouter();
  
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name as keyof FormFields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatusMsg(null);
    setErrors({});

    // 1. Client-Side Validation
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof FormFields, string>> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof FormFields;
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      setStatusMsg({
        type: "error",
        text: "Please correct the highlighted fields.",
      });
      return;
    }

    try {
      // 2. Submit to API Route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatusMsg({ type: "success", text: result.message });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          website: "",
        });
        
        // Redirect to thank you page on success
        router.push("/thank-you");
      } else {
        // Validation errors returned from server
        if (result.errors) {
          setErrors(result.errors);
        }
        setStatusMsg({
          type: "error",
          text: result.message || "An error occurred while sending your message. Please try again.",
        });
      }
    } catch {
      setStatusMsg({
        type: "error",
        text: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-wrapper">
      <h3 className="mb-4 text-dark font-bold" style={{ fontSize: "2rem" }}>
        Send a Message
      </h3>

      {/* Accessible status region */}
      <div aria-live="polite" className="sr-only">
        {statusMsg ? statusMsg.text : ""}
      </div>

      {statusMsg && (
        <div
          style={{
            padding: "1rem",
            marginBottom: "1.5rem",
            borderRadius: "var(--radius-sm)",
            backgroundColor: statusMsg.type === "success" ? "rgba(46, 139, 87, 0.1)" : "rgba(220, 38, 38, 0.1)",
            color: statusMsg.type === "success" ? "var(--community-green)" : "#dc2626",
            fontSize: "1rem",
            fontWeight: 500,
            border: `1px solid ${statusMsg.type === "success" ? "var(--community-green)" : "#dc2626"}`,
          }}
        >
          {statusMsg.text}
        </div>
      )}

      <form id="contactForm" className="contact-form-modern" onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            placeholder=" "
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          <label htmlFor="name">Your Name</label>
          <div className="input-focus-border" />
          {errors.name && (
            <span
              id="name-error"
              style={{
                color: "#dc2626",
                fontSize: "0.85rem",
                display: "block",
                marginTop: "0.25rem",
              }}
            >
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group mb-4">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder=" "
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <label htmlFor="email">Email Address</label>
          <div className="input-focus-border" />
          {errors.email && (
            <span
              id="email-error"
              style={{
                color: "#dc2626",
                fontSize: "0.85rem",
                display: "block",
                marginTop: "0.25rem",
              }}
            >
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-group mb-4">
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="form-control"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          >
            <option value="" disabled></option>
            <option value="youth">Youth Hub Inquiry</option>
            <option value="breakfast">Breakfast Program</option>
            <option value="volunteer">Volunteer Opportunity</option>
            <option value="general">General Question</option>
          </select>
          <label
            htmlFor="subject"
            style={{
              top: "-0.2rem",
              fontSize: "0.85rem",
              color: "var(--deep-blue)",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Subject
          </label>
          <div className="input-focus-border" />
          {errors.subject && (
            <span
              id="subject-error"
              style={{
                color: "#dc2626",
                fontSize: "0.85rem",
                display: "block",
                marginTop: "0.25rem",
              }}
            >
              {errors.subject}
            </span>
          )}
        </div>

        <div className="form-group mb-5">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-control"
            rows={4}
            placeholder=" "
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          <label htmlFor="message">Your Message</label>
          <div className="input-focus-border" />
          {errors.message && (
            <span
              id="message-error"
              style={{
                color: "#dc2626",
                fontSize: "0.85rem",
                display: "block",
                marginTop: "0.25rem",
              }}
            >
              {errors.message}
            </span>
          )}
        </div>

        {/* Honeypot field: hidden from users, filled only by bots */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn btn-primary btn-animate w-100 p-3 ${
            isSubmitting ? "loading" : ""
          }`}
          style={{ borderRadius: "var(--radius-sm)" }}
        >
          <span className="btn-text">
            {isSubmitting ? "Sending..." : "Send Message"}
          </span>
          <div className="loader" />
        </button>
      </form>
    </div>
  );
}
