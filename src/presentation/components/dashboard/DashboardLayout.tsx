// src/presentation/components/dashboard/DashboardLayout.tsx
import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <DashboardSidebar />

      <div className="lg:pl-64">
        <DashboardHeader />
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
