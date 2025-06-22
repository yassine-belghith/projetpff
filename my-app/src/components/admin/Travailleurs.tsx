'use client'

import { useState, useEffect } from 'react'
import { FiEdit2, FiTrash2, FiUserPlus, FiSearch, FiX } from 'react-icons/fi'

interface Travailleur {
  _id: string
  name: string
  email: string
  createdAt: string
}

export default function Travailleurs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [travailleurs, setTravailleurs] = useState<Travailleur[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingTravailleur, setEditingTravailleur] = useState<Travailleur | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const fetchTravailleurs = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5001/api/admin/travailleurs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch travailleurs')
      }

      const { travailleurs: travailleursData } = await response.json()
      setTravailleurs(Array.isArray(travailleursData) ? travailleursData : [])
    } catch (err) {
      setError('Failed to load travailleurs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTravailleurs()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const url = editingTravailleur
        ? `http://localhost:5001/api/admin/travailleurs/${editingTravailleur._id}`
        : 'http://localhost:5001/api/auth/create-travailleur'
      
      const method = editingTravailleur ? 'PUT' : 'POST'
      const body = editingTravailleur
        ? { name: formData.name, email: formData.email }
        : formData

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error('Failed to save travailleur')
      }

      setShowModal(false)
      setEditingTravailleur(null)
      setFormData({ name: '', email: '', password: '' })
      fetchTravailleurs()
    } catch (err) {
      console.error(err)
      setError('Failed to save travailleur')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce travailleur ?')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5001/api/admin/travailleurs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete travailleur')
      }

      fetchTravailleurs()
    } catch (err) {
      console.error(err)
      setError('Failed to delete travailleur')
    }
  }

  const openEditModal = (travailleur: Travailleur) => {
    setEditingTravailleur(travailleur)
    setFormData({
      name: travailleur.name,
      email: travailleur.email,
      password: ''
    })
    setShowModal(true)
  }

  if (loading) {
    const filteredTravailleurs = travailleurs.filter(travailleur =>
      travailleur.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      travailleur.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Travailleurs</h1>
          <button
            onClick={() => {
              setEditingTravailleur(null)
              setFormData({ name: '', email: '', password: '' })
              setShowModal(true)
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <FiUserPlus className="-ml-1 mr-2 h-5 w-5" />
            Ajouter un Travailleur
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par nom ou email..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
        </div>
      </div>

      {/* Travailleurs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(travailleurs) && travailleurs.filter(travailleur =>
                travailleur.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                travailleur.email.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((travailleur) => (
                <tr key={travailleur._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {travailleur.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{travailleur.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => openEditModal(travailleur)}
                        className="p-1 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition-colors duration-200"
                        title="Modifier"
                      >
                        <FiEdit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(travailleur._id)}
                        className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50 transition-colors duration-200"
                        title="Supprimer"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-6 border w-[480px] shadow-xl rounded-xl bg-white">
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                onClick={() => {
                  setShowModal(false)
                  setEditingTravailleur(null)
                  setFormData({ name: '', email: '', password: '' })
                }}
                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4">
              {editingTravailleur ? 'Modifier' : 'Ajouter'} un Travailleur
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              {!editingTravailleur && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required={!editingTravailleur}
                  />
                </div>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingTravailleur(null)
                    setFormData({ name: '', email: '', password: '' })
                  }}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  {editingTravailleur ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
