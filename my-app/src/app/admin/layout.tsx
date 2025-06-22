'use client';

import AdminProtectedRoute from '@/components/auth/AdminProtectedRoute';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminRootLayout({ children }: AdminLayoutProps) {
  return <AdminProtectedRoute>{children}</AdminProtectedRoute>;
}
