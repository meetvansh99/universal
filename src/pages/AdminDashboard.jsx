// // import React, { useState } from 'react';
// // import { auth } from '../firebase/firebase';
// // import { signOut } from 'firebase/auth';
// // import { useNavigate } from 'react-router-dom';
// // import { LayoutDashboard, ShoppingBag, Star, LogOut, Menu, X, ShieldCheck } from 'lucide-react';

// // // --- COMPONENTS IMPORT ---
// // import AdminCategories from '../components/AdminCategories';
// // import AdminProducts from '../components/AdminProducts';
// // import AdminFeatured from '../components/AdminFeatured';

// // const AdminDashboard = () => {
// //   const [activeTab, setActiveTab] = useState('products');
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const navigate = useNavigate();

// //   // 👇 FIXED LOGOUT: Redirects directly to HOME (/)
// //   const handleLogout = async () => {
// //     if (window.confirm("Are you sure you want to logout from Admin Panel?")) {
// //       try {
// //         await signOut(auth);
// //         navigate('/'); // 👈 Redirect to Home
// //       } catch (error) {
// //         console.error("Logout Error:", error);
// //       }
// //     }
// //   };

// //   const menuItems = [
// //     { id: 'products', label: 'Products', icon: ShoppingBag },
// //     { id: 'categories', label: 'Categories', icon: LayoutDashboard },
// //     { id: 'featured', label: 'Featured', icon: Star },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-[#E5E5E5] font-sans text-gray-900 flex flex-col md:flex-row relative">
      
// //       {/* --- BACKGROUND DECOR --- */}
// //       <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
// //         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/5 blur-[100px] rounded-full"></div>
// //         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/5 blur-[100px] rounded-full"></div>
// //       </div>

// //       {/* --- SIDEBAR --- */}
// //       <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white transition-transform duration-500 ease-in-out 
// //         ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-[20px_0_60px_-15px_rgba(0,0,0,0.3)] flex flex-col`}>
        
// //         <div className="p-8 border-b border-gray-900/50">
// //           <div className="flex items-center gap-2 mb-1">
// //             <ShieldCheck size={14} className="text-gray-500" />
// //             <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-500">Security Active</span>
// //           </div>
// //           <h2 className="text-2xl font-black uppercase tracking-tighter italic">
// //             AEVORA<span className="text-gray-500 text-xs ml-1 font-normal not-italic">ADMIN</span>
// //           </h2>
// //         </div>

// //         <nav className="p-4 flex-grow space-y-2">
// //           {menuItems.map((item) => (
// //             <button
// //               key={item.id}
// //               onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
// //               className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
// //                 activeTab === item.id 
// //                   ? 'bg-white text-black shadow-xl translate-x-2' 
// //                   : 'text-gray-500 hover:text-white hover:bg-white/5'
// //               }`}
// //             >
// //               <item.icon size={18} /> {item.label}
// //             </button>
// //           ))}
// //         </nav>

// //         <div className="p-4 border-t border-gray-900/50">
// //           <button 
// //             onClick={handleLogout} 
// //             className="w-full flex items-center justify-center gap-2 bg-red-950/20 text-red-500 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300 border border-red-500/20 shadow-lg"
// //           >
// //             <LogOut size={16} /> Logout
// //           </button>
// //         </div>
// //       </aside>

// //       {/* --- MAIN CONTENT AREA --- */}
// //       <main className="flex-1 flex flex-col min-h-screen md:ml-64">
        
// //         {/* Mobile Header */}
// //         <header className="md:hidden bg-white/40 backdrop-blur-xl p-4 flex justify-between items-center sticky top-0 z-40 border-b border-white/20">
// //           <h2 className="text-xs font-black uppercase tracking-widest italic tracking-tighter">Admin Hub</h2>
// //           <button 
// //             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
// //             className="p-2 bg-black text-white rounded-xl active:scale-90 transition-all"
// //           >
// //             {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
// //           </button>
// //         </header>

// //         {/* Page Content */}
// //         <div className="p-4 md:p-16">
// //           <div className="max-w-5xl mx-auto">
            
// //             {/* Page Title (Responsive) */}
// //             <div className="mb-8 md:mb-12 animate-in fade-in slide-in-from-left-4 duration-700">
// //               <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mb-2 md:mb-3">
// //                 System / {activeTab}
// //               </p>
// //               <h1 className="text-3xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 leading-none">
// //                 {menuItems.find(i => i.id === activeTab)?.label} <span className="text-gray-300">Hub</span>
// //               </h1>
// //             </div>
            
// //             <div className="bg-white/40 backdrop-blur-2xl rounded-[2rem] md:rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-4 md:p-10 min-h-[500px] md:min-h-[600px] border border-white/60">
// //               {activeTab === 'categories' && <AdminCategories />}
// //               {activeTab === 'products' && <AdminProducts />}
// //               {activeTab === 'featured' && <AdminFeatured />}
// //             </div>

// //             <div className="mt-12 text-center pb-8">
// //               <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center justify-center gap-2">
// //                 <span className="w-8 h-[1px] bg-gray-300"></span>
// //                 Secure System
// //                 <span className="w-8 h-[1px] bg-gray-300"></span>
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </main>

