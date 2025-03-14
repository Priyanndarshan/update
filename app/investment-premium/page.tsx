"use client";

import React, { useState } from 'react';
import { Calendar, ChevronRight, Download, Info, ArrowUpDown, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from '@/components/dashboard/Header';

export default function InvestmentPremiumPage() {
  const currentDate = "19/02/2025";
  const [activeTab, setActiveTab] = useState("banknifty");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // BankNifty Premium Data
  const bankNiftyData = [
    { impkeys: "50020", ceStrikePrice: "49800", callPremiumRange: "306", peStrikePrice: "50200", putPremiumRange: "1186.6" },
    { impkeys: "49807", ceStrikePrice: "49600", callPremiumRange: "378", peStrikePrice: "50000", putPremiumRange: "1042.8" },
    { impkeys: "49593", ceStrikePrice: "49400", callPremiumRange: "466.5", peStrikePrice: "49800", putPremiumRange: "908" },
    { impkeys: "49422", ceStrikePrice: "49200", callPremiumRange: "560.7", peStrikePrice: "49600", putPremiumRange: "783" },
    { impkeys: "49248", ceStrikePrice: "49100", callPremiumRange: "610", peStrikePrice: "49400", putPremiumRange: "668.45" },
    { impkeys: "49031", ceStrikePrice: "48800", callPremiumRange: "793", peStrikePrice: "49200", putPremiumRange: "569.4" },
    { impkeys: "48864", ceStrikePrice: "48700", callPremiumRange: "848", peStrikePrice: "49000", putPremiumRange: "476" },
    { impkeys: "48709", ceStrikePrice: "48500", callPremiumRange: "989", peStrikePrice: "48900", putPremiumRange: "433.15" },
    { impkeys: "48516", ceStrikePrice: "48300", callPremiumRange: "1142", peStrikePrice: "48700", putPremiumRange: "359.55" },
    { impkeys: "48349", ceStrikePrice: "48200", callPremiumRange: "1214.85", peStrikePrice: "48500", putPremiumRange: "296.9" },
  ];

  // Nifty Premium Data
  const niftyData = [
    { impkeys: "23299", ceStrikePrice: "23200", callPremiumRange: "26.2", peStrikePrice: "23400", putPremiumRange: "478.55" },
    { impkeys: "23202", ceStrikePrice: "23100", callPremiumRange: "48.6", peStrikePrice: "23300", putPremiumRange: "384.8" },
    { impkeys: "23122", ceStrikePrice: "23000", callPremiumRange: "83.8", peStrikePrice: "23250", putPremiumRange: "344.2" },
    { impkeys: "23040", ceStrikePrice: "22950", callPremiumRange: "106", peStrikePrice: "23150", putPremiumRange: "259.65" },
    { impkeys: "22940", ceStrikePrice: "22850", callPremiumRange: "161", peStrikePrice: "23050", putPremiumRange: "187.75" },
    { impkeys: "22858", ceStrikePrice: "22750", callPremiumRange: "229", peStrikePrice: "22950", putPremiumRange: "128.5" },
    { impkeys: "22784", ceStrikePrice: "22700", callPremiumRange: "266.9", peStrikePrice: "22900", putPremiumRange: "104.6" },
    { impkeys: "22692", ceStrikePrice: "22600", callPremiumRange: "350.75", peStrikePrice: "22800", putPremiumRange: "66.5" },
    { impkeys: "22603", ceStrikePrice: "22500", callPremiumRange: "439", peStrikePrice: "22700", putPremiumRange: "39.9" },
  ];

  // Sort function
  const sortData = (data: any[], column: string, direction: "asc" | "desc") => {
    if (!column) return data;
    
    return [...data].sort((a, b) => {
      const valueA = parseFloat(a[column]) || 0;
      const valueB = parseFloat(b[column]) || 0;
      
      return direction === "asc" ? valueA - valueB : valueB - valueA;
    });
  };

  // Filter function
  const filterData = (data: any[], term: string) => {
    if (!term) return data;
    
    return data.filter(row => 
      Object.values(row).some(value => 
        String(value).toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  // Handle sort
  const handleSort = (column: string) => {
    const isAsc = sortColumn === column && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortColumn(column);
  };

  // Get data based on active tab
  const getData = () => {
    const data = activeTab === "banknifty" ? bankNiftyData : niftyData;
    const filteredData = filterData(data, searchTerm);
    return sortData(filteredData, sortColumn, sortDirection);
  };

  // Render sort icon
  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortDirection === "asc" ? 
      <ArrowUpDown className="ml-2 h-4 w-4 text-teal-600" /> : 
      <ArrowUpDown className="ml-2 h-4 w-4 text-teal-600 rotate-180" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header username="Trader" />
      
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>Dashboard</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-800 font-medium">Investment Premium</span>
        </div>
        
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Investment Premium</h1>
          <p className="text-gray-500">View premium data for BankNifty and Nifty options</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Last Updated: {currentDate}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Input
                placeholder="Search premium data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 pr-10 border-gray-200 bg-white"
              />
            </div>
            
            <Select defaultValue="today">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today ({currentDate})</SelectItem>
                <SelectItem value="yesterday">Yesterday (18/02/2025)</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="default" 
              className="flex items-center gap-1 text-teal-600 border-teal-200 hover:bg-teal-50"
            >
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
        
        {/* Tabs and Tables */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-0">
            <Tabs defaultValue="banknifty" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="banknifty" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
                  <span className="font-semibold">BankNifty Premium</span>
                  <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">9000-37500</Badge>
                </TabsTrigger>
                <TabsTrigger value="nifty" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
                  <span className="font-semibold">Nifty Premium</span>
                  <Badge variant="outline" className="ml-2 bg-teal-50 text-teal-700 border-teal-200">1875-37500</Badge>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="banknifty" className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="font-semibold" onClick={() => handleSort("impkeys")}>
                          <div className="flex items-center cursor-pointer">
                            IMPKEYS {renderSortIcon("impkeys")}
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold" onClick={() => handleSort("ceStrikePrice")}>
                          <div className="flex items-center cursor-pointer">
                            CE STRIKE PRICE {renderSortIcon("ceStrikePrice")}
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold" onClick={() => handleSort("callPremiumRange")}>
                          <div className="flex items-center cursor-pointer">
                            CALL PREMIUM RANGE {renderSortIcon("callPremiumRange")}
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold" onClick={() => handleSort("peStrikePrice")}>
                          <div className="flex items-center cursor-pointer">
                            PE STRIKE PRICE {renderSortIcon("peStrikePrice")}
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold" onClick={() => handleSort("putPremiumRange")}>
                          <div className="flex items-center cursor-pointer">
                            PUT PREMIUM RANGE {renderSortIcon("putPremiumRange")}
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getData().map((row, index) => (
                        <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <TableCell className="font-medium">{row.impkeys}</TableCell>
                          <TableCell>{row.ceStrikePrice}</TableCell>
                          <TableCell className="text-blue-600">{row.callPremiumRange}</TableCell>
                          <TableCell>{row.peStrikePrice}</TableCell>
                          <TableCell className="text-red-600">{row.putPremiumRange}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="nifty" className="mt-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="font-semibold" onClick={() => handleSort("impkeys")}>
                          <div className="flex items-center cursor-pointer">
                            IMPKEYS {renderSortIcon("impkeys")}
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold" onClick={() => handleSort("ceStrikePrice")}>
                          <div className="flex items-center cursor-pointer">
                            CE STRIKE PRICE {renderSortIcon("ceStrikePrice")}
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold" onClick={() => handleSort("callPremiumRange")}>
                          <div className="flex items-center cursor-pointer">
                            CALL PREMIUM RANGE {renderSortIcon("callPremiumRange")}
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold" onClick={() => handleSort("peStrikePrice")}>
                          <div className="flex items-center cursor-pointer">
                            PE STRIKE PRICE {renderSortIcon("peStrikePrice")}
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold" onClick={() => handleSort("putPremiumRange")}>
                          <div className="flex items-center cursor-pointer">
                            PUT PREMIUM RANGE {renderSortIcon("putPremiumRange")}
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getData().map((row, index) => (
                        <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <TableCell className="font-medium">{row.impkeys}</TableCell>
                          <TableCell>{row.ceStrikePrice}</TableCell>
                          <TableCell className="text-blue-600">{row.callPremiumRange}</TableCell>
                          <TableCell>{row.peStrikePrice}</TableCell>
                          <TableCell className="text-red-600">{row.putPremiumRange}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
          <CardFooter className="flex justify-between pt-6">
            <div className="text-xs text-gray-500">
              Showing {getData().length} entries
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="font-medium text-teal-600">Pro Tip:</span> Click on column headers to sort the data
            </div>
          </CardFooter>
        </Card>
        
        {/* Educational Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="border-gray-200 col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5 text-teal-600" />
                Understanding Premium Data
              </CardTitle>
              <CardDescription>
                Essential knowledge for options traders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 text-sm">
                  Premium data provides insights into the pricing of options contracts. This information is crucial for options traders to identify potential trading opportunities and manage risk effectively.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                      <span className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2">
                        <HelpCircle className="h-4 w-4" />
                      </span>
                      Call Premium
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Call premium represents the price paid by the buyer of a call option to the seller. Higher premiums indicate greater market expectations of upward price movement.
                    </p>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h4 className="font-medium text-red-800 mb-2 flex items-center">
                      <span className="bg-red-100 text-red-800 p-1 rounded-full mr-2">
                        <HelpCircle className="h-4 w-4" />
                      </span>
                      Put Premium
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Put premium represents the price paid by the buyer of a put option to the seller. Higher premiums indicate greater market expectations of downward price movement.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">Key Terminology</CardTitle>
              <CardDescription>
                Important terms for options trading
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border-b border-gray-100 pb-2">
                  <h4 className="font-medium text-gray-800 text-sm">Strike Price</h4>
                  <p className="text-gray-600 text-xs">The price at which an option contract can be exercised.</p>
                </div>
                <div className="border-b border-gray-100 pb-2">
                  <h4 className="font-medium text-gray-800 text-sm">CE (Call European)</h4>
                  <p className="text-gray-600 text-xs">Option that gives the right to buy at strike price.</p>
                </div>
                <div className="border-b border-gray-100 pb-2">
                  <h4 className="font-medium text-gray-800 text-sm">PE (Put European)</h4>
                  <p className="text-gray-600 text-xs">Option that gives the right to sell at strike price.</p>
                </div>
                <div className="border-b border-gray-100 pb-2">
                  <h4 className="font-medium text-gray-800 text-sm">Premium</h4>
                  <p className="text-gray-600 text-xs">The price paid by the buyer to the seller for an options contract.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">IMPKEYS</h4>
                  <p className="text-gray-600 text-xs">Important price levels that serve as key reference points.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 