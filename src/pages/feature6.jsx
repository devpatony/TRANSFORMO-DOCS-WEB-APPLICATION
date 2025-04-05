import React, { useState } from 'react';

const Feature6 = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [newCollaborator, setNewCollaborator] = useState('');
  const [message, setMessage] = useState('');

  const handleAddCollaborator = () => {
    if (!newCollaborator.trim()) {
      setMessage('Please enter a valid collaborator name.');
      return;
    }

    setCollaborators([...collaborators, newCollaborator.trim()]);
    setNewCollaborator('');
    setMessage('Collaborator added successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-6">Feature 6: Real-Time Document Collaboration</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Collaborators</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newCollaborator}
            onChange={(e) => setNewCollaborator(e.target.value)}
            placeholder="Enter collaborator name"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <button
            onClick={handleAddCollaborator}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        {message && (
          <div
            className={`mb-4 p-2 rounded-lg ${
              message.includes('successfully')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}
        <h3 className="text-lg font-medium mb-2">Collaborators:</h3>
        <ul className="list-disc pl-5">
          {collaborators.map((collaborator, index) => (
            <li key={index} className="text-gray-700">
              {collaborator}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Feature6;