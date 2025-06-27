import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { DataEntry } from './pages/DataEntry';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard/*" element={
              <>
                <Navbar />
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="invoer" element={<DataEntry />} />
                  <Route path="rapporten" element={<Reports />} />
                  <Route path="instellingen" element={<Settings />} />
                </Routes>
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;