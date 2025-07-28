import { useState } from 'react';
import Papa from 'papaparse';
import { FiUpload, FiEye, FiTrash2 } from 'react-icons/fi';

const UploadContact = () => {
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); // ✅ FIXED

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === 'text/csv' || file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))
    ) {
      setFileInfo(file);
      setFileName(file.name);

      // Simulate progress (since it's local parsing)
      setUploadProgress(10);
      setTimeout(() => setUploadProgress(50), 200);
      setTimeout(() => setUploadProgress(100), 500);

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        worker: true,
        complete: function (results) {
          setCsvData(results.data);
          setShowTable(false);
        },
      });
    } else {
      alert('Please upload a valid CSV or Excel file.');
    }
  };

  const handleRemoveFile = () => {
    setCsvData([]);
    setFileName('');
    setShowTable(false);
    setFileInfo(null);
    setUploadProgress(0);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Upload Contacts</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <FiUpload className="text-4xl text-blue-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-700">
            Drag and drop CSV/Excel files here
          </h3>
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

          <p className="text-xs text-gray-500 mt-4">
            Supported formats: CSV, Excel
          </p>
        </div>

        {fileInfo && (
          <div className="mt-5 flex items-center justify-between bg-white p-3 rounded shadow border">
            <div>
              <p className="text-sm font-medium text-gray-800">{fileName}</p>
              <p className="text-xs text-gray-500">
                {(fileInfo.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowTable(!showTable)}
                className="text-blue-600 hover:text-blue-800"
                title="Preview"
              >
                <FiEye size={18} />
              </button>
              <button
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-700"
                title="Remove"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        )}

        {showTable && csvData.length > 0 && (
          <div className="mt-6 max-h-64 overflow-auto border rounded-lg shadow bg-white">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  {Object.keys(csvData[0]).map((header, i) => (
                    <th
                      key={i}
                      className="py-2 px-3 font-semibold border-b"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.slice(0, 20).map((row, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    {Object.values(row).map((val, j) => (
                      <td key={j} className="py-2 px-3">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadContact;
