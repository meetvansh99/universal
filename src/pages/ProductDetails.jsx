import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Loader, ArrowLeft, MessageCircle, ShieldCheck } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const phoneNumber = import.meta.env.VITE_WHATSAPP_NO || "917046570870";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#E5E5E5]">
      <Loader className="animate-spin mb-4" />
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Product...</p>
    </div>
  );

  if (!product) return <div className="min-h-screen flex justify-center items-center font-black uppercase">Product Not Found</div>;

  // 👇 DETAILED MESSAGE LOGIC WITH IMAGE LINK
  const message = `*NEW ORDER INQUIRY* 🔥

*Product Name:* ${product.name}
*Price:* ₹${product.price}
*Category:* ${product.category}

*Product Image:* ${product.imageUrl}

------------------------------
Hello Aevora! I'm interested in buying this product. Is it available in stock?`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 relative overflow-hidden bg-[#E5E5E5]">
      
      {/* Background Decor */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/5 blur-[120px] rounded-full -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-400/5 blur-[140px] rounded-full -z-10"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black mb-10 transition-all"
        >
          <ArrowLeft size={16} /> Back to Collection
        </button>

        {/* --- MAIN GLASS CONTAINER --- */}
        <div className="grid md:grid-cols-2 gap-10 bg-white/30 backdrop-blur-xl border border-white/40 p-5 md:p-12 rounded-[3.5rem] shadow-2xl">
          
          {/* Image Container */}
          <div className="aspect-square rounded-[2.5rem] bg-white/20 overflow-hidden relative border border-white/20 shadow-inner group">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-3 block">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-4">
                {product.name}
              </h1>
              <p className="text-2xl md:text-4xl font-black text-gray-800 italic">
                ₹{product.price}
              </p>
            </div>

            <div className="h-[1px] bg-black/5 w-full"></div>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium opacity-80">
              {product.description || "Designed for those who walk the future. This exclusive drop combines premium craftsmanship with elite style."}
            </p>

            <div className="pt-6">
              <a 
                href={whatsappUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-4 w-full py-6 rounded-[2rem] bg-black text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-gray-900 transition-all active:scale-95 shadow-2xl"
              >
                <MessageCircle size={22} />
                Buy on WhatsApp
              </a>
              
              <p className="mt-4 flex items-center justify-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                <ShieldCheck size={12} /> Encrypted & Secure Ordering
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;