// //       {isMobileMenuOpen && (
// //         <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminDashboard;

// import React, { useState } from 'react';
// import { auth } from '../firebase/firebase';
// import { signOut } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { LayoutDashboard, ShoppingBag, Star, LogOut, Menu, X, ShieldCheck } from 'lucide-react';

// import AdminCategories from '../components/AdminCategories';
// import AdminProducts from '../components/AdminProducts';
// import AdminFeatured from '../components/AdminFeatured';

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('products');
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     if (window.confirm("Bhai, logout karna hai?")) {
//       try {
//         await signOut(auth);
//         navigate('/'); // 👈 Fixed: Ab Home Page par jayega
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   const menuItems = [
//     { id: 'products', label: 'Products', icon: ShoppingBag },
//     { id: 'categories', label: 'Categories', icon: LayoutDashboard },
//     { id: 'featured', label: 'Featured', icon: Star },
//   ];

//   return (
//     <div className="min-h-screen bg-[#E5E5E5] flex flex-col md:flex-row relative overflow-x-hidden">
//        {/* Background Decor */}
//        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/5 blur-[100px] rounded-full"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/5 blur-[100px] rounded-full"></div>
//       </div>

//       <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white transition-transform duration-500 ease-in-out 
//         ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col`}>
//         <div className="p-8 border-b border-gray-900/50">
//           <h2 className="text-2xl font-black uppercase tracking-tighter italic">AEVORA ADMIN</h2>
//         </div>
//         <nav className="p-4 flex-grow space-y-2">
//           {menuItems.map((item) => (
//             <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} 
//               className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}>
//               <item.icon size={18} /> {item.label}
//             </button>
//           ))}
//         </nav>
//         <div className="p-4 border-t border-gray-900/50">
//           <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-950/20 text-red-500 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-500/20 hover:bg-red-600 hover:text-white transition-all">
//             <LogOut size={16} /> Logout
//           </button>
//         </div>
//       </aside>

//       <main className="flex-1 flex flex-col min-h-screen md:ml-64">
//         <header className="md:hidden bg-white/40 backdrop-blur-xl p-4 flex justify-between items-center sticky top-0 z-40 border-b border-white/20">
//           <h2 className="text-xs font-black uppercase italic tracking-widest">Admin Hub</h2>
//           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-black text-white rounded-xl">
//             {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </header>

//         <div className="p-4 md:p-16">
//           <div className="max-w-5xl mx-auto">
//             <div className="mb-12">
//               <h1 className="text-3xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 leading-none">
//                 {menuItems.find(i => i.id === activeTab)?.label} <span className="text-gray-300">Hub</span>
//               </h1>
//             </div>
//             <div className="bg-white/40 backdrop-blur-2xl rounded-[2.5rem] md:rounded-[3.5rem] p-4 md:p-10 border border-white/60 min-h-[500px]">
//               {activeTab === 'categories' && <AdminCategories />}
//               {activeTab === 'products' && <AdminProducts />}
//               {activeTab === 'featured' && <AdminFeatured />}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Star, LogOut, Menu, X, ShieldCheck } from 'lucide-react';

import AdminCategories from '../components/AdminCategories';
import AdminProducts from '../components/AdminProducts';
import AdminFeatured from '../components/AdminFeatured';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to exit the Admin Panel?")) {
      try {
        await signOut(auth);
        // Auth Guard (App.jsx) ab apne aap redirect handle karega
      } catch (error) {
        console.error("Logout Error:", error);
      }
    }
  };

  const menuItems = [
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'categories', label: 'Categories', icon: LayoutDashboard },
    { id: 'featured', label: 'Featured', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-[#E5E5E5] flex flex-col md:flex-row relative">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col`}>
        <div className="p-8 border-b border-gray-900/50">
          <h2 className="text-2xl font-black uppercase tracking-tighter italic italic">AEVORA ADMIN</h2>
        </div>
        <nav className="p-4 flex-grow space-y-2">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest ${activeTab === item.id ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}>
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-900/50">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-950/20 text-red-500 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-500/20 hover:bg-red-600 hover:text-white transition-all transition-all">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen md:ml-64">
        <header className="md:hidden bg-white/40 backdrop-blur-xl p-4 flex justify-between items-center sticky top-0 z-40 border-b border-white/20">
          <h2 className="text-xs font-black uppercase italic">Admin Hub</h2>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-black text-white rounded-xl active:scale-90 transition-all">
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        <div className="p-4 md:p-16">
          <div className="max-w-5xl auto">
            <div className="mb-12">
              <h1 className="text-3xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 leading-none">
                {menuItems.find(i => i.id === activeTab)?.label} <span className="text-gray-300">Hub</span>
              </h1>
            </div>
            <div className="bg-white/40 backdrop-blur-2xl rounded-[2rem] md:rounded-[3.5rem] p-4 md:p-10 border border-white/60 min-h-[500px]">
              {activeTab === 'categories' && <AdminCategories />}
              {activeTab === 'products' && <AdminProducts />}
              {activeTab === 'featured' && <AdminFeatured />}
            </div>
          </div>
        </div>
      </main>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
    </div>
  );
};

export default AdminDashboard;