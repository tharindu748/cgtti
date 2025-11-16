import React, { useState } from 'react';
import { MemberFormData, Trade, PaymentStatus, LivingStatus } from '@types';
import { membersAPI } from '@api/members';

interface MemberRegistrationFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialData?: Partial<MemberFormData>;
}

const tradeOptions: { value: Trade; label: string }[] = [
  { value: 'TOOL_MACHINE', label: 'Tool Machine Trade' },
  { value: 'MILLWRIGHT', label: 'Millwright Trade' },
  { value: 'AUTO_MOBILE', label: 'Auto Mobile Trade' },
  { value: 'BBP', label: 'BBP Trade' },
  { value: 'AUTO_ELECTRICAL', label: 'Auto Electrical Trade' },
  { value: 'REF_AND_AC', label: 'Ref and AC Trade' },
  { value: 'MECHATRONIC', label: 'Mechatronic Trade' },
  { value: 'DISAL_PUMP', label: 'Disal Pump Trade' },
  { value: 'WELDING', label: 'Welding Trade' },
  { value: 'POWER_ELECTRICAL', label: 'Power Electrical Trade' },
];

export const MemberRegistrationForm: React.FC<MemberRegistrationFormProps> = ({
  onSuccess,
  onCancel,
  initialData
}) => {
  const [formData, setFormData] = useState<MemberFormData>({
    trainingNumber: initialData?.trainingNumber || '',
    membershipYear: initialData?.membershipYear || new Date().getFullYear(),
    trade: initialData?.trade || 'AUTO_ELECTRICAL',
    name: initialData?.name || '',
    district: initialData?.district || '',
    membershipNumber: initialData?.membershipNumber || '',
    address: initialData?.address || '',
    mobile: initialData?.mobile || '',
    nic: initialData?.nic || '',
    email: initialData?.email || '',
    paymentStatus: initialData?.paymentStatus || 'NON_PAID',
    livingStatus: initialData?.livingStatus || 'ALIVE',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'membershipYear' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await membersAPI.create(formData);
      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to register member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {initialData ? 'Update Member' : 'Register New Member'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Fill in the member details below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Training Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Training Number *
              </label>
              <input
                type="text"
                name="trainingNumber"
                value={formData.trainingNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter training number"
              />
            </div>

            {/* Membership Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Membership Year *
              </label>
              <input
                type="number"
                name="membershipYear"
                value={formData.membershipYear}
                onChange={handleChange}
                required
                min="1900"
                max="2100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Trade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trade *
              </label>
              <select
                name="trade"
                value={formData.trade}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {tradeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                District *
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter district"
              />
            </div>

            {/* Membership Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Membership Number *
              </label>
              <input
                type="text"
                name="membershipNumber"
                value={formData.membershipNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter membership number"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter mobile number"
              />
            </div>

            {/* NIC */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NIC Number *
              </label>
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter NIC number"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>

            {/* Payment Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Status *
              </label>
              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="PAID">Paid</option>
                <option value="NON_PAID">Non-Paid</option>
              </select>
            </div>

            {/* Living Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Living Status *
              </label>
              <select
                name="livingStatus"
                value={formData.livingStatus}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ALIVE">Alive</option>
                <option value="DECEASED">Deceased</option>
              </select>
            </div>
          </div>

          {/* Address - Full Width */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter full address"
            />
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : (initialData ? 'Update Member' : 'Register Member')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};