
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Loader2 } from 'lucide-react';
import CountryCard from '@/components/CountryCard';
import { useFavorites } from '@/hooks/useFavorites';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const { favorites, loading, toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleCountryClick = (country: any) => {
    navigate(`/country/${country.cca3}`, { state: { country } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Your Favorite Countries
              </span>
            </h1>
          </div>
          <p className="text-gray-600">
            {favorites.length > 0 
              ? `You have ${favorites.length} favorite ${favorites.length === 1 ? 'country' : 'countries'}`
              : 'Start exploring and add countries to your favorites!'
            }
          </p>
        </motion.div>

        {favorites.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {favorites.map((country, index) => (
              <motion.div
                key={country.cca3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CountryCard
                  country={country}
                  isFavorite={isFavorite(country)}
                  onToggleFavorite={toggleFavorite}
                  onClick={handleCountryClick}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16"
          >
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              No favorites yet
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Explore countries and click the heart icon to add them to your favorites collection.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              Start Exploring
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
