"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { PageNav } from "@/components/page-nav"

const quizQuestions = [
  {
    id: 1,
    question: "How do you like to learn new things?",
    emoji: "🎨",
    image: "/colorful-learning-classroom.jpg",
    options: [
      { text: "Watching videos", emoji: "📺", style: "visual" },
      { text: "Listening to explanations", emoji: "🎧", style: "auditory" },
      { text: "Reading books", emoji: "📖", style: "reading" },
      { text: "Doing activities", emoji: "🎯", style: "kinesthetic" },
    ],
  },
  {
    id: 2,
    question: "When you need to remember something, you...",
    emoji: "🧠",
    image: "/child-thinking-with-colorful-ideas.jpg",
    options: [
      { text: "Draw a picture of it", emoji: "🎨", style: "visual" },
      { text: "Say it out loud", emoji: "🗣️", style: "auditory" },
      { text: "Write it down", emoji: "✏️", style: "reading" },
      { text: "Act it out", emoji: "🎭", style: "kinesthetic" },
    ],
  },
  {
    id: 3,
    question: "What's your favorite way to do a project?",
    emoji: "🚀",
    image: "/kids-working-on-creative-project.jpg",
    options: [
      { text: "Make a poster", emoji: "🖼️", style: "visual" },
      { text: "Give a talk", emoji: "🎤", style: "auditory" },
      { text: "Write a report", emoji: "📝", style: "reading" },
      { text: "Build something", emoji: "🔧", style: "kinesthetic" },
    ],
  },
  {
    id: 4,
    question: "In class, you learn best when...",
    emoji: "🏫",
    image: "/fun-colorful-classroom-with-happy-students.jpg",
    options: [
      { text: "Teacher shows pictures", emoji: "🖼️", style: "visual" },
      { text: "Teacher explains things", emoji: "👩‍🏫", style: "auditory" },
      { text: "You read the textbook", emoji: "📚", style: "reading" },
      { text: "You do experiments", emoji: "🔬", style: "kinesthetic" },
    ],
  },
  {
    id: 5,
    question: "Which game do you enjoy most?",
    emoji: "🎮",
    image: "/children-playing-educational-games.jpg",
    options: [
      { text: "Puzzle games", emoji: "🧩", style: "visual" },
      { text: "Music games", emoji: "🎵", style: "auditory" },
      { text: "Word games", emoji: "📝", style: "reading" },
      { text: "Sports games", emoji: "⚽", style: "kinesthetic" },
    ],
  },
  {
    id: 6,
    question: "When studying for a test, you...",
    emoji: "📖",
    image: "/child-studying-with-colorful-notes.jpg",
    options: [
      { text: "Look at diagrams", emoji: "📊", style: "visual" },
      { text: "Listen to recordings", emoji: "🎧", style: "auditory" },
      { text: "Re-read your notes", emoji: "📋", style: "reading" },
      { text: "Walk around while studying", emoji: "🚶", style: "kinesthetic" },
    ],
  },
  {
    id: 7,
    question: "What helps you focus better?",
    emoji: "🎯",
    image: "/focused-child-with-bright-ideas.jpg",
    options: [
      { text: "Colorful materials", emoji: "🌈", style: "visual" },
      { text: "Background music", emoji: "🎶", style: "auditory" },
      { text: "Quiet reading", emoji: "🤫", style: "reading" },
      { text: "Moving around", emoji: "💃", style: "kinesthetic" },
    ],
  },
  {
    id: 8,
    question: "How do you like to solve problems?",
    emoji: "💡",
    image: "/lightbulb-idea-creative-thinking-child.jpg",
    options: [
      { text: "Draw it out", emoji: "✏️", style: "visual" },
      { text: "Talk it through", emoji: "💬", style: "auditory" },
      { text: "Make a list", emoji: "📋", style: "reading" },
      { text: "Try different things", emoji: "🔄", style: "kinesthetic" },
    ],
  },
  {
    id: 9,
    question: "What makes a story fun?",
    emoji: "📚",
    image: "/magical-storybook-with-colorful-illustrations.jpg",
    options: [
      { text: "Lots of pictures", emoji: "🖼️", style: "visual" },
      { text: "Someone reading it", emoji: "🎙️", style: "auditory" },
      { text: "Reading it myself", emoji: "👀", style: "reading" },
      { text: "Acting out the story", emoji: "🎭", style: "kinesthetic" },
    ],
  },
  {
    id: 10,
    question: "When you're bored, you like to...",
    emoji: "😊",
    image: "/happy-kid-doing-fun-activities.jpg",
    options: [
      { text: "Draw or color", emoji: "🎨", style: "visual" },
      { text: "Listen to music", emoji: "🎵", style: "auditory" },
      { text: "Read a book", emoji: "📖", style: "reading" },
      { text: "Play outside", emoji: "🏃", style: "kinesthetic" },
    ],
  },
]

