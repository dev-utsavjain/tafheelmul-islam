/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { Home } from "./pages/Home";
import { Donate } from "./pages/Donate";
import { About } from "./pages/About";
import { MissionPage } from "./pages/MissionPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsPage } from "./pages/TermsPage";
import { GalleryPage } from "./pages/GalleryPage";
import { PartnersPage } from "./pages/PartnersPage";
import { AdminGalleryPage } from "./pages/AdminGalleryPage";


export default function App() {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/mission" element={<MissionPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/admin" element={<AdminGalleryPage />} />
      </Routes>
      <Footer />
    </HelmetProvider>
  );
}


