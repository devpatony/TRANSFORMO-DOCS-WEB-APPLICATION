import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Feature4 = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchDocuments = async () => {
    try {
      const res = await fetch('http://localhost:5000/documents');
      const data = await res.json();
      setDocuments(data);
    } catch (err) {
      setError('Error fetching documents.');
    }
  };

  const fetchDocumentDetails = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/documents/${id}`);
      const data = await res.json();
      if (res.ok) setSelectedDoc(data);
      else setError(data.error);
    } catch (err) {
      setError('Failed to fetch document details');
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">
          Summarize Document Content
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Select a document to view its summary.
        </p>
        {error && <p className="text-red-500">{error}</p>}
        <div className="document-list">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="document-card"
              onClick={() => fetchDocumentDetails(doc.id)}
            >
              <h4>{doc.filename}</h4>
              <p>{new Date(doc.upload_time).toLocaleString()}</p>
            </div>
          ))}
        </div>
        {selectedDoc && (
          <div className="summary-card bg-gray-100 p-4 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-bold mb-4">{selectedDoc.filename}</h3>
            <h4 className="text-lg font-semibold mb-2">🧠 Summary</h4>
            <p className="text-gray-700">{selectedDoc.summary}</p>
          </div>
        )}
        <button
          onClick={() => navigate('/feature5')}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Next: Advanced Analytics →
        </button>
      </div>
    </div>
  );
};

export default Feature4;