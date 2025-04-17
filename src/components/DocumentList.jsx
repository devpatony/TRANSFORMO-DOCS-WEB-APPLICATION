import React, { useEffect, useState } from 'react';
import './DocumentList.css';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [error, setError] = useState('');

  const fetchDocuments = async () => {
    try {
      const res = await fetch('http://localhost:5000/documents');
      const data = await res.json();
      setDocuments(data);
    } catch (err) {
      setError('Error fetching documents.');
    }
  };

  useEffect(() => {
    fetchDocuments();
    const interval = setInterval(fetchDocuments, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const closeDetails = () => {
    setSelectedDoc(null);
  };

  const downloadJSON = (id) => {
    const downloadUrl = `http://localhost:5000/download/${id}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', `${id}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="document-list-container">
      <h2>📚 Uploaded Documents</h2>
      {error && <p className="error">{error}</p>}
      <div className="document-list">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="document-card"
            onClick={() => !selectedDoc && fetchDocumentDetails(doc.id)}
          >
            <h4>{doc.filename}</h4>
            <p>{new Date(doc.upload_time).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {selectedDoc && (
        <div className="document-details">
          <button className="close-btn" onClick={closeDetails}>✖</button>
          <h3>📄 {selectedDoc.filename}</h3>
          <p><strong>Uploaded:</strong> {new Date(selectedDoc.upload_time).toLocaleString()}</p>
          <div className="detail-section">
            <h4>📌 Summary</h4>
            <p>{selectedDoc.summary}</p>
          </div>
          <div className="detail-section">
            <h4>📘 Full Content</h4>
            <pre className="content-box">{selectedDoc.content}</pre>
          </div>
          <button onClick={() => downloadJSON(selectedDoc._id)}>⬇ Download .json</button>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
