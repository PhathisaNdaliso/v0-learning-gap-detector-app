// AI Analysis API Route
// This endpoint processes student assessment data using AI classification
//
// API DOCUMENTATION:
// ==================
// POST /api/analyze
//
// Request Body:
// {
//   "teacherResponses": { [questionId: string]: number (1-5) },
//   "parentResponses": { [questionId: string]: number (1-5) },
//   "studentQuizAnswers": string[] (learning style keywords),
//   "uploadedText": string (optional - text from uploaded documents),
//   "diagnosedDifficulty": boolean
// }
//
// Response:
// {
//   "success": boolean,
//   "data": AnalysisResult | null,
//   "error": string | null
// }
//
// EXTERNAL DEPENDENCIES:
// - Hugging Face Inference API (optional - for enhanced text analysis)
//   Endpoint: https://api-inference.huggingface.co/models/facebook/bart-large-mnli
//   Required env: HUGGINGFACE_API_KEY
//
// RATE LIMITS:
// - Free tier: ~30,000 characters/month
// - Pro tier: Higher limits available

import { NextResponse } from "next/server"
import { analyzeStudent, type AnalysisInput } from "@/lib/ai-service"

export async function POST(request: Request) {
  try {
    const body: AnalysisInput = await request.json()

    // Validate input
    if (!body.teacherResponses && !body.parentResponses && !body.studentQuizAnswers) {
      return NextResponse.json(
        { success: false, data: null, error: "At least one data source is required" },
        { status: 400 },
      )
    }

    // Process with AI service
    const result = await analyzeStudent(body)

    return NextResponse.json({
      success: true,
      data: result,
      error: null,
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ success: false, data: null, error: "Failed to process analysis" }, { status: 500 })
  }
}
