// Nederlandse emissiefactoren (kg CO2eq per eenheid)
export const EMISSION_FACTORS = {
  // Scope 1 - Directe uitstoot
  gas: 1.884, // kg CO2eq per m³ aardgas
  fuel: {
    benzine: 2.31, // kg CO2eq per liter
    diesel: 2.67, // kg CO2eq per liter
    elektrisch: 0.0, // geen directe uitstoot
    hybride: 1.15, // gemiddeld 50% minder dan benzine
  },
  
  // Scope 2 - Elektriciteit
  electricity: {
    grey: 0.404, // kg CO2eq per kWh (Nederlandse energiemix 2024)
    green: 0.0, // groene stroom heeft geen CO2-uitstoot
  },
  
  // Scope 3 - Indirecte uitstoot
  purchasedGoods: 0.5, // kg CO2eq per euro inkoopwaarde (gemiddeld)
  transport: {
    car: 0.21, // kg CO2eq per km (gemiddelde personenauto)
    train: 0.041, // kg CO2eq per km (Nederlandse spoorwegen)
    plane: 0.255, // kg CO2eq per km (korte afstand)
  },
  waste: {
    general: 0.5, // kg CO2eq per kg restafval
    paper: 0.9, // kg CO2eq per kg papier (recycling bespaart CO2)
    plastic: 1.8, // kg CO2eq per kg plastic
  },
};

export interface FormData {
  gasUsage: string;
  fuelType: 'benzine' | 'diesel' | 'elektrisch' | 'hybride';
  vehicleKm: string;
  electricityUsage: string;
  greenEnergy: boolean;
  purchasedGoods: string;
  businessTravel: {
    car: string;
    train: string;
    plane: string;
  };
  waste: {
    general: string;
    paper: string;
    plastic: string;
  };
}

export interface CO2Breakdown {
  scope1: {
    gas: number;
    vehicles: number;
    total: number;
  };
  scope2: {
    electricity: number;
    total: number;
  };
  scope3: {
    purchasedGoods: number;
    businessTravel: number;
    waste: number;
    total: number;
  };
  total: number;
}

export function calculateCO2(formData: FormData): CO2Breakdown {
  // Scope 1 berekeningen
  const gasEmissions = parseFloat(formData.gasUsage || '0') * EMISSION_FACTORS.gas;
  
  // Voertuig emissiefactor op basis van brandstoftype
  const fuelEmissionFactor = EMISSION_FACTORS.fuel[formData.fuelType];
  // Gemiddeld verbruik: benzine/diesel ~7L/100km, elektrisch 0, hybride ~3.5L/100km
  const fuelConsumptionPer100km = formData.fuelType === 'elektrisch' ? 0 : 
                                   formData.fuelType === 'hybride' ? 3.5 : 7;
  const vehicleEmissions = parseFloat(formData.vehicleKm || '0') * 
                          (fuelConsumptionPer100km / 100) * fuelEmissionFactor;
  
  const scope1Total = gasEmissions + vehicleEmissions;

  // Scope 2 berekeningen
  const electricityFactor = formData.greenEnergy ? 
                            EMISSION_FACTORS.electricity.green : 
                            EMISSION_FACTORS.electricity.grey;
  const electricityEmissions = parseFloat(formData.electricityUsage || '0') * electricityFactor;
  
  const scope2Total = electricityEmissions;

  // Scope 3 berekeningen
  const purchasedGoodsEmissions = parseFloat(formData.purchasedGoods || '0') * 
                                 EMISSION_FACTORS.purchasedGoods;
  
  const businessTravelEmissions = 
    parseFloat(formData.businessTravel.car || '0') * EMISSION_FACTORS.transport.car +
    parseFloat(formData.businessTravel.train || '0') * EMISSION_FACTORS.transport.train +
    parseFloat(formData.businessTravel.plane || '0') * EMISSION_FACTORS.transport.plane;
  
  const wasteEmissions = 
    parseFloat(formData.waste.general || '0') * EMISSION_FACTORS.waste.general +
    parseFloat(formData.waste.paper || '0') * EMISSION_FACTORS.waste.paper +
    parseFloat(formData.waste.plastic || '0') * EMISSION_FACTORS.waste.plastic;
  
  const scope3Total = purchasedGoodsEmissions + businessTravelEmissions + wasteEmissions;

  // Totaal (alles in kg, omzetten naar tonnen)
  const totalKg = scope1Total + scope2Total + scope3Total;
  const totalTonnes = totalKg / 1000;

  return {
    scope1: {
      gas: gasEmissions / 1000,
      vehicles: vehicleEmissions / 1000,
      total: scope1Total / 1000,
    },
    scope2: {
      electricity: electricityEmissions / 1000,
      total: scope2Total / 1000,
    },
    scope3: {
      purchasedGoods: purchasedGoodsEmissions / 1000,
      businessTravel: businessTravelEmissions / 1000,
      waste: wasteEmissions / 1000,
      total: scope3Total / 1000,
    },
    total: totalTonnes,
  };
}

export function formatCO2Value(value: number): string {
  return value.toFixed(2);
}

export function getCO2Advice(breakdown: CO2Breakdown): string {
  const { scope1, scope2, scope3 } = breakdown;
  
  if (scope1.total > scope2.total && scope1.total > scope3.total) {
    if (scope1.vehicles > scope1.gas) {
      return "Je grootste impact komt van zakelijke voertuigen. Overweeg elektrische voertuigen of stimuleer thuiswerken om je CO2-uitstoot te verlagen.";
    } else {
      return "Je gasverbruik heeft de grootste impact. Overweeg betere isolatie of een warmtepomp om je CO2-uitstoot te verlagen.";
    }
  } else if (scope2.total > scope1.total && scope2.total > scope3.total) {
    return "Je elektriciteitsverbruik heeft de grootste impact. Schakel over naar groene stroom en investeer in energiebesparende maatregelen.";
  } else {
    if (scope3.businessTravel > scope3.purchasedGoods && scope3.businessTravel > scope3.waste) {
      return "Zakelijke reizen hebben de grootste impact. Overweeg meer videovergaderingen en kies voor de trein in plaats van het vliegtuig.";
    } else if (scope3.purchasedGoods > scope3.businessTravel && scope3.purchasedGoods > scope3.waste) {
      return "Je inkoop heeft de grootste impact. Kies voor lokale leveranciers en duurzame producten om je CO2-uitstoot te verlagen.";
    } else {
      return "Je afvalproductie draagt significant bij aan je CO2-uitstoot. Focus op afvalreductie en betere recycling.";
    }
  }
}