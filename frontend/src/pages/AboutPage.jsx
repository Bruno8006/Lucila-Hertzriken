import React from "react";
import { useTranslation } from "../hooks/useTranslation";

const AboutPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen pt-24" style={{background: 'linear-gradient(135deg, #f1f5f9 0%, #ffffff 50%, rgb(247, 239, 255) 100%)'}}>
      <div className="container mx-auto px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-light tracking-wide text-gray-800 mb-16">{t('about.title')}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                <img 
                  src="/images/lucila.jpg"
                  alt="Lucila Hertzriken"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-8">
              <p className="text-lg leading-relaxed text-gray-700">
                {t('about.description')}
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700">
                {t('about.paragraph2')}
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700">
                {t('about.paragraph3')}
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700">
                {t('about.paragraph4')}
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700">
                {t('about.paragraph6')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;