"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { PageNav } from "@/components/page-nav"

export default function StudentAchievements() {
  const router = useRouter()

  const achievements = [
    { name: "First Quiz!", emoji: "🏆", desc: "Complete your first quiz", unlocked: true, date: "Dec 1" },
    { name: "5 Day Streak", emoji: "🔥", desc: "Learn 5 days in a row", unlocked: true, date: "Dec 3" },
    { name: "Super Reader", emoji: "📖", desc: "Finish 5 reading lessons", unlocked: true, date: "Dec 4" },
    { name: "Math Wizard", emoji: "🧙", desc: "Score 100% on math quiz", unlocked: false },
    { name: "Perfect Score", emoji: "💯", desc: "Get all answers right", unlocked: false },
    { name: "Helper Hero", emoji: "🦸", desc: "Help a friend learn", unlocked: false },
    { name: "Early Bird", emoji: "🐦", desc: "Study before 8am", unlocked: false },
    { name: "Night Owl", emoji: "🦉", desc: "Study after 8pm", unlocked: false },
    { name: "Game Master", emoji: "🎮", desc: "Win all learning games", unlocked: false },
    { name: "10 Day Streak", emoji: "⚡", desc: "Learn 10 days in a row", unlocked: false },
    { name: "Bookworm", emoji: "📚", desc: "Complete all lessons", unlocked: false },
    { name: "Star Student", emoji: "⭐", desc: "Earn all badges", unlocked: false },
  ]

  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="student" />

      <div className="max-w-4xl mx-auto px-4 pt-16">
        <PageNav title="My Achievements" backHref="/student/dashboard" />

        {/* Stats */}
        <Card className="mb-6 overflow-hidden border-0 shadow-lg bg-gradient-to-r from-[#FFC857] to-[#F97316]">
          <CardContent className="p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">
                  {unlockedCount}/{achievements.length}
                </h2>
                <p className="opacity-90">Badges Earned</p>
              </div>
              <div className="text-6xl animate-bounce-slow">🏆</div>
            </div>
            <div className="mt-4 h-3 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Achievements Grid */}
        <div className="grid grid-cols-3 gap-4">
          {achievements.map((badge, i) => (
            <Card
              key={i}
              className={`border-0 shadow text-center transition-all hover:shadow-lg ${
                badge.unlocked ? "" : "opacity-50"
              }`}
            >
              <CardContent className="p-4">
                <div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-2 ${
                    badge.unlocked ? "bg-[#FFC857]/20" : "bg-muted"
                  }`}
                >
                  {badge.unlocked ? badge.emoji : "🔒"}
                </div>
                <p className="font-medium text-sm text-foreground">{badge.name}</p>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
                {badge.unlocked && badge.date && <p className="text-xs text-[#7BC67E] mt-1">Earned {badge.date}</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-6 bg-transparent"
          onClick={() => router.push("/student/dashboard")}
        >
          ← Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
