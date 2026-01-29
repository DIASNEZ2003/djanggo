import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';

function Activate() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const ranOnce = useRef(false);
  const [status, setStatus] = useState('verifying');
  const [modal, setModal] = useState({ open: false, title: '', msg: '', type: '' });

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;

    axios.post('http://127.0.0.1:8000/api/activate/', { uid, token })
      .then(() => {
        setStatus('success');
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch(() => {
        setStatus('error');
        setModal({ open: true, title: 'Activation Failed', msg: 'The link is invalid or expired.', type: 'error' });
      });
  }, [uid, token, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Modal isOpen={modal.open} title={modal.title} message={modal.msg} type={modal.type} onClose={() => navigate('/signup')} />
      <div className="bg-white p-10 rounded-lg shadow-md text-center">
        {status === 'verifying' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Verifying Account...</h2>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </>
        )}
        {status === 'success' && <h2 className="text-2xl font-bold text-green-600">Account Activated! Redirecting...</h2>}
        {status === 'error' && <h2 className="text-2xl font-bold text-red-600">Activation Link Error</h2>}
      </div>
    </div>
  );
}
export default Activate;