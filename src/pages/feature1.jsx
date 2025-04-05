import React, { useState } from 'react';

const Feature1 = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!file) {
      setMessage('Please upload a file.');
      return;
    }

    const isMachineReadable = checkFileMachineReadability(file);

    if (isMachineReadable) {
      setMessage('The file is machine-readable. Upload successful!');
    } else {
      setMessage('The file is not machine-readable. Please upload a valid document.');
    }
  };

  const checkFileMachineReadability = (file) => {
    const validExtensions = ['pdf', 'docx', 'txt'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return validExtensions.includes(fileExtension);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-6">Feature 1: Restrict Non-Machine-Readable Documents</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label
            htmlFor="file-upload"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload Document
          </label>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Validate Document
        </button>
      </form>
      {message && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            message.includes('successful')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Feature1;