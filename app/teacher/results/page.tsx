"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { PageNav } from "@/components/page-nav"
import { Download, ChevronRight, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function TeacherResults() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const students = [
    { id: 1, name: "Alex Johnson", style: "Visual", risk: "Low", date: "Dec 4", emoji: "👁️", color: "#4A90E2" },
    {
      id: 2,
      name: "Sarah Williams",
      style: "Kinesthetic",
      risk: "Medium",
      date: "Dec 3",
      emoji: "🤸",
      color: "#7BC67E",
    },
    { id: 3, name: "Mike Brown", style: "Auditory", risk: "Low", date: "Dec 2", emoji: "👂", color: "#FFC857" },
    { id: 4, name: "Emma Davis", style: "Read/Write", risk: "High", date: "Dec 1", emoji: "📖", color: "#F97316" },
    { id: 5, name: "James Wilson", style: "Multimodal", risk: "Low", date: "Nov 30", emoji: "🌈", color: "#EC4899" },
  ]

  const filteredStudents = students.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="teacher" />

      <div className="max-w-4xl mx-auto px-4 pt-16">
        <PageNav title="Results Dashboard" backHref="/teacher/dashboard" />

        {/* Search & Filter */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Assessed", value: students.length, emoji: "📊" },
            { label: "At Risk", value: 1, emoji: "⚠️" },
            { label: "Completed", value: "100%", emoji: "✅" },
          ].map((stat, i) => (
            <Card key={i} className="border-0 shadow">
              <CardContent className="p-4 text-center">
                <span className="text-2xl block mb-1">{stat.emoji}</span>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Student List */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <span className="text-xl">📋</span> All Students
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors cursor-pointer"
                onClick={() => router.push(`/teacher/results/${student.id}`)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${student.color}20` }}
                  >
                    {student.emoji}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.style} Learner</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      student.risk === "Low"
                        ? "bg-[#7BC67E]/20 text-[#4CAF50]"
                        : student.risk === "Medium"
                          ? "bg-[#FFC857]/20 text-[#F97316]"
                          : "bg-[#D9534F]/20 text-[#D9534F]"
                    }`}
                  >
                    {student.risk} Risk
                  </span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Download All Button */}
        <Button className="w-full mt-6 bg-[#4A90E2] hover:bg-[#1F5DA0]" onClick={() => {}}>
          <Download className="h-5 w-5 mr-2" /> Download All Reports (PDF)
        </Button>
      </div>
    </div>
  )
}
