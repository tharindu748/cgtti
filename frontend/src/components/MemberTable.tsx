import React, { useState, useEffect } from 'react';
import { Member, Trade, District, LivingStatus, PaymentStatus, FilterOptions, PaginationOptions } from '@types';
import { membersAPI } from '@api/members';
import { useAuth } from '@context/AuthContext';
// Add this import at the top of MemberTable.tsx
import { LetterComposer } from './LetterComposer';

interface MemberTableProps {
  refreshTrigger: number;
}

const tradeLabels: Record<Trade, string> = {
  TOOL_MACHINE: 'Tool Machine',
  MILLWRIGHT: 'Millwright',
  AUTO_MOBILE: 'Auto Mobile',
  BBP: 'BBP',
  AUTO_ELECTRICAL: 'Auto Electrical',
  REF_AND_AC: 'Ref and AC',
  MECHATRONIC: 'Mechatronic',
  DISAL_PUMP: 'Disal Pump',
  WELDING: 'Welding',
  POWER_ELECTRICAL: 'Power Electrical',
};

const districtOptions: District[] = [
  // Western Province
  'Colombo', 'Gampaha', 'Kalutara',
  // Central Province
  'Kandy', 'Matale', 'Nuwara Eliya',
  // Southern Province
  'Galle', 'Matara', 'Hambantota',
  // Northern Province
  'Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu',
  // Eastern Province
  'Trincomalee', 'Batticaloa', 'Ampara',
  // North Western Province
  'Kurunegala', 'Puttalam',
  // North Central Province
  'Anuradhapura', 'Polonnaruwa',
  // Uva Province
  'Badulla', 'Monaragala',
  // Sabaragamuwa Province
  'Ratnapura', 'Kegalle'
];

const rowLimitOptions = [10, 25, 50, 100];

