import React, { useState } from 'react';
import { Stethoscope, UserRound, Calendar, LogIn } from 'lucide-react';
import Authentication from './components/Authentication';
import PatientManagement from './components/PatientManagement';
import DoctorManagement from './components/DoctorManagement';
import AppointmentManagement from './components/AppointmentManagement';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState<'patients' | 'doctors' | 'appointments'>('patients');

  if (!isAuthenticated) {
    return <Authentication onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Hospital Management System</h1>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveSection('patients')}
              className={`flex items-center px-3 py-4 text-sm font-medium ${
                activeSection === 'patients'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <UserRound className="h-4 w-4 mr-2" />
              Patient Management
            </button>
            <button
              onClick={() => setActiveSection('doctors')}
              className={`flex items-center px-3 py-4 text-sm font-medium ${
                activeSection === 'doctors'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Stethoscope className="h-4 w-4 mr-2" />
              Doctor Management
            </button>
            <button
              onClick={() => setActiveSection('appointments')}
              className={`flex items-center px-3 py-4 text-sm font-medium ${
                activeSection === 'appointments'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Appointment Management
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'patients' && <PatientManagement />}
        {activeSection === 'doctors' && <DoctorManagement />}
        {activeSection === 'appointments' && <AppointmentManagement />}
      </main>
    </div>
  );
}

export default App;