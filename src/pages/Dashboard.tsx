import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CountryCard from '@/components/CountryCard';
import { useFavorites } from '@/hooks/useFavorites';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface Country {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  region: string;
  population: number;
  languages?: { [key: string]: string };
  flags: {
    png: string;
    alt?: string;
  };
  cca3: string;
}

const Dashboard = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();
  const { currentUser, loading: authLoading } = useAuth();

  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) {
      setLoading(false); // Stop loading spinner if not authenticated
      return;
    }
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,capital,region,population,languages,flags,cca3'
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch countries: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        // Ensure data is an array, otherwise set to []
        if (Array.isArray(data)) {
          setCountries(data);
          setFilteredCountries(data);
        } else {
          setCountries([]);
          setFilteredCountries([]);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
        setCountries([]);
        setFilteredCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [authLoading, currentUser]);

  useEffect(() => {
    let filtered = countries;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.name.official.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.capital?.some(cap => cap.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by region
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(country => country.region === selectedRegion);
    }

    setFilteredCountries(filtered);
  }, [searchTerm, selectedRegion, countries]);

  const handleCountryClick = (country: Country) => {
    navigate(`/country/${country.cca3}`, { state: { country } });
  };

  // Defensive: always use array for filteredCountries
  const safeFilteredCountries = Array.isArray(filteredCountries) ? filteredCountries : [];

  // Show loading spinner only if auth is ready and countries are loading
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading countries...</p>
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
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              Explore Countries
            </span>
          </h1>
          <p className="text-gray-600 mb-6">Discover fascinating facts about countries around the world</p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search countries, capitals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {safeFilteredCountries.length} of {countries.length} countries
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {safeFilteredCountries.map((country, index) => (
            <motion.div
              key={country.cca3}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
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

        {safeFilteredCountries.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No countries found matching your criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
