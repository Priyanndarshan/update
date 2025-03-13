"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import DailyChecklist from '../../components/DailyChecklist';
import Disclaimer from '../../components/Disclaimer';
import Footer from '../../components/Footer';

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar username="Chavan" />
      
      <div className="bg-gray-50 flex-grow">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-gray-800 uppercase font-medium">DASHBOARD</h1>
            <div className="text-sm text-gray-600">
              <span>Last Login: </span><span className="font-medium">Today, 9:45 AM</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-light-pink rounded-lg border-l-4 border-l-primary">
              <DailyChecklist />
            </div>
            <div className="bg-light-yellow rounded-lg border-l-4 border-l-warning">
              <Disclaimer />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 