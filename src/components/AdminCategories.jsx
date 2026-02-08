import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Plus, Trash2, Edit2, X, Check, Loader } from 'lucide-react';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. REAL-TIME DATA FETCHING
  useEffect(() => {
    const q = query(collection(db, "categories"), orderBy("name"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cats = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(cats);
    });
    return () => unsubscribe();
  }, []);

  // 2. ADD CATEGORY FUNCTION
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "categories"), { name: newCategory.trim() });
      setNewCategory(""); 
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. DELETE CATEGORY FUNCTION
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteDoc(doc(db, "categories", id));
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  // 4. EDIT FUNCTIONS
  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
  };

  const handleUpdate = async () => {
    if (!editingName.trim()) return;
    try {
      await updateDoc(doc(db, "categories", editingId), { name: editingName.trim() });
      setEditingId(null);
      setEditingName("");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black uppercase tracking-tight">Manage Categories</h2>
        <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">{categories.length} Total</span>
      </div>

      {/* --- ADD FORM --- */}
      <form onSubmit={handleAdd} className="flex gap-4 mb-10">
        <input 
          type="text" 
          placeholder="New Category Name (e.g. Sneakers)" 
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-black transition-colors"
        />
        <button 
          type="submit" 
          disabled={loading || !newCategory}
          className="bg-black text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? <Loader size={18} className="animate-spin" /> : <Plus size={20} />}
          <span className="hidden md:inline">Add</span>
        </button>
      </form>

      {/* --- LIST --- */}
      <div className="space-y-3">
        {categories.length === 0 ? (
          <p className="text-gray-400 text-center py-10 text-sm font-bold uppercase tracking-widest border-2 border-dashed border-gray-100 rounded-2xl">
            No categories found. Start adding above.
          </p>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="group flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all hover:bg-white hover:shadow-sm">
              
              {editingId === cat.id ? (
                // Edit Mode
                <div className="flex items-center gap-2 flex-1 mr-4">
                  <input 
                    type="text" 
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 font-bold focus:outline-none focus:border-black"
                    autoFocus
                  />
                  <button onClick={handleUpdate} className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"><Check size={18} /></button>
                  <button onClick={() => setEditingId(null)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><X size={18} /></button>
                </div>
              ) : (
                // View Mode
                <span className="font-bold text-gray-700 uppercase tracking-wide pl-2">
                  {cat.name}
                </span>
              )}

              {editingId !== cat.id && (
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => startEdit(cat)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCategories;