import React from 'react';
import { Instagram, Phone, MapPin, MessageCircle, Clock, Send } from 'lucide-react';

const Contact = () => {
  const shopName = import.meta.env.VITE_SHOP_NAME || "AEVORA SHOES";
  // 👇 Email ko nikaal kar Instagram logic set kiya
  const instagram = import.meta.env.VITE_INSTAGRAM || "#"; 
  const phone = import.meta.env.VITE_PHONE || "+91 70465 70870";
  const whatsapp = import.meta.env.VITE_WHATSAPP_NO || "917046570870";
  const location = import.meta.env.VITE_LOCATION || "Ahmedabad, Gujarat";

  const contactMethods = [
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      value: phone,
      link: `tel:${phone}`
    },
    {
      icon: <MessageCircle size={24} />,
      title: "WhatsApp",
      value: "Chat with us",
      link: `https://wa.me/${whatsapp}`
    },
    {
      icon: <Instagram size={24} />, // 👇 Email ki jagah Instagram block
      title: "Instagram",
      value: "@aevorashoes",
      link: instagram
    },
    {
      icon: <Clock size={24} />,
      title: "Working Hours",
      value: "10 AM - 8 PM",
      link: null
    }
  ];

  return (
    <div className="min-h-screen pt-40 pb-20 px-4 md:px-8 relative overflow-hidden bg-[#E5E5E5]">
      {/* Mesh Gradients for Glass Effect */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-400/10 blur-[140px] rounded-full -z-10 animate-pulse"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 mb-4">Get In Touch</p>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-gray-900 leading-none mb-6">
            Contact <span className="text-gray-400/30">Us</span>
          </h1>
          <div className="w-16 h-[3px] bg-black mx-auto rounded-full opacity-20"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side: Dynamic Contact Cards */}
          <div className="lg:col-span-1 space-y-4">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className="group p-6 rounded-[2rem] bg-white/30 backdrop-blur-xl border border-white/40 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/50"
              >
                <div className="flex items-center gap-5">
                  <div className="p-4 rounded-2xl bg-black text-white shadow-lg group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{method.title}</p>
                    {method.link ? (
                      <a href={method.link} target="_blank" rel="noreferrer" className="text-sm font-bold text-gray-900 hover:underline">
                        {method.value}
                      </a>
                    ) : (
                      <p className="text-sm font-bold text-gray-900">{method.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Map Display */}
          <div className="lg:col-span-2">
            <div className="h-full min-h-[450px] rounded-[3rem] bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl overflow-hidden relative group">
              <div className="absolute top-8 left-8 z-20">
                <div className="bg-black/90 backdrop-blur-md text-white px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/10">
                  <MapPin className="text-blue-400" />
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Our Studio</p>
                    <p className="text-xs font-bold uppercase tracking-tight">{location}</p>
                  </div>
                </div>
              </div>

              <div className="w-full h-full bg-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=2000&auto=format&fit=crop" 
                  alt="Location Map" 
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-12 text-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] flex items-center justify-center gap-3">
            <span className="w-10 h-[1px] bg-gray-300"></span>
            Aevora Premium Support Active
            <span className="w-10 h-[1px] bg-gray-300"></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;