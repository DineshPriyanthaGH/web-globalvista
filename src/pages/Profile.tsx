
import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { favorites } = useFavorites();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

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
              Your Profile
            </span>
          </h1>
          <p className="text-gray-600">Manage your account and explore your journey</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{currentUser?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Member since</p>
                    <p className="font-medium">
                      {currentUser?.metadata?.creationTime 
                        ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
                        : 'Unknown'
                      }
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="w-full"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Your Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">
                      {favorites.length}
                    </div>
                    <div className="text-sm text-gray-600">
                      Favorite {favorites.length === 1 ? 'Country' : 'Countries'}
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-pink-50 to-amber-50 rounded-lg">
                    <div className="text-2xl font-bold text-pink-600">
                      {new Set(favorites.map(f => f.region)).size}
                    </div>
                    <div className="text-sm text-gray-600">
                      Regions Explored
                    </div>
                  </div>
                </div>

                {favorites.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Recent Favorites</h4>
                    <div className="space-y-2">
                      {favorites.slice(0, 3).map((country) => (
                        <div key={country.cca3} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                          <img
                            src={country.flags.png}
                            alt={`Flag of ${country.name.common}`}
                            className="w-6 h-4 object-cover rounded"
                          />
                          <span className="text-sm font-medium">{country.name.common}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
