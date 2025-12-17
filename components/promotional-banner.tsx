"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PromotionalBannerProps {
  message: string
  eventDate?: Date
  autoHideAfter?: number // in seconds
  backgroundColor?: string
}

export function PromotionalBanner({
  message,
  eventDate,
  autoHideAfter,
  backgroundColor = "bg-primary",
}: PromotionalBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)

  // Calculate countdown timer for event
  useEffect(() => {
    if (!eventDate) return

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = eventDate.getTime() - now

      if (distance < 0) {
        setIsVisible(false)
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [eventDate])

  // Auto-hide banner after specified time
  useEffect(() => {
    if (!autoHideAfter) return

    const timer = setTimeout(() => {
      setIsVisible(false)
    }, autoHideAfter * 1000)

    return () => clearTimeout(timer)
  }, [autoHideAfter])

  if (!isVisible) return null

  return (
    <div className={`${backgroundColor} text-primary-foreground py-3 px-4 relative`}>
      <div className="container mx-auto flex items-center justify-center gap-4 text-center flex-wrap">
        <p className="text-sm md:text-base font-medium">{message}</p>

        {timeLeft && (
          <div className="flex gap-2 text-sm font-mono">
            <div className="bg-background/20 px-2 py-1 rounded">
              <span className="font-bold">{timeLeft.days}</span>d
            </div>
            <div className="bg-background/20 px-2 py-1 rounded">
              <span className="font-bold">{timeLeft.hours}</span>h
            </div>
            <div className="bg-background/20 px-2 py-1 rounded">
              <span className="font-bold">{timeLeft.minutes}</span>m
            </div>
            <div className="bg-background/20 px-2 py-1 rounded">
              <span className="font-bold">{timeLeft.seconds}</span>s
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-background/20"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close banner</span>
        </Button>
      </div>
    </div>
  )
}
