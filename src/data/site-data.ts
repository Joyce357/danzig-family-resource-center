// Navigation link type
export interface NavLink {
  label: string;
  href: string;
}

// Gallery item type
export interface GalleryItem {
  src: string;
  alt: string;
  aspectClass?: string; // e.g. "item-tall", "item-wide"
}

// Program type
export interface Program {
  title: string;
  description: string;
  iconName: "apple" | "lightbulb" | "basketball" | "calendar";
  accentColor: string; // e.g. "text-blue", "text-green", "text-gold"
}

// Event type
export interface CommunityEvent {
  id: string;
  title: string;
  pillLabel: string;
  date: string;
  location: string;
  desc: string;
  iconName: "burger" | "tree" | "broom" | "graduation";
  accentColor: string;
}

// Contact form data type (for client and server validation)
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // Honeypot field
}

// ── Navigation Links ────────────────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Youth Hub", href: "#youth-hub" },
  { label: "Sports", href: "#sports" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

// ── Gallery Items ────────────────────────────────────────────────────────────
export const GALLERY_ITEMS: GalleryItem[] = [
  { src: "/images/danzig-CP.png", alt: "Danzig Family Resource Center Community Programs", aspectClass: "item-tall" },
  { src: "/images/break-fast-served.png", alt: "Breakfast Served" },
  { src: "/images/happy-kids.png", alt: "Happy Kids at the Hub" },
  { src: "/images/Danzig-community-event.png", alt: "Community Event", aspectClass: "item-wide" },
  { src: "/images/Danzig-bicycle-ride.png", alt: "Community Bicycle Ride" },
  { src: "/images/breakfast-display.png", alt: "Breakfast Display" },
  { src: "/images/happy-parents.png", alt: "Community Families", aspectClass: "item-tall" },
  { src: "/images/Police-helping.png", alt: "Police Community Outreach" },
  { src: "/images/coordinators-of-breakfast-club.png", alt: "Breakfast Club Coordinators", aspectClass: "item-wide" },
  { src: "/images/bclub.png", alt: "Breakfast Club" },
  { src: "/images/police-serving.png", alt: "Police Serving the Community" },
  { src: "/images/Bunny-and-friends.png", alt: "Community Fun Day" },
  { src: "/images/danzig-community-games.png", alt: "Community Games" },
  { src: "/images/Danzig-bs-c.png", alt: "Danzig Back to School", aspectClass: "item-wide" },
  { src: "/images/break-fast.png", alt: "Breakfast Program" },
];

// ── Programs Data ────────────────────────────────────────────────────────────
export const PROGRAMS: Program[] = [
  {
    title: "Breakfast Program",
    description: "Providing nutritious breakfast bundles on weekdays from 8:00 AM to 9:00 AM to support kids and families.",
    iconName: "apple",
    accentColor: "text-blue",
  },
  {
    title: "Youth Hub",
    description: "A dedicated space for youth featuring homework help, gaming, and mentorship.",
    iconName: "lightbulb",
    accentColor: "text-green",
  },
  {
    title: "Sports & Rec",
    description: "Engaging physical activities promoting teamwork, health, and active lifestyles.",
    iconName: "basketball",
    accentColor: "text-gold",
  },
  {
    title: "Community Events",
    description: "Bringing people together through seasonal celebrations and neighborhood gatherings.",
    iconName: "calendar",
    accentColor: "text-blue",
  },
];

// ── Events Data ──────────────────────────────────────────────────────────────
export const EVENTS: CommunityEvent[] = [
  {
    id: "summer-bbq",
    title: "Summer Community BBQs",
    pillLabel: "Summer BBQs",
    date: "July - August (Bi-weekly)",
    location: "Danzig Central Park",
    desc: "Join us for our bi-weekly summer barbecues! Free food, music, and activities for kids. A perfect opportunity to meet your neighbors and celebrate the summer weather together. Halal and vegetarian options are always available.",
    iconName: "burger",
    accentColor: "text-gold",
  },
  {
    id: "holiday-parties",
    title: "Annual Holiday Parties",
    pillLabel: "Holiday Parties",
    date: "December 15th",
    location: "Danzig Family Resource Center",
    desc: "Our end-of-year celebration brings the community together for festive cheer. Featuring a toy drive distribution, winter crafts for children, a hot chocolate bar, and special community performances.",
    iconName: "tree",
    accentColor: "text-green",
  },
  {
    id: "cleanups",
    title: "Neighborhood Cleanups",
    pillLabel: "Neighborhood Cleanups",
    date: "First Saturday of Spring/Fall",
    location: "Various Danzig Locations",
    desc: "Take pride in our neighborhood! We provide gloves, bags, and equipment. Volunteers spend the morning beautifying our shared spaces, followed by a complimentary pizza lunch for all participants.",
    iconName: "broom",
    accentColor: "text-blue",
  },
  {
    id: "school-drives",
    title: "Back to School Drives",
    pillLabel: "Back to School Drives",
    date: "Last Week of August",
    location: "Youth Hub Drop-in Center",
    desc: "Ensuring every student in Danzig is ready for the academic year. We distribute hundreds of backpacks filled with essential school supplies. Registration is required in advance.",
    iconName: "graduation",
    accentColor: "text-white",
  },
];
