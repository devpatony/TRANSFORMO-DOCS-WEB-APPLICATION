import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/UploadForm.css';

const Feature2 = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('document', file);

    setLoading(true);
    setUploadSuccess(false);

    try {
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setUploadSuccess(true);
        setFile(null); // Clear the selected file
      } else {
        console.error('Error uploading file:', await res.json());
      }
    } catch (err) {
      console.error('Error uploading file:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
          Automate Machine-Readable Conversion
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Upload your document to convert it into a machine-readable format.
        </p>
        <div className="upload-container">
          <div className="drop-area">
            <input
              type="file"
              id="fileElem"
              accept=".pdf,.docx,.txt"
              onChange={(e) => setFile(e.target.files[0])}
              className="file-input"
            />
            <label className="file-input-label" htmlFor="fileElem">
              {file ? file.name : 'Select a file'}
            </label>
          </div>
          <div className="button-group">
            <button onClick={uploadFile} disabled={loading}>
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          {uploadSuccess && (
            <p className="upload-success-message">File converted successfully!</p>
          )}
        </div>
        <button
          onClick={() => navigate('/feature3')}
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Next: Enhance Searchability & Accessibility →
        </button>
      </div>
    </div>
  );
};

export default Feature2;