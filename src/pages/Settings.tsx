import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Building2, 
  CreditCard, 
  Target, 
  Bell, 
  Shield,
  ChevronRight,
  Crown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profiel', icon: User },
    { id: 'company', label: 'Bedrijf', icon: Building2 },
    { id: 'subscription', label: 'Abonnement', icon: CreditCard },
    { id: 'goals', label: 'Doelen', icon: Target },
    { id: 'notifications', label: 'Meldingen', icon: Bell },
    { id: 'security', label: 'Beveiliging', icon: Shield },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Persoonlijke informatie</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Volledige naam</label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mailadres</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Wijzigingen opslaan
              </button>
            </div>
          </div>
        );

      case 'company':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Bedrijfsinformatie</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrijfsnaam</label>
                  <input
                    type="text"
                    defaultValue={user?.company}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">KvK-nummer</label>
                    <input
                      type="text"
                      placeholder="12345678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">BTW-nummer</label>
                    <input
                      type="text"
                      placeholder="NL123456789B01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>Selecteer een sector</option>
                    <option>Dienstverlening</option>
                    <option>Handel</option>
                    <option>Productie</option>
                    <option>Bouw</option>
                    <option>IT</option>
                    <option>Overig</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Wijzigingen opslaan
              </button>
            </div>
          </div>
        );

      case 'subscription':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Huidige abonnement</h3>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Crown className="h-6 w-6 text-green-600 mr-2" />
                    <h4 className="text-xl font-semibold text-gray-900 capitalize">{user?.subscription}</h4>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Actief
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {user?.subscription === 'standaard' 
                    ? 'Je hebt toegang tot het volledige dashboard en 12 maanden historie.'
                    : user?.subscription === 'pro' 
                      ? 'Je hebt toegang tot alle premium functies inclusief AI-advies.'
                      : 'Je bent momenteel in de gratis proefperiode.'
                  }
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {user?.subscription === 'standaard' ? '€9' : user?.subscription === 'pro' ? '€29' : '€0'}
                    {user?.subscription !== 'basis' && <span className="text-base font-normal text-gray-500">/maand</span>}
                  </span>
                  <button className="bg-white hover:bg-gray-50 text-gray-900 px-4 py-2 rounded-lg border border-gray-200 font-medium transition-colors">
                    {user?.subscription === 'basis' ? 'Upgrade' : 'Wijzig plan'}
                  </button>
                </div>
              </div>
            </div>

            {user?.subscription !== 'pro' && (
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">🚀 Upgrade naar Pro</h4>
                <p className="text-purple-800 text-sm mb-4">
                  Krijg toegang tot AI-gedreven advies, geavanceerde exports en persoonlijke ondersteuning.
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Upgrade nu
                </button>
              </div>
            )}
          </div>
        );

      case 'goals':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">CO2-reductiedoelen</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jaarlijks reductiedoel (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="25"
                    min="0"
                    max="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Hoeveel procent wil je je CO2-uitstoot dit jaar verlagen?
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doeljaar voor klimaatneutraliteit
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>2030</option>
                    <option>2035</option>
                    <option>2040</option>
                    <option>2050</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Doelen opslaan
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Meldingsinstellingen</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Maandelijkse rapporten</h4>
                    <p className="text-gray-600 text-sm">Ontvang automatisch je maandelijkse CO2-rapport</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Doelstellingen alerts</h4>
                    <p className="text-gray-600 text-sm">Krijg meldingen wanneer je doelen behaald worden</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Verbeteringen</h4>
                    <p className="text-gray-600 text-sm">Ontvang tips en suggesties voor CO2-reductie</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Beveiliging</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Wachtwoord wijzigen</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Kies een sterk wachtwoord om je account te beveiligen
                  </p>
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                    Wachtwoord wijzigen →
                  </button>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Twee-factor authenticatie</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Extra beveiliging voor je account met SMS of authenticator app
                  </p>
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                    Instellen →
                  </button>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Sessies beheren</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Bekijk en beheer actieve sessies op verschillende apparaten
                  </p>
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                    Sessies bekijken →
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Instellingen
        </h1>
        <p className="text-gray-600">
          Beheer je account, bedrijfsgegevens en voorkeuren
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>
              );
            })}
          </nav>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            {renderTabContent()}
          </div>
        </motion.div>
      </div>
    </div>
  );
}