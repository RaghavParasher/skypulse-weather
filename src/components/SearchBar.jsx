import React, { useState, useEffect, useRef } from 'react';
import { useWeather } from '../context/WeatherContext';
import { useFavorites } from '../context/FavoritesContext';
import { searchCities } from '../services/geocodingApi';
import { FiSearch, FiMapPin, FiX, FiClock, FiTrash2, FiNavigation, FiHeart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const SearchBar = ({ isOpenModal = false, onCloseModal }) => {
  const { selectLocation, triggerGeolocation, loadingGeo } = useWeather();
  const { recentSearches, removeRecentSearch, clearRecentSearches, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(isOpenModal);

  const inputRef = useRef(null);

  // Auto focus if modal
  useEffect(() => {
    if (isOpenModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpenModal]);

  // Debounced search
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      setSelectedIndex(-1);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(async () => {
      const data = await searchCities(query);
      setResults(data);
      setLoading(false);
      setSelectedIndex(-1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    const listToNavigate = query.trim().length >= 2 ? results : recentSearches;
    if (!listToNavigate || listToNavigate.length === 0) {
      if (e.key === 'Escape') {
        if (isOpenModal && onCloseModal) onCloseModal();
        else {
          setIsFocused(false);
          inputRef.current?.blur();
        }
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < listToNavigate.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : listToNavigate.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < listToNavigate.length) {
        handleSelectLocation(listToNavigate[selectedIndex]);
      } else if (listToNavigate.length > 0) {
        handleSelectLocation(listToNavigate[0]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (isOpenModal && onCloseModal) onCloseModal();
      else {
        setIsFocused(false);
        inputRef.current?.blur();
      }
    }
  };

  const handleSelectLocation = (location) => {
    selectLocation(location);
    setQuery('');
    setResults([]);
    setIsFocused(false);
    if (isOpenModal && onCloseModal) onCloseModal();
  };

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (!isOpenModal && inputRef.current) {
          inputRef.current.focus();
          setIsFocused(true);
        }
      } else if (e.key === 'Escape') {
        if (isOpenModal && onCloseModal) onCloseModal();
        else setIsFocused(false);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpenModal, onCloseModal]);

  return (
    <div className="relative w-full max-w-2xl mx-auto z-30">
      {/* Search Input Box */}
      <div className={`relative flex items-center rounded-2xl glass-input p-1.5 shadow-xl transition-all duration-300 ${isFocused ? 'ring-2 ring-blue-500/40 border-blue-400' : ''}`}>
        <div className="pl-3.5 pr-2 text-slate-400">
          <FiSearch className={`w-5 h-5 ${loading ? 'animate-spin text-blue-400' : ''}`} />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search city, state, or country (e.g. Tokyo, London, New York)..."
          className="w-full bg-transparent border-none py-2.5 px-1 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none"
        />

        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              inputRef.current?.focus();
            }}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            title="Clear text"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}

        {/* GPS Current Location Button */}
        <button
          onClick={triggerGeolocation}
          disabled={loadingGeo}
          className="flex items-center space-x-1.5 glass-pill px-3 py-2 border-white/30 dark:border-white/15 bg-blue-500/20 hover:bg-blue-500/30 text-blue-600 dark:text-blue-300 font-semibold text-xs rounded-xl shrink-0 transition-all active:scale-95 disabled:opacity-50"
          title="Use browser GPS Geolocation"
        >
          <FiNavigation className={`w-3.5 h-3.5 ${loadingGeo ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{loadingGeo ? 'Locating...' : 'GPS'}</span>
        </button>
      </div>

      {/* Autocomplete Dropdown & Recent Searches */}
      <AnimatePresence>
        {isFocused && (
          <>
            {/* Backdrop for outside click */}
            <div
              className="fixed inset-0 z-20"
              onClick={() => {
                setIsFocused(false);
                if (isOpenModal && onCloseModal) onCloseModal();
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 z-30 rounded-2xl glass-panel border border-white/30 dark:border-white/15 shadow-2xl max-h-96 overflow-y-auto overflow-x-hidden backdrop-blur-2xl"
            >
              {/* Autocomplete Results */}
              {query.trim().length >= 2 && (
                <div className="p-2">
                  <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between border-b border-white/10 mb-1">
                    <span>Search Results ({results.length})</span>
                    <span className="text-[10px] font-normal">Use ↑↓ & Enter to select</span>
                  </div>

                  {loading && results.length === 0 ? (
                    <div className="py-6 text-center text-sm text-slate-400 flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <span>Searching Open-Meteo cities...</span>
                    </div>
                  ) : results.length === 0 ? (
                    <div className="py-6 text-center text-sm text-slate-400">
                      No matching locations found for "{query}". Try another city name.
                    </div>
                  ) : (
                    <ul className="space-y-1">
                      {results.map((loc, index) => {
                        const fav = isFavorite(loc);
                        return (
                          <li
                            key={loc.id}
                            onClick={() => handleSelectLocation(loc)}
                            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                              selectedIndex === index
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'hover:bg-white/30 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-100'
                            }`}
                          >
                            <div className="flex items-center space-x-3 overflow-hidden">
                              <FiMapPin className={`w-4 h-4 shrink-0 ${selectedIndex === index ? 'text-white' : 'text-blue-500'}`} />
                              <div className="truncate">
                                <span className="font-bold text-sm">{loc.name}</span>
                                {loc.admin1 && loc.admin1 !== loc.name && (
                                  <span className={`text-xs ml-1.5 ${selectedIndex === index ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                                    {loc.admin1},
                                  </span>
                                )}
                                <span className={`text-xs ml-1.5 font-semibold ${selectedIndex === index ? 'text-blue-100' : 'text-slate-600 dark:text-slate-300'}`}>
                                  {loc.country}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 shrink-0">
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${selectedIndex === index ? 'bg-blue-600/60 text-white' : 'bg-white/20 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                                {loc.latitude.toFixed(2)}°, {loc.longitude.toFixed(2)}°
                              </span>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (fav) removeFavorite(loc.id);
                                  else addFavorite(loc);
                                }}
                                className={`p-1.5 rounded-full hover:bg-white/20 transition-colors ${fav ? 'text-rose-500' : 'text-slate-400 hover:text-rose-400'}`}
                                title={fav ? 'Remove from Favorites' : 'Add to Favorites'}
                              >
                                <FiHeart className={`w-3.5 h-3.5 ${fav ? 'fill-rose-500' : ''}`} />
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}

              {/* Recent Searches section when query is empty */}
              {query.trim().length < 2 && (
                <div className="p-2">
                  <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between border-b border-white/10 mb-1">
                    <div className="flex items-center space-x-1.5">
                      <FiClock className="w-3.5 h-3.5 text-blue-400" />
                      <span>Recent Searches ({recentSearches.length}/10)</span>
                    </div>
                    {recentSearches.length > 0 && (
                      <button
                        onClick={clearRecentSearches}
                        className="text-[10px] text-rose-500 hover:underline font-semibold flex items-center space-x-1"
                      >
                        <FiTrash2 className="w-3 h-3" />
                        <span>Clear All</span>
                      </button>
                    )}
                  </div>

                  {recentSearches.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      No recent searches saved yet. Search for a city above or click GPS!
                    </div>
                  ) : (
                    <ul className="space-y-1">
                      {recentSearches.map((loc, index) => {
                        const fav = isFavorite(loc);
                        return (
                          <li
                            key={loc.id}
                            onClick={() => handleSelectLocation(loc)}
                            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                              selectedIndex === index
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'hover:bg-white/30 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-100'
                            }`}
                          >
                            <div className="flex items-center space-x-3 overflow-hidden">
                              <FiClock className={`w-4 h-4 shrink-0 ${selectedIndex === index ? 'text-white' : 'text-slate-400'}`} />
                              <div className="truncate">
                                <span className="font-bold text-sm">{loc.name}</span>
                                {loc.admin1 && (
                                  <span className={`text-xs ml-1.5 ${selectedIndex === index ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                                    {loc.admin1},
                                  </span>
                                )}
                                <span className={`text-xs ml-1.5 ${selectedIndex === index ? 'text-blue-100' : 'text-slate-600 dark:text-slate-300'}`}>
                                  {loc.country}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (fav) removeFavorite(loc.id);
                                  else addFavorite(loc);
                                }}
                                className={`p-1.5 rounded-full hover:bg-white/20 transition-colors ${fav ? 'text-rose-500' : 'text-slate-400 hover:text-rose-400'}`}
                                title={fav ? 'Remove from Favorites' : 'Add to Favorites'}
                              >
                                <FiHeart className={`w-3.5 h-3.5 ${fav ? 'fill-rose-500' : ''}`} />
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeRecentSearch(loc.id);
                                }}
                                className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors rounded-full"
                                title="Remove from recent searches"
                              >
                                <FiX className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
