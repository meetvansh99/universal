// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowUpRight } from 'lucide-react';

// const ProductCard = ({ product }) => {
//   // ENV se Phone Number nikala
//   const phoneNumber = import.meta.env.VITE_WHATSAPP_NO || "917046570870";
  
//   // Message ready kiya
//   const message = `Hello Aevora! I'm interested in: ${product.name} (₹${product.price})`;
  
//   // WhatsApp URL
//   const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

//   return (
//     <div className="group relative block h-full">
//       {/* 👇 CARD: Pure White aur Shadow ko badhaya taaki contrast mile */}
//       <div className="h-full p-3 md:p-5 rounded-[2.5rem] transition-all duration-500 ease-out 
//                       bg-white border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
//                       group-hover:-translate-y-3 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] 
//                       flex flex-col">
        
//         {/* Link to Details Page */}
//         <Link to={`/product/${product.id}`}>
//           {/* 👇 Image Container ko thoda off-white/greyish touch diya */}
//           <div className="aspect-square rounded-[2rem] bg-[#F7F7F7] overflow-hidden mb-4 relative">
//             <img 
//               src={product.imageUrl} 
//               alt={product.name} 
//               className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
//             />
            
//             {/* Price Badge */}
//             <div className="absolute top-3 right-3 bg-black text-white px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black tracking-wider shadow-lg">
//               ₹{Number(product.price).toLocaleString('en-IN')}
//             </div>

//             {/* Hover Overlay */}
//             <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//               <div className="bg-white text-black p-3 rounded-full shadow-2xl transform scale-50 group-hover:scale-100 transition-transform duration-300">
//                 <ArrowUpRight size={18} />
//               </div>
//             </div>
//           </div>
//         </Link>

//         {/* Info Section */}
//         <div className="mt-auto px-1">
//           <p className="text-[9px] md:text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">
//             {product.category}
//           </p>
//           <Link to={`/product/${product.id}`}>
//             <h3 className="text-sm md:text-xl font-black text-gray-900 uppercase tracking-tighter leading-tight truncate hover:text-gray-600 transition-colors">
//               {product.name}
//             </h3>
//           </Link>
          
//           {/* 👇 PREMIUM WHATSAPP BUTTON */}
//           <a 
//             href={whatsappUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="mt-4 block w-full py-3.5 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-[0.15em] hover:bg-gray-800 transition-all text-center shadow-lg active:scale-95"
//           >
//             Order on WhatsApp
//           </a>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const ProductCard = ({ product }) => {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NO || "917046570870";
  const message = `Hello Aevora! I'm interested in: ${product.name} (₹${product.price})`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="group relative block h-full p-[2px]"> 
      {/* 👇 Real Glass Effect Card */}
      <div className="h-full p-4 md:p-5 rounded-[2.5rem] transition-all duration-500 ease-out 
                      bg-white/40 backdrop-blur-xl border border-white/40 shadow-xl
                      group-hover:-translate-y-3 group-hover:bg-white/60 group-hover:shadow-2xl 
                      flex flex-col relative overflow-hidden">
        
        {/* Glow Decorator (Glass ke peeche chamak) */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gray-200/50 blur-3xl rounded-full group-hover:bg-gray-300/60 transition-colors"></div>

        <Link to={`/product/${product.id}`}>
          <div className="aspect-square rounded-3xl bg-white/20 overflow-hidden mb-5 relative border border-white/20 shadow-inner">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
            />
            
            {/* Price Tag - Glass Style */}
            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black tracking-wider border border-white/10">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </div>
          </div>
        </Link>

        {/* Info */}
        <div className="mt-auto px-1 z-10">
          <p className="text-[9px] md:text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">
            {product.category}
          </p>
          <h3 className="text-sm md:text-xl font-black text-gray-900 uppercase tracking-tighter leading-tight truncate mb-4">
            {product.name}
          </h3>
          
          <a 
            href={whatsappUrl}
            target="_blank"
            className="block w-full py-3 rounded-2xl bg-black/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-[0.15em] hover:bg-black transition-all text-center shadow-lg active:scale-95 border border-white/10"
          >
            Get it now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;