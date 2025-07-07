
import { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
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

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadFavorites = async () => {
      if (!currentUser) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'favorites', currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setFavorites(docSnap.data().countries || []);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [currentUser]);

  const saveFavorites = async (newFavorites: Country[]) => {
    if (!currentUser) return;

    try {
      const docRef = doc(db, 'favorites', currentUser.uid);
      await setDoc(docRef, { countries: newFavorites });
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const toggleFavorite = (country: Country) => {
    const isFavorite = favorites.some(fav => fav.cca3 === country.cca3);
    const newFavorites = isFavorite
      ? favorites.filter(fav => fav.cca3 !== country.cca3)
      : [...favorites, country];
    
    saveFavorites(newFavorites);
  };

  const isFavorite = (country: Country) => {
    return favorites.some(fav => fav.cca3 === country.cca3);
  };

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite
  };
};
