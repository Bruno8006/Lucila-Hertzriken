import React from "react";
import { useTranslation } from "../hooks/useTranslation";

const HeroSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      <div className="relative z-10 text-center text-white">
        <h1 className="text-6xl md:text-8xl font-light tracking-wide mb-6 opacity-90">
{t('hero.name')}
        </h1>
        <p className="text-xl md:text-2xl font-light tracking-wider opacity-80">
{t('hero.subtitle')}
        </p>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-white/60 animate-pulse"></div>
      </div>
    </section>
  );
};

export default HeroSection;