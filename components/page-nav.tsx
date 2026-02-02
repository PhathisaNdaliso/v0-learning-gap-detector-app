"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PageNavProps {
  title: string
  backHref?: string
  showHome?: boolean
  homeHref?: string
}

export function PageNav({ title, backHref, showHome = true, homeHref = "/" }: PageNavProps) {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between py-4 px-2">
      <div className="flex items-center gap-2">
        {backHref && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(backHref)}
            className="rounded-full hover:bg-primary/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      </div>
      {showHome && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(homeHref)}
          className="rounded-full hover:bg-primary/10"
        >
          <Home className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
