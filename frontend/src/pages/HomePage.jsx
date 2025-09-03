import React from "react";
import HeroSection from "../components/HeroSection";
import WorkGrid from "../components/WorkGrid";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WorkGrid />
    </div>
  );
};

export default HomePage;