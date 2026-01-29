import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';

function Signup() {
  const [formData, setForm] = useState({ username: '', email: '', password: '', re_password: '' });
  const [loading, setLoading] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [modal, setModal] = useState({ open: false, title: '', msg: '', type: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.re_password) {
        setModal({ open: true, title: 'Validation Error', msg: 'Passwords do not match!', type: 'error' });
        return;
    }
    setLoading(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/signup/', formData);
      setIsSignedUp(true); 
    } catch (err) {
      setModal({ open: true, title: 'Signup Failed', msg: err.response?.data?.error || 'Could not create account', type: 'error' });
    }
    setLoading(false);
  };

  if (isSignedUp) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-10 rounded-xl shadow-xl text-center max-w-md border border-gray-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Check Your Email</h2>
          <p className="text-gray-600 leading-relaxed">
            A verification link has been sent to <br/>
            <span className="font-semibold text-indigo-600">{formData.email}</span>. <br/>
            Please activate your account to continue.
          </p>
          <button 
            onClick={() => navigate('/login')} 
            className="mt-8 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <Modal isOpen={modal.open} title={modal.title} message={modal.msg} type={modal.type} onClose={() => setModal({...modal, open: false})} />
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        {/* Branding Header */}
        <div className="bg-indigo-700 p-6 text-center text-white">
          <h1 className="text-xl font-bold">Student Monitoring System</h1>
          <p className="text-indigo-200 text-xs uppercase tracking-wider mt-1">Account Registration</p>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input 
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                placeholder="jdoe24" 
                onChange={e => setForm({...formData, username: e.target.value})} 
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                type="email" 
                placeholder="email@institution.edu" 
                onChange={e => setForm({...formData, email: e.target.value})} 
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                  type="password" 
                  placeholder="••••••••" 
                  onChange={e => setForm({...formData, password: e.target.value})} 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm</label>
                <input 
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                  type="password" 
                  placeholder="••••••••" 
                  onChange={e => setForm({...formData, re_password: e.target.value})} 
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account? <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Log in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;