import { Link } from 'react-router-dom';
import { FiLogOut, FiLogIn, FiHome, FiUpload, FiMusic, FiPhone, FiClock } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '../App';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <FiHome />, path: '/dashboard' },
    { name: 'Upload Contact', icon: <FiUpload />, path: '/upload-contact' },
    { name: 'Upload Audio', icon: <FiMusic />, path: '/upload-audio' },
    { name: 'Trigger Calls', icon: <FiPhone />, path: '/trigger-calls' },
    { name: 'Call History', icon: <FiClock />, path: '/call-history' },
  ];

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <aside className={`fixed inset-y-0 left-0 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden transition-transform duration-200 ease-in-out z-30 w-64`}>
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
          <h1 className="text-white font-bold text-xl">Call Admin</h1>
        </div>

        <nav className="flex-1 space-y-2 mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-100 transition-all"
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
          >
            <FiLogOut className="text-xl mr-3" />
            <span>Logout</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center w-full px-4 py-3 rounded-lg text-blue-600 hover:bg-blue-50 transition-all"
          >
            <FiLogIn className="text-xl mr-3" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;