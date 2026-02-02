"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { PageNav } from "@/components/page-nav"
import { getCurrentUser, defaultUsers } from "@/lib/user-store"

export default function StudentDashboard() {
  const router = useRouter()
  const [showCelebration, setShowCelebration] = useState(true)
  const [studentName, setStudentName] = useState("Superstar")

  useEffect(() => {
    const user = getCurrentUser()
    if (user && user.role === "student") {
      setStudentName(user.name.split(" ")[0])
    } else {
      setStudentName(defaultUsers.student.name.split(" ")[0])
    }
  }, [])

  const stats = [
    { label: "Day Streak", value: 7, icon: "🔥", color: "from-orange-400 to-red-500" },
    { label: "Lessons Done", value: 12, icon: "📚", color: "from-blue-400 to-purple-500" },
    { label: "Quiz Score", value: "85%", icon: "⭐", color: "from-yellow-400 to-orange-500" },
    { label: "Points", value: 450, icon: "💎", color: "from-cyan-400 to-blue-500" },
  ]

  const achievements = [
    { name: "First Quiz!", icon: "🏆", unlocked: true },
    { name: "5 Day Streak", icon: "🔥", unlocked: true },
    { name: "Super Reader", icon: "📖", unlocked: true },
    { name: "Math Wizard", icon: "🧙", unlocked: false },
    { name: "Perfect Score", icon: "💯", unlocked: false },
    { name: "Helper Hero", icon: "🦸", unlocked: false },
  ]

  const activities = [
    {
      title: "Take a Fun Quiz",
      icon: "🎯",
      desc: "Answer questions to discover how you learn!",
      href: "/student/quiz",
      color: "bg-[#4A90E2]",
    },
    {
      title: "Play Learning Games",
      icon: "🎮",
      desc: "Learn while having fun!",
      href: "/student/games",
      color: "bg-[#7BC67E]",
    },
    {
      title: "My Lessons",
      icon: "📚",
      desc: "Continue your learning adventure!",
      href: "/student/lessons",
      color: "bg-[#FFC857]",
    },
    {
      title: "View Achievements",
      icon: "🏆",
      desc: "See all your awesome badges!",
      href: "/student/achievements",
      color: "bg-[#F97316]",
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="student" />

      <div className="max-w-4xl mx-auto px-4 pt-16">
        <PageNav title="My Dashboard" backHref="/" showHome={false} />

        {/* Welcome Banner */}
        {showCelebration && (
          <Card className="mb-6 overflow-hidden border-0 shadow-lg bg-gradient-to-r from-[#4A90E2] to-[#7BC67E]">
            <CardContent className="p-6 text-white relative">
              <button
                className="absolute top-2 right-2 text-white/70 hover:text-white text-xl"
                onClick={() => setShowCelebration(false)}
              >
                ✕
              </button>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Hey {studentName}!</h2>
                  <p className="opacity-90">You're doing amazing! Keep learning!</p>
                </div>
                <div className="text-6xl">🎉</div>
              </div>
              <div className="flex gap-2 mt-4 text-3xl">
                <span className="animate-float" style={{ animationDelay: "0s" }}>
                  🎊
                </span>
                <span className="animate-float" style={{ animationDelay: "0.2s" }}>
                  ✨
                </span>
                <span className="animate-float" style={{ animationDelay: "0.4s" }}>
                  🌟
                </span>
                <span className="animate-float" style={{ animationDelay: "0.6s" }}>
                  🎈
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Fun Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, i) => (
            <Card
              key={i}
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className={`h-1 bg-gradient-to-r ${stat.color}`} />
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl hover:scale-125 transition-transform">{stat.icon}</span>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Activities */}
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
          <span className="text-2xl">🚀</span> What do you want to do?
        </h2>
        <div className="grid grid-cols-1 gap-4 mb-6">
          {activities.map((activity, i) => (
            <Card
              key={i}
              className="cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 border-0 shadow-lg overflow-hidden"
              onClick={() => router.push(activity.href)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-16 h-16 ${activity.color} rounded-2xl flex items-center justify-center text-3xl`}>
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground">{activity.desc}</p>
                </div>
                <span className="text-2xl">→</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements Preview */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-foreground">
              <span className="flex items-center gap-2">
                <span className="text-xl">🏆</span> My Badges
              </span>
              <Button variant="ghost" size="sm" onClick={() => router.push("/student/achievements")}>
                See All →
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {achievements.map((badge, i) => (
                <div key={i} className={`flex-shrink-0 w-20 text-center ${!badge.unlocked && "opacity-40"}`}>
                  <div
                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl ${
                      badge.unlocked ? "bg-[#FFC857]/20" : "bg-muted"
                    }`}
                  >
                    {badge.unlocked ? badge.icon : "🔒"}
                  </div>
                  <p className="text-xs mt-1 text-foreground">{badge.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings Button for Student */}
        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => router.push("/profile?role=student")}
          >
            <span className="mr-2">⚙️</span> My Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
