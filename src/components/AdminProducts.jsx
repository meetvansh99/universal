import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import uploadToCloudinary from '../utils/uploadCloudinary'; 
import { Plus, Trash2, Edit2, UploadCloud, Loader, Star, Check } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    onSnapshot(collection(db, "categories"), (snap) => {
      setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const reset = () => {
    setIsEditing(false); setName(""); setPrice(""); setCategory(""); 
    setDescription(""); setImage(null); setPreview(""); setFeatured(false);
    setEditId(null);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) return alert("Please select a category!");
    setLoading(true);

    try {
      let finalImageUrl = preview;
      if (image) {
        // Upload with compression logic
        finalImageUrl = await uploadToCloudinary(image);
      }

      const productData = {
        name,
        price: Number(price),
        category,
        description,
        imageUrl: finalImageUrl,
        featured,
        updatedAt: new Date()
      };

      if (isEditing) {
        await updateDoc(doc(db, "products", editId), productData);
        alert("✅ Product Updated!");
      } else {
        await addDoc(collection(db, "products"), { ...productData, createdAt: new Date() });
        alert("🚀 Product Added to Firebase!");
      }
      reset();
    } catch (err) {
      console.error("Submit Error:", err);
      alert(`❌ Firebase Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8 bg-gray-50 p-6 rounded-[2.5rem] border border-gray-200">
        <div className="space-y-4">
          <input type="text" placeholder="Product Name" value={name} onChange={e=>setName(e.target.value)} className="w-full p-4 rounded-2xl border bg-white font-bold" required />
          <div className="flex gap-4">
            <input type="number" placeholder="Price (₹)" value={price} onChange={e=>setPrice(e.target.value)} className="w-1/2 p-4 rounded-2xl border bg-white font-bold" required />
            <select value={category} onChange={e=>setCategory(e.target.value)} className="w-1/2 p-4 rounded-2xl border bg-white font-bold" required>
              <option value="">Category</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="w-full p-4 rounded-2xl border bg-white h-32 resize-none" />
          <div className="flex items-center gap-3 p-2 cursor-pointer" onClick={() => setFeatured(!featured)}>
             <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${featured ? 'bg-black border-black text-white' : 'bg-white border-gray-200'}`}>
                {featured ? <Star size={16} fill="white" /> : <Star size={16} className="text-gray-300" />}
             </div>
             <span className="text-[10px] font-black uppercase tracking-widest">Featured on Home Page</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
           <label className="border-2 border-dashed border-gray-300 h-64 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer overflow-hidden relative bg-white hover:border-black transition-colors">
             {preview ? <img src={preview} className="w-full h-full object-cover" /> : <div className="text-center"><UploadCloud size={48} className="text-gray-300 mx-auto" /><p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-2">Upload Image</p></div>}
             <input type="file" className="hidden" onChange={e => { if(e.target.files[0]) { setImage(e.target.files[0]); setPreview(URL.createObjectURL(e.target.files[0])); }}} />
           </label>
           <button type="submit" disabled={loading} className="bg-black text-white p-5 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-gray-800 disabled:opacity-50">
             {loading ? <div className="flex items-center justify-center gap-2"><Loader className="animate-spin" size={20} /> SYNCING...</div> : (isEditing ? "Update Drop" : "Launch Product")}
           </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(p => (
          <div key={p.id} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-[2rem] shadow-sm">
            <img src={p.imageUrl} className="w-20 h-20 rounded-2xl object-cover border" />
            <div className="flex-1 min-w-0"><h4 className="font-bold text-gray-900 truncate uppercase text-sm">{p.name}</h4><p className="font-black text-gray-400 text-xs italic">₹{p.price}</p></div>
            <div className="flex gap-2">
              <button onClick={() => { setIsEditing(true); setEditId(p.id); setName(p.name); setPrice(p.price); setCategory(p.category); setDescription(p.description); setPreview(p.imageUrl); setFeatured(p.featured); window.scrollTo(0,0); }} className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Edit2 size={16}/></button>
              <button onClick={async () => { if(window.confirm("Delete?")) await deleteDoc(doc(db, "products", p.id)) }} className="p-3 bg-red-50 text-red-500 rounded-xl"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;