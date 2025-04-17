import React, { useState, useRef, useEffect, useCallback, use } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Constants ---
const MAX_CONTEXT_LENGTH = 15000; // Limit for the STRINGIFIED JSON length
const OPENROUTER_API_KEY = ""; // Replace with your actual API key
const YOUR_SITE_URL = "http://localhost:5173/"; // Optional
const YOUR_SITE_NAME = "TransformoDocs Chatbot"; // Optional
const CHAT_MODEL = "google/gemini-2.5-pro-exp-03-25:free"; // Or other suitable model

function Feature6() {
  // Component State
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [documentText, setDocumentText] = useState(''); // Will store STRINGIFIED JSON
  const [fileName, setFileName] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // --- Effects ---
  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset chat when document changes
  useEffect(() => {
    setMessages(
      fileName
        ? [{ role: 'assistant', content: `JSON document "${fileName}" loaded. Ask me questions about the data!` }]
        : []
    );
    setError(null);
  }, [fileName]);

  // --- Event Handlers ---
  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.json')) {
      setError('Error: Please upload a valid .json file.');
      setFileName('');
      setDocumentText('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setFileName(file.name);
    setDocumentText('');
    setError(null);
    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const rawText = e.target.result;
      try {
        const parsedJson = JSON.parse(rawText);
        const jsonString = JSON.stringify(parsedJson, null, 2);

        if (jsonString.length > MAX_CONTEXT_LENGTH) {
          setError(
            `Error: JSON data is too large (${jsonString.length} characters). Maximum allowed is ${MAX_CONTEXT_LENGTH} characters.`
          );
          setFileName('');
          setDocumentText('');
          if (fileInputRef.current) fileInputRef.current.value = '';
        } else {
          setDocumentText(jsonString);
        }
      } catch (parseError) {
        setError('Error: Invalid JSON format in the file.');
        setFileName('');
        setDocumentText('');
        if (fileInputRef.current) fileInputRef.current.value = '';
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Error reading file.');
      setFileName('');
      setDocumentText('');
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };

    reader.readAsText(file);
  };

  const handleSendMessage = useCallback(async (event) => {
    if (event) event.preventDefault();
    if (!userInput.trim() || isLoading || !documentText) return;

    const newUserMessage = { role: 'user', content: userInput };
    setMessages((prev) => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null);

    const systemPrompt = `You are a helpful assistant. Answer the user's question based only on the following JSON data content. Do not use any external knowledge. If the answer cannot be deduced from the JSON, say "The answer is not found in the provided JSON data."

JSON Data Content:
---
${documentText}
---

User Question: ${userInput}
Answer:`;

    const apiMessages = [{ role: 'user', content: systemPrompt }];

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": YOUR_SITE_URL,
          "X-Title": YOUR_SITE_NAME,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: CHAT_MODEL,
          messages: apiMessages,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `API Error: ${response.status} ${response.statusText || ''}. ${errorData?.error?.message || ''}`
        );
      }

      const data = await response.json();

      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        const botMessage = data.choices[0].message;
        botMessage.content = botMessage.content || "[No content received]";
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error("Received an unexpected response format from the assistant.");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch response.");
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `[Error: ${err.message || "Unknown error"}]` },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [userInput, documentText, isLoading]);

  // --- Dark Theme CSS Styles ---
  const styles = {
    chatbox: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      backgroundColor: '#1e1e2e', // Dark background
      display: 'flex',
      flexDirection: 'column',
      height: '80vh',
      fontFamily: 'Arial, sans-serif',
      color: '#e0e0e0', // Light text color
    },
    messagesContainer: {
      flex: 1,
      overflowY: 'auto',
      padding: '15px',
      marginBottom: '15px',
      borderRadius: '8px',
      backgroundColor: '#282a36', // Darker message container
      border: '1px solid #44475a', // Subtle border
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#282a36',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#44475a',
        borderRadius: '4px',
      },
    },
    message: (role) => ({
      padding: '10px 15px',
      marginBottom: '10px',
      borderRadius: '8px',
      maxWidth: '80%',
      wordBreak: 'break-word',
      whiteSpace: 'pre-wrap',
      ...(role === 'user' 
        ? {
            alignSelf: 'flex-end',
            backgroundColor: '#6272a4', // User message color (bluish)
            color: '#f8f8f2', // Light text for contrast
            marginLeft: 'auto',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          } 
        : {
            alignSelf: 'flex-start',
            backgroundColor: '#44475a', // Assistant message color (grayish)
            color: '#f8f8f2', // Light text
            marginRight: 'auto',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          }
      ),
    }),
    form: {
      display: 'flex',
      marginTop: '10px',
      gap: '10px',
    },
    input: {
      flex: 1,
      padding: '12px 15px',
      borderRadius: '8px',
      border: '1px solid #44475a',
      backgroundColor: '#282a36',
      color: '#f8f8f2',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.2s',
      ':focus': {
        borderColor: '#bd93f9', // Highlight color
        boxShadow: '0 0 0 2px rgba(189, 147, 249, 0.3)',
      },
      ':disabled': {
        backgroundColor: '#1a1b26',
        cursor: 'not-allowed',
        opacity: 0.7,
      },
      '::placeholder': {
        color: '#6272a4',
      },
    },
    button: {
      padding: '0 20px',
      height: '44px',
      backgroundColor: '#bd93f9', // Purple accent color
      color: '#282a36',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      transition: 'background-color 0.2s',
      ':hover': {
        backgroundColor: '#caa9fa',
      },
    },
    buttonDisabled: {
      backgroundColor: '#44475a',
      color: '#6272a4',
      cursor: 'not-allowed',
      opacity: 0.7,
      ':hover': {
        backgroundColor: '#44475a',
      },
    },
    statusContainer: {
      margin: '10px 0',
      padding: '10px 15px',
      borderRadius: '8px',
      fontSize: '14px',
    },
    error: {
      backgroundColor: '#44252b', // Dark red for errors
      color: '#ff5555',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '10px',
      borderLeft: '4px solid #ff5555',
    },
    loading: {
      color: '#bd93f9', // Purple for loading text
      fontStyle: 'italic',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
    },
    fileInputContainer: {
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: '#282a36', // Dark container
      borderRadius: '8px',
      border: '1px solid #44475a',
    },
    fileNameDisplay: {
      marginTop: '10px',
      padding: '8px 12px',
      backgroundColor: '#334155', // Darker blue
      color: '#8be9fd', // Cyan text
      borderRadius: '5px',
      fontWeight: 'bold',
      fontSize: '14px',
      display: 'inline-block',
    }
  };

  // --- Custom CSS for file input ---
  useEffect(() => {
    // Add custom styles for file input (can't style directly with inline styles)
    const style = document.createElement('style');
    style.textContent = `
      input[type="file"] {
        color: #f8f8f2;
        background-color: #282a36;
        border: 1px solid #44475a;
        border-radius: 4px;
        padding: 5px;
        margin-top: 5px;
        cursor: pointer;
      }
      input[type="file"]:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      /* For Firefox */
      input[type="file"]::-moz-file-upload-button {
        background-color: #6272a4;
        color: #f8f8f2;
        border: none;
        border-radius: 4px;
        padding: 5px 10px;
        margin-right: 10px;
        cursor: pointer;
      }
      /* For Chrome */
      input[type="file"]::file-selector-button {
        background-color: #6272a4;
        color: #f8f8f2;
        border: none;
        border-radius: 4px;
        padding: 5px 10px;
        margin-right: 10px;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // --- Render ---
  return (
    <div style={styles.chatbox}>
      {/* File Input Section - Updated for JSON */}
      <div style={styles.fileInputContainer}>
        <label htmlFor="file-upload">Upload JSON Document (.json only): </label>
        <input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          accept=".json,application/json" // Accept .json extension and MIME type
          onChange={handleFileChange}
          disabled={isLoading}
        />
        {fileName && !error && <div style={styles.fileNameDisplay}>Loaded: {fileName}</div>}
      </div>

       {/* Messages Display */}
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message(msg.role)}>
            {/* Simple string display */}
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Status Indicators */}
      {(isLoading || error) && (
        <div style={styles.statusContainer}>
            {isLoading && <div style={styles.loading}>{documentText ? 'Assistant is thinking...' : 'Reading/Parsing JSON...'}</div>}
            {error && <div style={styles.error}>{error}</div>}
        </div>
      )}

      {/* Input Form - Updated Placeholders */}
      <form onSubmit={handleSendMessage} style={styles.form}>
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder={documentText ? "Ask about the JSON data..." : "Upload a .json document first..."}
          style={styles.input}
          aria-label="Chat input"
          disabled={isLoading || !documentText}
        />
        <button
           type="submit"
           style={{ ...styles.button, ...((isLoading || !documentText || !userInput.trim()) ? styles.buttonDisabled : {}) }}
           disabled={isLoading || !documentText || !userInput.trim()}
        >
          Ask
        </button>
      </form>
     
      
    </div>
  );
}

export default Feature6;