export const MemberTable: React.FC<MemberTableProps> = ({ refreshTrigger }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  // const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
const [showLetterComposer, setShowLetterComposer] = useState(false);

  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    trade: '',
    district: '',
    membershipYear: '',
    livingStatus: '',
    paymentStatus: '',
    isVerified: ''
  });
  const [pagination, setPagination] = useState<PaginationOptions>({
    page: 1,
    limit: 10,
    total: 0
  });
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    nonVerified: 0,
    alive: 0,
    deceased: 0,
    paid: 0,
    nonPaid: 0
  });

  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    loadMembers();
  }, [refreshTrigger, pagination.page, pagination.limit]);

  const loadMembers = async () => {
    setLoading(true);
    try {
      const data = await membersAPI.getAll({
        ...filters,
        page: pagination.page,
        limit: pagination.limit
      });
      setMembers(data.members);
      setPagination(prev => ({ ...prev, total: data.total }));
      calculateStats(data.members);
    } catch (error) {
      console.error('Failed to load members:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const calculateStats = (membersList: Member[]) => {
    const stats = {
      total: membersList.length,
      verified: membersList.filter(m => m.isVerified).length,
      nonVerified: membersList.filter(m => !m.isVerified).length,
      alive: membersList.filter(m => m.livingStatus === 'ALIVE').length,
      deceased: membersList.filter(m => m.livingStatus === 'DECEASED').length,
      paid: membersList.filter(m => m.paymentStatus === 'PAID').length,
      nonPaid: membersList.filter(m => m.paymentStatus === 'NON_PAID').length
    };
    setStats(stats);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    setSelectedMembers([]);
    loadMembers();
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      trade: '',
      district: '',
      membershipYear: '',
      livingStatus: '',
      paymentStatus: '',
      isVerified: ''
    });
    setPagination(prev => ({ ...prev, page: 1 }));
    setSelectedMembers([]);
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    setSelectedMembers([]);
  };

  const handleLimitChange = (newLimit: number) => {
    setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }));
    setSelectedMembers([]);
  };

  const toggleVerification = async (memberId: string, currentStatus: boolean) => {
    if (!isAdmin) {
      alert('Only administrators can verify members.');
      return;
    }

    try {
      await membersAPI.update(memberId, { isVerified: !currentStatus });
      loadMembers();
    } catch (error) {
      console.error('Failed to update verification:', error);
      alert('Failed to update verification status.');
    }
  };

  const bulkVerify = async (memberIds: string[]) => {
    if (!isAdmin) {
      alert('Only administrators can verify members.');
      return;
    }

    try {
      const promises = memberIds.map(id => 
        membersAPI.update(id, { isVerified: true })
      );
      await Promise.all(promises);
      loadMembers();
      setSelectedMembers([]);
    } catch (error) {
      console.error('Failed to bulk verify members:', error);
      alert('Failed to verify members.');
    }
  };

  // const toggleMemberSelection = (memberId: string) => {
  //   setSelectedMembers(prev =>
  //     prev.includes(memberId)
  //       ? prev.filter(id => id !== memberId)
  //       : [...prev, memberId]
  //   );
  // };

  const toggleMemberSelection = (member: Member) => {
  setSelectedMembers(prev =>
    prev.find(m => m.id === member.id)
      ? prev.filter(m => m.id !== member.id)
      : [...prev, member]
  );
};
const toggleSelectAll = () => {
  if (selectedMembers.length === members.length) {
    setSelectedMembers([]);
  } else {
    setSelectedMembers([...members]);
  }
};


  // const toggleSelectAll = () => {
  //   if (selectedMembers.length === members.length) {
  //     setSelectedMembers([]);
  //   } else {
  //     setSelectedMembers(members.map(m => m.id));
  //   }
  // };

  const verifySelectedMembers = () => {
    if (selectedMembers.length === 0) {
      alert('Please select members to verify.');
      return;
    }
    bulkVerify(selectedMembers);
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div className="space-y-4">
      {/* Enhanced Statistics Cards with Bulk Actions */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-sm font-medium text-gray-500">Total</div>
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-sm font-medium text-gray-500">Verified</div>
            <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-sm font-medium text-gray-500">Non-Verified</div>
            <div className="text-2xl font-bold text-red-600">{stats.nonVerified}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-sm font-medium text-gray-500">Alive</div>
            <div className="text-2xl font-bold text-green-600">{stats.alive}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-sm font-medium text-gray-500">Deceased</div>
            <div className="text-2xl font-bold text-gray-600">{stats.deceased}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-sm font-medium text-gray-500">Paid</div>
            <div className="text-2xl font-bold text-blue-600">{stats.paid}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-sm font-medium text-gray-500">Non-Paid</div>
            <div className="text-2xl font-bold text-orange-600">{stats.nonPaid}</div>
          </div>
        </div>

        {selectedMembers.length > 0 && (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-blue-800 font-medium">
          {selectedMembers.length} member(s) selected
        </span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => setShowLetterComposer(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2"
        >
          <span>✉️</span>
          <span>Generate Letters</span>
        </button>
        <button
          onClick={() => setSelectedMembers([])}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Clear Selection
        </button>
      </div>
    </div>
  </div>
)}

{/* Letter Composer Modal */}
{showLetterComposer && (
  <LetterComposer
    selectedMembers={selectedMembers}
    onClose={() => setShowLetterComposer(false)}
    onSuccess={() => {
      setSelectedMembers([]);
      loadMembers();
    }}
  />
)}

        {/* Quick Action Buttons for Admin */}
        {isAdmin && (
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  const nonVerifiedIds = members.filter(m => !m.isVerified).map(m => m.id);
                  if (nonVerifiedIds.length > 0) {
                    bulkVerify(nonVerifiedIds);
                  } else {
                    alert('All members are already verified.');
                  }
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2"
              >
                <span>✓</span>
                <span>Verify All Non-Verified</span>
              </button>
              
              <button
                onClick={() => {
                  const verifiedIds = members.filter(m => m.isVerified).map(m => m.id);
                  if (verifiedIds.length > 0) {
                    if (confirm(`Are you sure you want to unverify ${verifiedIds.length} member(s)?`)) {
                      const promises = verifiedIds.map(id => 
                        membersAPI.update(id, { isVerified: false })
                      );
                      Promise.all(promises).then(() => loadMembers());
                    }
                  } else {
                    alert('No verified members to unverify.');
                  }
                }}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 flex items-center space-x-2"
              >
                <span>✗</span>
                <span>Unverify All</span>
              </button>
            </div>
          </div>
        )}

        {/* Bulk Actions for Admin */}
        {isAdmin && selectedMembers.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-800 font-medium">
                  {selectedMembers.length} member(s) selected
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={verifySelectedMembers}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2"
                >
                  <span>✓</span>
                  <span>Verify Selected</span>
                </button>
                <button
                  onClick={() => setSelectedMembers([])}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search by name, training no, NIC..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Trade Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trade</label>
            <select
              value={filters.trade}
              onChange={(e) => handleFilterChange('trade', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Trades</option>
              {Object.entries(tradeLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
            <select
              value={filters.district}
              onChange={(e) => handleFilterChange('district', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Districts</option>
              {districtOptions.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Membership Year</label>
            <input
              type="number"
              value={filters.membershipYear}
              onChange={(e) => handleFilterChange('membershipYear', e.target.value ? parseInt(e.target.value) : '')}
              placeholder="Year"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Living Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Living Status</label>
            <select
              value={filters.livingStatus}
              onChange={(e) => handleFilterChange('livingStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="ALIVE">Alive</option>
              <option value="DECEASED">Deceased</option>
            </select>
          </div>

          {/* Payment Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
            <select
              value={filters.paymentStatus}
              onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="PAID">Paid</option>
              <option value="NON_PAID">Non-Paid</option>
            </select>
          </div>

          {/* Verification Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Verification</label>
            <select
              value={filters.isVerified?.toString()}
              onChange={(e) => handleFilterChange('isVerified', e.target.value === '' ? '' : e.target.value === 'true')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="true">Verified</option>
              <option value="false">Non-Verified</option>
            </select>
          </div>

          {/* Row Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rows per page</label>
            <select
              value={pagination.limit}
              onChange={(e) => handleLimitChange(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {rowLimitOptions.map(limit => (
                <option key={limit} value={limit}>{limit}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Apply Filters
            </button>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} members
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="text-gray-500">Loading members...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* Selection Checkbox */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={members.length > 0 && selectedMembers.length === members.length}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Training No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    District
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="px-6 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center space-y-2">
                        <span className="text-4xl">👥</span>
                        <p>No members found</p>
                        <p className="text-sm">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  members.map((member) => (
                    <tr 
                      key={member.id} 
                      className={`hover:bg-gray-50 ${
                        !member.isVerified ? 'bg-red-50' : ''
                      } ${
                        selectedMembers.includes(member.id) ? 'bg-blue-50' : ''
                      }`}
                    >
                      {/* Selection Checkbox */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedMembers.includes(member.id)}
                          onChange={() => toggleMemberSelection(member.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      
                      {/* Enhanced Verification Button */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isAdmin ? (
                          <button
                            onClick={() => toggleVerification(member.id, member.isVerified)}
                            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${
                              member.isVerified 
                                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                            title={member.isVerified ? 'Verified - Click to unverify' : 'Not Verified - Click to verify'}
                          >
                            <span>{member.isVerified ? '✓' : '?'}</span>
                            <span>{member.isVerified ? 'Verified' : 'Verify'}</span>
                          </button>
                        ) : (
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            member.isVerified 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {member.isVerified ? 'Verified' : 'Pending'}
                          </span>
                        )}
                      </td>
                      
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        !member.isVerified ? 'text-red-700 font-bold' : 'text-gray-900'
                      }`}>
                        {member.trainingNumber}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                        !member.isVerified ? 'text-red-700 font-bold' : 'text-gray-900'
                      }`}>
                        {member.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tradeLabels[member.trade]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.district}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.membershipYear}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {member.mobile}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          member.paymentStatus === 'PAID' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {member.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          member.livingStatus === 'ALIVE' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {member.livingStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Page {pagination.page} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.page <= 3) {
                    pageNum = i + 1;
                  } else if (pagination.page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = pagination.page - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 border rounded-md text-sm ${
                        pagination.page === pageNum
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};