"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { PageNav } from "@/components/page-nav"
import { ChevronDown, ChevronUp } from "lucide-react"
import { getCurrentUser, defaultUsers } from "@/lib/user-store"

export default function ParentDashboard() {
  const router = useRouter()
  const [expandedTip, setExpandedTip] = useState<number | null>(null)
  const [userName, setUserName] = useState("Parent")
  const [childName, setChildName] = useState("Your Child")

  useEffect(() => {
    const user = getCurrentUser()
    if (user && user.role === "parent") {
      setUserName(user.name.split(" ")[0])
      setChildName(user.childName || defaultUsers.parent.childName || "Your Child")
    }
  }, [])

  const child = {
    name: childName.split(" ")[0],
    grade: "Grade 3",
    learningStyle: "Visual Learner",
    lastAssessment: "2 days ago",
    progress: 75,
  }

  const quickStats = [
    { label: "Lessons Complete", value: 12, icon: "📚", color: "bg-[#4A90E2]" },
    { label: "Quiz Score", value: "85%", icon: "⭐", color: "bg-[#7BC67E]" },
    { label: "Day Streak", value: 7, icon: "🔥", color: "bg-[#FFC857]" },
    { label: "Achievements", value: 5, icon: "🏆", color: "bg-[#F97316]" },
  ]

  const parentTips = [
    {
      title: "Supporting Visual Learners",
      icon: "👁️",
      tips: [
        "Use colorful charts and diagrams",
        "Create visual schedules",
        "Use flashcards with pictures",
        "Encourage drawing and mind mapping",
      ],
    },
    {
      title: "Creating a Good Learning Environment",
      icon: "🏠",
      tips: [
        "Set up a quiet, organized study space",
        "Reduce distractions during study time",
        "Have good lighting",
        "Keep supplies within reach",
      ],
    },
    {
      title: "Celebrating Progress",
      icon: "🎉",
      tips: [
        "Praise effort, not just results",
        "Create a reward chart",
        "Share achievements with family",
        "Make learning fun with games",
      ],
    },
  ]

  const recentActivities = [
    { activity: "Completed Math Quiz", time: "Today", icon: "✅", score: "8/10" },
    { activity: "Watched Learning Video", time: "Yesterday", icon: "📺" },
    { activity: "Finished Reading Lesson", time: "2 days ago", icon: "📖" },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="parent" />

      <div className="max-w-4xl mx-auto px-4 pt-16">
        <PageNav title="Parent Dashboard" backHref="/" />

        {/* Welcome Message */}
        <div className="mb-6 p-4 bg-[#7BC67E]/10 rounded-xl">
          <p className="text-foreground">
            Welcome, <span className="font-bold">{userName}</span>! Here's how {child.name} is doing.
          </p>
        </div>

        {/* Child Overview Card */}
        <Card className="mb-6 overflow-hidden border-0 shadow-lg">
          <div className="h-2 bg-gradient-to-r from-[#7BC67E] to-[#4A90E2]" />
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{child.name}'s Progress</h2>
                <p className="text-muted-foreground">
                  {child.grade} • {child.learningStyle}
                </p>
              </div>
              <div className="w-14 h-14 bg-[#7BC67E] rounded-full flex items-center justify-center text-2xl">👧</div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium text-foreground">{child.progress}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#7BC67E] to-[#4A90E2] rounded-full transition-all duration-500"
                  style={{ width: `${child.progress}%` }}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 bg-[#7BC67E] hover:bg-[#4CAF50]" onClick={() => router.push("/parent/results")}>
                View Full Report
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => router.push("/parent/questionnaire")}
              >
                Complete Survey
              </Button>
            </div>
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

        {/* Recent Activity */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <span className="text-xl">📅</span> {child.name}'s Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{activity.icon}</span>
                  <div>
                    <p className="font-medium text-foreground">{activity.activity}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                {activity.score && <span className="text-sm font-medium text-[#7BC67E]">{activity.score}</span>}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Parent Tips */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <span className="text-xl">💡</span> Tips for Parents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {parentTips.map((tip, i) => (
              <div key={i} className="bg-muted rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/80 transition-colors"
                  onClick={() => setExpandedTip(expandedTip === i ? null : i)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{tip.icon}</span>
                    <span className="font-medium text-foreground">{tip.title}</span>
                  </div>
                  {expandedTip === i ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                {expandedTip === i && (
                  <div className="px-4 pb-4">
                    <ul className="space-y-2">
                      {tip.tips.map((t, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-[#7BC67E]">✓</span> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 hover:bg-[#7BC67E]/10 hover:border-[#7BC67E] bg-transparent"
            onClick={() => router.push("/parent/tips")}
          >
            <span className="text-2xl">📖</span>
            <span className="text-foreground">Learning Resources</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 hover:bg-[#4A90E2]/10 hover:border-[#4A90E2] bg-transparent"
            onClick={() => router.push("/profile?role=parent")}
          >
            <span className="text-2xl">⚙️</span>
            <span className="text-foreground">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
