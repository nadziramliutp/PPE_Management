// app/ppe-request/page.tsx (for App Router)
// or pages/ppe-request.tsx (for Pages Router)

import React from 'react';
import PPERequestForm from '../../components/ppe-request-form';

const PPERequestPage: React.FC = () => {
  return (
    <div 
      className="min-h-screen bg-gray-100 py-8 px-4"
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif'
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 
            className="text-gray-900 mb-4"
            style={{
              fontSize: '34px',
              fontWeight: '700',
              lineHeight: '41px',
              letterSpacing: '0.37px'
            }}
          >
            Personal Protective Equipment
          </h1>
          <p 
            className="text-gray-600 max-w-2xl mx-auto"
            style={{
              fontSize: '17px',
              fontWeight: '400',
              lineHeight: '22px',
              letterSpacing: '-0.41px'
            }}
          >
            Request the safety equipment you need to perform your job safely. 
            All requests will be reviewed by the Safety Department.
          </p>
        </div>

        {/* Form Component */}
        <PPERequestForm />

        {/* Footer Information */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Important Information
            </h3>
            <div className="space-y-2 text-blue-800">
              <p className="text-sm">• Requests are typically processed within 2-3 business days</p>
              <p className="text-sm">• Emergency PPE requests should contact Safety at ext. 911</p>
              <p className="text-sm">• All PPE must be returned when no longer needed</p>
              <p className="text-sm">• Training may be required for certain equipment types</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPERequestPage;