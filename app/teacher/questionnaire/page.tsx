"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { PageNav } from "@/components/page-nav"
import { Upload, ChevronRight, ChevronLeft } from "lucide-react"

const likertQuestions = [
  "The student prefers learning with diagrams, charts, or images.",
  "The student remembers information better when hearing explanations.",
  "The student takes detailed written notes during lessons.",
  "The student performs better during hands-on activities.",
  "The student asks for verbal clarification often.",
  "The student reads instructions carefully before starting tasks.",
  "The student prefers moving around or touching objects while learning.",
  "The student struggles with text-heavy materials.",
  "The student works well independently without visuals.",
  "The student engages more when videos or illustrations are used.",
  "The student loses focus when activities are not interactive.",
  "The student responds well to step-by-step written instructions.",
]

export default function TeacherQuestionnaire() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [studentName, setStudentName] = useState("")
  const [studentGrade, setStudentGrade] = useState("")
  const [answers, setAnswers] = useState<number[]>(Array(12).fill(0))
  const [freeText, setFreeText] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const totalSteps = 4

  const handleLikertChange = (questionIndex: number, value: number) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    router.push("/teacher/results/new")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <span className="text-6xl block mb-4">👨‍🎓</span>
              <h2 className="text-xl font-bold text-foreground">Student Information</h2>
              <p className="text-muted-foreground">Let's start with some basic details</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground">
                  Student Name
                </Label>
                <Input
                  id="name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter student's name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="grade" className="text-foreground">
                  Grade Level
                </Label>
                <Input
                  id="grade"
                  value={studentGrade}
                  onChange={(e) => setStudentGrade(e.target.value)}
                  placeholder="e.g., Grade 3"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <span className="text-4xl block mb-2">📊</span>
              <h2 className="text-lg font-bold text-foreground">Learning Style Assessment</h2>
              <p className="text-sm text-muted-foreground">Questions 1-6 of 12</p>
            </div>
            {likertQuestions.slice(0, 6).map((question, index) => (
              <Card key={index} className="border-0 shadow">
                <CardContent className="p-4">
                  <p className="text-sm font-medium mb-3 text-foreground">
                    {index + 1}. {question}
                  </p>
                  <div className="flex justify-between gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => handleLikertChange(index, value)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                          answers[index] === value
                            ? "bg-[#4A90E2] text-white"
                            : "bg-muted hover:bg-muted/80 text-foreground"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Strongly Disagree</span>
                    <span>Strongly Agree</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <span className="text-4xl block mb-2">📊</span>
              <h2 className="text-lg font-bold text-foreground">Learning Style Assessment</h2>
              <p className="text-sm text-muted-foreground">Questions 7-12 of 12</p>
            </div>
            {likertQuestions.slice(6, 12).map((question, index) => (
              <Card key={index + 6} className="border-0 shadow">
                <CardContent className="p-4">
                  <p className="text-sm font-medium mb-3 text-foreground">
                    {index + 7}. {question}
                  </p>
                  <div className="flex justify-between gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => handleLikertChange(index + 6, value)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                          answers[index + 6] === value
                            ? "bg-[#4A90E2] text-white"
                            : "bg-muted hover:bg-muted/80 text-foreground"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Strongly Disagree</span>
                    <span>Strongly Agree</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <span className="text-4xl block mb-2">📝</span>
              <h2 className="text-lg font-bold text-foreground">Additional Information</h2>
              <p className="text-sm text-muted-foreground">Help us understand more</p>
            </div>
            <div>
              <Label htmlFor="challenges" className="text-foreground">
                Describe any learning challenges observed
              </Label>
              <Textarea
                id="challenges"
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                placeholder="Share any specific observations about the student's learning patterns, challenges, or strengths..."
                className="mt-1 min-h-[120px]"
              />
            </div>
            <div>
              <Label className="text-foreground">Upload Supporting Documents (Optional)</Label>
              <div className="mt-1 border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-[#4A90E2] transition-colors cursor-pointer">
                <input
                  type="file"
                  onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or images up to 10MB</p>
                </label>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <HamburgerMenu userRole="teacher" />

      <div className="max-w-2xl mx-auto px-4 pt-16">
        <PageNav title="Teacher Questionnaire" backHref="/teacher/dashboard" />

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="font-medium text-foreground">{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#4A90E2] to-[#7BC67E] rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="max-w-2xl mx-auto flex gap-4">
          {currentStep > 0 && (
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setCurrentStep(currentStep - 1)}>
              <ChevronLeft className="h-5 w-5 mr-1" /> Back
            </Button>
          )}
          {currentStep < totalSteps - 1 ? (
            <Button className="flex-1 bg-[#4A90E2] hover:bg-[#1F5DA0]" onClick={() => setCurrentStep(currentStep + 1)}>
              Next <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          ) : (
            <Button className="flex-1 bg-[#7BC67E] hover:bg-[#4CAF50]" onClick={handleSubmit}>
              Submit Assessment ✨
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
