import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingAdminBadge from './components/FloatingAdminBadge';
import AdminLoginModal from './components/AdminLoginModal';
import { useLenis, smoothScrollTo } from './hooks/useLenis';

import HomePage from './pages/HomePage';
import NeervanaAI from './pages/NeervanaAI';
import ContactPage from './pages/ContactPage';
import AdminDashboardPreview from './pages/AdminDashboardPreview';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home', 'neervana', 'contact', 'admin'
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  // Initialize Lenis smooth scrolling (60fps, low memory footprint)
  useLenis();

  const handleLoginSuccess = (user) => {
    setAuthenticatedUser(user);
    setActivePage('admin');
    smoothScrollTo(0);
  };

  const handleNavigatePage = (page) => {
    setActivePage(page);
    smoothScrollTo(0);
  };

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      
      {/* Sticky Header Navigation */}
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onOpenAdminLogin={() => setIsAdminModalOpen(true)} 
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage onNavigateNeervana={() => handleNavigatePage('neervana')} />
        )}

        {activePage === 'neervana' && (
          <NeervanaAI />
        )}

        {activePage === 'contact' && (
          <ContactPage />
        )}

        {activePage === 'admin' && (
          <AdminDashboardPreview 
            user={authenticatedUser} 
            onBackHome={() => handleNavigatePage('home')} 
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigatePage={handleNavigatePage} />

      {/* Floating Admin Button & Help on bottom right */}
      <FloatingAdminBadge 
        onOpenAdminDashboard={() => {
          if (authenticatedUser) {
            handleNavigatePage('admin');
          } else {
            setIsAdminModalOpen(true);
          }
        }}
        onOpenHelp={() => handleNavigatePage('neervana')}
      />

      {/* Admin Login Popup Dialog */}
      <AdminLoginModal 
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
