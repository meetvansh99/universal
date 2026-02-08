import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Star, LogOut, Menu, X, ShieldCheck } from 'lucide-react';

// --- COMPONENTS IMPORT ---
import AdminCategories from '../components/AdminCategories';
import AdminProducts from '../components/AdminProducts';
import AdminFeatured from '../components/AdminFeatured';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 👇 FIXED LOGOUT: Pehle confirm, phir signout, phir redirect to LOGIN
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout from Admin Panel?")) {
      try {
        await signOut(auth);
        navigate('/admin'); // Redirect back to login for security
      } catch (error) {
        console.error("Logout Error:", error);
      }
    }
  };

  // Sidebar Menu Items
  const menuItems = [
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'categories', label: 'Categories', icon: LayoutDashboard },
    { id: 'featured', label: 'Featured', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-[#E5E5E5] font-sans text-gray-900 flex flex-col md:flex-row relative">
      
      {/* --- BACKGROUND DECOR (Sync with Home Theme) --- */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/5 blur-[100px] rounded-full"></div>
      </div>

      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white transition-transform duration-500 ease-in-out 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-[20px_0_60px_-15px_rgba(0,0,0,0.3)] flex flex-col`}>
        
        {/* Sidebar Header */}
        <div className="p-8 border-b border-gray-900/50">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={14} className="text-gray-500" />
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-500">Security Active</span>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">
            AEVORA<span className="text-gray-500 text-xs ml-1 font-normal not-italic">ADMIN</span>
          </h2>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 flex-grow space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-white text-black shadow-xl translate-x-2' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom Logout Button */}
        <div className="p-4 border-t border-gray-900/50">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-2 bg-red-950/20 text-red-500 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300 border border-red-500/20 shadow-lg"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col min-h-screen md:ml-64">
        
        {/* Mobile Header */}
        <header className="md:hidden bg-white/40 backdrop-blur-xl p-5 flex justify-between items-center sticky top-0 z-40 border-b border-white/20">
          <h2 className="text-sm font-black uppercase tracking-widest italic">Admin Hub</h2>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-2 bg-black text-white rounded-xl active:scale-90 transition-all"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Page Content */}
        <div className="p-6 md:p-16">
          <div className="max-w-5xl mx-auto">
            
            {/* Page Title */}
            <div className="mb-12 animate-in fade-in slide-in-from-left-4 duration-700">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mb-3">
                System / {activeTab}
              </p>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 leading-none">
                {menuItems.find(i => i.id === activeTab)?.label} <span className="text-gray-300">Hub</span>
              </h1>
            </div>
            
            {/* 👇 PANEL: Full Glass Effect */}
            <div className="bg-white/40 backdrop-blur-2xl rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-6 md:p-10 min-h-[600px] border border-white/60 animate-in zoom-in-95 duration-500">
              
              {/* Conditional Rendering */}
              {activeTab === 'categories' && <AdminCategories />}
              {activeTab === 'products' && <AdminProducts />}
              {activeTab === 'featured' && <AdminFeatured />}
              
            </div>

            {/* Bottom Credits */}
            <div className="mt-16 text-center">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                <span className="w-8 h-[1px] bg-gray-300"></span>
                Secure Management System
                <span className="w-8 h-[1px] bg-gray-300"></span>
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;