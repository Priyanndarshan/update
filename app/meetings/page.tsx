"use client";

import React, { useState } from 'react';
import { Calendar, ChevronRight, Clock, Users, Video, Plus, Search, Filter, CalendarDays, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from '@/components/dashboard/Header';

export default function MeetingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample upcoming meetings data
  const upcomingMeetings = [
    {
      id: 1,
      title: "Weekly Market Analysis",
      date: "25 Feb 2025",
      time: "10:00 AM - 11:30 AM",
      host: "Rahul Sharma",
      participants: 18,
      type: "Webinar",
      status: "Confirmed"
    },
    {
      id: 2,
      title: "Options Trading Strategy Session",
      date: "26 Feb 2025",
      time: "2:00 PM - 3:30 PM",
      host: "Priya Patel",
      participants: 12,
      type: "Workshop",
      status: "Confirmed"
    },
    {
      id: 3,
      title: "Portfolio Review Meeting",
      date: "27 Feb 2025",
      time: "11:00 AM - 12:00 PM",
      host: "Vikram Singh",
      participants: 5,
      type: "One-on-One",
      status: "Pending"
    },
    {
      id: 4,
      title: "Technical Analysis Masterclass",
      date: "28 Feb 2025",
      time: "3:00 PM - 5:00 PM",
      host: "Anjali Desai",
      participants: 25,
      type: "Workshop",
      status: "Confirmed"
    }
  ];
  
  // Sample past meetings data
  const pastMeetings = [
    {
      id: 5,
      title: "Intraday Trading Strategies",
      date: "18 Feb 2025",
      time: "10:00 AM - 11:30 AM",
      host: "Rahul Sharma",
      participants: 22,
      type: "Webinar",
      recording: true
    },
    {
      id: 6,
      title: "Risk Management Workshop",
      date: "15 Feb 2025",
      time: "2:00 PM - 3:30 PM",
      host: "Neha Sharma",
      participants: 15,
      type: "Workshop",
      recording: true
    },
    {
      id: 7,
      title: "Quarterly Market Outlook",
      date: "10 Feb 2025",
      time: "11:00 AM - 12:30 PM",
      host: "Rajiv Kumar",
      participants: 30,
      type: "Webinar",
      recording: true
    }
  ];
  
  // Filter meetings based on search term
  const filterMeetings = (meetings: any[], term: string) => {
    if (!term) return meetings;
    
    return meetings.filter(meeting => 
      meeting.title.toLowerCase().includes(term.toLowerCase()) ||
      meeting.host.toLowerCase().includes(term.toLowerCase()) ||
      meeting.type.toLowerCase().includes(term.toLowerCase())
    );
  };
  
  // Get meetings based on active tab
  const getMeetings = () => {
    const meetings = activeTab === "upcoming" ? upcomingMeetings : pastMeetings;
    return filterMeetings(meetings, searchTerm);
  };
  
  // Today's featured meeting
  const featuredMeeting = {
    title: "Live Market Opening Analysis",
    date: "Today",
    time: "9:15 AM - 10:00 AM",
    host: "Rahul Sharma",
    participants: 45,
    description: "Join our expert analysts as they break down the market opening and identify key trading opportunities for the day.",
    joinLink: "#"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header username="Trader" />
      
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>Dashboard</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-800 font-medium">Meetings</span>
        </div>
        
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Scheduled Meetings</h1>
          <p className="text-gray-500">Access live sessions, workshops, and one-on-one meetings</p>
        </div>
        
        {/* Featured Meeting Card */}
        {featuredMeeting && (
          <Card className="mb-8 border-teal-200 bg-gradient-to-r from-teal-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4">
                  <Badge variant="outline" className="bg-teal-100 text-teal-800 border-teal-200 px-3 py-1">
                    Happening Today
                  </Badge>
                  <h2 className="text-xl font-bold text-gray-800">{featuredMeeting.title}</h2>
                  <p className="text-gray-600">{featuredMeeting.description}</p>
                  
                  <div className="flex flex-wrap gap-4 mt-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-teal-600" />
                      <span>{featuredMeeting.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-teal-600" />
                      <span>{featuredMeeting.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-teal-600" />
                      <span>{featuredMeeting.participants} participants</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center items-center md:items-end gap-3">
                  <div className="text-sm text-gray-600">Hosted by <span className="font-medium">{featuredMeeting.host}</span></div>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    <Video className="h-4 w-4 mr-2" />
                    Join Meeting
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Schedule New Meeting
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search meetings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 border-gray-200 bg-white"
              />
            </div>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="webinar">Webinars</SelectItem>
                <SelectItem value="workshop">Workshops</SelectItem>
                <SelectItem value="one-on-one">One-on-One</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Tabs and Meeting Lists */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-0">
            <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Upcoming Meetings
                </TabsTrigger>
                <TabsTrigger value="past" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
                  <Clock className="h-4 w-4 mr-2" />
                  Past Meetings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="font-semibold">Meeting Title</TableHead>
                        <TableHead className="font-semibold">Date & Time</TableHead>
                        <TableHead className="font-semibold">Host</TableHead>
                        <TableHead className="font-semibold">Type</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getMeetings().length > 0 ? (
                        getMeetings().map((meeting) => (
                          <TableRow key={meeting.id}>
                            <TableCell className="font-medium">{meeting.title}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{meeting.date}</span>
                                <span className="text-gray-500 text-sm">{meeting.time}</span>
                              </div>
                            </TableCell>
                            <TableCell>{meeting.host}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={
                                meeting.type === "Webinar" 
                                  ? "bg-blue-50 text-blue-700 border-blue-200" 
                                  : meeting.type === "Workshop" 
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : "bg-gray-50 text-gray-700 border-gray-200"
                              }>
                                {meeting.type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={meeting.status === "Confirmed" ? "default" : "outline"} className={
                                meeting.status === "Confirmed" 
                                  ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-100" 
                                  : "bg-yellow-50 text-yellow-700 border-yellow-200"
                              }>
                                {meeting.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" className="text-teal-600 border-teal-200 hover:bg-teal-50">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            No upcoming meetings found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="past" className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="font-semibold">Meeting Title</TableHead>
                        <TableHead className="font-semibold">Date & Time</TableHead>
                        <TableHead className="font-semibold">Host</TableHead>
                        <TableHead className="font-semibold">Type</TableHead>
                        <TableHead className="font-semibold">Recording</TableHead>
                        <TableHead className="font-semibold text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getMeetings().length > 0 ? (
                        getMeetings().map((meeting) => (
                          <TableRow key={meeting.id}>
                            <TableCell className="font-medium">{meeting.title}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{meeting.date}</span>
                                <span className="text-gray-500 text-sm">{meeting.time}</span>
                              </div>
                            </TableCell>
                            <TableCell>{meeting.host}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={
                                meeting.type === "Webinar" 
                                  ? "bg-blue-50 text-blue-700 border-blue-200" 
                                  : meeting.type === "Workshop" 
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : "bg-gray-50 text-gray-700 border-gray-200"
                              }>
                                {meeting.type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {meeting.recording ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  Available
                                </Badge>
                              ) : (
                                <span className="text-gray-500">—</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" className="text-teal-600 border-teal-200 hover:bg-teal-50">
                                {meeting.recording ? "Watch Recording" : "View Details"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            No past meetings found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
          <CardFooter className="flex justify-between pt-6">
            <div className="text-xs text-gray-500">
              Showing {getMeetings().length} meetings
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="font-medium text-teal-600">Note:</span> All times are in your local timezone
            </div>
          </CardFooter>
        </Card>
        
        {/* Calendar Preview */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Calendar View</h2>
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex justify-center items-center h-64 bg-gray-100 rounded-md border border-gray-200">
                <div className="text-center">
                  <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Calendar View Coming Soon</p>
                  <p className="text-gray-500 text-sm mt-1">We're working on a comprehensive calendar view for better meeting management</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 