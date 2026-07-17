import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useWeather } from './context/WeatherContext';
import { WeatherBackground } from './components/background/WeatherBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchBar } from './components/SearchBar';
import { SettingsModal } from './components/SettingsModal';
import { InitialLocationModal } from './components/InitialLocationModal';
import { CustomToaster } from './components/Toast';
import { Home } from './pages/Home';
import { Forecast } from './pages/Forecast';
import { Favorites } from './pages/Favorites';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { showInitialModal, dismissInitialModal } = useWeather();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-blue-500 selection:text-white">
      {/* Dynamic Animated Atmospheric Background Container */}
      <WeatherBackground />

      {/* Glassmorphic Navigation Header */}
      <Navbar
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Page Content Router */}
      <Routes>
        <Route path="/" element={<Home onOpenSearchModal={() => setIsSearchModalOpen(true)} />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/favorites" element={<Favorites onOpenSearchModal={() => setIsSearchModalOpen(true)} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Glassmorphic Footer */}
      <Footer />

      {/* Global Quick Search Modal (Ctrl+K) */}
      <AnimatePresence>
        {isSearchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              className="relative w-full max-w-2xl z-10"
            >
              <SearchBar
                isOpenModal={true}
                onCloseModal={() => setIsSearchModalOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* System Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Initial Manual Location Picker Modal (Prompted on first ever load) */}
      <InitialLocationModal
        isOpen={showInitialModal}
        onOpenSearch={() => {
          dismissInitialModal();
          setIsSearchModalOpen(true);
        }}
      />

      {/* Glassmorphic Toast Notifications */}
      <CustomToaster />
    </div>
  );
}

export default App;
