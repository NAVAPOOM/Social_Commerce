'use client';

import Component from '@/components/sidebar/App';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Component>{children}</Component>;
}
