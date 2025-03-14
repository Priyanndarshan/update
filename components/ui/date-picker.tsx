"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/components/ui/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar-custom"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  defaultMonth?: Date
  disabled?: (date: Date) => boolean
}

export function DatePicker({ 
  date, 
  setDate, 
  placeholder = "Pick a date", 
  className,
  defaultMonth,
  disabled
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          defaultMonth={defaultMonth}
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  )
} 