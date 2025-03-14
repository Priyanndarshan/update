import React from 'react';
import Header from '@/components/dashboard/Header';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header username="Chavan" />
      <main className="flex-grow bg-gray-50">
        {children}
      </main>
    </div>
  );
} 