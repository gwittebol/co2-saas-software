import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', co2: 4.2, target: 4.0 },
  { month: 'Feb', co2: 3.8, target: 3.8 },
  { month: 'Mrt', co2: 4.1, target: 3.6 },
  { month: 'Apr', co2: 3.5, target: 3.4 },
  { month: 'Mei', co2: 3.2, target: 3.2 },
  { month: 'Jun', co2: 3.8, target: 3.0 },
];

export function CO2Chart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          CO2-uitstoot trend
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Werkelijk</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
            <span className="text-gray-600">Doel</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              label={{ value: 'ton CO2eq', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number, name: string) => [
                `${value} ton CO2eq`,
                name === 'co2' ? 'Werkelijk' : 'Doel'
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="co2" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#6b7280" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#6b7280', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}