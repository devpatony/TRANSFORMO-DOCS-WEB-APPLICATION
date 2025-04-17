import os
import re
import json
import requests
from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
from datetime import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from docx import Document
from flask_cors import CORS

# === Load environment variables ===
load_dotenv()

# === Flask Setup ===
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
CONVERTED_FOLDER = 'converted_docs'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(CONVERTED_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['CONVERTED_FOLDER'] = CONVERTED_FOLDER

# === MongoDB Setup ===
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.get_database()
documents_collection = db['documents']

# === Allowed File Extensions ===
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'txt'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text(filepath, ext):
    try:
        if ext == 'pdf':
            reader = PdfReader(filepath)
            text = ''.join([page.extract_text() or '' for page in reader.pages])
        elif ext == 'docx':
            doc = Document(filepath)
            text = '\n'.join([para.text for para in doc.paragraphs])
        elif ext == 'txt':
            with open(filepath, 'r', encoding='utf-8') as f:
                text = f.read()
        else:
            text = None
        return text.strip() if text else None
    except Exception as e:
        print(f"Extraction error: {e}")
        return None

# === Summarization using built-in Python logic ===
def summarize_text(text, max_sentences=7):
    # Clean and split into sentences
    text = re.sub(r'\s+', ' ', text).strip()
    sentences = re.split(r'(?<=[.!?]) +', text)

    if len(sentences) <= max_sentences:
        return text  # Short doc, return full

    # Tokenize words and build frequency table
    words = re.findall(r'\w+', text.lower())
    freq_table = {}
    for word in words:
        if len(word) > 2:
            freq_table[word] = freq_table.get(word, 0) + 1

    # Score each sentence
    sentence_scores = []
    for i, sentence in enumerate(sentences):
        sentence_clean = re.sub(r'\W+', ' ', sentence.lower())
        word_list = sentence_clean.split()
        if not word_list:
            continue
        score = sum(freq_table.get(word, 0) for word in word_list) / len(word_list)
        sentence_scores.append((i, score, sentence))

    # Sort by score and select top N
    sentence_scores.sort(key=lambda x: x[1], reverse=True)
    top_sentences = sorted(sentence_scores[:max_sentences], key=lambda x: x[0])

    summary = ' '.join([sent[2] for sent in top_sentences])
    return summary

@app.route('/')
def home():
    return "✅ TransformoDocs Backend is Running!"

@app.route('/upload', methods=['POST'])
def upload_document():
    if 'document' not in request.files:
        return jsonify({"error": "No document uploaded"}), 400

    file = request.files['document']
    if file.filename == '':
        return jsonify({"error": "Filename is empty"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        ext = filename.rsplit('.', 1)[1].lower()
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        text = extract_text(filepath, ext)
        if not text or len(text) < 10:
            return jsonify({"error": "Document is not machine-readable or is empty"}), 400

        summary = summarize_text(text)

        base_name = os.path.splitext(filename)[0]
        json_filename = f"{base_name}.json"
        json_path = os.path.join(app.config['CONVERTED_FOLDER'], json_filename)

        json_data = {
            "filename": filename,
            "summary": summary,
            "content": text
        }

        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(json_data, f, indent=4)

        doc_data = {
            "filename": filename,
            "filetype": ext,
            "upload_time": datetime.utcnow(),
            "content": text,
            "summary": summary,
            "converted_filename": json_filename
        }

        doc_id = documents_collection.insert_one(doc_data).inserted_id

        return jsonify({
            "message": "✅ Document processed successfully",
            "document_id": str(doc_id),
            "summary": summary
        }), 200

    else:
        return jsonify({"error": "Unsupported file type"}), 400

@app.route('/documents', methods=['GET'])
def list_documents():
    docs = []
    for doc in documents_collection.find():
        docs.append({
            "id": str(doc["_id"]),
            "filename": doc["filename"],
            "upload_time": doc["upload_time"]
        })
    return jsonify(docs), 200

@app.route('/documents/<doc_id>', methods=['GET'])
def get_document(doc_id):
    try:
        doc = documents_collection.find_one({"_id": ObjectId(doc_id)})
        if not doc:
            return jsonify({"error": "Document not found"}), 404
        doc["_id"] = str(doc["_id"])
        return jsonify(doc), 200
    except:
        return jsonify({"error": "Invalid document ID"}), 400

@app.route('/download/<doc_id>', methods=['GET'])
def download_file(doc_id):
    try:
        doc = documents_collection.find_one({'_id': ObjectId(doc_id)})
        if not doc:
            return jsonify({'error': 'Document not found'}), 404

        filepath = os.path.join(app.config['CONVERTED_FOLDER'], doc['converted_filename'])
        if os.path.exists(filepath):
            return send_file(filepath, as_attachment=True, mimetype='application/json', download_name=doc['converted_filename'])
        else:
            return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# === Run App ===
if __name__ == '__main__':
    app.run(debug=True)