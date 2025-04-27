import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Star, X } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  availableDays: string;
  contactNumber: string;
  visitFee: number;
  availableTime: string;
  totalRating: number;
  ratingCount: number;
}

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const savedDoctors = localStorage.getItem('doctors');
    return savedDoctors ? JSON.parse(savedDoctors) : [];
  });
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newDoctor, setNewDoctor] = useState<Partial<Doctor>>({
    id: doctors.length + 1,
    name: '',
    specialty: '',
    availableDays: '',
    contactNumber: '',
    visitFee: 0,
    availableTime: '',
    totalRating: 0,
    ratingCount: 0
  });

  // Save doctors to localStorage whenever the doctors array changes
  useEffect(() => {
    localStorage.setItem('doctors', JSON.stringify(doctors));
  }, [doctors]);

  const addDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDoctor.name && newDoctor.specialty) {
      const updatedDoctors = [...doctors, newDoctor as Doctor];
      setDoctors(updatedDoctors);
      setShowAddModal(false);
      setNewDoctor({
        id: updatedDoctors.length + 1,
        name: '',
        specialty: '',
        availableDays: '',
        contactNumber: '',
        visitFee: 0,
        availableTime: '',
        totalRating: 0,
        ratingCount: 0
      });
    }
  };

  const deleteDoctor = (id: number) => {
    const updatedDoctors = doctors.filter(doctor => doctor.id !== id);
    setDoctors(updatedDoctors);
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Doctor Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage doctor profiles, specialties, and availability.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Doctor
          </button>
        </div>
      </div>

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Doctor</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={addDoctor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  value={newDoctor.name}
                  onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Specialty</label>
                <input
                  type="text"
                  required
                  value={newDoctor.specialty}
                  onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Available Days</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Mon-Fri"
                  value={newDoctor.availableDays}
                  onChange={(e) => setNewDoctor({ ...newDoctor, availableDays: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  type="tel"
                  required
                  value={newDoctor.contactNumber}
                  onChange={(e) => setNewDoctor({ ...newDoctor, contactNumber: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Visit Fee</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={newDoctor.visitFee}
                  onChange={(e) => setNewDoctor({ ...newDoctor, visitFee: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Available Time</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                  value={newDoctor.availableTime}
                  onChange={(e) => setNewDoctor({ ...newDoctor, availableTime: e.target.value })}
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
                  Add Doctor
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
            placeholder="Search doctors by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Doctor List */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">ID</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Specialty</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Available</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fee</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rating</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredDoctors.map((doctor) => (
                    <tr key={doctor.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{doctor.id}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{doctor.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{doctor.specialty}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {doctor.availableDays} ({doctor.availableTime})
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ${doctor.visitFee}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {doctor.ratingCount > 0
                            ? (doctor.totalRating / doctor.ratingCount).toFixed(1)
                            : 'N/A'}
                        </div>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          onClick={() => {/* Handle edit */}}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => deleteDoctor(doctor.id)}
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