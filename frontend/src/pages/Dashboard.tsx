
import React from 'react';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <h1 className="text-3xl font-extrabold text-indigo-700 mb-8 border-b pb-2">
        📊 Overview
      </h1>

      {/* Stats Grid - Fully Responsive */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Total Members Card (Retained) */}
        <div className="bg-white p-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl border-t-4 border-blue-500">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">Total Members</h3>
            <span className="text-2xl text-blue-500">👤</span>
          </div>
          <p className="mt-1 text-4xl font-extrabold text-blue-700">0</p>
          <p className="text-xs mt-2 text-gray-400">All registered users</p>
        </div>

        {/* Active Members Card (Retained) */}
        <div className="bg-white p-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl border-t-4 border-yellow-500">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">Active Members</h3>
            <span className="text-2xl text-yellow-500">🔥</span>
          </div>
          <p className="mt-1 text-4xl font-extrabold text-yellow-700">0</p>
          <p className="text-xs mt-2 text-gray-400">Recently active users</p>
        </div>


      </div>
      
      {/* Example of adding the remaining trades in a separate, responsive section */}
      <h2 className="text-2xl font-bold text-gray-700 mt-12 mb-6">⚙️ Trade Enrollments</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {[
          { key: 'TOOL_MACHINE', label: 'Tool & Machine', color: 'indigo' },
          {key: 'welding', label: 'Welding', color: 'red' },
          {key: 'mechatronic', label: 'Mechatronic', color: 'teal' },
          { key: 'MILLWRIGHT', label: 'Millwright', color: 'amber' },
          { key: 'AUTO_MOBILE', label: 'Automobile', color: 'green' },
          { key: 'BBP', label: 'BBP', color: 'pink' },
          { key: 'AUTO_ELECTRICAL', label: 'Auto Electrical', color: 'cyan' },
          { key: 'REF_AND_AC', label: 'Refrigeration & AC', color: 'blue' },
          { key: 'DISAL_PUMP', label: 'Disal Pump', color: 'lime' },
          { key: 'POWER_ELECTRICAL', label: 'Power Electrical', color: 'violet' },
        ].map((trade) => (
          <div key={trade.key} className={`bg-white p-4 rounded-lg shadow-md border-l-4 border-${trade.color}-500`}>
            <h4 className="text-md font-semibold text-gray-800">{trade.label}</h4>
            <p className={`text-2xl font-bold text-${trade.color}-600`}>0</p>
          </div>
        ))}
      </div>
    </div>
  );
};