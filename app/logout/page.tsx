"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();
  
  useEffect(() => {
    // In a real app, you would handle logout logic here
    // For now, just redirect back to dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
        <p>You will be redirected shortly.</p>
      </div>
    </div>
  );
} 