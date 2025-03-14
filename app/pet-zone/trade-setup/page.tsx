"use client";

import React from 'react';
import { format } from 'date-fns';
import { Search, Filter, X, Download, ArrowUpDown, ChevronDown, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/components/ui/utils';

// Sample data for the table
const tradeSetupData = [
  { 
    id: 1, 
    date: new Date(2025, 2, 15), 
    title: 'BANKNIFTY', 
    type: 'Intraday',
    strategy: 'Breakout',
    status: 'Active',
    action: 'View'
  },
  { 
    id: 2, 
    date: new Date(2025, 2, 15), 
    title: 'NIFTY', 
    type: 'Swing',
    strategy: 'Reversal',
    status: 'Active',
    action: 'View'
  },
  { 
    id: 3, 
    date: new Date(2025, 2, 14), 
    title: 'RELIANCE', 
    type: 'Positional',
    strategy: 'Trend Following',
    status: 'Completed',
    action: 'View'
  },
  { 
    id: 4, 
    date: new Date(2025, 2, 13), 
    title: 'HDFC BANK', 
    type: 'Intraday',
    strategy: 'Gap Fill',
    status: 'Completed',
    action: 'View'
  },
  { 
    id: 5, 
    date: new Date(2025, 2, 12), 
    title: 'INFOSYS', 
    type: 'Swing',
    strategy: 'Support/Resistance',
    status: 'Completed',
    action: 'View'
  },
  { 
    id: 6, 
    date: new Date(2025, 2, 11), 
    title: 'TCS', 
    type: 'Positional',
    strategy: 'Breakout',
    status: 'Completed',
    action: 'View'
  },
  { 
    id: 7, 
    date: new Date(2025, 2, 10), 
    title: 'BANKNIFTY', 
    type: 'Intraday',
    strategy: 'Reversal',
    status: 'Completed',
    action: 'View'
  },
];

// Trade types for the filter
const tradeTypes = [
  { value: "intraday", label: "Intraday" },
  { value: "swing", label: "Swing" },
  { value: "positional", label: "Positional" },
];

// Strategy types for the filter
const strategyTypes = [
  { value: "breakout", label: "Breakout" },
  { value: "reversal", label: "Reversal" },
  { value: "trend-following", label: "Trend Following" },
  { value: "gap-fill", label: "Gap Fill" },
  { value: "support-resistance", label: "Support/Resistance" },
];

export default function TradeSetupPage() {
  const [fromDate, setFromDate] = React.useState<Date | undefined>(undefined);
  const [toDate, setToDate] = React.useState<Date | undefined>(undefined);
  const [selectedType, setSelectedType] = React.useState<string>("");
  const [selectedStrategy, setSelectedStrategy] = React.useState<string>("");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  // Filter data based on search query and filters
  const filteredData = React.useMemo(() => {
    return tradeSetupData.filter(item => {
      // Apply search filter
      if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Apply date range filter
      if (fromDate && item.date < fromDate) {
        return false;
      }
      if (toDate) {
        const nextDay = new Date(toDate);
        nextDay.setDate(nextDay.getDate() + 1);
        if (item.date >= nextDay) {
          return false;
        }
      }
      
      // Apply type filter
      if (selectedType && item.type.toLowerCase() !== selectedType.toLowerCase()) {
        return false;
      }
      
      // Apply strategy filter
      if (selectedStrategy) {
        const formattedStrategy = selectedStrategy.replace(/-/g, ' ').toLowerCase();
        if (item.strategy.toLowerCase() !== formattedStrategy) {
          return false;
        }
      }
      
      // Apply status filter
      if (statusFilter !== "all" && item.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
      
      return true;
    });
  }, [tradeSetupData, searchQuery, fromDate, toDate, selectedType, selectedStrategy, statusFilter]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      if (sortConfig.key === 'date') {
        if (sortConfig.direction === 'ascending') {
          return a.date.getTime() - b.date.getTime();
        } else {
          return b.date.getTime() - a.date.getTime();
        }
      } else if (sortConfig.key === 'title') {
        if (sortConfig.direction === 'ascending') {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      } else if (sortConfig.key === 'type') {
        if (sortConfig.direction === 'ascending') {
          return a.type.localeCompare(b.type);
        } else {
          return b.type.localeCompare(a.type);
        }
      } else if (sortConfig.key === 'strategy') {
        if (sortConfig.direction === 'ascending') {
          return a.strategy.localeCompare(b.strategy);
        } else {
          return b.strategy.localeCompare(a.strategy);
        }
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const clearFilters = () => {
    setFromDate(undefined);
    setToDate(undefined);
    setSelectedType("");
    setSelectedStrategy("");
    setSearchQuery("");
    setStatusFilter("all");
  };

  return (
    <div className="container mx-auto py-8 px-4 mt-4">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>PET Zone</span>
          <span>/</span>
          <span className="text-gray-800 font-medium">Trade Setup</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Trade Setup</h1>
        <p className="text-gray-500">View and analyze trade setups for various instruments and strategies</p>
      </div>

      <Card className="mb-8 border-gray-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium text-gray-700">Filter Options</CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setStatusFilter(statusFilter === "all" ? "active" : "all")}
                className={cn(
                  "text-xs h-8 border-gray-200",
                  statusFilter === "active" ? "bg-teal-50 text-teal-700 border-teal-200" : "bg-white"
                )}
              >
                {statusFilter === "active" ? "Showing Active Only" : "Show All"}
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* From Date */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <DatePicker 
                date={fromDate} 
                setDate={(date: Date | undefined) => {
                  if (date) setFromDate(date);
                }} 
                placeholder="Select start date"
                defaultMonth={new Date(2025, 2)}
                className="w-full"
              />
            </div>

            {/* To Date */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <DatePicker 
                date={toDate} 
                setDate={(date: Date | undefined) => {
                  if (date) setToDate(date);
                }} 
                placeholder="Select end date"
                defaultMonth={fromDate || new Date(2025, 2)}
                disabled={(date) => 
                  (fromDate ? date < fromDate : false) || 
                  date > new Date()
                }
                className="w-full"
              />
            </div>

            {/* Trade Type */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Trade Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="border-gray-200 bg-white">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {tradeTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Strategy */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Strategy</label>
              <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                <SelectTrigger className="border-gray-200 bg-white">
                  <SelectValue placeholder="Select Strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Strategies</SelectItem>
                  {strategyTypes.map((strategy) => (
                    <SelectItem key={strategy.value} value={strategy.value}>
                      {strategy.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search by title"
                  className="pl-9 border-gray-200 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button 
              variant="default" 
              size="sm" 
              className="bg-teal-500 hover:bg-teal-600 text-white px-4"
            >
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-medium text-gray-700">Results ({sortedData.length})</h3>
            <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
              {sortConfig?.key 
                ? `Sorted by ${sortConfig.key.charAt(0).toUpperCase() + sortConfig.key.slice(1)}: ${sortConfig.direction === 'ascending' ? 'A-Z' : 'Z-A'}`
                : 'Default Sort'}
            </Badge>
          </div>
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[60px] font-medium text-gray-700">ID</TableHead>
                <TableHead className="font-medium text-gray-700">
                  <Button 
                    variant="ghost" 
                    onClick={() => requestSort('date')}
                    className="flex items-center font-medium text-gray-700 hover:text-gray-900"
                  >
                    DATE
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium text-gray-700">
                  <Button 
                    variant="ghost" 
                    onClick={() => requestSort('title')}
                    className="flex items-center font-medium text-gray-700 hover:text-gray-900"
                  >
                    INSTRUMENT
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium text-gray-700">
                  <Button 
                    variant="ghost" 
                    onClick={() => requestSort('type')}
                    className="flex items-center font-medium text-gray-700 hover:text-gray-900"
                  >
                    TYPE
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium text-gray-700">
                  <Button 
                    variant="ghost" 
                    onClick={() => requestSort('strategy')}
                    className="flex items-center font-medium text-gray-700 hover:text-gray-900"
                  >
                    STRATEGY
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium text-gray-700">STATUS</TableHead>
                <TableHead className="text-right font-medium text-gray-700">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length > 0 ? (
                sortedData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{format(item.date, 'dd/MM/yyyy')}</TableCell>
                    <TableCell className="font-medium text-gray-800">{item.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(
                        "font-medium border-0 px-2 py-0.5",
                        item.type === 'Intraday' 
                          ? "bg-blue-50 text-blue-700" 
                          : item.type === 'Swing'
                            ? "bg-purple-50 text-purple-700"
                            : "bg-amber-50 text-amber-700"
                      )}>
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.strategy}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(
                        "font-medium border-0 px-2 py-0.5",
                        item.status === 'Active' 
                          ? "bg-green-50 text-green-700" 
                          : "bg-gray-50 text-gray-700"
                      )}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                    No results found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 