import { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import UploadContact from './components/UploadContact';
import UploadAudio from './components/UploadAudio';
import TriggerCalls from './components/TriggerCalls';
import CallHistory from './components/CallHistory';
import Login from './pages/Login';
import Signup from './pages/Signup';

export const AuthContext = createContext();

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          {isAuthenticated ? (
            <>
              <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              
              <main className={`pt-16 transition-all duration-200 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
                <div className="p-4 md:p-6">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/upload-contact" element={<UploadContact />} />
                    <Route path="/upload-audio" element={<UploadAudio />} />
                    <Route path="/trigger-calls" element={<TriggerCalls />} />
                    <Route path="/call-history" element={<CallHistory />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </div>
              </main>
            </>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;