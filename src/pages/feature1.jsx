import React from 'react';
import { useNavigate } from 'react-router-dom';
import NonReadableUpload from '../components/NonReadableUpload';

const Feature1 = () => {
  const navigate = useNavigate();

  const handleFileUploaded = (isNonReadable) => {
    if (isNonReadable) {
      alert('Non-machine-readable document detected!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Restrict Non-Machine-Readable Documents
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Upload your document to validate if it is machine-readable.
        </p>
        <NonReadableUpload onFileUploaded={handleFileUploaded} />
        <button
          onClick={() => navigate('/feature2')}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Next: Automate Machine-Readable Conversion →
        </button>
      </div>
    </div>
  );
};

export default Feature1;