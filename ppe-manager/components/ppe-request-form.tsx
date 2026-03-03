// components/ppe-request-form.tsx
'use client';

import React, { useState } from 'react';
import CupertinoInput from './CupertinoInput';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Calendar,
  FileText,
  Package,
  Hash,
  MapPin
} from 'lucide-react';

interface PPERequest {
  employeeName: string;
  email: string;
  phone: string;
  department: string;
  jobTitle: string;
  requestDate: string;
  requiredDate: string;
  ppeType: string;
  quantity: string;
  size: string;
  reason: string;
  workLocation: string;
}

const PPERequestForm: React.FC = () => {
  const [formData, setFormData] = useState<PPERequest>({
    employeeName: '',
    email: '',
    phone: '',
    department: '',
    jobTitle: '',
    requestDate: '',
    requiredDate: '',
    ppeType: '',
    quantity: '',
    size: '',
    reason: '',
    workLocation: ''
  });

  const [errors, setErrors] = useState<Partial<PPERequest>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof PPERequest) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PPERequest> = {};

    // Required field validations
    if (!formData.employeeName.trim()) {
      newErrors.employeeName = 'Employee name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formData.ppeType.trim()) {
      newErrors.ppeType = 'PPE type is required';
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Please enter a valid quantity';
    }

    if (!formData.requiredDate) {
      newErrors.requiredDate = 'Required date is needed';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason for request is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('PPE Request Submitted:', formData);
      alert('PPE request submitted successfully!');
      
      // Reset form
      setFormData({
        employeeName: '',
        email: '',
        phone: '',
        department: '',
        jobTitle: '',
        requestDate: '',
        requiredDate: '',
        ppeType: '',
        quantity: '',
        size: '',
        reason: '',
        workLocation: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ppeTypes = [
    'Hard Hat/Helmet',
    'Safety Glasses/Goggles',
    'Hearing Protection',
    'Respirator/Mask',
    'Safety Gloves',
    'Steel-Toe Boots',
    'High-Vis Vest/Jacket',
    'Fall Protection Harness',
    'Chemical-Resistant Suit',
    'Face Shield',
    'Other'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', 'N/A'];

  // Get today's date for min date validation
  const today = new Date().toISOString().split('T')[0];

  return (
    <div 
      className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'
      }}
    >
      {/* Form Header */}
      <div className="mb-8">
        <h1 
          className="text-gray-900 mb-2"
          style={{
            fontSize: '28px',
            fontWeight: '700',
            lineHeight: '34px',
            letterSpacing: '0.37px'
          }}
        >
          PPE Request Form
        </h1>
        <p 
          className="text-gray-600"
          style={{
            fontSize: '15px',
            fontWeight: '400',
            lineHeight: '20px',
            letterSpacing: '-0.24px'
          }}
        >
          Submit your Personal Protective Equipment request
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CupertinoInput
              label="Employee Name"
              placeholder="Enter your full name"
              value={formData.employeeName}
              onChange={handleInputChange('employeeName')}
              leftIcon={<User />}
              error={errors.employeeName}
              required
            />
            
            <CupertinoInput
              label="Email Address"
              type="email"
              placeholder="your.email@company.com"
              value={formData.email}
              onChange={handleInputChange('email')}
              leftIcon={<Mail />}
              error={errors.email}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CupertinoInput
              label="Phone Number"
              type="tel"
              placeholder="+60 12-345-6789"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              leftIcon={<Phone />}
            />
            
            <CupertinoInput
              label="Job Title"
              placeholder="e.g., Safety Engineer"
              value={formData.jobTitle}
              onChange={handleInputChange('jobTitle')}
              leftIcon={<User />}
            />
          </div>
        </div>

        {/* Work Information Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Work Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CupertinoInput
              label="Department"
              placeholder="e.g., Operations, Engineering"
              value={formData.department}
              onChange={handleInputChange('department')}
              leftIcon={<Building2 />}
              error={errors.department}
              required
            />
            
            <CupertinoInput
              label="Work Location"
              placeholder="e.g., Plant A, Office Building"
              value={formData.workLocation}
              onChange={handleInputChange('workLocation')}
              leftIcon={<MapPin />}
            />
          </div>
        </div>

        {/* PPE Request Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            PPE Request Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CupertinoInput
              label="Request Date"
              type="date"
              value={formData.requestDate}
              onChange={handleInputChange('requestDate')}
              leftIcon={<Calendar />}
              helperText="Date you're making this request"
            />
            
            <CupertinoInput
              label="Required Date"
              type="date"
              min={today}
              value={formData.requiredDate}
              onChange={handleInputChange('requiredDate')}
              leftIcon={<Calendar />}
              error={errors.requiredDate}
              required
              helperText="When do you need this equipment?"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                PPE Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.ppeType}
                onChange={handleInputChange('ppeType')}
                className={`
                  w-full h-11 px-4 text-base rounded-xl bg-white border border-gray-200
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                  transition-all duration-200 ease-out
                  ${errors.ppeType ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                `}
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
                  fontSize: '16px',
                  letterSpacing: '-0.24px'
                }}
              >
                <option value="">Select PPE Type</option>
                {ppeTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.ppeType && (
                <p className="mt-2 text-sm text-red-500">{errors.ppeType}</p>
              )}
            </div>

            <CupertinoInput
              label="Quantity"
              type="number"
              min="1"
              placeholder="1"
              value={formData.quantity}
              onChange={handleInputChange('quantity')}
              leftIcon={<Hash />}
              error={errors.quantity}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Size
              </label>
              <select
                value={formData.size}
                onChange={handleInputChange('size')}
                className="w-full h-11 px-4 text-base rounded-xl bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ease-out"
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
                  fontSize: '16px',
                  letterSpacing: '-0.24px'
                }}
              >
                <option value="">Select Size</option>
                {sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Reason for Request <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.reason}
              onChange={handleInputChange('reason')}
              placeholder="Please explain why you need this PPE equipment..."
              rows={4}
              className={`
                w-full px-4 py-3 text-base rounded-xl bg-white border border-gray-200
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                transition-all duration-200 ease-out resize-none
                placeholder:text-gray-400
                ${errors.reason ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
              `}
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
                fontSize: '16px',
                letterSpacing: '-0.24px',
                outline: 'none'
              }}
            />
            {errors.reason && (
              <p className="mt-2 text-sm text-red-500">{errors.reason}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full h-12 px-6 rounded-xl font-semibold text-white
              transition-all duration-200 ease-out transform
              ${isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 active:scale-[0.98] hover:shadow-lg'
              }
            `}
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
              fontSize: '17px',
              letterSpacing: '-0.41px'
            }}
          >
            {isSubmitting ? 'Submitting Request...' : 'Submit PPE Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PPERequestForm;