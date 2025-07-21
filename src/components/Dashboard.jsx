import { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [stats] = useState({
    totalContacts: 1245,
    totalCalls: 892,
    successfulCalls: 745,
    failedCalls: 147,
  });

  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Successful Calls',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderRadius: 4,
      },
      {
        label: 'Failed Calls',
        data: [12, 15, 8, 9, 14, 5, 10],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderRadius: 4,
      },
    ],
  };

  const pieChartData = {
    labels: ['Successful Calls', 'Failed Calls'],
    datasets: [
      {
        data: [stats.successfulCalls, stats.failedCalls],
        backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(255, 99, 132, 0.7)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Contacts" 
          value={stats.totalContacts} 
          icon="users" 
          color="bg-blue-100 text-blue-600" 
        />
        <StatCard 
          title="Total Calls" 
          value={stats.totalCalls} 
          icon="phone" 
          color="bg-green-100 text-green-600" 
        />
        <StatCard 
          title="Successful Calls" 
          value={stats.successfulCalls} 
          icon="check" 
          color="bg-purple-100 text-purple-600" 
        />
        <StatCard 
          title="Failed Calls" 
          value={stats.failedCalls} 
          icon="x" 
          color="bg-red-100 text-red-600" 
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm lg:col-span-2">
          <h3 className="font-medium text-gray-700 mb-4">Weekly Call Performance</h3>
          <div className="h-64">
            <Bar 
              data={barChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }} 
            />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="font-medium text-gray-700 mb-4">Call Success Rate</h3>
          <div className="h-64">
            <Pie 
              data={pieChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }} 
            />
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h3 className="font-medium text-gray-700 mb-4">Recent Calls</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">John Doe {item}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">+1 555-010{item}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item % 2 === 0 ? 'Success' : 'Failed'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{Math.floor(Math.random() * 120)}s</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{new Date().toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value.toLocaleString()}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <i className={`bx bx-${icon} text-xl`}></i>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;