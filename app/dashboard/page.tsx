"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Dashboard } from "@/components/dashboard"

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center hello-kitty-bg">
        <div className="text-center">
          <div className="animate-bounce text-4xl mb-4">🌸</div>
          <p className="text-pink-600">Loading your bestie adventures...</p>
        </div>
      </div>
    )
  }

  return <Dashboard />
}

