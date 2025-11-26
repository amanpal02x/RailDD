import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const StaffApproval = () => {
  const { division } = useParams();
  const divisionName = division ? division.charAt(0).toUpperCase() + division.slice(1) : 'Division';

  const [requests] = useState([
    {
      id: 1,
      userName: 'vinay123',
      password: 'pass123',
      fullName: 'Vinay Kumar Mash',
      designation: 'SSE(TRD)',
      department: 'TRD',
      phone: '7540329'
    },
    {
      id: 2,
      userName: 'budh456',
      password: 'pass456',
      fullName: 'Budh Narayan',
      designation: 'SSE(TRD)',
      department: 'TRD',
      phone: '7570868'
    },
    {
      id: 3,
      userName: 'rakesh789',
      password: 'pass789',
      fullName: 'Rakesh Roshan',
      designation: 'SSE(TRD)',
      department: 'TRD',
      phone: '97540312'
    },
    {
      id: 4,
      userName: 'amit101',
      password: 'pass101',
      fullName: 'Amit Sharma',
      designation: 'SSE(Sig)',
      department: 'Sig',
      phone: '12345678'
    },
    {
      id: 5,
      userName: 'priya202',
      password: 'pass202',
      fullName: 'Priya Singh',
      designation: 'JEE(Tele)',
      department: 'Tele',
      phone: '87654321'
    },
    {
      id: 6,
      userName: 'rajesh303',
      password: 'pass303',
      fullName: 'Rajesh Kumar',
      designation: 'SSE(Elec)',
      department: 'Elec',
      phone: '11223344'
    },
    {
      id: 7,
      userName: 'sita404',
      password: 'pass404',
      fullName: 'Sita Devi',
      designation: 'SSE(Works)',
      department: 'Works',
      phone: '55667788'
    },
    {
      id: 8,
      userName: 'vikram505',
      password: 'pass505',
      fullName: 'Vikram Patel',
      designation: 'JEE(TRD)',
      department: 'TRD',
      phone: '99887766'
    },
    {
      id: 9,
      userName: 'neha606',
      password: 'pass606',
      fullName: 'Neha Gupta',
      designation: 'SSE(Tele)',
      department: 'Tele',
      phone: '44556677'
    },
    {
      id: 10,
      userName: 'karan707',
      password: 'pass707',
      fullName: 'Karan Yadav',
      designation: 'SSE(Sig)',
      department: 'Sig',
      phone: '33445566'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.phone.includes(searchTerm);
    const matchesDepartment = filterDepartment === 'all' || request.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(requests.map(r => r.department))];

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <Link
          to={`/${division}`}
          className="inline-block mb-6 md:mb-8 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm md:text-base"
        >
          ← Back to {divisionName} Division
        </Link>
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-railway-blue">
          Staff Approval - {divisionName} Division
        </h1>
        <div className="bg-white rounded-lg shadow-md p-4 md:p-8 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-6 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name, designation, username, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-railway-blue text-sm md:text-base flex-1"
            />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-railway-blue text-sm md:text-base"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="text-xs md:text-sm text-gray-600 mb-4">
            Showing {filteredRequests.length} of {requests.length} requests
          </div>
          {filteredRequests.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <p className="text-gray-600 text-base md:text-lg">No requests found matching your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">S.no</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">User Name</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">Password</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">Full Name</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">Designation</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">Department</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">Phone Number</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((request, index) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-2 md:px-4 py-2 md:py-3 text-sm text-gray-900 border border-gray-300">{index + 1}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-sm text-gray-900 border border-gray-300">{request.userName}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-sm text-gray-900 border border-gray-300">{request.password}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-sm text-gray-900 border border-gray-300">{request.fullName}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-sm text-gray-900 border border-gray-300">{request.designation}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-sm text-gray-900 border border-gray-300">{request.department}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-sm text-gray-900 border border-gray-300">{request.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffApproval;
