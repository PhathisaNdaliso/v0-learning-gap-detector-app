// User Store - Manages user state, roles, and data across the application
// This acts as a simple client-side state management solution

export interface User {
  id: string
  name: string
  email: string
  role: "teacher" | "parent" | "student"
  avatar: string
  school?: string
  grade?: string
  childName?: string
}

export interface StudentData {
  id: string
  name: string
  grade: string
  learningStyle: string
  teacherId: string
  parentId: string
  quizCompleted: boolean
  quizResults?: {
    style: string
    scores: { visual: number; auditory: number; reading: number; kinesthetic: number }
  }
  assessments: Assessment[]
}

export interface Assessment {
  id: string
  date: string
  teacherInput: { completed: boolean; responses?: Record<string, number> }
  parentInput: { completed: boolean; responses?: Record<string, number>; diagnosedDifficulty?: boolean }
  studentQuiz: { completed: boolean; answers?: string[] }
  aiAnalysis?: {
    learningStyle: string
    probabilityScores: Record<string, number>
    identifiedGaps: string[]
    recommendations: string[]
    riskLevel: "Low" | "Medium" | "High"
  }
}

// Default users for demo
export const defaultUsers: Record<string, User> = {
  teacher: {
    id: "teacher-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@school.edu",
    role: "teacher",
    avatar: "👩‍🏫",
    school: "Lincoln Elementary School",
  },
  parent: {
    id: "parent-001",
    name: "Michael Thompson",
    email: "m.thompson@email.com",
    role: "parent",
    avatar: "👨",
    childName: "Emma Thompson",
  },
  student: {
    id: "student-001",
    name: "Emma Thompson",
    email: "emma.t@school.edu",
    role: "student",
    avatar: "👧",
    grade: "Grade 3",
  },
}

// Demo student data
export const demoStudents: StudentData[] = [
  {
    id: "student-001",
    name: "Emma Thompson",
    grade: "Grade 3",
    learningStyle: "Visual",
    teacherId: "teacher-001",
    parentId: "parent-001",
    quizCompleted: true,
    quizResults: {
      style: "visual",
      scores: { visual: 70, auditory: 15, reading: 10, kinesthetic: 5 },
    },
    assessments: [],
  },
  {
    id: "student-002",
    name: "Alex Johnson",
    grade: "Grade 3",
    learningStyle: "Visual",
    teacherId: "teacher-001",
    parentId: "parent-002",
    quizCompleted: true,
    assessments: [],
  },
  {
    id: "student-003",
    name: "Sarah Williams",
    grade: "Grade 3",
    learningStyle: "Kinesthetic",
    teacherId: "teacher-001",
    parentId: "parent-003",
    quizCompleted: false,
    assessments: [],
  },
]

// Simple in-memory store functions
let currentUser: User | null = null

export function setCurrentUser(role: "teacher" | "parent" | "student") {
  currentUser = defaultUsers[role]
  if (typeof window !== "undefined") {
    localStorage.setItem("currentUserRole", role)
  }
}

export function getCurrentUser(): User | null {
  if (currentUser) return currentUser
  if (typeof window !== "undefined") {
    const role = localStorage.getItem("currentUserRole") as "teacher" | "parent" | "student" | null
    if (role) {
      currentUser = defaultUsers[role]
      return currentUser
    }
  }
  return null
}

export function updateUserProfile(updates: Partial<User>) {
  if (currentUser) {
    currentUser = { ...currentUser, ...updates }
    if (typeof window !== "undefined") {
      localStorage.setItem(`user_${currentUser.role}`, JSON.stringify(currentUser))
    }
  }
}
