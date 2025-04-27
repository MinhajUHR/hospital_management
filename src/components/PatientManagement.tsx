import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, X } from 'lucide-react';

interface Patient {
  id: number;
  name: string;
  ageYears: number;
  ageMonths: number;
  gender: string;
  disease: string;
}

export default function PatientManagement() {
  const [patients, setPatients] = useState<Patient[]>(() => {
    const savedPatients = localStorage.getItem('patients');
    return savedPatients ? JSON.parse(savedPatients) : [];
  });
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    id: patients.length + 1,
    name: '',
    ageYears: 0,
    ageMonths: 0,
    gender: '',
    disease: ''
  });

  // Save patients to localStorage whenever the patients array changes
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const addPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPatient.name && newPatient.gender) {
      const updatedPatients = [...patients, newPatient as Patient];
      setPatients(updatedPatients);
      setShowAddModal(false);
      setNewPatient({
        id: updatedPatients.length + 1,
        name: '',
        ageYears: 0,
        ageMonths: 0,
        gender: '',
        disease: ''
      });
    }
  };

  const deletePatient = (id: number) => {
    const updatedPatients = patients.filter(patient => patient.id !== id);
    setPatients(updatedPatients);
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Patient Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage patient records including personal information and medical conditions.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </button>
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Patient</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={addPatient} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age (Years)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={newPatient.ageYears}
                    onChange={(e) => setNewPatient({ ...newPatient, ageYears: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age (Months)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="12"
                    value={newPatient.ageMonths}
                    onChange={(e) => setNewPatient({ ...newPatient, ageMonths: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  required
                  value={newPatient.gender}
                  onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Disease/Condition</label>
                <input
                  type="text"
                  required
                  value={newPatient.disease}
                  onChange={(e) => setNewPatient({ ...newPatient, disease: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Patient List */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">ID</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Age</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Gender</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Disease</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{patient.id}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{patient.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {patient.ageYears}y {patient.ageMonths}m
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{patient.gender}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{patient.disease}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          onClick={() => {/* Handle edit */}}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => deletePatient(patient.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}