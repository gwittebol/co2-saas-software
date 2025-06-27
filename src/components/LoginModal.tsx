import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Leaf, Lock, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      onClose();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">Inloggen</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mailadres
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="naam@bedrijf.nl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wachtwoord
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                    <span className="ml-2 text-sm text-gray-600">Ingelogd blijven</span>
                  </label>
                  <a href="#" className="text-sm text-green-600 hover:text-green-500">
                    Wachtwoord vergeten?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  {isLoading ? 'Bezig met inloggen...' : 'Inloggen'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                Nog geen account?{' '}
                <button className="text-green-600 hover:text-green-500 font-medium">
                  Registreer je hier
                </button>
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}