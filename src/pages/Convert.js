import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';

const ConversionOptions = ({ file, onConvert }) => {
  const options = [
    { name: 'HTML to PDF', library: 'html2pdf.js', value: 'html2pdf' },
    // Add more options as needed
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {options.map((option, index) => (
        <div key={index} className="bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-bold">{option.name}</h3>
          <p className="text-gray-700">{option.library}</p>
          <button
            onClick={() => onConvert(option.value)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Convert
          </button>
        </div>
      ))}
    </div>
  );
};

const ConvertPage = () => {
  const [file, setFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleConvert = (conversionType) => {
    if (conversionType === 'html2pdf') {
      const element = document.createElement('div');
      element.innerHTML = '<h1>Sample HTML Content</h1><p>This is a sample HTML content to be converted to PDF.</p>';

      const opt = {
        margin: 10,
        filename: 'converted.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().from(element).set(opt).save();
    }
    // Add more conversion types as needed
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Document Converter</h1>

      {/* Upload Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Upload a File</h2>
        <input type="file" onChange={handleFileUpload} className="mb-4" />
      </div>

      {/* Conversion Options Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Conversion Options</h2>
        {file && <ConversionOptions file={file} onConvert={handleConvert} />}
      </div>

      {/* Download Section */}
      {convertedFile && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-bold mb-4">Download Converted File</h2>
          <a
            href={URL.createObjectURL(convertedFile)}
            download="converted.pdf"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default ConvertPage;
