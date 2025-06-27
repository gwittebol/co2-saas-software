import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft,
  Car,
  Zap,
  ShoppingCart,
  Plane,
  Trash2,
  CheckCircle,
  Info,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { calculateCO2, formatCO2Value, getCO2Advice, type FormData } from '../utils/co2Calculator';

export function DataEntry() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    // Scope 1
    gasUsage: '',
    fuelType: 'benzine',
    vehicleKm: '',
    
    // Scope 2
    electricityUsage: '',
    greenEnergy: false,
    
    // Scope 3
    purchasedGoods: '',
    businessTravel: {
      car: '',
      train: '',
      plane: ''
    },
    waste: {
      general: '',
      paper: '',
      plastic: ''
    }
  });

  // Bereken CO2-uitstoot dynamisch
  const co2Breakdown = useMemo(() => calculateCO2(formData), [formData]);
  const advice = useMemo(() => getCO2Advice(co2Breakdown), [co2Breakdown]);

  const steps = [
    {
      title: 'Scope 1: Directe uitstoot',
      description: 'Brandstof en gas die je bedrijf direct verbruikt',
      icon: Car,
      color: 'red'
    },
    {
      title: 'Scope 2: Elektriciteit',
      description: 'Ingekochte elektriciteit voor je bedrijf',
      icon: Zap,
      color: 'orange'
    },
    {
      title: 'Scope 3: Indirecte uitstoot',
      description: 'Zakelijke reizen, inkoop en afval',
      icon: ShoppingCart,
      color: 'yellow'
    },
    {
      title: 'Overzicht & bevestiging',
      description: 'Controleer je gegevens voordat we ze opslaan',
      icon: CheckCircle,
      color: 'green'
    }
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gasverbruik (m³/maand)
                <Info className="inline h-4 w-4 ml-1 text-gray-400" />
              </label>
              <input
                type="number"
                value={formData.gasUsage}
                onChange={(e) => handleInputChange('gasUsage', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="bijv. 850"
              />
              <p className="text-xs text-gray-500 mt-1">Vind je dit op je gasrekening</p>
              {formData.gasUsage && (
                <p className="text-xs text-green-600 mt-1">
                  ≈ {formatCO2Value(parseFloat(formData.gasUsage) * 1.884 / 1000)} ton CO2eq per maand
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brandstoftype zakelijke voertuigen
              </label>
              <select
                value={formData.fuelType}
                onChange={(e) => handleInputChange('fuelType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="benzine">Benzine</option>
                <option value="diesel">Diesel</option>
                <option value="elektrisch">Elektrisch</option>
                <option value="hybride">Hybride</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kilometers zakelijke voertuigen (per maand)
              </label>
              <input
                type="number"
                value={formData.vehicleKm}
                onChange={(e) => handleInputChange('vehicleKm', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="bijv. 2500"
              />
              {formData.vehicleKm && (
                <p className="text-xs text-green-600 mt-1">
                  ≈ {formatCO2Value(co2Breakdown.scope1.vehicles)} ton CO2eq per maand
                </p>
              )}
            </div>

            {co2Breakdown.scope1.total > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-1">📊 Scope 1 totaal</h4>
                <p className="text-blue-800 text-sm">
                  <strong>{formatCO2Value(co2Breakdown.scope1.total)} ton CO2eq</strong> per maand
                </p>
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Elektriciteitsverbruik (kWh/maand)
                <Info className="inline h-4 w-4 ml-1 text-gray-400" />
              </label>
              <input
                type="number"
                value={formData.electricityUsage}
                onChange={(e) => handleInputChange('electricityUsage', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="bijv. 1200"
              />
              <p className="text-xs text-gray-500 mt-1">Staat op je elektriciteitsrekening</p>
              {formData.electricityUsage && (
                <p className="text-xs text-green-600 mt-1">
                  ≈ {formatCO2Value(co2Breakdown.scope2.electricity)} ton CO2eq per maand
                  {formData.greenEnergy && ' (groene stroom = 0 CO2!)'}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.greenEnergy}
                  onChange={(e) => handleInputChange('greenEnergy', e.target.checked)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500 mr-3"
                />
                <span className="text-sm font-medium text-gray-700">
                  Wij gebruiken groene stroom
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1 ml-6">
                Check dit bij je energieleverancier
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">💡 Wist je dat?</h4>
                  <p className="text-blue-800 text-sm">
                    Groene stroom heeft een veel lagere CO2-uitstoot. Als je overschakelt, 
                    kan je tot 100% besparen op je Scope 2 uitstoot!
                    {formData.electricityUsage && !formData.greenEnergy && (
                      <span className="block mt-1 font-medium">
                        Besparing: {formatCO2Value(co2Breakdown.scope2.electricity)} ton CO2eq per maand
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {co2Breakdown.scope2.total > 0 && (
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-1">📊 Scope 2 totaal</h4>
                <p className="text-orange-800 text-sm">
                  <strong>{formatCO2Value(co2Breakdown.scope2.total)} ton CO2eq</strong> per maand
                </p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div>
              <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Ingekochte goederen
              </h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inkoopwaarde per maand (€)
                </label>
                <input
                  type="number"
                  value={formData.purchasedGoods}
                  onChange={(e) => handleInputChange('purchasedGoods', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="bijv. 15000"
                />
                {formData.purchasedGoods && (
                  <p className="text-xs text-green-600 mt-1">
                    ≈ {formatCO2Value(co2Breakdown.scope3.purchasedGoods)} ton CO2eq per maand
                  </p>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                <Plane className="h-5 w-5 mr-2" />
                Zakelijke reizen (km/maand)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Auto</label>
                  <input
                    type="number"
                    value={formData.businessTravel.car}
                    onChange={(e) => handleInputChange('businessTravel.car', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="500"
                  />
                  <p className="text-xs text-gray-500 mt-1">0.21 kg CO2/km</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trein</label>
                  <input
                    type="number"
                    value={formData.businessTravel.train}
                    onChange={(e) => handleInputChange('businessTravel.train', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="200"
                  />
                  <p className="text-xs text-gray-500 mt-1">0.041 kg CO2/km</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vliegtuig</label>
                  <input
                    type="number"
                    value={formData.businessTravel.plane}
                    onChange={(e) => handleInputChange('businessTravel.plane', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">0.255 kg CO2/km</p>
                </div>
              </div>
              {co2Breakdown.scope3.businessTravel > 0 && (
                <p className="text-xs text-green-600 mt-2">
                  Totaal reizen: {formatCO2Value(co2Breakdown.scope3.businessTravel)} ton CO2eq per maand
                </p>
              )}
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                <Trash2 className="h-5 w-5 mr-2" />
                Afval (kg/maand)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Restafval</label>
                  <input
                    type="number"
                    value={formData.waste.general}
                    onChange={(e) => handleInputChange('waste.general', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="150"
                  />
                  <p className="text-xs text-gray-500 mt-1">0.5 kg CO2/kg</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Papier</label>
                  <input
                    type="number"
                    value={formData.waste.paper}
                    onChange={(e) => handleInputChange('waste.paper', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="25"
                  />
                  <p className="text-xs text-gray-500 mt-1">0.9 kg CO2/kg</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plastic</label>
                  <input
                    type="number"
                    value={formData.waste.plastic}
                    onChange={(e) => handleInputChange('waste.plastic', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="10"
                  />
                  <p className="text-xs text-gray-500 mt-1">1.8 kg CO2/kg</p>
                </div>
              </div>
              {co2Breakdown.scope3.waste > 0 && (
                <p className="text-xs text-green-600 mt-2">
                  Totaal afval: {formatCO2Value(co2Breakdown.scope3.waste)} ton CO2eq per maand
                </p>
              )}
            </div>

            {co2Breakdown.scope3.total > 0 && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-900 mb-1">📊 Scope 3 totaal</h4>
                <p className="text-yellow-800 text-sm">
                  <strong>{formatCO2Value(co2Breakdown.scope3.total)} ton CO2eq</strong> per maand
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-green-900">Berekende CO2-uitstoot</h4>
                <div className="flex items-center text-sm text-green-700">
                  {co2Breakdown.total > 4 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {co2Breakdown.total > 4 ? 'Boven gemiddelde' : 'Onder gemiddelde'}
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {formatCO2Value(co2Breakdown.total)} ton CO2eq
              </div>
              <p className="text-green-700 text-sm">Voor deze maand op basis van je invoer</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Gedetailleerde uitsplitsing:</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h5 className="font-medium text-red-900 mb-2 flex items-center">
                    <Car className="h-4 w-4 mr-2" />
                    Scope 1 - Directe uitstoot
                  </h5>
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    {formatCO2Value(co2Breakdown.scope1.total)}
                  </div>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>Gas: {formatCO2Value(co2Breakdown.scope1.gas)} ton</li>
                    <li>Voertuigen: {formatCO2Value(co2Breakdown.scope1.vehicles)} ton</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h5 className="font-medium text-orange-900 mb-2 flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    Scope 2 - Elektriciteit
                  </h5>
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    {formatCO2Value(co2Breakdown.scope2.total)}
                  </div>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>Verbruik: {formData.electricityUsage || 0} kWh</li>
                    <li>Type: {formData.greenEnergy ? 'Groene stroom' : 'Grijze stroom'}</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h5 className="font-medium text-yellow-900 mb-2 flex items-center">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Scope 3 - Indirecte uitstoot
                  </h5>
                  <div className="text-2xl font-bold text-yellow-600 mb-2">
                    {formatCO2Value(co2Breakdown.scope3.total)}
                  </div>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>Inkoop: {formatCO2Value(co2Breakdown.scope3.purchasedGoods)} ton</li>
                    <li>Reizen: {formatCO2Value(co2Breakdown.scope3.businessTravel)} ton</li>
                    <li>Afval: {formatCO2Value(co2Breakdown.scope3.waste)} ton</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">🎯 Persoonlijk advies</h4>
              <p className="text-blue-800 text-sm">
                {advice}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">📈 Benchmark</h4>
              <p className="text-gray-700 text-sm">
                Het gemiddelde Nederlandse MKB-bedrijf stoot ongeveer 4.2 ton CO2eq per maand uit. 
                Jouw uitstoot van {formatCO2Value(co2Breakdown.total)} ton is{' '}
                {co2Breakdown.total > 4.2 ? (
                  <span className="text-red-600 font-medium">
                    {formatCO2Value(co2Breakdown.total - 4.2)} ton hoger dan gemiddeld
                  </span>
                ) : (
                  <span className="text-green-600 font-medium">
                    {formatCO2Value(4.2 - co2Breakdown.total)} ton lager dan gemiddeld
                  </span>
                )}.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={index} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  isActive 
                    ? `border-${step.color}-500 bg-${step.color}-500 text-white` 
                    : isCompleted 
                      ? `border-${step.color}-500 bg-${step.color}-500 text-white`
                      : 'border-gray-300 bg-white text-gray-400'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    index < currentStep ? `bg-${steps[index + 1].color}-500` : 'bg-gray-200'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </div>
      </div>

      {/* Real-time CO2 indicator */}
      {co2Breakdown.total > 0 && currentStep < 3 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Huidige berekening:</span>
            <span className="text-lg font-semibold text-green-600">
              {formatCO2Value(co2Breakdown.total)} ton CO2eq/maand
            </span>
          </div>
        </motion.div>
      )}

      {/* Form Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8"
      >
        {renderStepContent()}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center px-6 py-3 text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Vorige
        </button>
        
        <button
          onClick={currentStep === steps.length - 1 ? () => alert(`Data opgeslagen! Totale CO2-uitstoot: ${formatCO2Value(co2Breakdown.total)} ton CO2eq per maand`) : nextStep}
          className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          {currentStep === steps.length - 1 ? 'Opslaan' : 'Volgende'}
          {currentStep !== steps.length - 1 && <ChevronRight className="h-5 w-5 ml-2" />}
        </button>
      </div>
    </div>
  );
}