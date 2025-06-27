import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Car, 
  Trash2, 
  BarChart3,
  Calendar,
  Target,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { CO2Chart } from '../components/CO2Chart';
import { EmissionBreakdown } from '../components/EmissionBreakdown';

export function Dashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Totale CO2-uitstoot',
      value: '42.5',
      unit: 'ton CO2eq',
      change: -12.3,
      icon: BarChart3,
      color: 'blue'
    },
    {
      title: 'Deze maand',
      value: '3.8',
      unit: 'ton CO2eq',
      change: -8.1,
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'Doelstelling',
      value: '65%',
      unit: 'van target',
      change: +5.2,
      icon: Target,
      color: 'purple'
    },
    {
      title: 'Scope 1',
      value: '18.2',
      unit: 'ton CO2eq',
      change: -15.7,
      icon: Car,
      color: 'orange'
    }
  ];

  const quickActions = [
    {
      title: 'Nieuwe data invoeren',
      description: 'Voeg je nieuwste verbruiksgegevens toe',
      icon: TrendingUp,
      href: '/dashboard/invoer',
      color: 'bg-green-500'
    },
    {
      title: 'Rapport genereren',
      description: 'Download je maandelijkse CO2-rapport',
      icon: BarChart3,
      href: '/dashboard/rapporten',
      color: 'bg-blue-500'
    },
    {
      title: 'Doelen bijwerken',
      description: 'Stel nieuwe reductiedoelen in',
      icon: Target,
      href: '/dashboard/instellingen',
      color: 'bg-purple-500'
    }
  ];

  const alerts = [
    {
      type: 'warning',
      title: 'Energieverbruik gestegen',
      message: 'Je elektriciteitsverbruik is 15% hoger dan vorige maand',
      action: 'Bekijk details'
    },
    {
      type: 'success',
      title: 'Doel bereikt!',
      message: 'Je hebt je reductiedoel voor transport behaald',
      action: 'Deel resultaat'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welkom terug, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600">
          Hier is een overzicht van je CO2-voetafdruk voor {user?.company}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change > 0;
          
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className={`flex items-center text-sm ${isPositive ? 'text-red-600' : 'text-green-600'}`}>
                  {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                  {Math.abs(stat.change)}%
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                  <span className="text-lg font-normal text-gray-500 ml-1">{stat.unit}</span>
                </p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CO2Chart />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <EmissionBreakdown />
        </motion.div>
      </div>

      {/* Alerts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Meldingen
          </h3>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  alert.type === 'warning' 
                    ? 'bg-orange-50 border-orange-200' 
                    : 'bg-green-50 border-green-200'
                }`}
              >
                <div className="flex items-start">
                  <AlertCircle className={`h-5 w-5 mt-0.5 mr-3 ${
                    alert.type === 'warning' ? 'text-orange-600' : 'text-green-600'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{alert.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{alert.message}</p>
                    <button className={`text-sm font-medium ${
                      alert.type === 'warning' ? 'text-orange-600' : 'text-green-600'
                    } hover:underline`}>
                      {alert.action}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Snelle acties
          </h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <a
                  key={index}
                  href={action.href}
                  className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all group"
                >
                  <div className={`p-2 rounded-lg ${action.color} mr-4`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 group-hover:text-gray-700">
                      {action.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}