"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { PageNav } from "@/components/page-nav"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function ParentTips() {
  const router = useRouter()
  const [expandedSection, setExpandedSection] = useState<number | null>(0)

  const tipSections = [
    {
      title: "Understanding Learning Styles",
      emoji: "🧠",
      color: "bg-[#4A90E2]",
      tips: [
        {
          title: "Visual Learners",
          desc: "Use pictures, diagrams, and color-coding. Let them watch educational videos.",
          emoji: "👁️",
        },
        {
          title: "Auditory Learners",
          desc: "Read aloud together, discuss topics, and use songs or rhymes.",
          emoji: "👂",
        },
        {
          title: "Kinesthetic Learners",
          desc: "Include hands-on activities, movement breaks, and physical games.",
          emoji: "🤸",
        },
        {
          title: "Reading/Writing Learners",
          desc: "Encourage note-taking, journaling, and reading for pleasure.",
          emoji: "📖",
        },
      ],
    },
    {
      title: "Creating a Study Environment",
      emoji: "🏠",
      color: "bg-[#7BC67E]",
      tips: [
        { title: "Quiet Space", desc: "Find a calm area with minimal distractions for homework time.", emoji: "🤫" },
        { title: "Good Lighting", desc: "Ensure proper lighting to reduce eye strain and improve focus.", emoji: "💡" },
        { title: "Organized Supplies", desc: "Keep materials organized and within easy reach.", emoji: "📦" },
        { title: "Comfortable Seating", desc: "Use appropriate furniture for their size and needs.", emoji: "🪑" },
      ],
    },
    {
      title: "Supporting Focus & Attention",
      emoji: "🎯",
      color: "bg-[#FFC857]",
      tips: [
        { title: "Break Tasks Down", desc: "Divide homework into smaller, manageable chunks.", emoji: "🧩" },
        { title: "Use Timers", desc: "Set timers for focused work periods with breaks in between.", emoji: "⏰" },
        { title: "Reduce Distractions", desc: "Turn off TV and limit phone use during study time.", emoji: "📵" },
        { title: "Movement Breaks", desc: "Allow short physical activity breaks between tasks.", emoji: "🏃" },
      ],
    },
    {
      title: "Celebrating Progress",
      emoji: "🎉",
      color: "bg-[#F97316]",
      tips: [
        { title: "Praise Effort", desc: "Focus on the effort they put in, not just the results.", emoji: "👏" },
        { title: "Small Rewards", desc: "Use sticker charts or small treats for completed goals.", emoji: "⭐" },
        { title: "Share Achievements", desc: "Tell family members about their accomplishments.", emoji: "📢" },
        { title: "Make It Fun", desc: "Turn learning into games and enjoyable activities.", emoji: "🎮" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="parent" />

      <div className="max-w-4xl mx-auto px-4 pt-16">
        <PageNav title="Parent Resources" backHref="/parent/dashboard" />

        <div className="text-center mb-6">
          <span className="text-5xl block mb-2">📚</span>
          <h1 className="text-xl font-bold text-foreground">Tips for Parents</h1>
          <p className="text-muted-foreground">Help your child succeed in their learning journey</p>
        </div>

        <div className="space-y-4">
          {tipSections.map((section, i) => (
            <Card key={i} className="border-0 shadow-lg overflow-hidden">
              <div className={`h-2 ${section.color}`} />
              <button
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                onClick={() => setExpandedSection(expandedSection === i ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{section.emoji}</span>
                  <span className="font-bold text-foreground">{section.title}</span>
                </div>
                {expandedSection === i ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>

              {expandedSection === i && (
                <CardContent className="pt-0 pb-4 space-y-3">
                  {section.tips.map((tip, j) => (
                    <div key={j} className="flex items-start gap-3 p-3 bg-muted rounded-xl">
                      <span className="text-2xl">{tip.emoji}</span>
                      <div>
                        <p className="font-medium text-foreground">{tip.title}</p>
                        <p className="text-sm text-muted-foreground">{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-6 bg-transparent"
          onClick={() => router.push("/parent/dashboard")}
        >
          ← Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
