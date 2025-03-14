"use client";

import React from 'react';
import { Play, Calendar, Users, Star, Search, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/components/ui/utils';
import Header from '@/components/dashboard/Header';

// Sample featured videos
const featuredVideos = [
  {
    id: 1,
    title: "Market Analysis: Weekly Outlook",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    duration: "45:22",
    date: "March 12, 2025",
    instructor: "Rahul Sharma",
    category: "Analysis",
    featured: true,
    rating: 4.8,
    viewers: 1245,
    description: "Comprehensive analysis of market trends and predictions for the upcoming week."
  },
  {
    id: 4,
    title: "Live Trading Session: Intraday Strategies",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop",
    duration: "1:45:30",
    date: "March 5, 2025",
    instructor: "Rahul Sharma",
    category: "Live Trading",
    featured: true,
    rating: 4.9,
    viewers: 3245,
    description: "Watch our experts trade live and explain their decision-making process."
  }
];

// Sample recent videos
const recentVideos = [
  {
    id: 2,
    title: "Options Trading Masterclass",
    thumbnail: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=2070&auto=format&fit=crop",
    duration: "1:12:05",
    date: "March 10, 2025",
    instructor: "Priya Patel",
    category: "Education",
    rating: 4.9,
    viewers: 2367,
    description: "Learn advanced options trading strategies from expert traders."
  },
  {
    id: 3,
    title: "Technical Analysis: Support & Resistance",
    thumbnail: "https://images.unsplash.com/photo-1642790551116-18e150f248e5?q=80&w=2070&auto=format&fit=crop",
    duration: "38:15",
    date: "March 8, 2025",
    instructor: "Vikram Singh",
    category: "Technical",
    rating: 4.7,
    viewers: 1876,
    description: "Master the art of identifying key support and resistance levels."
  },
  {
    id: 5,
    title: "Fundamental Analysis: Banking Sector",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    duration: "52:18",
    date: "March 3, 2025",
    instructor: "Anjali Desai",
    category: "Fundamental",
    rating: 4.6,
    viewers: 1543,
    description: "Deep dive into the fundamentals of the banking sector and potential investment opportunities."
  },
  {
    id: 6,
    title: "Risk Management Strategies",
    thumbnail: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=2070&auto=format&fit=crop",
    duration: "41:09",
    date: "February 28, 2025",
    instructor: "Vikram Singh",
    category: "Education",
    rating: 4.8,
    viewers: 1987,
    description: "Learn essential risk management techniques to protect your capital."
  }
];

// Categories for filtering
const categories = [
  { value: "all", label: "All Categories" },
  { value: "analysis", label: "Market Analysis" },
  { value: "technical", label: "Technical Analysis" },
  { value: "fundamental", label: "Fundamental Analysis" },
  { value: "education", label: "Educational" },
  { value: "live", label: "Live Trading" },
];

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter videos based on category and search query
  const filteredRecentVideos = React.useMemo(() => {
    return recentVideos.filter(video => {
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
        {video.featured && (
          <Badge 
            variant="default" 
            className="absolute top-2 right-2 bg-teal-500 text-white border-0"
          >
            Featured
          </Badge>
        )}
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
          <span className="text-gray-800 font-medium">Videos</span>
        </div>
        
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Educational Videos</h1>
          <p className="text-gray-500">Access our library of educational videos, live sessions, and market analysis</p>
        </div>
        
        {/* Featured Videos */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Featured Videos</h2>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-teal-600 border-teal-200 hover:bg-teal-50"
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredVideos.map(renderVideoCard)}
          </div>
        </div>

        {/* Recent Videos */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Videos</h2>
            <div className="flex items-center gap-4">
              <div className="relative w-64 hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search videos..."
                  className="pl-9 border-gray-200 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Tabs 
                defaultValue="all" 
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <TabsList className="bg-gray-100">
                  {categories.slice(0, 3).map((category) => (
                    <TabsTrigger 
                      key={category.value}
                      value={category.value}
                      className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="relative w-full mb-4 md:hidden">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search videos..."
              className="pl-9 border-gray-200 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex items-center mb-4 overflow-x-auto pb-2 no-scrollbar">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              className={cn(
                "mr-2 whitespace-nowrap",
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
                  "mr-2 whitespace-nowrap",
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecentVideos.length > 0 ? (
              filteredRecentVideos.map(renderVideoCard)
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">No videos found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 