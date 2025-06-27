import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  BarChart3, 
  Shield, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Building2,
  TrendingDown,
  FileText,
  Users
} from 'lucide-react';
import { LoginModal } from '../components/LoginModal';
import { RegisterModal } from '../components/RegisterModal';

export function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const features = [
    {
      icon: BarChart3,
      title: 'Eenvoudige tracking',
      description: 'Voer je energiegebruik, transport en afval stap voor stap in met onze gebruikersvriendelijke wizard.'
    },
    {
      icon: TrendingDown,
      title: 'Heldere inzichten',
      description: 'Krijg direct inzicht in je CO2-uitstoot per categorie en ontdek waar de grootste winst te behalen valt.'
    },
    {
      icon: FileText,
      title: 'Professionele rapporten',
      description: 'Genereer automatisch gedetailleerde PDF-rapporten voor stakeholders en compliance.'
    },
    {
      icon: Shield,
      title: 'Veilig & privé',
      description: 'Je bedrijfsgegevens zijn veilig opgeslagen volgens de hoogste beveiligingsstandaarden.'
    }
  ];

  const pricing = [
    {
      name: 'Basis',
      price: 'Gratis',
      period: '30 dagen proef',
      features: [
        'Beperkte functionaliteit',
        '30 dagen historie',
        'Basis dashboard',
        'Email ondersteuning'
      ],
      cta: 'Start gratis proef',
      popular: false
    },
    {
      name: 'Standaard',
      price: '€9',
      period: 'per maand',
      features: [
        'Volledig dashboard',
        '12 maanden historie',
        'Basis export mogelijkheden',
        'Prioriteit ondersteuning',
        'Nederlandse emissiefactoren'
      ],
      cta: 'Begin nu',
      popular: true
    },
    {
      name: 'Pro',
      price: '€29',
      period: 'per maand',
      features: [
        'Onbeperkte historie',
        'Geavanceerde exports',
        'AI-gedreven advies',
        'Persoonlijke ondersteuning',
        'Benchmark tool',
        'API toegang'
      ],
      cta: 'Upgrade naar Pro',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">CO2-Inzicht</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowLogin(true)}
              className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium"
            >
              Inloggen
            </button>
            <button
              onClick={() => setShowRegister(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Aan de slag
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Begrijp en verminder je{' '}
              <span className="text-green-600">CO2-voetafdruk</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Voor Nederlandse MKB-bedrijven die hun milieu-impact willen begrijpen en verbeteren. 
              Eenvoudige tracking, heldere inzichten, concrete acties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowRegister(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors flex items-center justify-center"
              >
                Start gratis proef
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold transition-colors">
                Bekijk demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 max-w-4xl mx-auto overflow-hidden">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">500+ Bedrijven</h3>
                    <p className="text-gray-600 text-sm">vertrouwen op CO2-Inzicht</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingDown className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">23% Gemiddeld</h3>
                    <p className="text-gray-600 text-sm">CO2-reductie in jaar 1</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">4.8/5 Sterren</h3>
                    <p className="text-gray-600 text-sm">klanttevredenheid</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Alles wat je nodig hebt om te beginnen
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Van data invoer tot rapporten - we maken CO2-tracking zo eenvoudig mogelijk voor jouw bedrijf.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Kies het juiste plan voor jouw bedrijf
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Begin gratis of kies direct voor meer functionaliteiten. Geen verborgen kosten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-sm border p-8 relative ${
                  plan.popular ? 'border-green-500 shadow-lg' : 'border-gray-100'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Meest populair
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== 'Gratis' && <span className="text-gray-600 ml-1">/{plan.period.split(' ')[1]}</span>}
                  </div>
                  <p className="text-gray-600 text-sm">{plan.period}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setShowRegister(true)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Klaar om je CO2-impact te begrijpen?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Sluit je aan bij honderden Nederlandse bedrijven die al bezig zijn met duurzaamheid.
            </p>
            <button
              onClick={() => setShowRegister(true)}
              className="bg-white hover:bg-gray-100 text-green-600 px-8 py-4 rounded-xl text-lg font-semibold transition-colors inline-flex items-center"
            >
              Start je gratis proef
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-400" />
              <span className="text-lg font-semibold text-white">CO2-Inzicht</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 CO2-Inzicht. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </div>
  );
}