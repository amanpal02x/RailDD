import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Position = () => {
  const { division } = useParams();
  const divisionName = division ? division.charAt(0).toUpperCase() + division.slice(1) : 'Division';

  const [positions] = useState([
    {
      id: 1,
      designation: 'SSE(TRD)',
      department: 'TRD',
      assignedStaff: 'Vinay Kumar Mash',
      status: 'Filled'
    },
    {
      id: 2,
      designation: 'SSE(TRD)',
      department: 'TRD',
      assignedStaff: 'Budh Narayan',
      status: 'Filled'
    },
    {
      id: 3,
      designation: 'SSE(TRD)',
      department: 'TRD',
      assignedStaff: 'Rakesh Roshan',
      status: 'Filled'
    },
    {
      id: 4,
      designation: 'SSE(Sig)',
      department: 'Sig',
      assignedStaff: 'Amit Sharma',
      status: 'Filled'
    },
    {
      id: 5,
      designation: 'JEE(Tele)',
      department: 'Tele',
      assignedStaff: 'Priya Singh',
      status: 'Filled'
    },
    {
      id: 6,
      designation: 'SSE(Elec)',
      department: 'Elec',
      assignedStaff: 'Rajesh Kumar',
      status: 'Filled'
    },
    {
      id: 7,
      designation: 'SSE(Works)',
      department: 'Works',
      assignedStaff: 'Sita Devi',
      status: 'Filled'
    },
    {
      id: 8,
      designation: 'JEE(TRD)',
      department: 'TRD',
      assignedStaff: 'Vikram Patel',
      status: 'Filled'
    },
    {
      id: 9,
      designation: 'SSE(Tele)',
      department: 'Tele',
      assignedStaff: 'Neha Gupta',
      status: 'Filled'
    },
    {
      id: 10,
      designation: 'SSE(Sig)',
      department: 'Sig',
      assignedStaff: 'Karan Yadav',
      status: 'Filled'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const filteredPositions = positions.filter(position => {
    const matchesSearch = position.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          position.assignedStaff.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          position.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || position.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = [...new Set(positions.map(p => p.department))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <Link
          to={`/${division}`}
          className="inline-block mb-6 md:mb-8 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm md:text-base"
        >
          ← Back to {divisionName} Division
        </Link>
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-railway-blue">
          Positions - {divisionName} Division
        </h1>
        <div className="bg-white rounded-lg shadow-md p-4 md:p-8 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-6 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by designation, staff name, or department..."
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
            Showing {filteredPositions.length} of {positions.length} positions
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Staff</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPositions.map((position) => (
                  <tr key={position.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{position.designation}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{position.department}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{position.assignedStaff}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        position.status === 'Filled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {position.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Position;
