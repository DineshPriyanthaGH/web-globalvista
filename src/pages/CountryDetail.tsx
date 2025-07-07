
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, MapPin, Users, Globe, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useFavorites } from '@/hooks/useFavorites';

const CountryDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { code } = useParams();
  const country = location.state?.country;
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!country) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Country not found</p>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Explorer
          </Button>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: Users,
      label: 'Population',
      value: country.population.toLocaleString()
    },
    {
      icon: MapPin,
      label: 'Capital',
      value: country.capital?.[0] || 'N/A'
    },
    {
      icon: Globe,
      label: 'Region',
      value: country.region
    },
    {
      icon: Languages,
      label: 'Languages',
      value: country.languages ? Object.values(country.languages).join(', ') : 'N/A'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                  className="w-full h-64 object-cover"
                />
                <Button
                  onClick={() => toggleFavorite(country)}
                  className={`absolute top-4 right-4 ${
                    isFavorite(country)
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                  size="sm"
                >
                  <Heart className={`w-4 h-4 ${isFavorite(country) ? 'fill-current' : ''}`} />
                </Button>
              </div>
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold mb-2">{country.name.common}</h1>
                <p className="text-gray-600 mb-4">{country.name.official}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Country Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                          <p className="font-medium text-gray-900">{stat.value}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {country.currencies && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-6 pt-6 border-t"
                  >
                    <h3 className="font-semibold mb-3">Currencies</h3>
                    <div className="space-y-2">
                      {Object.entries(country.currencies).map(([code, currency]: [string, any]) => (
                        <div key={code} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <span className="font-medium">{currency.name}</span>
                          <span className="text-sm text-gray-600">{currency.symbol}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
