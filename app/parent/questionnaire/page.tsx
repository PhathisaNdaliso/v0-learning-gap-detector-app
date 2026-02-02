"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { PageNav } from "@/components/page-nav"
import { ChevronRight, ChevronLeft } from "lucide-react"

const likertQuestions = [
  "My child prefers watching videos or looking at pictures when learning.",
  "My child likes to have things read aloud to them.",
  "My child enjoys hands-on activities and crafts.",
  "My child often fidgets or needs to move while studying.",
  "My child remembers things better when they write them down.",
  "My child gets distracted easily during homework.",
  "My child prefers working alone rather than in groups.",
  "My child asks many questions to understand new topics.",
]

export default function ParentQuestionnaire() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>(Array(8).fill(0))
  const [hasDiagnosis, setHasDiagnosis] = useState(false)
  const [diagnosisDetails, setDiagnosisDetails] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")

  const totalSteps = 3

  const handleLikertChange = (questionIndex: number, value: number) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    router.push("/parent/results")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <span className="text-6xl block mb-4 animate-bounce-slow">👨‍👩‍👧</span>
              <h2 className="text-xl font-bold text-foreground">Parent Questionnaire</h2>
              <p className="text-muted-foreground">Help us understand your child's learning patterns</p>
            </div>

            <Card className="border-[#7BC67E] border-2 bg-[#7BC67E]/10">
              <CardContent className="p-4">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">💡 Why this matters:</span> Your observations at home give us valuable
                  insights into how your child learns best. This helps create personalized recommendations!
                </p>
              </CardContent>
            </Card>

            {likertQuestions.slice(0, 4).map((question, index) => (
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
                            ? "bg-[#7BC67E] text-white"
                            : "bg-muted hover:bg-muted/80 text-foreground"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Never</span>
                    <span>Always</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <span className="text-4xl block mb-2">📋</span>
              <h2 className="text-lg font-bold text-foreground">Questions 5-8</h2>
            </div>

            {likertQuestions.slice(4, 8).map((question, index) => (
              <Card key={index + 4} className="border-0 shadow">
                <CardContent className="p-4">
                  <p className="text-sm font-medium mb-3 text-foreground">
                    {index + 5}. {question}
                  </p>
                  <div className="flex justify-between gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => handleLikertChange(index + 4, value)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                          answers[index + 4] === value
                            ? "bg-[#7BC67E] text-white"
                            : "bg-muted hover:bg-muted/80 text-foreground"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Never</span>
                    <span>Always</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <span className="text-4xl block mb-2">📝</span>
              <h2 className="text-lg font-bold text-foreground">Additional Information</h2>
            </div>

            <Card className="border-0 shadow">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="diagnosis"
                    checked={hasDiagnosis}
                    onCheckedChange={(checked) => setHasDiagnosis(checked as boolean)}
                  />
                  <Label htmlFor="diagnosis" className="text-foreground">
                    My child has a diagnosed learning difficulty
                  </Label>
                </div>

                {hasDiagnosis && (
                  <Textarea
                    placeholder="Please share details about the diagnosis (e.g., ADHD, Dyslexia, etc.)"
                    value={diagnosisDetails}
                    onChange={(e) => setDiagnosisDetails(e.target.value)}
                    className="min-h-[80px]"
                  />
                )}
              </CardContent>
            </Card>

            <div>
              <Label className="text-foreground">Any additional notes or observations?</Label>
              <Textarea
                placeholder="Share anything else you think would help us understand your child's learning needs..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="mt-2 min-h-[120px]"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <HamburgerMenu userRole="parent" />

      <div className="max-w-2xl mx-auto px-4 pt-16">
        <PageNav title="Parent Survey" backHref="/parent/dashboard" />

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
              className="h-full bg-gradient-to-r from-[#7BC67E] to-[#4A90E2] rounded-full transition-all duration-500"
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
            <Button className="flex-1 bg-[#7BC67E] hover:bg-[#4CAF50]" onClick={() => setCurrentStep(currentStep + 1)}>
              Next <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          ) : (
            <Button className="flex-1 bg-[#4A90E2] hover:bg-[#1F5DA0]" onClick={handleSubmit}>
              Submit Survey 💙
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
