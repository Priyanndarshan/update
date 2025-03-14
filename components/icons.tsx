"use client"

import * as React from "react"
import { 
  BarChart2, 
  Briefcase, 
  Users, 
  Star, 
  Video, 
  Calendar, 
  Download, 
  HelpingHand,
  Target,
  Goal,
  Layout
} from "lucide-react"

export type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  logo: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  dashboard: BarChart2,
  portfolio: Briefcase,
  petZone: Users,
  investPremium: Star,
  videos: Video,
  meetings: Calendar,
  downloads: Download,
  help: HelpingHand,
  focusedArea: Target,
  weeklyGoals: Goal,
  tradeSetup: Layout
} 