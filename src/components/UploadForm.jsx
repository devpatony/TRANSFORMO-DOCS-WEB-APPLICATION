import React, { useState } from 'react';
import './UploadForm.css';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false); // Add success state

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const uploadFile = async () => {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('document', file);

        setLoading(true);
        setSummary('');
        setUploadSuccess(false); // Reset success state

        try {
            const res = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setSummary(data.summary);
                setUploadSuccess(true); // Set success state to true
                setFile(null); // Clear selected file
            }
        } catch (err) {
            console.error('Error uploading file:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-container">
            <div
                className={`drop-area ${dragActive ? 'drag-over' : ''}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
            >
                {file ? (
                    <p className="file-name">Selected File: {file.name}</p>
                ) : (
                    <>
                        <p>Drag & Drop your file here or</p>
                        <input
                            type="file"
                            id="fileElem"
                            accept=".pdf,.docx,.txt"
                            onChange={handleFileSelect}
                            className="file-input"
                        />
                        <label className="file-input-label" htmlFor="fileElem">
                            Select a file
                        </label>
                    </>
                )}
            </div>

            <div className="button-group">
                <button onClick={uploadFile} disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </div>

            {uploadSuccess && (
                <p className="upload-success-message">File uploaded successfully!</p>
            )}

            {summary && (
                <div className="summary-output">
                    <h4>Summary:</h4>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
};

export default UploadForm;