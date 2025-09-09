import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "../hooks/useTranslation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl sm:text-2xl font-light tracking-wide text-gray-800 hover:text-gray-600 transition-colors duration-300"
          >
            lucila hertzriken
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/sobre" 
              className={`text-lg tracking-wide transition-colors duration-300 ${
                isActive('/sobre') ? 'text-gray-800 font-medium' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/trabalhos" 
              className={`text-lg tracking-wide transition-colors duration-300 ${
                isActive('/trabalhos') || isActive('/work') ? 'text-gray-800 font-medium' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {t('nav.work')}
            </Link>
            <Link 
              to="/servicos" 
              className={`text-lg tracking-wide transition-colors duration-300 ${
                isActive('/servicos') ? 'text-gray-800 font-medium' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {t('nav.services')}
            </Link>
            <Link 
              to="/contato" 
              className={`text-lg tracking-wide transition-colors duration-300 ${
                isActive('/contato') ? 'text-gray-800 font-medium' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {t('nav.contact')}
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors duration-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'max-h-96 opacity-100 mt-4'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg">
            <Link
              to="/sobre"
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                isActive('/sobre')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/trabalhos"
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                isActive('/trabalhos') || isActive('/work')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {t('nav.work')}
            </Link>
            <Link
              to="/servicos"
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                isActive('/servicos')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {t('nav.services')}
            </Link>
            <Link
              to="/contato"
              onClick={closeMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                isActive('/contato')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;