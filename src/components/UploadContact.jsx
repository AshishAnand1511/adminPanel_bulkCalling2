import { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { FiUpload, FiEye, FiTrash2 } from 'react-icons/fi';
import { auth, db } from "../firebaseConfig";
import { doc, collection, setDoc } from 'firebase/firestore';

const UploadContact = () => {
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false); // ✅ New state

  // ✅ Function to upload contacts to Firestore
  const uploadToFirestore = async (contacts) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      setUploading(true);
      const userRef = doc(db, "users", user.uid);
      const contactsRef = collection(userRef, "contacts");

      for (let contact of contacts) {
        const contactDoc = doc(contactsRef); // auto-ID
        await setDoc(contactDoc, contact);
      }

      alert("Contacts uploaded to Firestore!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload contacts.");
    } finally {
      setUploading(false);
    }
  };

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setFileInfo(file);
  setFileName(file.name);
  setUploadProgress(10);
  setTimeout(() => setUploadProgress(50), 200);
  setTimeout(() => setUploadProgress(100), 500);

  const reader = new FileReader();

if (file.name.endsWith('.csv')) {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      setCsvData(results.data);
      setShowTable(false);
      uploadToFirestore(results.data); // ✅ Un-commented for CSV
    },
  });
} else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
  reader.onload = (evt) => {
    const data = new Uint8Array(evt.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    setCsvData(jsonData);
    setShowTable(false);
    uploadToFirestore(jsonData); // ✅ Un-commented for Excel
  };
  reader.readAsArrayBuffer(file);
}
else {
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
              disabled={uploading} // ✅ disable when uploading
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
                disabled={uploading} // ✅ disable when uploading
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
