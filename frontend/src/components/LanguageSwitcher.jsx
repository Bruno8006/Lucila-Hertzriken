import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center w-8 h-6 rounded-sm overflow-hidden hover:opacity-80 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
      title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      {language === 'pt' ? (
        // Bandeira dos EUA (quando está em português, mostra opção para inglês)
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-red-500"></div>
          <div className="absolute inset-0 bg-white" style={{ height: '20%' }}></div>
          <div className="absolute inset-0 bg-white" style={{ height: '40%', top: '20%' }}></div>
          <div className="absolute inset-0 bg-white" style={{ height: '60%', top: '40%' }}></div>
          <div className="absolute inset-0 bg-white" style={{ height: '80%', top: '60%' }}></div>
          <div className="absolute inset-0 bg-white" style={{ height: '100%', top: '80%' }}></div>
          {/* Cantão azul */}
          <div className="absolute top-0 left-0 w-1/3 h-3/5 bg-blue-600"></div>
          {/* Estrelas (simplificadas) */}
          <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-0.5 left-1 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-0.5 left-1.5 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-1 left-0.5 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-1 left-1.5 w-1 h-1 bg-white rounded-full"></div>
        </div>
      ) : (
        // Bandeira do Brasil (quando está em inglês, mostra opção para português)
        <div className="w-full h-full relative">
          <div className="absolute inset-0 bg-green-500"></div>
          {/* Losango amarelo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-3 h-3 bg-yellow-400 transform rotate-45"
              style={{
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
              }}
            ></div>
          </div>
          {/* Círculo azul */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      )}
    </button>
  );
};

export default LanguageSwitcher;
