import { FiUpload } from 'react-icons/fi';
import { useState } from 'react';

const UploadContact = () => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);
        if (progress >= 100) clearInterval(interval);
      }, 100);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Upload Contacts</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <FiUpload className="text-4xl text-blue-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-700">Drag and drop CSV/Excel files here</h3>
          <p className="text-gray-500 mt-1">or</p>
          <label className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block cursor-pointer">
            Browse Files
            <input 
              type="file" 
              className="hidden" 
              accept=".csv,.xlsx,.xls" 
              onChange={handleFileUpload} 
            />
          </label>
          {uploadProgress > 0 && (
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-4">Supported formats: CSV, Excel</p>
        </div>
      </div>
    </div>
  );
};

export default UploadContact;