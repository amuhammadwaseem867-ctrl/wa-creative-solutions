"use client";

import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Pricing from "@/components/Pricing";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <CustomCursor />

      <Navbar />

      <Hero />

      <About />

      <Services />

      <TechStack />

      <Pricing />

      <Work />

      <Process />

      <Testimonials />

      <Contact />

      <Footer />
    </main>
  );
}