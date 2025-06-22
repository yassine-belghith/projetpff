'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

interface Product {
  _id: string
  nomProduit: string
  prix: number
  quantiteStock: number
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    nomProduit: '',
    prix: 0,
    quantiteStock: 0
  })

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('No authentication token found. Please log in.')
        setLoading(false)
        return
      }
      const response = await axios.get('http://localhost:5001/api/admin/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: false
      })
      setProducts(response.data)
      setLoading(false)
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error fetching products')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:5001/api/admin/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNewProduct({ nomProduit: '', prix: 0, quantiteStock: 0 })
      fetchProducts()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error creating product')
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return
    try {
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:5001/api/admin/products/${editingProduct._id}`, editingProduct, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setEditingProduct(null)
      fetchProducts()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error updating product')
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:5001/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchProducts()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error deleting product')
    }
  }

  if (loading) return <div className="text-center py-10 text-gray-600">Chargement...</div>
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform duration-200 ease-in-out -translate-x-full lg:translate-x-0 border-r border-gray-200 shadow-lg">
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <span className="text-xl font-bold text-white">Yalla Clean</span>
          <button className="lg:hidden text-white hover:text-gray-200">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">A</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Admin</h3>
              <p className="text-xs text-gray-500">admin@pff.com</p>
            </div>
          </div>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <a className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900" href="/admin/dashboard">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="font-medium">Dashboard</span>
          </a>
          <a className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900" href="/admin/travailleurs">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className="font-medium">Travailleurs</span>
          </a>
          <a className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900" href="/admin/clients">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <polyline points="17 11 19 13 23 9"></polyline>
            </svg>
            <span className="font-medium">Clients</span>
          </a>
          <a className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 bg-blue-50 text-blue-600 shadow-sm" href="/admin/products">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span className="font-medium">Nos Produits</span>
          </a>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span className="font-medium">Se déconnecter</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">🛒 Gestion des Produits</h1>

          {/* Create Product Form */}
          <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Ajouter un Produit</h2>
        <form onSubmit={handleCreate} className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            value={newProduct.nomProduit}
            onChange={(e) => setNewProduct({ ...newProduct, nomProduit: e.target.value })}
            placeholder="Nom du produit"
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            value={newProduct.prix}
            onChange={(e) => setNewProduct({ ...newProduct, prix: Number(e.target.value) })}
            placeholder="Prix"
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            step="0.01"
          />
          <input
            type="number"
            value={newProduct.quantiteStock}
            onChange={(e) => setNewProduct({ ...newProduct, quantiteStock: Number(e.target.value) })}
            placeholder="Quantité en stock"
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
          />
          <div className="md:col-span-3 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>

          {/* Products Table */}
          <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
            <tr>
              <th className="px-6 py-4">Nom du Produit</th>
              <th className="px-6 py-4">Prix</th>
              <th className="px-6 py-4">Quantité</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  {editingProduct?._id === product._id ? (
                    <input
                      type="text"
                      value={editingProduct.nomProduit}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, nomProduit: e.target.value })
                      }
                      className="border border-gray-300 p-1 rounded"
                    />
                  ) : (
                    product.nomProduit
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingProduct?._id === product._id ? (
                    <input
                      type="number"
                      value={editingProduct.prix}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, prix: Number(e.target.value) })
                      }
                      className="border border-gray-300 p-1 rounded"
                      min="0"
                      step="0.01"
                    />
                  ) : (
                    `${product.prix} DT`
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingProduct?._id === product._id ? (
                    <input
                      type="number"
                      value={editingProduct.quantiteStock}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, quantiteStock: Number(e.target.value) })
                      }
                      className="border border-gray-300 p-1 rounded"
                      min="0"
                    />
                  ) : (
                    product.quantiteStock
                  )}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  {editingProduct?._id === product._id ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="text-green-600 hover:underline"
                      >
                        ✅
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="text-gray-500 hover:underline"
                      >
                        ❌
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="text-blue-600 hover:underline"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:underline"
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
