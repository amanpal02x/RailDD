import React from 'react';
import { Link, useParams } from 'react-router-dom';

const DivisionPage = () => {
  const { division } = useParams();

  return (
    <div className="min-h-screen relative bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: 'url("/image.png")' }}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-blue-800/10 to-blue-900/20"></div>
      <div className="relative z-10 w-full py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-white drop-shadow-2xl capitalize">{division} Division</h1>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link
              to={`/${division}/staff-approval`}
              className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-green-100 hover:border-green-200"
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">✅</span>
                <h2 className="text-2xl font-bold text-green-700 group-hover:text-green-800">Staff Approval</h2>
              </div>
              <p className="text-gray-600 text-lg mb-6">Approve and manage staff requests efficiently with our streamlined approval system.</p>
            </Link>
            <Link
              to={`/${division}/staff-requestor`}
              className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-yellow-100 hover:border-yellow-200"
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">📝</span>
                <h2 className="text-2xl font-bold text-yellow-700 group-hover:text-yellow-800">Staff Requestor</h2>
              </div>
              <p className="text-gray-600 text-lg mb-6">Submit and track staff requests seamlessly for your division.</p>
            </Link>
            <Link
              to={`/${division}/position`}
              className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-100 hover:border-blue-200"
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">👤</span>
                <h2 className="text-2xl font-bold text-blue-700 group-hover:text-blue-800">Position</h2>
              </div>
              <p className="text-gray-600 text-lg mb-6">View and manage position details for your division.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivisionPage;
