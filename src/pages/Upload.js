import React, { useState, useRef } from 'react';
import DocumentOptionsPage from './Option';
import { Upload, X, CheckCircle, AlertCircle, File, Image } from 'lucide-react';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError('');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Handle file selection (drag or click)
  const handleFiles = (selectedFiles) => {
    const validFiles = Array.from(selectedFiles).filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        setError(`File "${file.name}" exceeds 10MB limit.`);
        return false;
      }
      if (!['application/pdf', 'text/plain', 'image/png', 'image/jpeg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        setError(`File "${file.name}" is not a supported type.`);
        return false;
      }
      return true;
    });

    const newFiles = validFiles.map((file) => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      id: Math.random().toString(36).substr(2, 9),
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    simulateUpload(newFiles);
  };

  // Simulate file upload with progress
  const simulateUpload = (newFiles) => {
    newFiles.forEach(({ id }) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress((prev) => ({ ...prev, [id]: progress }));
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 200);
    });
  };

  // Remove a file
  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[id];
      return newProgress;
    });
  };

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) {
      return <Image size={24} className="text-green-500" />;
    } else if (fileType === 'application/pdf') {
      return <File size={24} className="text-red-500" />;
    } else if (fileType.includes('word')) {
      return <File size={24} className="text-blue-500" />;
    } else {
      return <File size={24} className="text-gray-500" />;
    }
  };

  // Handle continue to options page
  const handleContinue = () => {
    setShowOptions(true);
  };

  if (showOptions) {
    return (
      <DocumentOptionsPage 
        documents={files.map(f => f.file)} 
        onBack={() => setShowOptions(false)} 
      />
    );
  }

  const allUploadsComplete = files.length > 0 && 
    Object.values(uploadProgress).every(progress => progress === 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            RNS DocFile Upload
          </h1>
          <p className="text-gray-600">Upload your documents to get started</p>
        </div>

        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center mb-6 transition-all duration-300 cursor-pointer ${
            isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
          />
          <div className="flex flex-col items-center">
            <div className="p-4 bg-blue-100 rounded-full mb-4">
              <Upload className="h-10 w-10 text-blue-500" />
            </div>
            <p className="font-medium text-gray-700 mb-1">
              {isDragging ? 'Drop files here!' : 'Drag and drop files or click to select'}
            </p>
            <p className="text-sm text-gray-500">
              Supports PDF, DOC, DOCX, TXT, PNG, JPG (Max 10MB per file)
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Upload Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-700 mb-3">Uploaded Files ({files.length})</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {files.map(({ file, preview, id }) => (
                <div
                  key={id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-lg">
                      {getFileIcon(file.type)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center mt-1">
                      <p className="text-xs text-gray-500 mr-2">{formatFileSize(file.size)}</p>
                      {uploadProgress[id] === 100 && (
                        <span className="flex items-center text-xs text-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Complete
                        </span>
                      )}
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress[id] || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(id);
                    }}
                    className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 hover:text-red-500 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {files.length > 0 && (
            <button
              className={`flex-1 py-3 rounded-lg transition flex items-center justify-center font-medium ${
                allUploadsComplete
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!allUploadsComplete}
              onClick={handleContinue}
            >
              {allUploadsComplete ? (
                <>Continue to Options</>
              ) : (
                <>Uploading... ({Math.min(
                  100,
                  Math.floor(
                    Object.values(uploadProgress).reduce((a, b) => a + b, 0) / 
                    (files.length * 100) * 100
                  )
                )}%)</>
              )}
            </button>
          )}
          
          {files.length > 0 && (
            <button
              className="py-3 px-6 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium"
              onClick={() => {
                setFiles([]);
                setUploadProgress({});
                setError('');
              }}
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return <FileUpload />;
};

export default App;