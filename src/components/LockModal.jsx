import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Lock, ArrowRight } from 'lucide-react';

const LockModal = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // ENV se password nikalo (Default: 'admin')
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin";

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      // Sahi password -> Admin Login pe bhejo
      onClose();
      navigate('/admin'); 
    } else {
      // Galat password -> Error dikhao
      setError(true);
      setTimeout(() => setError(false), 2000); // 2 sec baad error hata do
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      
      {/* Modal Card */}
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl relative border border-gray-100 scale-100 animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Lock size={32} />
          </div>
          
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight">Restricted</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
              Authorized Personnel Only
            </p>
          </div>

          <form onSubmit={handleUnlock} className="relative">
            <input 
              type="password" 
              placeholder="Enter Access Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-gray-50 border-2 rounded-xl px-4 py-3 text-center font-bold tracking-widest focus:outline-none focus:border-black transition-all ${
                error ? "border-red-500 bg-red-50 text-red-500 placeholder-red-300" : "border-gray-100"
              }`}
              autoFocus
            />
            
            <button 
              type="submit"
              className="absolute right-2 top-2 p-1.5 bg-black text-white rounded-lg hover:scale-105 transition-transform"
            >
              <ArrowRight size={20} />
            </button>
          </form>
          
          {error && (
            <p className="text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
              Access Denied: Invalid Key
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LockModal;