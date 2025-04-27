import React, { useState, useEffect } from 'react';
import { Plus, Search, Calendar, X, MessageSquare, Receipt } from 'lucide-react';

interface Appointment {
  patientId: number;
  doctorId: number;
  date: string;
  feedback: string;
  rating: number;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  visitFee: number;
}

interface Patient {
  id: number;
  name: string;
}

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const savedAppointments = localStorage.getItem('appointments');
    return savedAppointments ? JSON.parse(savedAppointments) : [];
  });
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentBill, setCurrentBill] = useState<{
    doctorName: string;
    patientName: string;
    visitFee: number;
    date: string;
  } | null>(null);
  
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    patientId: 0,
    doctorId: 0,
    date: '',
    feedback: '',
    rating: 0
  });

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const generateBill = (appointment: Appointment) => {
    const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    const patients = JSON.parse(localStorage.getItem('patients') || '[]');
    
    const doctor = doctors.find((d: Doctor) => d.id === appointment.doctorId);
    const patient = patients.find((p: Patient) => p.id === appointment.patientId);
    
    if (doctor && patient) {
      setCurrentBill({
        doctorName: doctor.name,
        patientName: patient.name,
        visitFee: doctor.visitFee,
        date: appointment.date
      });
      setShowBillModal(true);
    }
  };

  const addAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAppointment.patientId && newAppointment.doctorId && newAppointment.date) {
      const appointment = newAppointment as Appointment;
      const updatedAppointments = [...appointments, appointment];
      setAppointments(updatedAppointments);
      setShowAddModal(false);
      generateBill(appointment);
      setNewAppointment({
        patientId: 0,
        doctorId: 0,
        date: '',
        feedback: '',
        rating: 0
      });
    }
  };

  const cancelAppointment = (patientId: number, doctorId: number) => {
    const updatedAppointments = appointments.filter(
      app => !(app.patientId === patientId && app.doctorId === doctorId)
    );
    setAppointments(updatedAppointments);
  };

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patientId.toString().includes(searchTerm) ||
    appointment.doctorId.toString().includes(searchTerm)
  );

  return (
    <div className="relative">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Appointment Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Schedule and manage patient appointments with doctors.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Book Appointment
          </button>
        </div>
      </div>

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Book New Appointment</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={addAppointment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient ID</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={newAppointment.patientId}
                  onChange={(e) => setNewAppointment({ ...newAppointment, patientId: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Doctor ID</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={newAppointment.doctorId}
                  onChange={(e) => setNewAppointment({ ...newAppointment, doctorId: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
                <input
                  type="datetime-local"
                  required
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
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
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bill Modal */}
      {showBillModal && currentBill && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Receipt className="h-6 w-6 mr-2 text-blue-600" />
                Appointment Bill
              </h2>
              <button onClick={() => setShowBillModal(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-t border-gray-200 pt-4">
                <dl className="divide-y divide-gray-200">
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Patient Name</dt>
                    <dd className="text-sm text-gray-900">{currentBill.patientName}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Doctor Name</dt>
                    <dd className="text-sm text-gray-900">{currentBill.doctorName}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Appointment Date</dt>
                    <dd className="text-sm text-gray-900">
                      {new Date(currentBill.date).toLocaleString()}
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Consultation Fee</dt>
                    <dd className="text-sm text-gray-900">${currentBill.visitFee.toFixed(2)}</dd>
                  </div>
                  <div className="py-3 flex justify-between font-bold">
                    <dt className="text-sm text-gray-900">Total Amount</dt>
                    <dd className="text-sm text-gray-900">${currentBill.visitFee.toFixed(2)}</dd>
                  </div>
                </dl>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => setShowBillModal(false)}
                  className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </div>
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
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Appointment List */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Patient ID</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Doctor ID</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Feedback</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rating</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredAppointments.map((appointment, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {appointment.patientId}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {appointment.doctorId}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(appointment.date).toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {appointment.feedback || 'No feedback'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {appointment.rating || 'Not rated'}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          onClick={() => generateBill(appointment)}
                        >
                          <Receipt className="h-4 w-4" />
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          onClick={() => {/* Handle feedback */}}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => cancelAppointment(appointment.patientId, appointment.doctorId)}
                        >
                          <X className="h-4 w-4" />
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