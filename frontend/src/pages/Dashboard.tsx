import React, { useEffect, useState } from 'react';
import { Users, Activity, CreditCard, Loader2 } from 'lucide-react';

interface DashboardData {
  totalMembers: number;
  activeMembers: number;
  paidMembers: number;
  tradeEnrollments: Record<string, number>;
}

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // ඔයාගේ .env එකේ තියෙන නම හරියටම දාන්න
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        
        // Token එක ගන්නවා (ඔයාගේ AuthContext එකේ හෝ localStorage එකේ තියෙන නම බලන්න)
        const token = localStorage.getItem('token'); 
        
        const response = await fetch(`${baseUrl}/api/dashboard/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Trade එකේ නම ලස්සන කරන්න helper function එකක්
  const formatTradeName = (trade: string) => {
    return trade.split('_').map(word => 
      word.charAt(0) + word.slice(1).toLowerCase()
    ).join(' ');
  };

  // කලින් තිබ්බ වර්ණ (Colors) මැප් එක
  const tradeColors: Record<string, string> = {
    TOOL_MACHINE: 'border-indigo-500 text-indigo-600',
    MILLWRIGHT: 'border-amber-500 text-amber-600',
    AUTO_MOBILE: 'border-green-500 text-green-600',
    BBP: 'border-pink-500 text-pink-600',
    AUTO_ELECTRICAL: 'border-cyan-500 text-cyan-600',
    REF_AND_AC: 'border-blue-500 text-blue-600',
    MECHATRONIC: 'border-teal-500 text-teal-600',
    DISAL_PUMP: 'border-lime-500 text-lime-600',
    WELDING: 'border-red-500 text-red-600',
    POWER_ELECTRICAL: 'border-violet-500 text-violet-600',
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, here is the latest summary of the alumni network.</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        
        {/* Total Members Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Members</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{data?.totalMembers || 0}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">All registered alumni in the system</p>
        </div>

        {/* Active Members Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Members</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{data?.activeMembers || 0}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">Joined within the last 6 months</p>
        </div>

        {/* Paid Members Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Paid Members</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{data?.paidMembers || 0}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">Members with completed payments</p>
        </div>

      </div>
      
      {/* Trade Enrollments Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Trade Enrollments</h2>
        <p className="text-sm text-gray-500">Distribution of members across different technical trades.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {data && Object.entries(data.tradeEnrollments).map(([tradeKey, count]) => (
          <div 
            key={tradeKey} 
            className={`bg-white p-5 rounded-lg shadow-sm border border-gray-200 border-l-4 ${tradeColors[tradeKey]?.split(' ')[0] || 'border-gray-500'}`}
          >
            <h4 className="text-sm font-medium text-gray-600 truncate">
              {formatTradeName(tradeKey)}
            </h4>
            <p className={`text-2xl font-bold mt-1 ${tradeColors[tradeKey]?.split(' ')[1] || 'text-gray-900'}`}>
              {count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};