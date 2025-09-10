import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import { Film, Briefcase, BookOpen } from "lucide-react";

const ServicesPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const services = [
    {
      id: 1,
      title: t('services.hertzriken.title'),
      description: t('services.hertzriken.description'),
      icon: <Film className="w-8 h-8" />
    },
    {
      id: 2,
      title: t('services.consultancy.title'),
      description: t('services.consultancy.description'),
      icon: <Briefcase className="w-8 h-8" />
    },
    {
      id: 3,
      title: t('services.learning.title'),
      description: t('services.learning.description'),
      icon: <BookOpen className="w-8 h-8" />
    }
  ];

  return (
    <div className="min-h-screen pt-24" style={{background: 'linear-gradient(135deg, #f1f5f9 0%, #ffffff 50%,rgb(241, 229, 253) 100%)'}}>
      <div className="container mx-auto px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-light tracking-wide text-gray-800 mb-16">{t('services.title')}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-white border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className="text-gray-700 mb-6 group-hover:text-gray-900 transition-colors duration-300">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-light tracking-wide text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 bg-gray-50 p-12 text-center">
            <h2 className="text-3xl font-light tracking-wide text-gray-800 mb-6">
              {t('services.getInTouch')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('services.getInTouch')}
            </p>
            <button 
              onClick={() => navigate('/contato')}
              className="px-8 py-3 bg-gray-800 text-white text-sm tracking-wide hover:bg-gray-700 transition-colors duration-300 rounded-full"
            >
              {t('services.getInTouch')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;