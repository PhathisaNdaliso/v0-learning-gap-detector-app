"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Home, BookOpen, FileText, Settings, Moon, Sun, Users, GraduationCap, Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

interface HamburgerMenuProps {
  userRole: "teacher" | "parent" | "student"
}

export function HamburgerMenu({ userRole }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const teacherLinks = [
    { href: "/teacher/dashboard", label: "Dashboard", icon: Home, iconLabel: "📊" },
    { href: "/teacher/questionnaire", label: "Questionnaire", icon: FileText, iconLabel: "📝" },
    { href: "/teacher/results", label: "Results", icon: BookOpen, iconLabel: "📈" },
    { href: "/teacher/micro-lessons", label: "Micro-Lessons", icon: GraduationCap, iconLabel: "💡" },
    { href: "/teacher/converter", label: "Content Converter", icon: FileText, iconLabel: "🔄" },
    { href: "/profile?role=teacher", label: "Profile & Settings", icon: Settings, iconLabel: "⚙️" },
  ]

  const parentLinks = [
    { href: "/parent/dashboard", label: "Dashboard", icon: Home, iconLabel: "🏠" },
    { href: "/parent/questionnaire", label: "Questionnaire", icon: FileText, iconLabel: "📝" },
    { href: "/parent/results", label: "Child's Results", icon: BookOpen, iconLabel: "📊" },
    { href: "/parent/tips", label: "Parent Tips", icon: Users, iconLabel: "💡" },
    { href: "/profile?role=parent", label: "Profile & Settings", icon: Settings, iconLabel: "⚙️" },
  ]

  const studentLinks = [
    { href: "/student/dashboard", label: "My Dashboard", icon: Home, iconLabel: "🎮" },
    { href: "/student/quiz", label: "Fun Quiz", icon: FileText, iconLabel: "🎯" },
    { href: "/student/games", label: "Learning Games", icon: Gamepad2, iconLabel: "🕹️" },
    { href: "/student/lessons", label: "My Lessons", icon: BookOpen, iconLabel: "📚" },
    { href: "/student/achievements", label: "Achievements", icon: GraduationCap, iconLabel: "🏆" },
    { href: "/profile?role=student", label: "My Profile", icon: Settings, iconLabel: "👤" },
  ]

  const links = userRole === "teacher" ? teacherLinks : userRole === "parent" ? parentLinks : studentLinks

  const roleColor = userRole === "teacher" ? "#4A90E2" : userRole === "parent" ? "#7BC67E" : "#FFC857"
  const roleEmoji = userRole === "teacher" ? "👩‍🏫" : userRole === "parent" ? "👨‍👩‍👧" : "🎒"

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-40 bg-card shadow-lg rounded-full hover:scale-110 transition-transform"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-card shadow-2xl p-6 animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{roleEmoji}</span>
                <div>
                  <span className="font-bold text-lg text-foreground block">Smart Learning</span>
                  <span className="text-xs text-muted-foreground capitalize">{userRole} Mode</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-all group"
                >
                  <span className="text-xl group-hover:scale-125 transition-transform">{link.iconLabel}</span>
                  <span className="font-medium text-foreground">{link.label}</span>
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-6 left-6 right-6 space-y-4">
              <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" onClick={toggleTheme}>
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </Button>
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                  <Home className="h-5 w-5" />
                  Switch Role
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
