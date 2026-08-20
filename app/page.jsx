"use client";

import PageLoader from "@/components/PageLoader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";

export default function Home() {
  return (
    <>
      <PageLoader />

      <CustomCursor />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <TechStack />
        <Work />
        <Contact />
      </main>

      <AIChat />

      <Footer />
    </>
  );
}