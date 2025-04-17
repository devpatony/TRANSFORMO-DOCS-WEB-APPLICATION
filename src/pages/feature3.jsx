import React from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentList from '../components/DocumentList';

const Feature3 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Enhance Searchability & Accessibility
        </h1>
        <p className="text-gray-600 text-center mb-6">
          View and manage your uploaded documents with enhanced searchability.
        </p>
        <DocumentList />
        <button
          onClick={() => navigate('/feature4')}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Next: Summarize Document Content →
        </button>
      </div>
    </div>
  );
};

export default Feature3;