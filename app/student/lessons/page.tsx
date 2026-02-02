"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { PageNav } from "@/components/page-nav"

export default function StudentLessons() {
  const router = useRouter()
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null)

  const lessons = [
    {
      id: 1,
      title: "Visual Learner Tips",
      emoji: "👁️",
      color: "bg-[#4A90E2]",
      progress: 100,
      tips: [
        { tip: "Use colorful highlighters!", emoji: "🖍️" },
        { tip: "Draw pictures of what you learn", emoji: "🎨" },
        { tip: "Watch educational videos", emoji: "📺" },
        { tip: "Create mind maps", emoji: "🗺️" },
      ],
    },
    {
      id: 2,
      title: "Focus & Attention",
      emoji: "🎯",
      color: "bg-[#7BC67E]",
      progress: 60,
      tips: [
        { tip: "Take short breaks every 20 minutes", emoji: "⏰" },
        { tip: "Find a quiet study spot", emoji: "🤫" },
        { tip: "Remove distractions", emoji: "📵" },
        { tip: "Use a timer for tasks", emoji: "⏱️" },
      ],
    },
    {
      id: 3,
      title: "Reading Made Fun",
      emoji: "📚",
      color: "bg-[#FFC857]",
      progress: 30,
      tips: [
        { tip: "Read books you enjoy!", emoji: "❤️" },
        { tip: "Use your finger to follow along", emoji: "👆" },
        { tip: "Read out loud sometimes", emoji: "🗣️" },
        { tip: "Take notes while reading", emoji: "📝" },
      ],
    },
    {
      id: 4,
      title: "Math Tricks",
      emoji: "🔢",
      color: "bg-[#F97316]",
      progress: 0,
      tips: [
        { tip: "Use objects to count", emoji: "🧮" },
        { tip: "Draw pictures for word problems", emoji: "✏️" },
        { tip: "Practice a little every day", emoji: "📅" },
        { tip: "Make math into a game!", emoji: "🎮" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="student" />

      <div className="max-w-4xl mx-auto px-4 pt-16">
        <PageNav title="My Lessons" backHref="/student/dashboard" />

        <div className="text-center mb-6">
          <span className="text-5xl block mb-2">📚</span>
          <h1 className="text-xl font-bold text-foreground">Learning Adventures!</h1>
          <p className="text-muted-foreground">Tap a lesson to learn cool tips!</p>
        </div>

        <div className="space-y-4">
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="border-0 shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all"
              onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
            >
              <div className={`h-2 ${lesson.color}`} />
              <CardContent className="p-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-14 h-14 ${lesson.color} rounded-xl flex items-center justify-center text-3xl`}>
                    {lesson.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{lesson.title}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${lesson.color} rounded-full`}
                          style={{ width: `${lesson.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{lesson.progress}%</span>
                    </div>
                  </div>
                  <span className="text-xl">{expandedLesson === lesson.id ? "▲" : "▼"}</span>
                </div>

                {expandedLesson === lesson.id && (
                  <div className="mt-4 space-y-2 animate-in slide-in-from-top duration-200">
                    {lesson.tips.map((tip, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                        <span className="text-2xl">{tip.emoji}</span>
                        <span className="text-sm text-foreground">{tip.tip}</span>
                      </div>
                    ))}
                    <Button className={`w-full mt-3 ${lesson.color} hover:opacity-90`}>
                      {lesson.progress === 100 ? "Review Lesson ✓" : "Continue Learning →"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
