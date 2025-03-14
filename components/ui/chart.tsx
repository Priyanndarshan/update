"use client"

import * as React from "react"
import { cn } from "./utils"

export interface ChartConfig {
  [key: string]: {
    label: string
    color?: string
  }
}

interface ChartContainerProps {
  config: ChartConfig
  className?: string
  children: React.ReactNode
}

export function ChartContainer({
  config,
  className,
  children,
}: ChartContainerProps) {
  return (
    <div
      className={cn("relative", className)}
      style={
        {
          "--color-desktop": config.desktop?.color,
          "--color-mobile": config.mobile?.color,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}

// We'll use the recharts components directly in our implementation
// instead of wrapping them in our own components
export { Tooltip as ChartTooltip, Legend as ChartLegend } from "recharts"

// Custom tooltip content component
interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: {
      [key: string]: any
    }
  }>
  label?: string
  labelFormatter?: (label: string) => React.ReactNode
  valueFormatter?: (value: number) => React.ReactNode
  indicator?: "line" | "dot"
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
  indicator = "line",
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-medium">
            {labelFormatter ? labelFormatter(label as string) : label}
          </div>
        </div>
        <div className="grid gap-1">
          {payload.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className={cn(
                  "h-2 w-2",
                  indicator === "line" ? "h-1 w-4" : "h-2 w-2 rounded-full"
                )}
                style={{
                  backgroundColor: item.payload.fill || item.payload.stroke,
                }}
              />
              <div className="flex items-center gap-1">
                <span className="text-xs tabular-nums">
                  {valueFormatter ? valueFormatter(item.value) : item.value}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Custom legend content component
interface ChartLegendContentProps {
  payload?: Array<{
    value: string
    color: string
    type: string
    id: string
  }>
}

export function ChartLegendContent({ payload }: ChartLegendContentProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {payload?.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <div
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: item.color,
            }}
          />
          <span className="text-xs font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  )
} 