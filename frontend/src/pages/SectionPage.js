import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const SectionPage = () => {
  const { division, section } = useParams();
  const divisionName = division ? division.charAt(0).toUpperCase() + division.slice(1) : 'Division';
  const sectionName = section ? section.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Section';

  const today = new Date().toISOString().split('T')[0];
  const [currentDate, setCurrentDate] = useState(today);
  const [data, setData] = useState(null);
  const [internetSpeedData, setInternetSpeedData] = useState([]);
  const [isEditing, setIsEditing] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState('default');
  const [previewTemplate, setPreviewTemplate] = useState(null);



  const rowLabels = [
    'ICMS & COM-POSITION',
    'Important Event',
    'FOIS-63, (VSAT-25',
    'Exchange',
    'GM-CRB Hot line',
    'Video conferencing eqpt With Div',
    'SECR Projectors',
    'Rly Board Video Phones (GM,CSTE,CEE)',
    'CCTV/BSP',
    'CFTM / CONFERENCE',
    'V-SAT / FOIS / PMS',
    'RAILNET / INTERNET',
    'CGDB',
    'CGDB/BRIN',
    'CGDB/RIG',
    'CGDB NIA',
    'CABLE FAILURE 06Qd/OFC',
    'Wi-Fi (82 Stns.)',
    'Google Wi-Fi / Total-3 (BSP, CPH, RIG)',
    'TATA Trust (78)',
    'UTS-81',
    'PRS: Rl-46, NNR-08+54, UTS CUM PRS-43',
    'Residence Railway DSLAM',
    'Bandwidth Utilization (As per Cacti Graph)',
    'IPDSLAM SECR HQ (300MBPS)',
    'IPDSLAM BSP DIVISION (155 MBPS)',
    'Railnet (700 MBPS MAX BANDWIDTH)',
    '697.67',
    '185.45',
    '124.13',
    'On date opening balance of defective sets at hand at Division (A)',
    'On date number of defective set received from user (B)',
    'On date closing balance of defective set at Hand at Division (C=A+B)',
    'On date number of defective set given to Firm for repair (D)',
    'On date number of repaired sets received (E)',
    'On date SAT sets for condemnation',
    'On date SAT Sets condemned',
    'How many Sets condemned in this financial year',
    'Remarks'
  ];



  const internetColumns = ['Testing Time', 'Dn Link speed', 'Up Link Speed', 'Google / Yahoo', 'secr.indianrailway.gov.in', 'Indianrail.gov.in', 'Different Web Site Response (Fast / Slow)', 'Remarks & Action Taken'];

  useEffect(() => {
    const key = `${division}_${section}_${currentDate}`;
    const savedData = localStorage.getItem(key);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setData(parsed.mainTable || Array(rowLabels.length).fill().map(() => Array(4).fill('')));
      setInternetSpeedData(parsed.internetTable || [Array(internetColumns.length).fill('')]);
    } else {
      // New date, initialize blank
      setData(Array(rowLabels.length).fill().map(() => Array(4).fill('')));
      setInternetSpeedData([Array(internetColumns.length).fill('')]);
    }
    setIsEditing(currentDate === today);
  }, [currentDate, division, section, today, rowLabels.length, internetColumns.length]);

  const saveData = () => {
    if (!isEditing) return;
    const key = `${division}_${section}_${currentDate}`;
    const toSave = {
      mainTable: data,
      internetTable: internetSpeedData
    };
    localStorage.setItem(key, JSON.stringify(toSave));
  };

  const handleMainCellChange = (rowIndex, colIndex, value) => {
    if (!isEditing) return;
    let processedValue = value;
    if (colIndex === 0 || colIndex === 1) {
      processedValue = parseDateTime(value);
    }
    const newData = [...data];
    newData[rowIndex][colIndex] = processedValue;
    setData(newData);
  };

  const handleInternetCellChange = (rowIndex, colIndex, value) => {
    if (!isEditing) return;
    const newData = [...internetSpeedData];
    newData[rowIndex][colIndex] = value;
    setInternetSpeedData(newData);
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const parseDateTime = (str) => {
    if (!str) return '';
    const match = str.match(/(\d{1,2})-(\d{1,2})-(\d{4}) (\d{1,2}):(\d{1,2})/);
    if (match) {
      const [, day, month, year, hours, minutes] = match;
      const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));
      if (!isNaN(date.getTime())) {
        return date.toISOString();
      }
    }
    return str;
  };

  const yesterday = new Date(currentDate);
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedYesterday = yesterday.toISOString().split('T')[0].split('-').reverse().join('/');

  if (section === 'position' && data !== null) {
    return (
      <div className="min-h-screen bg-white py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link
            to={`/${division}`}
            className="inline-block mb-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm md:text-base"
          >
            ← Back to {divisionName} Division
          </Link>
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <label className="text-sm md:text-base">Select Date:</label>
              <input
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm md:text-base"
              />
              {isEditing && (
                <button onClick={saveData} className="bg-railway-blue hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded-lg transition duration-300 text-sm md:text-base">
                  Save
                </button>
              )}
            </div>
            <button
              onClick={() => setShowTemplates(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-lg transition duration-300 text-sm md:text-base"
            >
              Templates
            </button>
            <button
              onClick={() => window.print()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-lg transition duration-300 text-sm md:text-base ml-2"
            >
              Print Data
            </button>
          </div>
          <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 md:p-6 mb-8 print-section">
            <h1 className="text-xl md:text-2xl font-bold text-center mb-4 text-gray-800">PCSTE/SECR POSITION</h1>
            <p className="text-center text-gray-600 text-sm md:text-base">Position as on: {formattedYesterday}</p>
          </div>
          {currentTemplate !== 'default' && (
            <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-800 text-sm md:text-base">Current Template: {currentTemplate}</span>
                <button
                  onClick={() => setCurrentTemplate('default')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs md:text-sm"
                >
                  Reset to Default
                </button>
              </div>
              <p className="text-blue-700 text-xs md:text-sm mt-1">The form layout has been updated to this template. Use the preview for print adjustments.</p>
            </div>
          )}
          <div className={`bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden mb-8 ${currentTemplate !== 'default' ? `template-applied template-${currentTemplate.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}` : ''}`}>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300 w-8 md:w-12">No.</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300 w-48 md:w-72">Name of the circuit</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300 w-32 md:w-40">TOTAL FAILURE Dt & Time</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300 w-32 md:w-40">RT At Dt & Time</th>
                    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300 w-20 md:w-24">RM Hrs.Min</th>
                    <th colSpan={2} className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300 w-64 md:w-128">Failure Remarks & Action taken</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rowLabels.map((label, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-sm text-gray-900 border border-gray-300 font-bold w-8 md:w-12">{rowIndex + 1}</td>
                      <td className="px-2 md:px-4 py-2 md:py-3 text-sm border border-gray-300 w-48 md:w-72">
                        <input
                          type="text"
                          value={label}
                          readOnly
                          className="w-full bg-transparent border-none focus:outline-none text-xs md:text-sm"
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border border-gray-300 w-32 md:w-40">
                        <input
                          type="datetime-local"
                          value={data[rowIndex][0]}
                          onChange={(e) => handleMainCellChange(rowIndex, 0, e.target.value)}
                          readOnly={!isEditing}
                          className={`w-full px-1 md:px-2 py-1 md:py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-railway-blue text-xs md:text-sm ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border border-gray-300 w-32 md:w-40">
                        <input
                          type="datetime-local"
                          value={data[rowIndex][1]}
                          onChange={(e) => handleMainCellChange(rowIndex, 1, e.target.value)}
                          readOnly={!isEditing}
                          className={`w-full px-1 md:px-2 py-1 md:py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-railway-blue text-xs md:text-sm ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        />
                      </td>
                      <td className="px-2 md:px-4 py-2 md:py-3 border border-gray-300 w-20 md:w-24">
                        <input
                          type="text"
                          value={data[rowIndex][2]}
                          onChange={(e) => handleMainCellChange(rowIndex, 2, e.target.value)}
                          readOnly={!isEditing}
                          className={`w-full px-1 md:px-2 py-1 md:py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-railway-blue text-xs md:text-sm ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        />
                      </td>
                      <td colSpan={2} className="px-2 md:px-4 py-2 md:py-3 border border-gray-300 w-64 md:w-128">
                        <input
                          type="text"
                          value={data[rowIndex][3]}
                          onChange={(e) => handleMainCellChange(rowIndex, 3, e.target.value)}
                          readOnly={!isEditing}
                          className={`w-full px-1 md:px-2 py-1 md:py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-railway-blue text-xs md:text-sm ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden print-section">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    {internetColumns.map((col, index) => (
                      <th key={index} className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {internetSpeedData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td key={colIndex} className="px-2 md:px-4 py-2 md:py-3 border border-gray-300">
                          <input
                            type="text"
                            value={cell}
                            onChange={(e) => handleInternetCellChange(rowIndex, colIndex, e.target.value)}
                            readOnly={!isEditing}
                            className={`w-full px-1 md:px-2 py-1 md:py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-railway-blue text-xs md:text-sm ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {showTemplates && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-md max-w-4xl max-h-[80vh] overflow-y-auto w-full">
              <div className="p-4 md:p-6 border-b">
                <h2 className="text-lg md:text-xl font-bold mb-2">Select Template</h2>
                <button
                  onClick={() => setShowTemplates(false)}
                  className="float-right text-gray-500 hover:text-gray-700 text-lg md:text-xl"
                >
                  ×
                </button>
              </div>
              <div className="p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { id: 1, name: 'Portrait - Full Table', orientation: 'Portrait' },
                    { id: 2, name: 'Portrait - Condensed', orientation: 'Portrait' },
                    { id: 3, name: 'Portrait - Summary View', orientation: 'Portrait' },
                    { id: 4, name: 'Landscape - Wide Table', orientation: 'Landscape' },
                    { id: 5, name: 'Landscape - Detailed', orientation: 'Landscape' },
                    { id: 6, name: 'Landscape - Report Format', orientation: 'Landscape' }
                  ].map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        setPreviewTemplate(template);
                        setShowTemplates(false);
                      }}
                      className="p-3 md:p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300 text-left"
                    >
                      <h3 className="font-semibold text-gray-800 text-sm md:text-base">{template.name}</h3>
                      <p className="text-xs md:text-sm text-gray-600 mt-1">Orientation: {template.orientation}</p>
                      <p className="text-xs text-gray-500 mt-2">Click to preview the template with current data.</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {previewTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-md max-w-6xl max-h-[90vh] overflow-y-auto w-full">
              <div className="p-4 md:p-6 border-b flex justify-between items-center">
                <h2 className="text-lg md:text-xl font-bold">Preview: {previewTemplate.name} ({previewTemplate.orientation})</h2>
                <div>
                  <button
                    onClick={() => {
                      setCurrentTemplate(previewTemplate.name);
                      setPreviewTemplate(null);
                    }}
                    className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm md:text-base"
                  >
                    Apply to Form
                  </button>
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm md:text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <div className={`template-preview ${previewTemplate.orientation.toLowerCase()}-orientation p-4`}>
                  <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 md:p-6 mb-8 print-only">
                    <h1 className="text-xl md:text-2xl font-bold text-center mb-4 text-gray-800">PCSTE/SECR POSITION</h1>
                    <p className="text-center text-gray-600 text-sm md:text-base">Position as on: {formattedYesterday}</p>
                  </div>
                  <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden mb-8 print-only">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300 w-8 md:w-12">No.</th>
                            <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300 w-48 md:w-72">Name of the circuit</th>
                            <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300 w-32 md:w-40">TOTAL FAILURE Dt & Time</th>
                            <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300 w-32 md:w-40">RT At Dt & Time</th>
                            <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300 w-20 md:w-24">RM Hrs.Min</th>
                            <th colSpan={2} className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300 w-64 md:w-128">Failure Remarks & Action taken</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {rowLabels.slice(0, 10).map((label, rowIndex) => (  // Show first 10 for preview brevity
                            <tr key={rowIndex}>
                              <td className="px-2 md:px-4 py-2 md:py-3 text-sm text-gray-900 border border-gray-300 font-bold w-8 md:w-12">{rowIndex + 1}</td>
                              <td className="px-2 md:px-4 py-2 md:py-3 text-sm border border-gray-300 w-48 md:w-72">
                                <span className="w-full bg-transparent text-xs md:text-sm">{label}</span>
                              </td>
                              <td className="px-2 md:px-4 py-2 md:py-3 border border-gray-300 w-32 md:w-40">
                                <span className="text-xs md:text-sm">{formatDateTime(data ? data[rowIndex] ? data[rowIndex][0] : '' : '')}</span>
                              </td>
                              <td className="px-2 md:px-4 py-2 md:py-3 border border-gray-300 w-32 md:w-40">
                                <span className="text-xs md:text-sm">{formatDateTime(data ? data[rowIndex] ? data[rowIndex][1] : '' : '')}</span>
                              </td>
                              <td className="px-2 md:px-4 py-2 md:py-3 border border-gray-300 w-20 md:w-24">
                                <span className="text-xs md:text-sm">{data ? data[rowIndex] ? data[rowIndex][2] : '' : ''}</span>
                              </td>
                              <td colSpan={2} className="px-2 md:px-4 py-2 md:py-3 border border-gray-300 w-64 md:w-128">
                                <span className="text-xs md:text-sm">{data ? data[rowIndex] ? data[rowIndex][3] : '' : ''}</span>
                              </td>
                            </tr>
                          ))}
                          {rowLabels.length > 10 && (
                            <tr>
                              <td colSpan={6} className="px-2 md:px-4 py-2 md:py-3 text-center text-gray-500 border border-gray-300 text-xs md:text-sm">
                                ... and {rowLabels.length - 10} more rows (full data shown in applied form/print)
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* Simplified internet table for preview */}
                  <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden print-only">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            {internetColumns.slice(0, 4).map((col, index) => (  // Show first 4 columns for brevity
                              <th key={index} className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300">
                                {col}
                              </th>
                            ))}
                            <th colSpan={internetColumns.length - 4} className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border border-gray-300 text-center">
                              ... more columns
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {internetSpeedData.slice(0, 3).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.slice(0, 4).map((cell, colIndex) => (
                                <td key={colIndex} className="px-2 md:px-4 py-2 md:py-3 border border-gray-300">
                                  <span className="text-xs md:text-sm">{cell}</span>
                                </td>
                              ))}
                              <td colSpan={internetColumns.length - 4} className="px-2 md:px-4 py-2 md:py-3 border border-gray-300 text-center text-gray-500 text-xs md:text-sm">
                                ...
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <button
                      onClick={() => window.print()}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 text-sm md:text-base"
                    >
                      Print Preview
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 mt-4 text-center italic">
                    This is a preview of the {previewTemplate.name} template. Apply to change the main form layout. For Landscape, set print orientation to landscape in browser settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Placeholder for other sections
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <Link
          to={`/${division}`}
          className="inline-block mb-6 md:mb-8 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm md:text-base"
        >
          ← Back to {divisionName} Division
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-railway-blue">
          {divisionName} Division - {sectionName}
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-4xl mx-auto">
          <p className="text-base md:text-lg text-gray-700 mb-6">
            Welcome to the {sectionName} section of {divisionName} Division. This is a placeholder page for managing {sectionName.toLowerCase()}.
          </p>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-railway-blue mb-2 text-sm md:text-base">Features</h3>
              <ul className="text-gray-600 space-y-1 text-sm md:text-base">
                <li>• View and edit details</li>
                <li>• Submit requests</li>
                <li>• Track approvals</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-600 mb-2 text-sm md:text-base">Status</h3>
              <p className="text-gray-600 text-sm md:text-base">Ready for operations. Connect to backend for full functionality.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionPage;
