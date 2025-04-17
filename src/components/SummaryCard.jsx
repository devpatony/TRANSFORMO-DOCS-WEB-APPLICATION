import React from 'react';
import './SummaryCard.css';

const SummaryCard = ({ doc }) => {
  return (
    <div className="doc-detail-card fade-in">
      <h3>{doc.filename}</h3>
      <p><strong>Uploaded:</strong> {new Date(doc.upload_time).toLocaleString()}</p>
      <h4>🧠 Summary</h4>
      <p>{doc.summary}</p>
      <h4>📝 Full Content</h4>
      <pre>{doc.content}</pre>
    </div>
  );
};

export default SummaryCard;