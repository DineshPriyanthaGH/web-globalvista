
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

interface CountryCardProps {
  country: Country;
  isFavorite: boolean;
  onToggleFavorite: (country: Country) => void;
  onClick: (country: Country) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  isFavorite,
  onToggleFavorite,
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img
            src={country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="w-full h-32 object-cover"
            onClick={() => onClick(country)}
          />
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isFavorite 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(country);
            }}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <CardContent className="p-4" onClick={() => onClick(country)}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">
            {country.name.common}
          </h3>
          
          <div className="space-y-1 text-sm text-gray-600">
            <p>
              <span className="font-medium">Capital:</span>{' '}
              {country.capital?.[0] || 'N/A'}
            </p>
            <p>
              <span className="font-medium">Region:</span> {country.region}
            </p>
            <p>
              <span className="font-medium">Population:</span>{' '}
              {country.population.toLocaleString()}
            </p>
            {country.languages && (
              <p>
                <span className="font-medium">Languages:</span>{' '}
                {Object.values(country.languages).slice(0, 2).join(', ')}
                {Object.values(country.languages).length > 2 && '...'}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CountryCard;
