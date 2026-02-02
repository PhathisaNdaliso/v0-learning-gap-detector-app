"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { HamburgerMenu } from "@/components/hamburger-menu"
import { PageNav } from "@/components/page-nav"
import { Copy, Share2, Sparkles, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"
import { convertContent } from "@/lib/ai-service"

export default function ContentConverter() {
  const [inputText, setInputText] = useState("")
  const [outputFormat, setOutputFormat] = useState<"simplified" | "visual" | "dyslexia" | "audio">("simplified")
  const [convertedText, setConvertedText] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const formats = [
    { id: "simplified" as const, name: "Simplified Text", icon: "📝", desc: "Easier vocabulary" },
    { id: "visual" as const, name: "Visual Format", icon: "👁️", desc: "With bullet points" },
    { id: "dyslexia" as const, name: "Dyslexia-Friendly", icon: "📖", desc: "Spaced & clear" },
    { id: "audio" as const, name: "Audio Script", icon: "🎧", desc: "For read-aloud" },
  ]

  const handleConvert = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to convert")
      return
    }

    setError("")
    setIsConverting(true)

    try {
      const result = await convertContent(inputText, outputFormat)
      setConvertedText(result)
    } catch (err) {
      setError("Failed to convert content. Please try again.")
      console.error("Conversion error:", err)
    } finally {
      setIsConverting(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Converted Learning Content",
          text: convertedText,
        })
      } catch (err) {
        // User cancelled or share failed
      }
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <HamburgerMenu userRole="teacher" />

      <div className="max-w-4xl mx-auto px-4 pt-16">
        <PageNav title="Content Converter" backHref="/teacher/dashboard" />

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#4A90E2]/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-4xl">🔄</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Accessibility Content Converter</h1>
          <p className="text-muted-foreground">Transform text for different learning needs using AI</p>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-4 border-[#D9534F] bg-[#D9534F]/10">
            <CardContent className="p-3 flex items-center gap-2 text-[#D9534F]">
              <AlertCircle className="h-4 w-4" />
              {error}
            </CardContent>
          </Card>
        )}

        {/* Input Section */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-foreground">Input Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste or type the text you want to convert for accessibility..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {inputText.length} characters | Powered by Hugging Face AI
            </p>
          </CardContent>
        </Card>

        {/* Format Selection */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-foreground">Output Format</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {formats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setOutputFormat(format.id)}
                  className={`p-3 rounded-xl text-left transition-all ${
                    outputFormat === format.id ? "bg-[#4A90E2] text-white" : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  <span className="text-2xl block mb-1">{format.icon}</span>
                  <span
                    className={`font-medium text-sm ${outputFormat === format.id ? "text-white" : "text-foreground"}`}
                  >
                    {format.name}
                  </span>
                  <span
                    className={`text-xs block ${outputFormat === format.id ? "text-white/80" : "text-muted-foreground"}`}
                  >
                    {format.desc}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Convert Button */}
        <Button
          className="w-full mb-6 bg-[#7BC67E] hover:bg-[#4CAF50]"
          onClick={handleConvert}
          disabled={!inputText || isConverting}
        >
          {isConverting ? (
            <>
              <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
              Processing with AI...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              Convert with AI
            </>
          )}
        </Button>

        {/* Output Section */}
        {convertedText && (
          <Card className="border-0 shadow-lg border-[#7BC67E] border-2">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                  <Sparkles className="h-4 w-4 text-[#7BC67E]" />
                  AI Result
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    {copied ? <CheckCircle className="h-4 w-4 text-[#7BC67E]" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-xl whitespace-pre-wrap text-sm text-foreground font-mono">
                {convertedText}
              </div>
            </CardContent>
          </Card>
        )}

        {/* API Info */}
        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
          <p className="text-xs text-muted-foreground text-center">
            This converter uses AI text processing to transform content for different learning needs.
            <br />
            API: Hugging Face Inference API | Model: BART for summarization
          </p>
        </div>
      </div>
    </div>
  )
}
