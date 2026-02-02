// AI Service - Handles all AI processing for learning gap detection
// Uses Hugging Face Inference API for text classification and analysis
//
// API DOCUMENTATION:
// ===================
// This service integrates with the following external APIs:
//
// 1. Hugging Face Inference API
//    - Endpoint: https://api-inference.huggingface.co/models/{model}
//    - Models used:
//      * facebook/bart-large-mnli - Zero-shot text classification
//      * distilbert-base-uncased-finetuned-sst-2-english - Sentiment analysis
//    - Authentication: Bearer token (HUGGINGFACE_API_KEY env variable)
//    - Rate limits: Free tier allows ~30,000 characters/month
//
// 2. Internal Processing
//    - Learning style detection using VARK model
//    - Risk assessment based on questionnaire responses
//    - Recommendation generation based on identified patterns

export interface AnalysisInput {
  teacherResponses?: Record<string, number>
  parentResponses?: Record<string, number>
  studentQuizAnswers?: string[]
  uploadedText?: string
  diagnosedDifficulty?: boolean
}

export interface AnalysisResult {
  learningStyle: {
    primary: string
    scores: { visual: number; auditory: number; reading: number; kinesthetic: number }
  }
  riskAssessment: {
    level: "Low" | "Medium" | "High"
    factors: string[]
  }
  identifiedGaps: {
    area: string
    severity: "mild" | "moderate" | "significant"
    description: string
  }[]
  recommendations: {
    category: string
    title: string
    description: string
    priority: "high" | "medium" | "low"
  }[]
  summary: string
}

// Simulated AI analysis - In production, this would call Hugging Face API
export async function analyzeStudent(input: AnalysisInput): Promise<AnalysisResult> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Calculate learning style from quiz answers
  let styleScores = { visual: 25, auditory: 25, reading: 25, kinesthetic: 25 }

  if (input.studentQuizAnswers) {
    styleScores = { visual: 0, auditory: 0, reading: 0, kinesthetic: 0 }
    input.studentQuizAnswers.forEach((answer) => {
      styleScores[answer as keyof typeof styleScores] = (styleScores[answer as keyof typeof styleScores] || 0) + 10
    })
  }

  const primaryStyle = Object.entries(styleScores).sort((a, b) => b[1] - a[1])[0][0]

  // Calculate risk level based on teacher and parent responses
  let riskScore = 0
  const riskFactors: string[] = []

  if (input.teacherResponses) {
    const avgTeacher =
      Object.values(input.teacherResponses).reduce((a, b) => a + b, 0) / Object.values(input.teacherResponses).length
    if (avgTeacher < 3) {
      riskScore += 30
      riskFactors.push("Below average classroom engagement")
    }
  }

  if (input.parentResponses) {
    const avgParent =
      Object.values(input.parentResponses).reduce((a, b) => a + b, 0) / Object.values(input.parentResponses).length
    if (avgParent < 3) {
      riskScore += 30
      riskFactors.push("Challenges with home study habits")
    }
  }

  if (input.diagnosedDifficulty) {
    riskScore += 20
    riskFactors.push("Previously diagnosed learning difficulty")
  }

  const riskLevel: "Low" | "Medium" | "High" = riskScore >= 50 ? "High" : riskScore >= 30 ? "Medium" : "Low"

  // Identify learning gaps
  const gaps: AnalysisResult["identifiedGaps"] = []

  if (riskScore > 20) {
    gaps.push({
      area: "Attention & Focus",
      severity: riskScore > 40 ? "significant" : "moderate",
      description: "May benefit from structured breaks and focused activity periods",
    })
  }

  if (input.teacherResponses && Object.values(input.teacherResponses).some((v) => v < 3)) {
    gaps.push({
      area: "Reading Comprehension",
      severity: "mild",
      description: "Consider using visual aids and simplified text formats",
    })
  }

  // Generate recommendations
  const recommendations: AnalysisResult["recommendations"] = [
    {
      category: "Classroom",
      title: `${primaryStyle.charAt(0).toUpperCase() + primaryStyle.slice(1)} Learning Strategies`,
      description: getStyleRecommendation(primaryStyle),
      priority: "high",
    },
    {
      category: "Home Support",
      title: "Parent-Child Learning Activities",
      description: "Incorporate hands-on activities during homework time",
      priority: "medium",
    },
    {
      category: "Assessment",
      title: "Regular Progress Checks",
      description: "Schedule bi-weekly check-ins to monitor improvement",
      priority: "low",
    },
  ]

  if (riskLevel !== "Low") {
    recommendations.unshift({
      category: "Support",
      title: "Additional Learning Support",
      description: "Consider consultation with learning specialist for personalized strategies",
      priority: "high",
    })
  }

  return {
    learningStyle: {
      primary: primaryStyle,
      scores: styleScores,
    },
    riskAssessment: {
      level: riskLevel,
      factors: riskFactors.length > 0 ? riskFactors : ["No significant risk factors identified"],
    },
    identifiedGaps:
      gaps.length > 0
        ? gaps
        : [
            {
              area: "No significant gaps",
              severity: "mild",
              description: "Student appears to be progressing well",
            },
          ],
    recommendations,
    summary: `Based on the comprehensive analysis, this student is primarily a ${primaryStyle} learner with a ${riskLevel.toLowerCase()} risk profile. ${gaps.length > 0 ? `Key areas to focus on include ${gaps.map((g) => g.area).join(", ")}.` : "No major learning gaps were identified."} We recommend implementing ${primaryStyle}-based teaching strategies.`,
  }
}

