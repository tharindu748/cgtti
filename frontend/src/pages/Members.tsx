// import React, { useState } from 'react';
// import { MemberRegistrationForm } from '@components/MemberRegistrationForm';
// import { MemberTable } from '@components/MemberTable';
// import { Member } from '@types';

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
import { Sidebar } from '../components/Sidebar';

export const Members: React.FC = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRegistrationSuccess = () => {
    setShowRegistrationForm(false);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Member Management</h1>
                <p className="text-gray-600">Manage alumni members and their information</p>
              </div>
              <button
                onClick={() => setShowRegistrationForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>+</span>
                <span>Register New Member</span>
              </button>
            </div>

            {/* Registration Form Modal */}
            {showRegistrationForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <MemberRegistrationForm
                    onSuccess={handleRegistrationSuccess}
                    onCancel={() => setShowRegistrationForm(false)}
                  />
                </div>
              </div>
            )}

            {/* Members Table */}
            <div className="bg-white rounded-lg shadow-md">
              <MemberTable refreshTrigger={refreshTrigger} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};