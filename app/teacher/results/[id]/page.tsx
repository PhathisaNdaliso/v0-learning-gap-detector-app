"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { PageNav } from "@/components/page-nav"
import { Download, Share2, Sparkles } from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

export default function StudentResultDetail() {
  const router = useRouter()
  const [showAIHelp, setShowAIHelp] = useState(false)

  const student = {
    name: "Alex Johnson",
    grade: "Grade 3",
    assessmentDate: "December 4, 2025",
  }

  const learningStyleData = [
    { style: "Visual", value: 85 },
    { style: "Auditory", value: 45 },
    { style: "Read/Write", value: 60 },
    { style: "Kinesthetic", value: 70 },
    { style: "Multimodal", value: 55 },
  ]

  const probabilityData = [
    { name: "ADHD", probability: 15 },
    { name: "Dyslexia", probability: 8 },
    { name: "Dyscalculia", probability: 5 },
    { name: "Processing", probability: 12 },
  ]

  const learningGaps = [
    { gap: "Visual processing speed", severity: "Medium", emoji: "👁️" },
    { gap: "Written expression", severity: "Low", emoji: "✏️" },
    { gap: "Auditory retention", severity: "High", emoji: "👂" },
  ]

  const accommodations = [
    { title: "Use Visual Aids", desc: "Diagrams, charts, color coding", emoji: "🎨" },
    { title: "Provide Written Instructions", desc: "Step-by-step written guides", emoji: "📝" },
    { title: "Allow Movement Breaks", desc: "Short breaks for physical activity", emoji: "🏃" },
    { title: "Use Audio Support", desc: "Text-to-speech tools", emoji: "🔊" },
    { title: "Extended Time", desc: "Additional time for assignments", emoji: "⏰" },
    { title: "Quiet Workspace", desc: "Reduce auditory distractions", emoji: "🤫" },
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="teacher" />

      <div className="max-w-4xl mx-auto px-4 pt-16">
        <PageNav title="Learning Insights" backHref="/teacher/results" />

        {/* Student Info Header */}
        <Card className="mb-6 overflow-hidden border-0 shadow-lg">
          <div className="h-2 bg-gradient-to-r from-[#4A90E2] to-[#7BC67E]" />
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{student.name}</h2>
                <p className="text-muted-foreground">{student.grade}</p>
                <p className="text-sm text-muted-foreground">Assessed: {student.assessmentDate}</p>
              </div>
              <div className="text-5xl animate-float">👨‍🎓</div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Style Radar Chart */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <span className="text-xl">🧠</span> Learning Style Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={learningStyleData}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="style" tick={{ fill: "#4D4D4D", fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#4D4D4D" }} />
                  <Radar name="Learning Style" dataKey="value" stroke="#4A90E2" fill="#4A90E2" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4 p-4 bg-[#4A90E2]/10 rounded-xl">
              <p className="font-semibold text-foreground">
                Primary Learning Style: <span className="text-[#4A90E2]">Visual Learner 👁️</span>
              </p>
              <p className="text-sm text-muted-foreground">
                This student learns best through images, diagrams, and visual demonstrations.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Probability Distribution */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <span className="text-xl">📊</span> Probability Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={probabilityData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: "#4D4D4D" }} />
                  <YAxis dataKey="name" type="category" tick={{ fill: "#4D4D4D" }} width={80} />
                  <Tooltip />
                  <Bar dataKey="probability" fill="#7BC67E" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Note: These are indicators, not diagnoses. Consult specialists for evaluation.
            </p>
          </CardContent>
        </Card>

        {/* Learning Gaps */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <span className="text-xl">🎯</span> Identified Learning Gaps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {learningGaps.map((gap, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{gap.emoji}</span>
                  <span className="font-medium text-foreground">{gap.gap}</span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    gap.severity === "Low"
                      ? "bg-[#7BC67E]/20 text-[#4CAF50]"
                      : gap.severity === "Medium"
                        ? "bg-[#FFC857]/20 text-[#F97316]"
                        : "bg-[#D9534F]/20 text-[#D9534F]"
                  }`}
                >
                  {gap.severity}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recommended Accommodations */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <span className="text-xl">💡</span> Recommended Accommodations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {accommodations.map((item, i) => (
                <div key={i} className="p-3 bg-muted rounded-xl hover:bg-muted/80 transition-colors cursor-pointer">
                  <span className="text-2xl block mb-2">{item.emoji}</span>
                  <p className="font-medium text-sm text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <Button className="flex-1 bg-[#4A90E2] hover:bg-[#1F5DA0]">
            <Download className="h-5 w-5 mr-2" /> Download Report
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            <Share2 className="h-5 w-5 mr-2" /> Share
          </Button>
        </div>

        {/* AI Help Button */}
        <Button
          className="w-full bg-gradient-to-r from-[#4A90E2] to-[#7BC67E] text-white"
          onClick={() => setShowAIHelp(!showAIHelp)}
        >
          <Sparkles className="h-5 w-5 mr-2" /> Get AI Recommendations
        </Button>

        {showAIHelp && (
          <Card className="mt-4 border-[#4A90E2] border-2">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <p className="font-medium text-foreground mb-2">AI Assistant Suggests:</p>
                  <p className="text-sm text-muted-foreground">
                    Based on Alex's visual learning preference, consider using mind maps for note-taking, color-coded
                    study materials, and video-based learning resources. Allow extra time for processing auditory
                    information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
