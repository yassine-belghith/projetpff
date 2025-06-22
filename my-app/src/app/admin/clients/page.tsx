'use client'

import Clients from '@/components/admin/Clients'
import { FiUsers } from 'react-icons/fi'

export default function ClientsPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <span>Dashboard</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Clients</span>
          </div>
          <div className="mt-2 flex items-center">
            <FiUsers className="h-8 w-8 mr-3 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Clients</h1>
          </div>
        </div>
        <Clients />
      </div>
    </div>
  )
}
