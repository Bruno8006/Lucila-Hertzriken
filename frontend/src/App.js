import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import WorkPage from "./pages/WorkPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/*" element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/sobre" element={<AboutPage />} />
                  <Route path="/work" element={<WorkPage />} />
                  <Route path="/trabalhos" element={<WorkPage />} />
                  <Route path="/servicos" element={<ServicesPage />} />
                  <Route path="/contato" element={<ContactPage />} />
                  <Route path="/projeto/:slug" element={<ProjectDetailPage />} />
                </Routes>
                <Footer />
              </>
            } />
          </Routes>
        </BrowserRouter>
      </div>
    </LanguageProvider>
  );
}

export default App;