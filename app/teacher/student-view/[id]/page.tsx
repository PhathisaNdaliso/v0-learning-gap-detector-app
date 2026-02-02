"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { PageNav } from "@/components/page-nav"
import { demoStudents } from "@/lib/user-store"
import { Eye, BarChart3, BookOpen, Trophy, ArrowLeft } from "lucide-react"

// Teacher's view of a student's dashboard - restricted access
export default function TeacherStudentView({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const student = demoStudents.find((s) => s.id === resolvedParams.id) || demoStudents[0]

  const studentStats = [
    { label: "Day Streak", value: 7, icon: "🔥" },
    { label: "Lessons Done", value: 12, icon: "📚" },
    { label: "Quiz Score", value: "85%", icon: "⭐" },
    { label: "Points", value: 450, icon: "💎" },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="teacher" />

      <div className="max-w-4xl mx-auto px-4 pt-16">
        <PageNav title="Student View" backHref="/teacher/dashboard" />

        {/* Teacher Access Banner */}
        <Card className="mb-6 border-0 shadow bg-[#4A90E2]/10 border-l-4 border-l-[#4A90E2]">
          <CardContent className="p-4 flex items-center gap-3">
            <Eye className="h-5 w-5 text-[#4A90E2]" />
            <div>
              <p className="font-medium text-foreground">Teacher View Mode</p>
              <p className="text-sm text-muted-foreground">
                You are viewing {student.name}'s dashboard as their teacher
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Student Profile Card */}
        <Card className="mb-6 overflow-hidden border-0 shadow-lg">
          <div className="h-2 bg-gradient-to-r from-[#FFC857] to-[#F97316]" />
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#FFC857] rounded-full flex items-center justify-center text-3xl">👧</div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{student.name}</h2>
                <p className="text-muted-foreground">{student.grade}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-[#7BC67E]/20 text-[#4CAF50] rounded-full text-xs">
                  {student.learningStyle} Learner
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Stats (View Only) */}
        <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
          <BarChart3 className="h-4 w-4" /> Student Progress Stats
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {studentStats.map((stat, i) => (
            <Card key={i} className="border-0 shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{stat.icon}</span>
                  <div>
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quiz Results */}
        {student.quizCompleted && student.quizResults && (
          <Card className="mb-6 border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-foreground text-sm">
                <BookOpen className="h-4 w-4" /> Learning Style Quiz Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(student.quizResults.scores).map(([style, score]) => (
                  <div key={style} className="flex items-center gap-3">
                    <span className="text-sm capitalize w-24 text-foreground">{style}</span>
                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-[#4A90E2] rounded-full" style={{ width: `${score}%` }} />
                    </div>
                    <span className="text-sm font-medium text-foreground w-12 text-right">{score}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Achievements */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-foreground text-sm">
              <Trophy className="h-4 w-4" /> Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              {["🏆", "🔥", "📖"].map((badge, i) => (
                <div
                  key={i}
                  className="w-12 h-12 bg-[#FFC857]/20 rounded-full flex items-center justify-center text-2xl"
                >
                  {badge}
                </div>
              ))}
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-xl opacity-40">
                🔒
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="bg-transparent" onClick={() => router.push("/teacher/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
          <Button
            className="bg-[#4A90E2] hover:bg-[#1F5DA0]"
            onClick={() => router.push(`/teacher/results/${student.id}`)}
          >
            View Full Report
          </Button>
        </div>
      </div>
    </div>
  )
}
