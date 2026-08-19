"use client";

import Navbar from "@/components/Navbar";
import PageLoader from "@/components/PageLoader";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <PageLoader />

      <CustomCursor />

      <Navbar />

      <Hero />

      <About />

      <Services />

      <TechStack />

      <Work />

      <Contact />

      <Footer />
    </main>
  );
}