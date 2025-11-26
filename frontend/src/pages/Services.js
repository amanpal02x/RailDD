import React from 'react';

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-railway-red">Services - SECR</h1>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The South East Central Railway (SECR) is one of the 18 railway zones in India, headquartered in Bilaspur, Chhattisgarh. SECR plays a vital role in connecting central India with the rest of the country, facilitating freight and passenger transport across key routes.
          </p>
          <h2 className="text-2xl font-semibold mb-4 text-railway-red">Key Services</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-6">
            <li>Freight Transportation: Efficient handling of coal, iron ore, and other commodities from mining regions.</li>
            <li>Passenger Services: High-speed trains, express services, and local connectivity for millions of travelers.</li>
            <li>Infrastructure Development: Ongoing projects for track electrification, station modernization, and safety enhancements.</li>
            <li>Logistics Solutions: Dedicated freight corridors and integrated logistics parks.</li>
          </ul>
          <h2 className="text-2xl font-semibold mb-4 text-railway-red">Our Commitment</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            SECR is committed to sustainable rail transport, reducing carbon emissions, and improving service reliability through technology and skilled workforce training.
          </p>
          <div className="text-center">
            <a href="/" className="bg-railway-blue hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition mr-4">
              Back to Home
            </a>
            <a href="/about" className="border border-railway-blue hover:bg-railway-blue text-railway-blue hover:text-white px-6 py-3 rounded-lg font-semibold transition">
              About PCSTE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
