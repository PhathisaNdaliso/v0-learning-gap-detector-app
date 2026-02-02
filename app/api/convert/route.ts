// Content Conversion API Route
// Converts text content for different accessibility needs
//
// API DOCUMENTATION:
// ==================
// POST /api/convert
//
// Request Body:
// {
//   "text": string,
//   "format": "simplified" | "visual" | "dyslexia" | "audio"
// }
//
// Response:
// {
//   "success": boolean,
//   "data": { convertedText: string } | null,
//   "error": string | null
// }

import { NextResponse } from "next/server"
import { convertContent } from "@/lib/ai-service"

export async function POST(request: Request) {
  try {
    const { text, format } = await request.json()

    if (!text || !format) {
      return NextResponse.json({ success: false, data: null, error: "Text and format are required" }, { status: 400 })
    }

    const convertedText = await convertContent(text, format)

    return NextResponse.json({
      success: true,
      data: { convertedText },
      error: null,
    })
  } catch (error) {
    console.error("Conversion error:", error)
    return NextResponse.json({ success: false, data: null, error: "Failed to convert content" }, { status: 500 })
  }
}
