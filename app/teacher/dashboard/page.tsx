"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { PageNav } from "@/components/page-nav"
import { Users, Play, ChevronRight, Sparkles, Eye } from "lucide-react"
import { getCurrentUser, demoStudents } from "@/lib/user-store"

export default function TeacherDashboard() {
  const router = useRouter()
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [userName, setUserName] = useState("Teacher")

  useEffect(() => {
    const user = getCurrentUser()
    if (user && user.role === "teacher") {
      setUserName(user.name.split(" ")[0])
    }
  }, [])

  const classData = {
    name: "Class 3A",
    totalStudents: demoStudents.length,
    completedScans: demoStudents.filter((s) => s.quizCompleted).length,
    recentScans: 2,
    activeAssessments: 1,
  }

  const recentReports = [
    { id: 1, student: "Emma Thompson", type: "Visual Learner", date: "Today", status: "new", icon: "👁️" },
    { id: 2, student: "Alex Johnson", type: "Visual Learner", date: "Yesterday", status: "reviewed", icon: "👁️" },
    { id: 3, student: "Sarah Williams", type: "Kinesthetic", date: "2 days ago", status: "new", icon: "🤸" },
  ]

  const quickStats = [
    { label: "Total Students", value: classData.totalStudents, icon: "👨‍🎓", color: "bg-[#4A90E2]" },
    { label: "Scans Complete", value: classData.completedScans, icon: "✅", color: "bg-[#7BC67E]" },
    { label: "Recent Scans", value: classData.recentScans, icon: "🔍", color: "bg-[#FFC857]" },
    { label: "Active Assessments", value: classData.activeAssessments, icon: "📝", color: "bg-[#F97316]" },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="teacher" />

      <div className="max-w-4xl mx-auto px-4 pt-16">
        <PageNav title="Teacher Dashboard" backHref="/" />

        {/* Welcome Message */}
        <div className="mb-6 p-4 bg-[#4A90E2]/10 rounded-xl">
          <p className="text-foreground">
            Welcome back, <span className="font-bold">{userName}</span>! 👋
          </p>
        </div>

        {/* Class Overview Card */}
        <Card className="mb-6 overflow-hidden border-0 shadow-lg">
          <div className="h-2 bg-gradient-to-r from-[#4A90E2] to-[#7BC67E]" />
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{classData.name}</h2>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" /> {classData.totalStudents} Students
                </p>
              </div>
              <div className="w-14 h-14 bg-[#4A90E2] rounded-full flex items-center justify-center text-2xl">👩‍🏫</div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Scan Progress</span>
                <span className="font-medium text-foreground">
                  {Math.round((classData.completedScans / classData.totalStudents) * 100)}%
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#4A90E2] to-[#7BC67E] rounded-full transition-all duration-500"
                  style={{ width: `${(classData.completedScans / classData.totalStudents) * 100}%` }}
                />
              </div>
            </div>

            <Button
              className="w-full bg-[#4A90E2] hover:bg-[#1F5DA0] text-white"
              onClick={() => router.push("/teacher/questionnaire")}
            >
              <Play className="h-5 w-5 mr-2" />
              Start Learning Scan
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {quickStats.map((stat, i) => (
            <Card
              key={i}
              className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-0 shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-2xl`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Reports */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <span className="text-xl">📋</span> Recent Reports
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => router.push("/teacher/results")}>
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-3 bg-muted rounded-xl hover:bg-muted/80 transition-colors cursor-pointer"
                onClick={() => router.push(`/teacher/results/${report.id}`)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{report.icon}</span>
                  <div>
                    <p className="font-medium text-foreground">{report.student}</p>
                    <p className="text-xs text-muted-foreground">{report.type}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">{report.date}</p>
                    {report.status === "new" && (
                      <span className="text-xs bg-[#4A90E2] text-white px-2 py-0.5 rounded-full">New</span>
                    )}
                  </div>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* View Student Dashboards - Teacher Only Feature */}
        <Card className="mb-6 border-0 shadow-lg border-l-4 border-l-[#4A90E2]">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-foreground text-sm">
              <Eye className="h-4 w-4 text-[#4A90E2]" /> Teacher Access: View Student Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {demoStudents.map((student) => (
                <button
                  key={student.id}
                  className="w-full flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-[#4A90E2]/10 transition-colors"
                  onClick={() => router.push(`/teacher/student-view/${student.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">👧</span>
                    <div className="text-left">
                      <p className="font-medium text-foreground text-sm">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.grade}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${student.quizCompleted ? "bg-[#7BC67E]/20 text-[#4CAF50]" : "bg-[#FFC857]/20 text-[#F97316]"}`}
                    >
                      {student.quizCompleted ? "Quiz Done" : "Pending"}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 hover:bg-[#4A90E2]/10 hover:border-[#4A90E2] bg-transparent"
            onClick={() => router.push("/teacher/micro-lessons")}
          >
            <span className="text-2xl">💡</span>
            <span className="text-foreground">Micro-Lessons</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 hover:bg-[#7BC67E]/10 hover:border-[#7BC67E] bg-transparent"
            onClick={() => router.push("/teacher/converter")}
          >
            <span className="text-2xl">🔄</span>
            <span className="text-foreground">Content Converter</span>
          </Button>
        </div>
      </div>

      {/* AI Assistant Sidebar */}
      <Button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#4A90E2] hover:bg-[#1F5DA0] shadow-lg"
        onClick={() => setShowAIAssistant(!showAIAssistant)}
      >
        <Sparkles className="h-6 w-6 text-white" />
      </Button>

      {showAIAssistant && (
        <div className="fixed bottom-24 right-6 w-80 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden z-50">
          <div className="bg-[#4A90E2] text-white p-4 flex justify-between items-center">
            <span className="font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5" /> AI Help
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setShowAIAssistant(false)}
            >
              ✕
            </Button>
          </div>
          <div className="p-4 space-y-3">
            {[
              { icon: "🤖", label: "Ask a Question", action: () => {} },
              { icon: "📝", label: "Generate Report", action: () => router.push("/teacher/results") },
              { icon: "💡", label: "Get Suggestions", action: () => router.push("/teacher/micro-lessons") },
              { icon: "⚙️", label: "Settings", action: () => router.push("/profile?role=teacher") },
            ].map((item, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left"
                onClick={item.action}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-foreground">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
