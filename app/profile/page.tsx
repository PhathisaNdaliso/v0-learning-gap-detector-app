"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { PageNav } from "@/components/page-nav"
import { useTheme } from "@/components/theme-provider"
import { User, Moon, Sun, Shield, LogOut, Save, CheckCircle } from "lucide-react"
import { getCurrentUser, updateUserProfile, defaultUsers } from "@/lib/user-store"

export default function ProfileSettings() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { theme, toggleTheme } = useTheme()
  const [saved, setSaved] = useState(false)

  // Get role from URL params or stored user
  const roleParam = searchParams.get("role") as "teacher" | "parent" | "student" | null
  const storedUser = getCurrentUser()
  const userRole = roleParam || storedUser?.role || "teacher"

  // Role-specific default profiles
  const roleProfiles = {
    teacher: {
      name: defaultUsers.teacher.name,
      email: defaultUsers.teacher.email,
      school: defaultUsers.teacher.school || "",
      avatar: "👩‍🏫",
      roleLabel: "Teacher",
      roleColor: "#4A90E2",
    },
    parent: {
      name: defaultUsers.parent.name,
      email: defaultUsers.parent.email,
      childName: defaultUsers.parent.childName || "",
      avatar: "👨",
      roleLabel: "Parent",
      roleColor: "#7BC67E",
    },
    student: {
      name: defaultUsers.student.name,
      email: defaultUsers.student.email,
      grade: defaultUsers.student.grade || "",
      avatar: "👧",
      roleLabel: "Student",
      roleColor: "#FFC857",
    },
  }

  const currentProfile = roleProfiles[userRole]

  const [profile, setProfile] = useState({
    name: currentProfile.name,
    email: currentProfile.email,
    extra:
      userRole === "teacher"
        ? currentProfile.school
        : userRole === "parent"
          ? (currentProfile as typeof roleProfiles.parent).childName
          : (currentProfile as typeof roleProfiles.student).grade,
  })

  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    shareData: false,
  })

  const handleSave = () => {
    updateUserProfile({ name: profile.name, email: profile.email })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const backHref =
    userRole === "teacher" ? "/teacher/dashboard" : userRole === "parent" ? "/parent/dashboard" : "/student/dashboard"

  // Role-specific extra field label
  const extraFieldLabel =
    userRole === "teacher" ? "School/Organization" : userRole === "parent" ? "Child's Name" : "Grade"

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole={userRole} />

      <div className="max-w-4xl mx-auto px-4 pt-16">
        <PageNav title="Profile & Settings" backHref={backHref} />

        {/* Profile Card */}
        <Card className="mb-6 overflow-hidden border-0 shadow-lg">
          <div
            className="h-20"
            style={{
              background: `linear-gradient(to right, ${currentProfile.roleColor}, ${currentProfile.roleColor}99)`,
            }}
          />
          <CardContent className="pt-0 relative">
            <div className="w-20 h-20 bg-card rounded-full border-4 border-card flex items-center justify-center text-4xl absolute -top-10 left-6 shadow-lg">
              {currentProfile.avatar}
            </div>
            <div className="pt-12">
              <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
              <p className="text-muted-foreground">{profile.email}</p>
              <span
                className="inline-block mt-2 px-3 py-1 rounded-full text-sm text-white"
                style={{ backgroundColor: currentProfile.roleColor }}
              >
                {currentProfile.roleLabel}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <User className="h-5 w-5" /> Edit Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-foreground">
                {userRole === "student" ? "Your Name" : "Full Name"}
              </Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="extra" className="text-foreground">
                {extraFieldLabel}
              </Label>
              <Input
                id="extra"
                value={profile.extra}
                onChange={(e) => setProfile({ ...profile, extra: e.target.value })}
                className="mt-1"
              />
            </div>
            <Button className="w-full" style={{ backgroundColor: currentProfile.roleColor }} onClick={handleSave}>
              {saved ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" /> Saved!
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
            </div>
          </CardContent>
        </Card>

        {/* Privacy - Role specific options */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Shield className="h-5 w-5" /> Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  {userRole === "student" ? "Get fun reminders" : "Receive app notifications"}
                </p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
              />
            </div>
            {userRole !== "student" && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Updates</p>
                  <p className="text-sm text-muted-foreground">
                    {userRole === "teacher" ? "Receive class progress reports" : "Receive child's progress reports"}
                  </p>
                </div>
                <Switch
                  checked={settings.emailUpdates}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailUpdates: checked })}
                />
              </div>
            )}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Share Anonymous Data</p>
                <p className="text-sm text-muted-foreground">Help improve our AI models</p>
              </div>
              <Switch
                checked={settings.shareData}
                onCheckedChange={(checked) => setSettings({ ...settings, shareData: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Student-specific fun section */}
        {userRole === "student" && (
          <Card className="mb-6 border-0 shadow-lg overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-[#FFC857] to-[#F97316]" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">🎨 Customize</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Choose your favorite avatar!</p>
              <div className="flex gap-3 flex-wrap">
                {["👧", "👦", "🧒", "👶", "🐱", "🐶", "🦊", "🐼", "🦁", "🐸"].map((emoji) => (
                  <button
                    key={emoji}
                    className="w-12 h-12 rounded-full bg-muted hover:bg-[#FFC857]/20 flex items-center justify-center text-2xl transition-all hover:scale-110"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full text-[#D9534F] border-[#D9534F] hover:bg-[#D9534F]/10 bg-transparent"
          onClick={() => router.push("/")}
        >
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </Button>
      </div>
    </div>
  )
}
