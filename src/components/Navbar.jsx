import { FiMenu, FiBell, FiUser, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Upload Contact', path: '/upload-contact' },
    { name: 'Upload Audio', path: '/upload-audio' },
    { name: 'Trigger Calls', path: '/trigger-calls' },
    { name: 'Call History', path: '/call-history' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-20 lg:left-0">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            {sidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="px-1 pt-1 border-b-2 border-transparent hover:border-blue-500 text-gray-500 hover:text-gray-700"
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* User controls */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 relative">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <FiUser className="text-blue-600 w-4 h-4" />
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 hidden md:inline">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;