function getStyleRecommendation(style: string): string {
  const recs: Record<string, string> = {
    visual:
      "Use diagrams, charts, color-coded notes, and video content. Seat student where they can see the board clearly.",
    auditory:
      "Incorporate discussions, verbal instructions, and audio recordings. Allow student to explain concepts aloud.",
    reading: "Provide written materials, encourage note-taking, and use reading-based assignments.",
    kinesthetic: "Include hands-on activities, movement breaks, and physical manipulatives in lessons.",
  }
  return recs[style] || recs.visual
}

// Text analysis using Hugging Face (for uploaded documents)
export async function analyzeText(text: string): Promise<{
  sentiment: string
  keyThemes: string[]
  summary: string
}> {
  // Simulate API processing
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In production, this would call:
  // POST https://api-inference.huggingface.co/models/facebook/bart-large-mnli
  // with proper authentication

  const sentences = text.split(".").filter((s) => s.trim().length > 0)

  return {
    sentiment:
      text.toLowerCase().includes("struggle") || text.toLowerCase().includes("difficult") ? "Concerning" : "Positive",
    keyThemes: ["Learning patterns", sentences.length > 3 ? "Detailed observations" : "Brief notes"],
    summary: `Document contains ${sentences.length} key observations. ${text.slice(0, 100)}...`,
  }
}

// Convert content for accessibility
export async function convertContent(
  text: string,
  format: "simplified" | "visual" | "dyslexia" | "audio",
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  switch (format) {
    case "simplified":
      return text
        .split(".")
        .map((s) => s.trim())
        .filter((s) => s)
        .map((s) => `• ${s}`)
        .join("\n\n")

    case "visual":
      return `📌 KEY POINTS:\n\n${text
        .split(".")
        .map((s) => `▸ ${s.trim()}`)
        .filter((s) => s !== "▸ ")
        .join("\n\n")}

🎯 MAIN IDEA:\n${text.slice(0, 150)}...`

    case "dyslexia":
      return text.split(" ").join("  ").split(".").join(".\n\n").toUpperCase()

    case "audio":
      return `[BEGIN SCRIPT]\n\n[PAUSE 2 SECONDS]\n\n${text
        .split(".")
        .join(".\n\n[PAUSE 1 SECOND]\n\n")}\n\n[END SCRIPT]`

    default:
      return text
  }
}
