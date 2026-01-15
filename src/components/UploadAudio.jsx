import { FiMusic, FiTrash2, FiEye } from 'react-icons/fi';
import { useState } from 'react';

const UploadAudio = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileInfo, setFileInfo] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setFileInfo(file);
      setAudioURL(URL.createObjectURL(file));
      setShowPreview(false); // wait for user to click preview

      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);
        if (progress >= 100) clearInterval(interval);
      }, 100);
    } else {
      alert('Please upload a valid audio file (MP3, WAV, OGG)');
    }
  };

  const handleRemoveFile = () => {
    setFileInfo(null);
    setUploadProgress(0);
    setAudioURL('');
    setShowPreview(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Upload Audio Files</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <FiMusic className="text-4xl text-purple-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-700">Drag and drop audio files here</h3>
          <p className="text-gray-500 mt-1">or</p>
          <label className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-block cursor-pointer">
            Browse Files
            <input
              type="file"
              className="hidden"
              accept=".mp3,.wav,.ogg"
              onChange={handleFileUpload}
            />
          </label>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-purple-600 h-2.5 rounded-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          <p className="text-xs text-gray-500 mt-4">Supported formats: MP3, WAV, OGG</p>
        </div>

        {/* Preview Card After Upload */}
        {fileInfo && uploadProgress === 100 && (
          <div className="mt-5 flex items-center justify-between bg-white p-3 rounded shadow border">
            <div>
              <p className="text-sm font-medium text-gray-800">{fileInfo.name}</p>
              <p className="text-xs text-gray-500">{(fileInfo.size / 1024).toFixed(2)} KB</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="text-purple-600 hover:text-purple-800"
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

        {/* Audio Preview */}
        {showPreview && audioURL && (
          <div className="mt-4 border rounded-lg p-4 bg-gray-50">
            <audio src={audioURL} controls className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadAudio;
