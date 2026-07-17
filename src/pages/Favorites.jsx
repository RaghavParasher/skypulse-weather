import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useWeather } from '../context/WeatherContext';
import { FavoriteCard } from '../components/FavoriteCard';
import { FiHeart, FiSearch, FiTrash2, FiPlusCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const Favorites = ({ onOpenSearchModal }) => {
  const { favorites, removeFavorite, recentSearches, clearRecentSearches, addFavorite, isFavorite } = useFavorites();
  const { selectLocation } = useWeather();
  const navigate = useNavigate();

  const handleSelectCity = (location) => {
    selectLocation(location);
    navigate('/');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 flex-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border-white/30 backdrop-blur-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/30">
            <FiHeart className="w-6 h-6 animate-pulse fill-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Saved Favorite Cities ({favorites.length})
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              Your quick-access bookmarks stored locally across sessions.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenSearchModal}
          className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-all active:scale-95 shrink-0"
        >
          <FiPlusCircle className="w-4 h-4" />
          <span>Add New City</span>
        </button>
      </div>

      {/* Favorites Grid */}
      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-panel rounded-3xl p-12 text-center border-white/30 shadow-xl backdrop-blur-xl max-w-xl mx-auto my-8 space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center">
            <FiHeart className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">No Favorites Saved Yet</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Click the heart icon on any weather card or search result to save your favorite locations here!
          </p>
          <button
            onClick={onOpenSearchModal}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm shadow-lg transition-all"
          >
            <FiSearch className="w-4 h-4" />
            <span>Search Cities Now</span>
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {favorites.map((city) => (
              <FavoriteCard
                key={city.id}
                location={city}
                onRemove={removeFavorite}
                onSelect={handleSelectCity}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Recent Searches Section */}
      {recentSearches.length > 0 && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border-white/30 backdrop-blur-2xl shadow-xl mt-12 pb-12">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <h2 className="text-lg font-extrabold tracking-tight uppercase text-slate-900 dark:text-white">
              Recent Searches ({recentSearches.length})
            </h2>
            <button
              onClick={clearRecentSearches}
              className="text-xs font-bold text-rose-500 hover:underline flex items-center space-x-1"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {recentSearches.map((city) => {
              const fav = isFavorite(city);
              return (
                <div
                  key={city.id}
                  onClick={() => handleSelectCity(city)}
                  className="flex items-center justify-between p-3.5 rounded-2xl glass-card hover:bg-white/40 dark:hover:bg-slate-800/80 cursor-pointer transition-all group"
                >
                  <div className="truncate pr-2">
                    <span className="font-bold text-sm block group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {city.name}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                      {city.country || city.admin1}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (fav) removeFavorite(city.id);
                      else addFavorite(city);
                    }}
                    className={`p-2 rounded-full hover:bg-white/20 transition-colors shrink-0 ${
                      fav ? 'text-rose-500' : 'text-slate-400 hover:text-rose-400'
                    }`}
                    title={fav ? 'Remove from Favorites' : 'Add to Favorites'}
                  >
                    <FiHeart className={`w-4 h-4 ${fav ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
};
