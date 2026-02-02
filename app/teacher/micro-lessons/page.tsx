"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { PageNav } from "@/components/page-nav"

export default function MicroLessons() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    { id: "visual", name: "Visual Learners", emoji: "👁️", color: "bg-[#4A90E2]" },
    { id: "auditory", name: "Auditory Learners", emoji: "👂", color: "bg-[#7BC67E]" },
    { id: "kinesthetic", name: "Kinesthetic Learners", emoji: "🤸", color: "bg-[#FFC857]" },
    { id: "reading", name: "Reading/Writing", emoji: "📖", color: "bg-[#F97316]" },
    { id: "adhd", name: "ADHD Support", emoji: "⚡", color: "bg-[#EC4899]" },
    { id: "dyslexia", name: "Dyslexia Support", emoji: "📚", color: "bg-[#8B5CF6]" },
  ]

  const lessons: { [key: string]: { title: string; tip: string; emoji: string }[] } = {
    visual: [
      { title: "Use Color Coding", tip: "Assign colors to different subjects or concepts", emoji: "🌈" },
      { title: "Mind Maps", tip: "Create visual diagrams connecting ideas", emoji: "🗺️" },
      { title: "Video Content", tip: "Incorporate educational videos and animations", emoji: "📺" },
      { title: "Graphic Organizers", tip: "Use charts, tables, and flowcharts", emoji: "📊" },
    ],
    auditory: [
      { title: "Read Aloud", tip: "Encourage reading instructions and content aloud", emoji: "🗣️" },
      { title: "Discussion Groups", tip: "Facilitate verbal discussions about topics", emoji: "👥" },
      { title: "Audio Recordings", tip: "Provide audio versions of written materials", emoji: "🎧" },
      { title: "Verbal Repetition", tip: "Have students repeat key concepts verbally", emoji: "🔄" },
    ],
    kinesthetic: [
      { title: "Hands-On Activities", tip: "Include physical manipulation of objects", emoji: "🤲" },
      { title: "Movement Breaks", tip: "Schedule regular physical activity breaks", emoji: "🏃" },
      { title: "Role Playing", tip: "Act out scenarios and concepts", emoji: "🎭" },
      { title: "Building Projects", tip: "Create models and physical representations", emoji: "🔧" },
    ],
    reading: [
      { title: "Written Summaries", tip: "Encourage note-taking and summarizing", emoji: "📝" },
      { title: "Reading Lists", tip: "Provide supplementary reading materials", emoji: "📚" },
      { title: "Written Instructions", tip: "Give clear, step-by-step written guides", emoji: "📋" },
      { title: "Journaling", tip: "Encourage reflective writing exercises", emoji: "✏️" },
    ],
    adhd: [
      { title: "Chunk Tasks", tip: "Break assignments into smaller, manageable parts", emoji: "🧩" },
      { title: "Visual Timers", tip: "Use timers to help with time management", emoji: "⏰" },
      { title: "Fidget Tools", tip: "Allow appropriate movement aids", emoji: "🎯" },
      { title: "Clear Routines", tip: "Establish consistent daily structures", emoji: "📅" },
    ],
    dyslexia: [
      { title: "Dyslexia-Friendly Fonts", tip: "Use OpenDyslexic or similar fonts", emoji: "🔤" },
      { title: "Text-to-Speech", tip: "Provide audio support for reading", emoji: "🔊" },
      { title: "Extra Time", tip: "Allow additional time for reading tasks", emoji: "⏳" },
      { title: "Multi-Sensory Learning", tip: "Combine visual, auditory, and tactile methods", emoji: "🌟" },
    ],
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="teacher" />

      <div className="max-w-4xl mx-auto px-4 pt-16">
        <PageNav title="Micro-Lessons" backHref="/teacher/dashboard" />

        <div className="text-center mb-6">
          <span className="text-5xl block mb-2">💡</span>
          <h1 className="text-xl font-bold text-foreground">Teaching Strategies</h1>
          <p className="text-muted-foreground">Quick tips for different learning needs</p>
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              className={`h-auto py-3 flex-col gap-1 ${selectedCategory === cat.id ? cat.color + " text-white" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-xs">{cat.name}</span>
            </Button>
          ))}
        </div>

        {/* Lessons */}
        {selectedCategory && (
          <div className="space-y-3">
            <h2 className="font-bold text-lg flex items-center gap-2 text-foreground">
              {categories.find((c) => c.id === selectedCategory)?.emoji}
              {categories.find((c) => c.id === selectedCategory)?.name} Tips
            </h2>
            {lessons[selectedCategory].map((lesson, i) => (
              <Card key={i} className="border-0 shadow hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{lesson.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-foreground">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground">{lesson.tip}</p>
                    </div>
                  </div>
                  <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${categories.find((c) => c.id === selectedCategory)?.color} rounded-full`}
                      style={{ width: "100%" }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!selectedCategory && (
          <Card className="border-dashed border-2 border-border">
            <CardContent className="p-8 text-center">
              <span className="text-4xl block mb-2">👆</span>
              <p className="text-muted-foreground">Select a category above to see teaching tips</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
