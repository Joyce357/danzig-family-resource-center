import React from "react";
import type { Metadata } from "next";
import BackgroundLayers from "../components/BackgroundLayers";
import ScrollProgress from "../components/ScrollProgress";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import About from "../components/About";
import Programs from "../components/Programs";
import YouthHub from "../components/YouthHub";
import BreakfastProgram from "../components/BreakfastProgram";
import Sports from "../components/Sports";
import Events from "../components/Events";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://danzig.ca/",
  },
};

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <BackgroundLayers />
      <Header />
      
      <main>
        <Hero />
        <Gallery />
        <About />
        <Programs />
        <YouthHub />
        <BreakfastProgram />
        <Sports />
        <Events />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
