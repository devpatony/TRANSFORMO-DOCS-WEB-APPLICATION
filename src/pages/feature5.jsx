import React from 'react';
import DocumentList from '../components/DocumentList';
import { useNavigate } from 'react-router-dom';

const Feature5 = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-600">
          Advanced Analytics & Reporting
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Gain insights and track document usage with advanced analytics.
        </p>
        <DocumentList />
        <button
          onClick={() => navigate('/feature6')}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Next: Realtime Chatbot →
        </button>
      </div>
    </div>
  );
};

export default Feature5;