export default function StudentQuiz() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleNext = () => {
    if (selectedOption !== null) {
      const newAnswers = [...answers, quizQuestions[currentQuestion].options[selectedOption].style]
      setAnswers(newAnswers)
      setSelectedOption(null)

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setShowResult(true)
      }
    }
  }

  const calculateResult = () => {
    const counts: { [key: string]: number } = {}
    answers.forEach((style) => {
      counts[style] = (counts[style] || 0) + 1
    })
    const maxStyle = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
    return maxStyle ? maxStyle[0] : "visual"
  }

  const styleInfo: { [key: string]: { name: string; emoji: string; desc: string; color: string } } = {
    visual: {
      name: "Visual Learner",
      emoji: "👁️",
      desc: "You learn best by seeing! Use pictures, colors, and videos.",
      color: "#4A90E2",
    },
    auditory: {
      name: "Auditory Learner",
      emoji: "👂",
      desc: "You learn best by listening! Try audiobooks and discussions.",
      color: "#7BC67E",
    },
    reading: {
      name: "Reading/Writing Learner",
      emoji: "📖",
      desc: "You learn best by reading and writing! Take notes and read lots!",
      color: "#FFC857",
    },
    kinesthetic: {
      name: "Kinesthetic Learner",
      emoji: "🤸",
      desc: "You learn best by doing! Try hands-on activities and movement.",
      color: "#F97316",
    },
  }

  if (showResult) {
    const result = calculateResult()
    const info = styleInfo[result]

    return (
      <div className="min-h-screen bg-background pb-20">
        <HamburgerMenu userRole="student" />

        <div className="max-w-2xl mx-auto px-4 pt-16">
          <PageNav title="Quiz Results" backHref="/student/dashboard" />

          <div className="text-center mb-8">
            <div className="text-8xl mb-4 animate-bounce-slow">{info.emoji}</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">You're a {info.name}!</h1>
            <p className="text-muted-foreground">{info.desc}</p>
          </div>

          <Card className="mb-6 border-0 shadow-lg overflow-hidden">
            <div className="h-2" style={{ backgroundColor: info.color }} />
            <CardContent className="p-6">
              <div className="flex justify-center gap-4 text-4xl mb-4">
                <span className="animate-float" style={{ animationDelay: "0s" }}>
                  🎉
                </span>
                <span className="animate-float" style={{ animationDelay: "0.2s" }}>
                  🌟
                </span>
                <span className="animate-float" style={{ animationDelay: "0.4s" }}>
                  ✨
                </span>
              </div>
              <p className="text-center font-medium text-foreground mb-4">Great job completing the quiz! 🏆</p>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(styleInfo).map(([key, val]) => (
                  <div
                    key={key}
                    className={`p-3 rounded-xl text-center ${key === result ? "bg-[#7BC67E]/20 ring-2 ring-[#7BC67E]" : "bg-muted"}`}
                  >
                    <span className="text-2xl block mb-1">{val.emoji}</span>
                    <span className="text-xs font-medium text-foreground">{val.name.split(" ")[0]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button className="flex-1 bg-[#4A90E2] hover:bg-[#1F5DA0]" onClick={() => router.push("/student/lessons")}>
              Start Learning! 📚
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => router.push("/student/dashboard")}
            >
              Back Home 🏠
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const question = quizQuestions[currentQuestion]

  return (
    <div className="min-h-screen bg-background pb-32">
      <HamburgerMenu userRole="student" />

      <div className="max-w-2xl mx-auto px-4 pt-16">
        <PageNav title="Fun Quiz" backHref="/student/dashboard" />

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="font-medium text-foreground">
              {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#4A90E2] to-[#7BC67E] rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6 border-0 shadow-lg overflow-hidden">
          <img
            src={question.image || "/placeholder.svg"}
            alt="Question illustration"
            className="w-full h-40 object-cover"
          />
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <span className="text-5xl block mb-3">{question.emoji}</span>
              <h2 className="text-xl font-bold text-foreground">{question.question}</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedOption(i)}
                  className={`p-4 rounded-xl text-center transition-all hover:scale-105 ${
                    selectedOption === i
                      ? "bg-[#4A90E2] text-white ring-4 ring-[#4A90E2]/30"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                >
                  <span className="text-3xl block mb-2">{option.emoji}</span>
                  <span className="text-sm font-medium">{option.text}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="max-w-2xl mx-auto">
          <Button
            className="w-full bg-[#7BC67E] hover:bg-[#4CAF50] disabled:opacity-50"
            disabled={selectedOption === null}
            onClick={handleNext}
          >
            {currentQuestion < quizQuestions.length - 1 ? "Next Question →" : "See My Results! 🎉"}
          </Button>
        </div>
      </div>
    </div>
  )
}
