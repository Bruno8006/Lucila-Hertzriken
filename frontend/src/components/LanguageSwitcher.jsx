import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center w-6 h-4 rounded-sm overflow-hidden hover:opacity-80 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm"
      title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      {language === 'pt' ? (
        // Bandeira dos EUA (quando está em português, mostra opção para inglês)
        <svg width="32" height="24" viewBox="0 0 32 24" className="w-full h-full">
          {/* Listras vermelhas e brancas */}
          <rect width="32" height="1.85" fill="#B22234"/>
          <rect y="1.85" width="32" height="1.85" fill="white"/>
          <rect y="3.7" width="32" height="1.85" fill="#B22234"/>
          <rect y="5.55" width="32" height="1.85" fill="white"/>
          <rect y="7.4" width="32" height="1.85" fill="#B22234"/>
          <rect y="9.25" width="32" height="1.85" fill="white"/>
          <rect y="11.1" width="32" height="1.85" fill="#B22234"/>
          <rect y="12.95" width="32" height="1.85" fill="white"/>
          <rect y="14.8" width="32" height="1.85" fill="#B22234"/>
          <rect y="16.65" width="32" height="1.85" fill="white"/>
          <rect y="18.5" width="32" height="1.85" fill="#B22234"/>
          <rect y="20.35" width="32" height="1.85" fill="white"/>
          <rect y="22.2" width="32" height="1.8" fill="#B22234"/>
          
          {/* Cantão azul */}
          <rect width="12.8" height="14.8" fill="#3C3B6E"/>
          
          {/* Estrelas (simplificadas) */}
          <text x="1" y="3" fontSize="1.2" fill="white">★</text>
          <text x="3" y="3" fontSize="1.2" fill="white">★</text>
          <text x="5" y="3" fontSize="1.2" fill="white">★</text>
          <text x="7" y="3" fontSize="1.2" fill="white">★</text>
          <text x="9" y="3" fontSize="1.2" fill="white">★</text>
          <text x="2" y="5" fontSize="1.2" fill="white">★</text>
          <text x="4" y="5" fontSize="1.2" fill="white">★</text>
          <text x="6" y="5" fontSize="1.2" fill="white">★</text>
          <text x="8" y="5" fontSize="1.2" fill="white">★</text>
          <text x="1" y="7" fontSize="1.2" fill="white">★</text>
          <text x="3" y="7" fontSize="1.2" fill="white">★</text>
          <text x="5" y="7" fontSize="1.2" fill="white">★</text>
          <text x="7" y="7" fontSize="1.2" fill="white">★</text>
          <text x="9" y="7" fontSize="1.2" fill="white">★</text>
        </svg>
      ) : (
        // Bandeira do Brasil (quando está em inglês, mostra opção para português)
        <svg width="32" height="24" viewBox="0 0 32 24" className="w-full h-full">
          {/* Fundo verde */}
          <rect width="32" height="24" fill="#009639"/>
          
          {/* Losango amarelo */}
          <polygon points="16,2 30,12 16,22 2,12" fill="#FEDD00"/>
          
          {/* Círculo azul */}
          <circle cx="16" cy="12" r="4.5" fill="#012169"/>
          
          {/* Faixa branca */}
          <path d="M 10 12 Q 16 10 22 12 Q 16 14 10 12" fill="white" opacity="0.8"/>
          
          {/* Texto "ORDEM E PROGRESSO" (simplificado) */}
          <text x="16" y="13" fontSize="1.5" fill="white" textAnchor="middle" fontFamily="serif">★</text>
        </svg>
      )}
    </button>
  );
};

export default LanguageSwitcher;
