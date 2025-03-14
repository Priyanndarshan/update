"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function WeeklyGoalsPage() {
  return (
    <div className="container mx-auto py-8 px-4 mt-4">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>PET Zone</span>
          <span>/</span>
          <span className="text-gray-800 font-medium">Weekly Goals</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Weekly Goals</h1>
        <p className="text-gray-500">Set and track your weekly trading goals and objectives</p>
      </div>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-gray-100">
          <CardTitle className="text-lg font-medium text-gray-700">Weekly Goals</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-gray-600">This is a placeholder for the Weekly Goals page. Content will be added soon.</p>
        </CardContent>
      </Card>
    </div>
  );
} 