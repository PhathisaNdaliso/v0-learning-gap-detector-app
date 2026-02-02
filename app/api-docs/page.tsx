"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageNav } from "@/components/page-nav"

export default function APIDocs() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <PageNav title="API Documentation" backHref="/" />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">API & Technical Documentation</h1>
          <p className="text-muted-foreground">Smart Learning Assistant - Integration Guide</p>
        </div>

        {/* Overview */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-foreground">Overview</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-foreground">
            <p>
              The Smart Learning Assistant uses AI-powered analysis to identify learning styles, detect potential
              learning gaps, and provide personalized recommendations. The platform integrates with external AI services
              for enhanced text analysis and classification.
            </p>
          </CardContent>
        </Card>

        {/* External APIs */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-foreground">External API Dependencies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-xl">
              <h3 className="font-bold text-foreground mb-2">1. Hugging Face Inference API</h3>
              <p className="text-sm text-muted-foreground mb-2">Used for text classification and analysis</p>
              <ul className="text-sm space-y-1 text-foreground">
                <li>
                  <strong>Endpoint:</strong> https://api-inference.huggingface.co/models/
                </li>
                <li>
                  <strong>Models:</strong> facebook/bart-large-mnli (zero-shot classification)
                </li>
                <li>
                  <strong>Auth:</strong> Bearer token (HUGGINGFACE_API_KEY)
                </li>
                <li>
                  <strong>Rate Limit:</strong> 30,000 characters/month (free tier)
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Internal APIs */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-foreground">Internal API Endpoints</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-xl">
              <h3 className="font-bold text-foreground mb-2">POST /api/analyze</h3>
              <p className="text-sm text-muted-foreground mb-2">Analyzes student assessment data</p>
              <pre className="text-xs bg-background p-3 rounded-lg overflow-x-auto">
                {`Request:
{
  "teacherResponses": { "q1": 4, "q2": 3 },
  "parentResponses": { "q1": 5, "q2": 2 },
  "studentQuizAnswers": ["visual", "visual", "kinesthetic"],
  "diagnosedDifficulty": false
}

Response:
{
  "success": true,
  "data": {
    "learningStyle": { "primary": "visual", "scores": {...} },
    "riskAssessment": { "level": "Low", "factors": [...] },
    "identifiedGaps": [...],
    "recommendations": [...]
  }
}`}
              </pre>
            </div>

            <div className="p-4 bg-muted rounded-xl">
              <h3 className="font-bold text-foreground mb-2">POST /api/convert</h3>
              <p className="text-sm text-muted-foreground mb-2">Converts content for accessibility</p>
              <pre className="text-xs bg-background p-3 rounded-lg overflow-x-auto">
                {`Request:
{
  "text": "Content to convert...",
  "format": "simplified" | "visual" | "dyslexia" | "audio"
}

Response:
{
  "success": true,
  "data": { "convertedText": "..." }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* User Touchpoints */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-foreground">User Interaction Touchpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#4A90E2]/10 rounded-xl">
                <span className="text-2xl block mb-2">📝</span>
                <h3 className="font-bold text-foreground">Touchpoint 1: Data Input</h3>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>Teacher Questionnaire (12 Likert questions)</li>
                  <li>Parent Questionnaire (8 questions + checkbox)</li>
                  <li>Student Quiz (10 adaptive questions)</li>
                  <li>File Upload (documents for AI analysis)</li>
                </ul>
              </div>
              <div className="p-4 bg-[#7BC67E]/10 rounded-xl">
                <span className="text-2xl block mb-2">📊</span>
                <h3 className="font-bold text-foreground">Touchpoint 2: AI Output</h3>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>Learning Style Radar Chart</li>
                  <li>Risk Assessment Visualization</li>
                  <li>Identified Gaps Display</li>
                  <li>Personalized Recommendations Grid</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-foreground">Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Next.js 15", icon: "⚡" },
                { name: "React 19", icon: "⚛️" },
                { name: "TypeScript", icon: "📘" },
                { name: "Tailwind CSS", icon: "🎨" },
                { name: "Recharts", icon: "📊" },
                { name: "Hugging Face", icon: "🤗" },
                { name: "Vercel", icon: "▲" },
                { name: "shadcn/ui", icon: "🧩" },
              ].map((tech, i) => (
                <div key={i} className="p-3 bg-muted rounded-xl text-center">
                  <span className="text-2xl block mb-1">{tech.icon}</span>
                  <span className="text-sm font-medium text-foreground">{tech.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
