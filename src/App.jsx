import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Dashboard from './components/dashboard';
import UploadContact from './components/uploadContact';
import UploadAudio from './components/uploadAudio';
import TriggerCalls from './components/triggerCalls';
import CallHistory from './components/callHistory';
import Login from './pages/Login';
import Signup from './pages/SignUp';
 
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Sidebar 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className={`pt-16 transition-all duration-200 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
          <div className="p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload-contact" element={<UploadContact />} />
              <Route path="/upload-audio" element={<UploadAudio />} />
              <Route path="/trigger-calls" element={<TriggerCalls />} />
              <Route path="/call-history" element={<CallHistory />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;