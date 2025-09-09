import React from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "../hooks/useTranslation";

const Header = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-sm">
      <nav className="container mx-auto px-8 py-6 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-light tracking-wide text-gray-800 hover:text-gray-600 transition-colors duration-300"
        >
          lucila hertzriken
        </Link>
        
        <div className="flex items-center space-x-8">
          <Link 
            to="/about" 
            className={`text-sm tracking-wide transition-colors duration-300 ${
              isActive('/about') ? 'text-gray-800 font-medium' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
{t('navigation.about')}
          </Link>
          <Link 
            to="/trabalhos" 
            className={`text-sm tracking-wide transition-colors duration-300 ${
              isActive('/trabalhos') || isActive('/work') ? 'text-gray-800 font-medium' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
{t('navigation.work')}
          </Link>
          <Link 
            to="/services" 
            className={`text-sm tracking-wide transition-colors duration-300 ${
              isActive('/services') ? 'text-gray-800 font-medium' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
{t('navigation.services')}
          </Link>
          <Link 
            to="/contact" 
            className={`text-sm tracking-wide transition-colors duration-300 ${
              isActive('/contact') ? 'text-gray-800 font-medium' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
{t('navigation.contact')}
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
};

export default Header;