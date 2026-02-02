"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { PageNav } from "@/components/page-nav"
import { Download, Share2, CheckCircle } from "lucide-react"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"
import { getCurrentUser, defaultUsers } from "@/lib/user-store"

export default function ParentResults() {
  const router = useRouter()
  const [childName, setChildName] = useState("Your Child")
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    const user = getCurrentUser()
    if (user && user.role === "parent") {
      setChildName(user.childName || defaultUsers.parent.childName || "Your Child")
    }
  }, [])

  const learningStyleData = [
    { style: "Visual", value: 80 },
    { style: "Auditory", value: 50 },
    { style: "Read/Write", value: 65 },
    { style: "Kinesthetic", value: 75 },
  ]

  const learningGaps = [
    { gap: "Reading comprehension", icon: "📖", severity: "Moderate", color: "#F97316" },
    { gap: "Sustained attention", icon: "🎯", severity: "Mild", color: "#FFC857" },
  ]

  const accommodations = [
    { title: "Use Visual Timers", desc: "Help with time management", icon: "⏰" },
    { title: "Break Tasks Down", desc: "Smaller, manageable chunks", icon: "📝" },
    { title: "Praise Efforts", desc: "Positive reinforcement", icon: "⭐" },
    { title: "Create Quiet Space", desc: "Reduce distractions", icon: "🤫" },
    { title: "Use Reading Tools", desc: "Audio books, highlighting", icon: "📚" },
    { title: "Movement Breaks", desc: "Short activity breaks", icon: "🏃" },
  ]

  const handleDownload = () => {
    setDownloading(true)
    setTimeout(() => setDownloading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="parent" />

      <div className="max-w-4xl mx-auto px-4 pt-16">
        <PageNav title={`${childName.split(" ")[0]}'s Results`} backHref="/parent/dashboard" />

        {/* Child Summary */}
        <Card className="mb-6 overflow-hidden border-0 shadow-lg">
          <div className="h-2 bg-gradient-to-r from-[#7BC67E] to-[#4A90E2]" />
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-foreground">{childName}'s Learning Profile</h2>
                <p className="text-muted-foreground">Grade 3 - Visual Learner</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 bg-[#7BC67E]/20 text-[#4CAF50] rounded-full text-xs">Low Risk</span>
                  <span className="px-2 py-1 bg-[#4A90E2]/20 text-[#4A90E2] rounded-full text-xs">
                    Assessment Complete
                  </span>
                </div>
              </div>
              <div className="w-16 h-16 bg-[#7BC67E] rounded-full flex items-center justify-center text-3xl">👧</div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Style Chart */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <span className="text-xl">🧠</span> Learning Style Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={learningStyleData}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="style" tick={{ fill: "currentColor", fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "currentColor" }} />
                  <Radar dataKey="value" stroke="#7BC67E" fill="#7BC67E" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4 p-3 bg-[#7BC67E]/10 rounded-xl">
              <p className="font-medium text-foreground">Primary Style: Visual Learner</p>
              <p className="text-sm text-muted-foreground">
                {childName} learns best through pictures, diagrams, and visual aids
              </p>
            </div>
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
              <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{gap.icon}</span>
                  <span className="font-medium text-foreground">{gap.gap}</span>
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: `${gap.color}20`, color: gap.color }}
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
              <span className="text-xl">💡</span> How You Can Help at Home
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {accommodations.map((item, i) => (
                <div key={i} className="p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
                  <span className="text-3xl block mb-2">{item.icon}</span>
                  <p className="font-medium text-sm text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <Button className="flex-1 bg-[#7BC67E] hover:bg-[#4CAF50]" onClick={handleDownload} disabled={downloading}>
            {downloading ? (
              <>
                <CheckCircle className="h-5 w-5 mr-2" /> Downloaded!
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-2" /> Download Report
              </>
            )}
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            <Share2 className="h-5 w-5 mr-2" /> Share with Teacher
          </Button>
        </div>

        <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/parent/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
