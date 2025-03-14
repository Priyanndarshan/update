"use client";

import React from 'react';
import { Play, Calendar, Users, Star, Search, ChevronRight, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/components/ui/utils';
import Header from '@/components/dashboard/Header';

// Sample market analysis videos
const marketAnalysisVideos = [
  {
    id: 1,
    title: "Weekly Market Outlook: Trends and Opportunities",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    duration: "45:22",
    date: "March 15, 2025",
    instructor: "Rahul Sharma",
    category: "Weekly Outlook",
    rating: 4.9,
    viewers: 3245,
    description: "Comprehensive analysis of market trends and predictions for the upcoming week."
  },
  {
    id: 2,
    title: "Sector Analysis: Banking and Financial Services",
    thumbnail: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=2070&auto=format&fit=crop",
    duration: "52:05",
    date: "March 12, 2025",
    instructor: "Priya Patel",
    category: "Sector Analysis",
    rating: 4.8,
    viewers: 2367,
    description: "Deep dive into the banking and financial services sector and potential investment opportunities."
  },
  {
    id: 3,
    title: "Global Market Impact on Indian Indices",
    thumbnail: "https://images.unsplash.com/photo-1642790551116-18e150f248e5?q=80&w=2070&auto=format&fit=crop",
    duration: "38:15",
    date: "March 10, 2025",
    instructor: "Vikram Singh",
    category: "Global Markets",
    rating: 4.7,
    viewers: 1876,
    description: "Analysis of how global market movements are affecting Indian indices."
  },
  {
    id: 4,
    title: "Technical Analysis: Key Levels for Nifty and Bank Nifty",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop",
    duration: "41:30",
    date: "March 8, 2025",
    instructor: "Anjali Desai",
    category: "Technical Analysis",
    rating: 4.6,
    viewers: 2145,
    description: "Detailed technical analysis of key support and resistance levels for major indices."
  },
  {
    id: 5,
    title: "Quarterly Results Analysis: IT Sector",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    duration: "55:18",
    date: "March 5, 2025",
    instructor: "Rajiv Kumar",
    category: "Fundamental Analysis",
    rating: 4.8,
    viewers: 1943,
    description: "Analysis of quarterly results for major IT companies and their impact on the sector."
  },
  {
    id: 6,
    title: "Economic Indicators and Their Market Impact",
    thumbnail: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=2070&auto=format&fit=crop",
    duration: "49:09",
    date: "March 3, 2025",
    instructor: "Neha Sharma",
    category: "Economic Analysis",
    rating: 4.7,
    viewers: 1787,
    description: "Understanding key economic indicators and how they influence market movements."
  }
];

// Categories for filtering
const categories = [
  { value: "all", label: "All Categories" },
  { value: "weekly", label: "Weekly Outlook" },
  { value: "sector", label: "Sector Analysis" },
  { value: "global", label: "Global Markets" },
  { value: "technical", label: "Technical Analysis" },
  { value: "fundamental", label: "Fundamental Analysis" },
  { value: "economic", label: "Economic Analysis" },
];

export default function MarketAnalysisPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter videos based on category and search query
  const filteredVideos = React.useMemo(() => {
    return marketAnalysisVideos.filter(video => {
      // Apply category filter
      if (selectedCategory !== "all" && 
          !video.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
        return false;
      }
      
      // Apply search filter
      if (searchQuery && 
          !video.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !video.instructor.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Render video card
  const renderVideoCard = (video: any) => (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="h-48 w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="default" 
            size="icon" 
            className="rounded-full bg-white text-gray-900 hover:bg-gray-100 h-12 w-12"
          >
            <Play className="h-6 w-6" />
          </Button>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
        <Badge 
          variant="secondary" 
          className="absolute top-2 left-2 bg-white text-gray-800 border-0"
        >
          {video.category}
        </Badge>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{video.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          <span>{video.date}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-3.5 w-3.5 mr-1.5" />
          <span>{video.viewers.toLocaleString()} viewers</span>
          <div className="mx-2 h-1 w-1 rounded-full bg-gray-300"></div>
          <Star className="h-3.5 w-3.5 mr-1.5 text-yellow-500" />
          <span>{video.rating}</span>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm font-medium">{video.instructor}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 p-0 h-auto"
        >
          Watch Now
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header username="Trader" />
      
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>Videos</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-800 font-medium">Market Analysis</span>
        </div>
        
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Market Analysis Videos</h1>
          <p className="text-gray-500">Expert analysis of market trends, sectors, and trading opportunities</p>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search analysis..."
              className="pl-9 border-gray-200 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              className={cn(
                "whitespace-nowrap",
                selectedCategory === "all" 
                  ? "bg-teal-600 hover:bg-teal-700" 
                  : "text-gray-600 hover:text-gray-900"
              )}
              onClick={() => setSelectedCategory("all")}
            >
              All Categories
            </Button>
            
            {categories.slice(1).map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                className={cn(
                  "whitespace-nowrap",
                  selectedCategory === category.value 
                    ? "bg-teal-600 hover:bg-teal-700" 
                    : "text-gray-600 hover:text-gray-900"
                )}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.length > 0 ? (
            filteredVideos.map(renderVideoCard)
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">No analysis videos found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 