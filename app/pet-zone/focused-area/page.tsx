"use client";

import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Search, Filter, X, Download, ArrowUpDown } from 'lucide-react';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
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
const focusedAreaData = [
  { id: 1, date: new Date(2025, 2, 13), title: 'BANKNIFTY', action: 'Download' },
  { id: 2, date: new Date(2025, 2, 13), title: 'NIFTY', action: 'Download' },
  { id: 3, date: new Date(2025, 2, 12), title: 'BANKNIFTY', action: 'Download' },
  { id: 4, date: new Date(2025, 2, 11), title: 'BANKNIFTY', action: 'Download' },
  { id: 5, date: new Date(2025, 2, 11), title: 'NIFTY', action: 'Download' },
  { id: 6, date: new Date(2025, 2, 10), title: 'BANKNIFTY', action: 'Download' },
  { id: 7, date: new Date(2025, 2, 10), title: 'NIFTY', action: 'Download' },
  { id: 8, date: new Date(2025, 2, 7), title: 'BANKNIFTY', action: 'Download' },
  { id: 9, date: new Date(2025, 2, 7), title: 'NIFTY', action: 'Download' },
];

export default function FocusedAreaPage() {
  const [fromDate, setFromDate] = React.useState<Date | undefined>(undefined);
  const [toDate, setToDate] = React.useState<Date | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = React.useState<string>("");
  const [selectedYear, setSelectedYear] = React.useState<string>("");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

  // Filter data based on search query and date filters
  const filteredData = React.useMemo(() => {
    return focusedAreaData.filter(item => {
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
      
      return true;
    });
  }, [focusedAreaData, searchQuery, fromDate, toDate]);

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
    setSelectedMonth("");
    setSelectedYear("");
    setSearchQuery("");
  };

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
    // You could implement logic to set fromDate and toDate based on month
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
    // You could implement logic to set fromDate and toDate based on year
  };

  return (
    <div className="container mx-auto py-8 px-4 mt-4">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>PET Zone</span>
          <span>/</span>
          <span className="text-gray-800 font-medium">Focused Area</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Focused Area</h1>
        <p className="text-gray-500">Access and download focused area analysis for your trading strategy</p>
      </div>

      <Card className="mb-8 border-gray-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-gray-100">
          <CardTitle className="text-lg font-medium text-gray-700">Filter Options</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* From Date */}
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-gray-200",
                      !fromDate && "text-gray-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate ? format(fromDate, "PPP") : "From Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={setFromDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* To Date */}
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-gray-200",
                      !toDate && "text-gray-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? format(toDate, "PPP") : "To Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={setToDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Month Select */}
            <div>
              <Select value={selectedMonth} onValueChange={handleMonthChange}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">January</SelectItem>
                  <SelectItem value="2">February</SelectItem>
                  <SelectItem value="3">March</SelectItem>
                  <SelectItem value="4">April</SelectItem>
                  <SelectItem value="5">May</SelectItem>
                  <SelectItem value="6">June</SelectItem>
                  <SelectItem value="7">July</SelectItem>
                  <SelectItem value="8">August</SelectItem>
                  <SelectItem value="9">September</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">December</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Year Select */}
            <div>
              <Select value={selectedYear} onValueChange={handleYearChange}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="pl-9 border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button 
              variant="default" 
              size="sm" 
              className="bg-teal-500 hover:bg-teal-600"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="border-gray-200 text-gray-700 hover:text-gray-900"
            >
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[80px] font-medium text-gray-700">S.NO</TableHead>
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
                    TITLE
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right font-medium text-gray-700">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length > 0 ? (
                sortedData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{format(item.date, 'dd/MM/yyyy')}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(
                        "font-medium border-0 px-2 py-0.5",
                        item.title === 'BANKNIFTY' 
                          ? "bg-blue-50 text-blue-700" 
                          : "bg-green-50 text-green-700"
                      )}>
                        {item.title}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                    No results found.
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