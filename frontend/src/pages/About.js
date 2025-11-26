import React, { useState } from 'react';

const About = () => {
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedApproval, setSelectedApproval] = useState('');
  const [selectedPrerequisite, setSelectedPrerequisite] = useState('');

  const divisions = [
    { value: '', label: 'Select Division' },
    { value: 'SECR', label: 'South East Central Railway (SECR)' },
    { value: 'CR', label: 'Central Railway' },
    { value: 'WR', label: 'Western Railway' },
    { value: 'NR', label: 'Northern Railway' }
  ];

  const approvals = [
    { value: '', label: 'Select Approval Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const prerequisites = [
    { value: '', label: 'Select Prerequisite' },
    { value: 'training', label: 'Training Required' },
    { value: 'documents', label: 'Documents Pending' },
    { value: 'cleared', label: 'Cleared' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDivision && selectedApproval && selectedPrerequisite) {
      console.log('Form Data:', { selectedDivision, selectedApproval, selectedPrerequisite });
      alert(`Selected: Division - ${selectedDivision}, Approval - ${selectedApproval}, Prerequisite - ${selectedPrerequisite}`);
    } else {
      alert('Please fill all fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-railway-blue">PCSTE/SECR</h1>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="division" className="block text-sm font-semibold text-gray-700 mb-2">
                Select Division
              </label>
              <select
                id="division"
                value={selectedDivision}
                onChange={(e) => {
                  setSelectedDivision(e.target.value);
                  setSelectedApproval('');
                  setSelectedPrerequisite('');
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-railway-blue focus:border-transparent transition"
                required
              >
                {divisions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {selectedDivision && (
              <div>
                <label htmlFor="approval" className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Approval
                </label>
                <select
                  id="approval"
                  value={selectedApproval}
                  onChange={(e) => {
                    setSelectedApproval(e.target.value);
                    setSelectedPrerequisite('');
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-railway-blue focus:border-transparent transition"
                  required
                >
                  {approvals.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedApproval && (
              <div>
                <label htmlFor="prerequisite" className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Prerequisite
                </label>
                <select
                  id="prerequisite"
                  value={selectedPrerequisite}
                  onChange={(e) => setSelectedPrerequisite(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-railway-blue focus:border-transparent transition"
                  required
                >
                  {prerequisites.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedDivision && selectedApproval && selectedPrerequisite && (
              <button
                type="submit"
                className="w-full bg-railway-red hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md"
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default About;

