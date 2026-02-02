"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { HamburgerMenu } from "@/components/hamburger-menu"

export default function ProcessingResults() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState(0)

  const stages = [
    { text: "Analyzing responses...", emoji: "🔍" },
    { text: "Identifying learning patterns...", emoji: "🧠" },
    { text: "Detecting potential gaps...", emoji: "🎯" },
    { text: "Generating recommendations...", emoji: "💡" },
    { text: "Creating report...", emoji: "📊" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => router.push("/teacher/results/1"), 500)
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [router])

  useEffect(() => {
    setStage(Math.min(Math.floor(progress / 20), stages.length - 1))
  }, [progress])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <HamburgerMenu userRole="teacher" />

      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-6 animate-bounce-slow">{stages[stage].emoji}</div>

          <h2 className="text-xl font-bold mb-2 text-foreground">AI Processing</h2>
          <p className="text-muted-foreground mb-6">{stages[stage].text}</p>

          <div className="h-3 bg-muted rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-[#4A90E2] to-[#7BC67E] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-sm text-muted-foreground">{progress}% complete</p>

          <div className="flex justify-center gap-2 mt-6">
            {stages.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${i <= stage ? "bg-[#4A90E2]" : "bg-muted"}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
