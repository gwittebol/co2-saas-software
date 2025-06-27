import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, TrendingDown, Share } from 'lucide-react';

export function Reports() {
  const reports = [
    {
      title: 'Maandrapport December 2024',
      type: 'Maandelijks',
      date: '2024-12-31',
      co2: '3.8 ton CO2eq',
      status: 'Klaar',
      downloadUrl: '#'
    },
    {
      title: 'Kwartaalrapport Q4 2024',
      type: 'Kwartaal',
      date: '2024-12-31',
      co2: '11.2 ton CO2eq',
      status: 'Klaar',
      downloadUrl: '#'
    },
    {
      title: 'Jaarrapport 2024',
      type: 'Jaarlijks',
      date: '2024-12-31',
      co2: '42.5 ton CO2eq',
      status: 'Wordt gegenereerd...',
      downloadUrl: null
    }
  ];

  const handleDownload = (reportTitle: string) => {
    // Simulate PDF generation
    alert(`${reportTitle} wordt gedownload...`);
  };

  const handleShare = (reportTitle: string) => {
    alert(`Deel ${reportTitle} via email...`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          CO2-Rapporten
        </h1>
        <p className="text-gray-600">
          Download en deel professionele rapporten van je CO2-voetafdruk
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Nieuw rapport genereren
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
            <div className="text-center">
              <FileText className="h-8 w-8 text-gray-400 group-hover:text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-green-600">
                Maandrapport
              </span>
            </div>
          </button>
          
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
            <div className="text-center">
              <Calendar className="h-8 w-8 text-gray-400 group-hover:text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-green-600">
                Kwartaalrapport
              </span>
            </div>
          </button>
          
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
            <div className="text-center">
              <TrendingDown className="h-8 w-8 text-gray-400 group-hover:text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-green-600">
                Jaarrapport
              </span>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Available Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Beschikbare rapporten
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {reports.map((report, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{report.title}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span>{report.type}</span>
                      <span>•</span>
                      <span>{new Date(report.date).toLocaleDateString('nl-NL')}</span>
                      <span>•</span>
                      <span className="font-medium text-green-600">{report.co2}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    report.status === 'Klaar' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status}
                  </span>
                  
                  {report.downloadUrl && (
                    <>
                      <button
                        onClick={() => handleShare(report.title)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Share className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(report.title)}
                        className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Report Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Wat staat er in je rapport?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-gray-900">Management samenvatting</h4>
                <p className="text-gray-600 text-sm">Kernpunten en belangrijkste bevindingen in begrijpelijke taal</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-gray-900">Gedetailleerde scope-analyse</h4>
                <p className="text-gray-600 text-sm">Volledige uitsplitsing van je CO2-uitstoot per categorie</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-gray-900">Visuele grafieken</h4>
                <p className="text-gray-600 text-sm">Duidelijke charts en trends om je voortgang te tonen</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-gray-900">Toegepaste methodologie</h4>
                <p className="text-gray-600 text-sm">Transparante uitleg over berekeningen en emissiefactoren</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-gray-900">Verbetervoorstellen</h4>
                <p className="text-gray-600 text-sm">Concrete aanbevelingen om je CO2-uitstoot te verlagen</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-gray-900">Compliance informatie</h4>
                <p className="text-gray-600 text-sm">Alles wat je nodig hebt voor rapportage en certificering</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}