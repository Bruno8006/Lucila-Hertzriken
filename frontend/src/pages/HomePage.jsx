import React from "react";
import HeroSection from "../components/HeroSection";
import HomeWorkGrid from "../components/HomeWorkGrid";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HomeWorkGrid />
    </div>
  );
};

export default HomePage;