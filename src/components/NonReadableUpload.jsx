import React, { useState, useRef } from 'react';
import './NonReadableUpload.css';

function NonReadableUpload({ onFileUploaded }) {
    const [file, setFile] = useState(null);
    const dropAreaRef = useRef(null);

    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            setFile(files[0]);
            const isNonReadable = true;
            onFileUploaded(isNonReadable);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        dropAreaRef.current.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        dropAreaRef.current.classList.remove('drag-over');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        dropAreaRef.current.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            setFile(files[0]);
            const isNonReadable = true;
            onFileUploaded(true);
        }
    };

    return (
        <div
            ref={dropAreaRef}
            className="drop-area"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
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
                        accept="*"
                        onChange={handleFileSelect}
                        className="file-input"
                    />
                    <label className="file-input-label" htmlFor="fileElem">
                        Select a file
                    </label>
                </>
            )}
        </div>
    );
}

export default NonReadableUpload;