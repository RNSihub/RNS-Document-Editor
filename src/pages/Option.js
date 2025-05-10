import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Repeat, Layers, Edit, Scissors, ArrowLeft } from 'lucide-react';
import DocumentCard from './DocCard'; // Adjust if in a different folder

const DocumentOptionsPage = ({ documents = [], onBack }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate(); // 👈 React Router hook

  const displayDocuments = documents.length > 0 ? documents : [
    { name: 'business_report.pdf', size: 2500000, type: 'application/pdf' },
    { name: 'project_analysis.docx', size: 1800000, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
  ];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return <FileText className="text-red-500" size={24} />;
    if (fileType.includes('word')) return <FileText className="text-blue-500" size={24} />;
    if (fileType.includes('image')) return <FileText className="text-green-500" size={24} />;
    return <FileText className="text-gray-500" size={24} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={onBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800 flex-grow text-center pr-8">
            RNS DocFile Options
          </h1>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Selected Documents</h2>
          <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto">
            {displayDocuments.map((doc, index) => (
              <div key={index} className="flex items-center space-x-3 py-2 border-b border-gray-200 last:border-0">
                <div className="p-2 bg-white rounded shadow-sm">
                  {getFileIcon(doc.type)}
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(doc.size)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          What would you like to do with your document(s)?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DocumentCard 
            title="Convert" 
            icon={<Repeat size={24} className="text-blue-600" />}
            description="Convert your document to different file formats (PDF, DOCX, TXT)" 
            color="bg-blue-600"
            onClick={() => navigate('/DJ_Maker/convert')}
          />
          
          <DocumentCard 
            title="Merge" 
            icon={<Layers size={24} className="text-purple-600" />}
            description="Combine multiple documents into a single file" 
            color="bg-purple-600"
            onClick={() => setSelectedOption('merge')}
          />
          
          <DocumentCard 
            title="Edit" 
            icon={<Edit size={24} className="text-green-600" />}
            description="Make changes to your document contents and formatting" 
            color="bg-green-600"
            onClick={() => setSelectedOption('edit')}
          />
          
          <DocumentCard 
            title="Split" 
            icon={<Scissors size={24} className="text-orange-500" />}
            description="Divide your document into multiple separate files" 
            color="bg-orange-500"
            onClick={() => setSelectedOption('split')}
          />
        </div>

        {selectedOption && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-center text-gray-700">
              You selected the <span className="font-semibold">{selectedOption}</span> option. 
              This functionality would be implemented based on your specific requirements.
            </p>
            <div className="flex justify-center mt-3">
              <button 
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                onClick={() => alert(`${selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} operation would start here!`)}
              >
                Continue
              </button>
              <button 
                className="ml-3 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                onClick={() => setSelectedOption(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentOptionsPage;
