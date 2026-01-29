import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem('username') || 'Administrator';
  const [activeTab, setActiveTab] = useState('overview');

  const logout = () => {
    Swal.fire({
      title: 'Sign Out?',
      text: "Are you sure you want to log out of the system?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate('/login');
      }
    });
  };

  // Dummy stats for the UI design
  const stats = [
    { label: 'Total Students', value: '1,284', icon: '👥', color: 'bg-blue-500' },
    { label: 'Avg. Attendance', value: '94.2%', icon: '📅', color: 'bg-green-500' },
    { label: 'Pending Alerts', value: '12', icon: '⚠️', color: 'bg-yellow-500' },
    { label: 'New Enrollments', value: '+48', icon: '🎓', color: 'bg-indigo-500' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-indigo-800">
          <h2 className="text-xl font-bold tracking-wider italic">SMS PORTAL</h2>
        </div>
        
        <nav className="flex-grow p-4 space-y-2 mt-4">
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-indigo-800 text-white">
            <span>📊</span> <span>Dashboard</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-800 transition-colors text-indigo-200">
            <span>🧑‍🎓</span> <span>Student List</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-800 transition-colors text-indigo-200">
            <span>📝</span> <span>Reports</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-800 transition-colors text-indigo-200">
            <span>⚙️</span> <span>Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-indigo-800">
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-all"
          >
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* TOP BAR */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">System Overview</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 italic">Welcome back,</span>
            <span className="font-bold text-indigo-700">{user}</span>
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
              {user.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl shadow-inner`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* PLACEHOLDER FOR RECENT ACTIVITY */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Recent System Activity</h3>
              <button className="text-indigo-600 text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                      <p className="text-gray-700 text-sm font-medium italic">Student verification completed for ID #2024-00{i}</p>
                    </div>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}