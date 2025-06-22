'use client'

import { useEffect, useState } from 'react'
import { FiUsers, FiUserPlus, FiUserCheck, FiTrendingUp } from 'react-icons/fi'

interface DashboardStats {
  travailleursCount: number
  clientsCount: number
  recentTravailleurs: {
    _id: string
    name: string
    email: string
    createdAt: string
  }[]
}

export default function DashboardContent() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:5001/api/admin/dashboard/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch stats')
        }
        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError('Failed to load dashboard stats')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Replace the simple loading spinner with skeleton loaders
  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mb-1"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="p-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-md mb-3 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Erreur!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord</h1>
        
        {/* Stats Cards with improved design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Travailleurs Card */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FiUsers className="text-2xl text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                Total
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {stats?.travailleursCount || 0}
            </h3>
            <p className="text-sm text-gray-500 flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
              Travailleurs actifs
            </p>
          </div>

          {/* Similar updates for other cards */}
          {/* Total Clients Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-green-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <FiUserCheck className="text-2xl text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">
                Total
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {stats?.clientsCount || 0}
            </h3>
            <p className="text-sm text-gray-500">Clients enregistrés</p>
          </div>

          {/* Growth Rate Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-purple-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FiTrendingUp className="text-2xl text-purple-600" />
              </div>
              <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
                Croissance
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {Math.round((stats?.clientsCount || 0) / Math.max(1, (stats?.travailleursCount || 1)) * 100)}%
            </h3>
            <p className="text-sm text-gray-500">Ratio clients/travailleurs</p>
          </div>
        </div>

        {/* Recent Travailleurs Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Travailleurs récents</h2>
              <div className="bg-blue-100 p-2 rounded-lg">
                <FiUserPlus className="text-xl text-blue-600" />
              </div>
            </div>
          </div>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date d'inscription
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats?.recentTravailleurs.map((travailleur) => (
                  <tr key={travailleur._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {travailleur.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {travailleur.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(travailleur.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Actif
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
