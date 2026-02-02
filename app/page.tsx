"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun, GraduationCap, Users, Smile } from "lucide-react"
import { setCurrentUser } from "@/lib/user-store"

export default function LandingPage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [hoveredRole, setHoveredRole] = useState<string | null>(null)

  const handleRoleSelect = (role: "teacher" | "parent" | "student", href: string) => {
    setCurrentUser(role)
    router.push(href)
  }

  const roles = [
    {
      id: "teacher",
      title: "I'm a Teacher",
      icon: GraduationCap,
      color: "from-[#4A90E2] to-[#1F5DA0]",
      bgColor: "bg-[#4A90E2]",
      description: "Track student progress & identify learning gaps",
      href: "/teacher/dashboard",
    },
    {
      id: "parent",
      title: "I'm a Parent",
      icon: Users,
      color: "from-[#7BC67E] to-[#4CAF50]",
      bgColor: "bg-[#7BC67E]",
      description: "Support your child's learning journey",
      href: "/parent/dashboard",
    },
    {
      id: "student",
      title: "I'm a Student",
      icon: Smile,
      color: "from-[#FFC857] to-[#F97316]",
      bgColor: "bg-[#FFC857]",
      description: "Discover your unique learning style!",
      href: "/student/dashboard",
    },
  ]

  const features = [
    { icon: "🧠", title: "Learning Styles", desc: "Visual, Auditory, Kinesthetic & more" },
    { icon: "🎯", title: "Gap Detection", desc: "Identify areas needing attention" },
    { icon: "⚡", title: "AI-Powered", desc: "Smart recommendations for you" },
    { icon: "📊", title: "Analytics", desc: "Beautiful visual reports" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🧠</span>
            <span className="font-bold text-xl text-foreground">Smart Learning</span>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Hero Section - Removed reference image, added illustrated SVG icons */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative mb-8">
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-[#4A90E2]/20 to-[#7BC67E]/20 rounded-3xl flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 p-8">
                <div className="w-24 h-24 bg-[#4A90E2] rounded-2xl flex items-center justify-center text-4xl shadow-lg transform -rotate-6 hover:rotate-0 transition-transform">
                  📚
                </div>
                <div className="w-24 h-24 bg-[#7BC67E] rounded-2xl flex items-center justify-center text-4xl shadow-lg transform rotate-6 hover:rotate-0 transition-transform">
                  🎯
                </div>
                <div className="w-24 h-24 bg-[#FFC857] rounded-2xl flex items-center justify-center text-4xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
                  🧩
                </div>
                <div className="w-24 h-24 bg-[#F97316] rounded-2xl flex items-center justify-center text-4xl shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
                  ⭐
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 md:right-20 text-5xl animate-float">✨</div>
            <div className="absolute -bottom-4 -left-4 md:left-20 text-5xl animate-bounce-slow">🌟</div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Welcome to <span className="text-[#4A90E2]">Smart Learning</span> Assistant
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Empowering education to support every learner's unique journey. Discover learning styles, identify gaps, and
            unlock potential!
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {features.map((feature, i) => (
              <Card key={i} className="bg-card hover:shadow-lg transition-all hover:-translate-y-1 border-border">
                <CardContent className="p-4 text-center">
                  <span className="text-3xl block mb-2 hover:scale-125 transition-transform cursor-default">
                    {feature.icon}
                  </span>
                  <h3 className="font-semibold text-sm text-foreground">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">Choose Your Role</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role) => (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden border-2 ${
                  hoveredRole === role.id ? "border-[#4A90E2]" : "border-transparent"
                }`}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
                onClick={() => handleRoleSelect(role.id as "teacher" | "parent" | "student", role.href)}
              >
                <div className={`h-3 bg-gradient-to-r ${role.color}`} />
                <CardContent className="p-6 text-center bg-card">
                  <div
                    className={`w-20 h-20 ${role.bgColor} rounded-full mx-auto mb-4 flex items-center justify-center`}
                  >
                    <role.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{role.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
                  <Button className={`w-full bg-gradient-to-r ${role.color} text-white hover:opacity-90`}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8 text-foreground">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: "📝",
                title: "Complete Assessment",
                desc: "Answer simple questions about learning habits",
              },
              { step: "2", icon: "🤖", title: "AI Analysis", desc: "Our smart system identifies patterns & gaps" },
              { step: "3", icon: "🎯", title: "Get Insights", desc: "Receive personalized recommendations" },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="w-16 h-16 bg-[#4A90E2] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {item.step}
                </div>
                <span className="text-4xl block mb-2">{item.icon}</span>
                <h3 className="font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Documentation Note */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">Powered by AI Classification using Hugging Face Inference API</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🧠</span>
            <span className="font-bold text-foreground">Smart Learning Assistant</span>
          </div>
          <p className="text-sm text-muted-foreground">Empowering every learner's unique journey</p>
        </div>
      </footer>
    </div>
  )
}
