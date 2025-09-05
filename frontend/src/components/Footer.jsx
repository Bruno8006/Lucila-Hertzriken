import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-light tracking-wide">
              lucila hertzriken
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-medium tracking-wide">{t('footer.quickLinks')}</h4>
            <nav className="space-y-3">
              <Link 
                to="/about" 
                className="block text-gray-400 hover:text-white transition-colors duration-300"
              >
                {t('navigation.about')}
              </Link>
              <Link 
                to="/work" 
                className="block text-gray-400 hover:text-white transition-colors duration-300"
              >
                {t('navigation.work')}
              </Link>
              <Link 
                to="/services" 
                className="block text-gray-400 hover:text-white transition-colors duration-300"
              >
                {t('navigation.services')}
              </Link>
              <Link 
                to="/contact" 
                className="block text-gray-400 hover:text-white transition-colors duration-300"
              >
                {t('navigation.contact')}
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-medium tracking-wide">{t('footer.services')}</h4>
            <nav className="space-y-3">
              <span className="block text-gray-400">{t('footer.filmProduction')}</span>
              <span className="block text-gray-400">{t('footer.creativeConsultancy')}</span>
              <span className="block text-gray-400">{t('footer.trainingWorkshops')}</span>
              <span className="block text-gray-400">{t('footer.internationalCoproductions')}</span>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-medium tracking-wide">{t('footer.getInTouch')}</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <a 
                  href="mailto:hello@lucilahertzriken.com"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {t('contact.email')}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <a 
                  href="tel:+5511999999999"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {t('contact.phone')}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">{t('contact.location')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Lucila Hertzriken. {t('footer.copyright')}
            </p>
            <div className="flex space-x-6 text-sm">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                {t('footer.privacyPolicy')}
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                {t('footer.termsOfService')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
