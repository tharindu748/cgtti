// import React from 'react';

// export const Dashboard: React.FC = () => {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold text-gray-800">Total Members</h3>
//           <p className="text-3xl font-bold text-blue-600">0</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold text-gray-800">Paid Members</h3>
//           <p className="text-3xl font-bold text-green-600">0</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold text-gray-800">Active Members</h3>
//           <p className="text-3xl font-bold text-green-600">0</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold text-gray-800">Letters Sent</h3>
//           <p className="text-3xl font-bold text-purple-600">0</p>
//         </div>
//       </div>
//     </div>
//   );
// };
import React from 'react';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <h1 className="text-3xl font-extrabold text-indigo-700 mb-8 border-b pb-2">
        📊 Dashboard Overview
      </h1>

      {/* Stats Grid - Fully Responsive */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Total Members Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl border-t-4 border-blue-500">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">Total Members</h3>
            <span className="text-2xl text-blue-500">👤</span> {/* Icon Placeholder */}
          </div>
          <p className="mt-1 text-4xl font-extrabold text-blue-700">0</p>
          <p className="text-xs mt-2 text-gray-400">All registered users</p>
        </div>

        {/* Paid Members Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl border-t-4 border-green-500">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">Paid Members</h3>
            <span className="text-2xl text-green-500">✅</span> {/* Icon Placeholder */}
          </div>
          <p className="mt-1 text-4xl font-extrabold text-green-700">0</p>
          <p className="text-xs mt-2 text-gray-400">Current financial supporters</p>
        </div>

        {/* Active Members Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl border-t-4 border-yellow-500">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">Active Members</h3>
            <span className="text-2xl text-yellow-500">🔥</span> {/* Icon Placeholder */}
          </div>
          <p className="mt-1 text-4xl font-extrabold text-yellow-700">0</p>
          <p className="text-xs mt-2 text-gray-400">Logged in this month</p>
        </div>

        {/* Letters Sent Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl border-t-4 border-purple-500">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">Letters Sent</h3>
            <span className="text-2xl text-purple-500">✉️</span> {/* Icon Placeholder */}
          </div>
          <p className="mt-1 text-4xl font-extrabold text-purple-700">0</p>
          <p className="text-xs mt-2 text-gray-400">Total outreach communications</p>
        </div>
      </div>
    </div>
  );
};