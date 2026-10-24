// import React, { useState } from 'react';
// import { MemberRegistrationForm } from '../components/MemberRegistrationForm';
// import { MemberTable } from '../components/MemberTable';


// export const Members: React.FC = () => {
//   const [showRegistrationForm, setShowRegistrationForm] = useState(false);
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   const handleRegistrationSuccess = () => {
//     setShowRegistrationForm(false);
//     setRefreshTrigger(prev => prev + 1); // Refresh the table
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Member Management</h1>
//           <p className="text-gray-600">Manage alumni members and their information</p>
//         </div>
//         <button
//           onClick={() => setShowRegistrationForm(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
//         >
//           <span>+</span>
//           <span>Register New Member</span>
//         </button>
//       </div>

//       {/* Registration Form Modal */}
//       {showRegistrationForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <MemberRegistrationForm
//               onSuccess={handleRegistrationSuccess}
//               onCancel={() => setShowRegistrationForm(false)}
//             />
//           </div>
//         </div>
//       )}

//       {/* Members Table */}
//       <div className="bg-white rounded-lg shadow-md">
//         <MemberTable refreshTrigger={refreshTrigger} />
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { MemberRegistrationForm } from '../components/MemberRegistrationForm';
import { MemberTable } from '../components/MemberTable';
import { Plus } from 'lucide-react'; // බටන් එකට ලස්සන අයිකන් එකක්

export const Members: React.FC = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRegistrationSuccess = () => {
    setShowRegistrationForm(false);
    setRefreshTrigger(prev => prev + 1); // Refresh the table
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
      
      {/* Header - දැන් මෙතන තියෙන්නේ Title එක විතරයි */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Member Management</h1>
        <p className="text-gray-600 text-sm mt-1">Manage alumni members and their information</p>
      </div>

      {/* Members Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        
        {/* බටන් එක දැම්මේ මෙතනට - Table එකට උඩින්, දකුණු පැත්තේ */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-gray-200 gap-4">
          <h2 className="text-lg font-semibold text-gray-800">All Members</h2>
          
          <button
            onClick={() => setShowRegistrationForm(true)}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Register New Member</span>
          </button>
        </div>

        {/* Table එක - Mobile වලදී scroll වෙන්න */}
        <div className="overflow-x-auto">
          <MemberTable refreshTrigger={refreshTrigger} />
        </div>
      </div>

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <MemberRegistrationForm
              onSuccess={handleRegistrationSuccess}
              onCancel={() => setShowRegistrationForm(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
};