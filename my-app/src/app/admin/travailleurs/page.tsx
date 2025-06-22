import { Metadata } from 'next'
import AdminLayout from '@/components/admin/AdminLayout'
import Travailleurs from '@/components/admin/Travailleurs'

export const metadata: Metadata = {
  title: 'Gestion des Travailleurs - Yalla Clean',
  description: 'Gérer les travailleurs de la plateforme Yalla Clean',
}

export default function TravailleursPage() {
  return (
    <AdminLayout>
      <Travailleurs />
    </AdminLayout>
  )
}
