import React, { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    alert(t('contact.form.success'));
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-light tracking-wide text-gray-800 mb-16">{t('contact.title')}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-light tracking-wide text-gray-800 mb-6">
                  {t('contact.getInTouch')}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {t('contact.description')}
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{t('contact.email')}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{t('contact.phone')}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">{t('contact.location')}</span>
                </div>
              </div>
              
              <div className="pt-8">
                <img 
                  src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Contact"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:border-gray-500 focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                      {t('contact.form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:border-gray-500 focus:outline-none transition-colors duration-300"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm text-gray-700 mb-2">
                    {t('contact.form.subject')} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-500 focus:outline-none transition-colors duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-700 mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-500 focus:outline-none transition-colors duration-300 resize-none"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-4 px-6 hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span className="tracking-wide">{t('contact.form.submit')}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;