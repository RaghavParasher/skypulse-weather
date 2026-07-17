import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const FavoritesContext = createContext();

export const FAVORITES_STORAGE_KEY = 'skypulse_favorites';
export const RECENT_SEARCHES_STORAGE_KEY = 'skypulse_recent_searches';

const defaultFavorites = [
  { id: 'Tokyo-35.689-139.692', name: 'Tokyo', country: 'Japan', latitude: 35.689, longitude: 139.692, timezone: 'Asia/Tokyo' },
  { id: 'London-51.508--0.126', name: 'London', country: 'United Kingdom', latitude: 51.508, longitude: -0.126, timezone: 'Europe/London' },
  { id: 'New York-40.714--74.006', name: 'New York', country: 'United States', latitude: 40.714, longitude: -74.006, timezone: 'America/New_York' },
];

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultFavorites;
    } catch {
      return defaultFavorites;
    }
  });

  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save favorites
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites:', e);
    }
  }, [favorites]);

  // Save recent searches
  useEffect(() => {
    try {
      localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(recentSearches));
    } catch (e) {
      console.error('Failed to save recent searches:', e);
    }
  }, [recentSearches]);

  const addFavorite = (location) => {
    const locId = location.id || `${location.name}-${location.latitude}-${location.longitude}`;
    if (favorites.some((item) => item.id === locId)) {
      toast('City is already in your favorites', { icon: 'ℹ️' });
      return;
    }
    const newFav = {
      id: locId,
      name: location.name,
      country: location.country,
      admin1: location.admin1 || '',
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone || 'auto'
    };
    setFavorites((prev) => [newFav, ...prev]);
    toast.success(`${location.name} added to Favorites!`);
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
    toast.success('Removed from Favorites');
  };

  const isFavorite = (idOrLocation) => {
    if (!idOrLocation) return false;
    const id = typeof idOrLocation === 'string' ? idOrLocation : (idOrLocation.id || `${idOrLocation.name}-${idOrLocation.latitude}-${idOrLocation.longitude}`);
    return favorites.some((item) => item.id === id);
  };

  const addRecentSearch = (location) => {
    if (!location || !location.name) return;
    const locId = location.id || `${location.name}-${location.latitude}-${location.longitude}`;
    setRecentSearches((prev) => {
      // Remove duplicates and keep latest at the top, max 10
      const filtered = prev.filter((item) => item.id !== locId);
      const updated = [
        {
          id: locId,
          name: location.name,
          country: location.country || '',
          admin1: location.admin1 || '',
          latitude: location.latitude,
          longitude: location.longitude,
          timezone: location.timezone || 'auto'
        },
        ...filtered
      ];
      return updated.slice(0, 10); // Maximum 10 recent searches
    });
  };

  const removeRecentSearch = (id) => {
    setRecentSearches((prev) => prev.filter((item) => item.id !== id));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    toast.success('Recent searches cleared');
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        recentSearches,
        addRecentSearch,
        removeRecentSearch,
        clearRecentSearches
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
};
