"use client";

import React, { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Phone, Briefcase, MapPin, Calendar, Camera } from 'lucide-react';

export default function Profile() {
  const [name, setName] = useState('Chavan');
  const [email, setEmail] = useState('chavan@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [bio, setBio] = useState('Experienced trader with a focus on technical analysis and swing trading strategies.');
  const [experience, setExperience] = useState('5+ years');
  const [location, setLocation] = useState('New York, USA');
  const [avatarLetter, setAvatarLetter] = useState('C');
  const [avatarColor, setAvatarColor] = useState('teal');

  const colorOptions = [
    { value: 'teal', label: 'Teal' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
    { value: 'amber', label: 'Amber' },
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
  ];

  const getAvatarColorClass = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'amber': return 'bg-amber-100 text-amber-600';
      case 'red': return 'bg-red-100 text-red-600';
      case 'green': return 'bg-green-100 text-green-600';
      default: return 'bg-teal-100 text-teal-600';
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value) {
      setAvatarLetter(e.target.value.charAt(0).toUpperCase());
    }
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to a database
    alert('Profile saved successfully!');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500">Manage your personal information and preferences</p>
        </div>
        
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-6 bg-gray-100 p-1 rounded-md">
          <TabsTrigger 
            value="personal" 
            className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm px-4 py-2 rounded-md hover:bg-gray-50 hover:text-gray-700 text-gray-600 transition-colors"
          >
            Personal Information
          </TabsTrigger>
          <TabsTrigger 
            value="appearance" 
            className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm px-4 py-2 rounded-md hover:bg-gray-50 hover:text-gray-700 text-gray-600 transition-colors"
          >
            Appearance
          </TabsTrigger>
          <TabsTrigger 
            value="preferences" 
            className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm px-4 py-2 rounded-md hover:bg-gray-50 hover:text-gray-700 text-gray-600 transition-colors"
          >
            Trading Preferences
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm px-4 py-2 rounded-md hover:bg-gray-50 hover:text-gray-700 text-gray-600 transition-colors"
          >
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="bg-white text-gray-900 border-b border-gray-100 px-6 py-4">
                <CardTitle className="text-lg font-semibold">Profile Picture</CardTitle>
                <CardDescription className="text-gray-500 mt-1">Your avatar will be displayed throughout the platform</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center bg-white px-6 py-5">
                <Avatar className={`h-24 w-24 ${getAvatarColorClass(avatarColor)}`}>
                  <span className="text-2xl font-medium">{avatarLetter}</span>
                </Avatar>
                <div className="mt-4 w-full">
                  <Label htmlFor="avatar-letter" className="text-gray-700">Display Letter</Label>
                  <Input 
                    id="avatar-letter" 
                    value={avatarLetter} 
                    maxLength={1}
                    onChange={(e) => setAvatarLetter(e.target.value.toUpperCase())}
                    className="mt-1 bg-white border-gray-300 focus:border-teal-500 focus:ring-teal-500 placeholder-[#A0A0A0] hover:border-gray-200 transition-colors text-[#A0A0A0]"
                    placeholder="Enter letter"
                  />
                </div>
                <div className="mt-4 w-full">
                  <Label htmlFor="avatar-color" className="text-gray-700">Avatar Color</Label>
                  <Select value={avatarColor} onValueChange={setAvatarColor}>
                    <SelectTrigger id="avatar-color" className="mt-1 bg-white border-gray-300 focus:border-teal-500 focus:ring-teal-500 placeholder-[#A0A0A0] hover:border-gray-200 transition-colors text-[#A0A0A0]">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200">
                      {colorOptions.map((color) => (
                        <SelectItem key={color.value} value={color.value} className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                          {color.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="mt-4 w-full bg-white hover:bg-gray-50 text-gray-700 border-gray-300 transition-colors" variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="bg-white text-gray-900 border-b border-gray-100 px-6 py-4">
                <CardTitle className="text-lg font-semibold">Personal Information</CardTitle>
                <CardDescription className="text-gray-500 mt-1">Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 bg-white px-6 py-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={handleNameChange}
                        className="pl-10 bg-white border-gray-300 focus:border-teal-500 focus:ring-teal-500 placeholder-[#A0A0A0] hover:border-gray-200 transition-colors text-[#A0A0A0]"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-white border-gray-300 focus:border-teal-500 focus:ring-teal-500 placeholder-[#A0A0A0] hover:border-gray-200 transition-colors text-[#A0A0A0]"
                        placeholder="e.g. your.email@example.com"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="phone" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 bg-white border-gray-300 focus:border-teal-500 focus:ring-teal-500 placeholder-[#A0A0A0] hover:border-gray-200 transition-colors text-[#A0A0A0]"
                        placeholder="e.g. +1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-700">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="location" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-10 bg-white border-gray-300 focus:border-teal-500 focus:ring-teal-500 placeholder-[#A0A0A0] hover:border-gray-200 transition-colors text-[#A0A0A0]"
                        placeholder="e.g. New York, USA"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-gray-700">Trading Experience</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="experience" 
                        value={experience} 
                        onChange={(e) => setExperience(e.target.value)}
                        className="pl-10 bg-white border-gray-300 focus:border-teal-500 focus:ring-teal-500 placeholder-[#A0A0A0] hover:border-gray-200 transition-colors text-[#A0A0A0]"
                        placeholder="e.g. 5+ years"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profession" className="text-gray-700">Profession</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="profession" 
                        placeholder="e.g. Financial Analyst"
                        className="pl-10 bg-white border-gray-300 focus:border-teal-500 focus:ring-teal-500 placeholder-[#A0A0A0] hover:border-gray-200 transition-colors text-[#A0A0A0]"
                      />
                    </div>
        </div>
      </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-gray-700">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself and your trading style"
                    rows={4}
                    className="bg-white border-gray-300 focus:border-teal-500 focus:ring-teal-500 placeholder-[#A0A0A0] hover:border-gray-200 transition-colors text-[#A0A0A0]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end bg-white">
                <Button variant="outline" className="mr-2 border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors">Cancel</Button>
                <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700 text-white transition-colors">Save Changes</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-white text-gray-900 border-b border-gray-100 px-6 py-4">
              <CardTitle className="text-lg font-semibold">Appearance Settings</CardTitle>
              <CardDescription className="text-gray-500 mt-1">Customize how the platform looks for you</CardDescription>
            </CardHeader>
            <CardContent className="bg-white px-6 py-5">
              <p className="text-gray-500">Appearance settings will be available soon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-white text-gray-900 border-b border-gray-100 px-6 py-4">
              <CardTitle className="text-lg font-semibold">Trading Preferences</CardTitle>
              <CardDescription className="text-gray-500 mt-1">Set your default trading preferences</CardDescription>
            </CardHeader>
            <CardContent className="bg-white px-6 py-5">
              <p className="text-gray-500">Trading preference settings will be available soon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-white text-gray-900 border-b border-gray-100 px-6 py-4">
              <CardTitle className="text-lg font-semibold">Security Settings</CardTitle>
              <CardDescription className="text-gray-500 mt-1">Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="bg-white px-6 py-5">
              <p className="text-gray-500">Security settings will be available soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 