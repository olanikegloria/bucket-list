"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { BucketList } from "@/components/bucket-list"
import { BestieCountdown } from "@/components/bestie-countdown"
import { MemoryScrapbook } from "@/components/memory-scrapbook"
import { AdventureGenerator } from "@/components/adventure-generator"
import { ConfettiBackground } from "@/components/confetti-background"
import { CalendarHeart, Clock, LogOut, Camera, Sparkles } from "lucide-react"

export function Dashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [username, setUsername] = useState("")
  const [activeTab, setActiveTab] = useState("bucket-list")

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    setUsername(currentUser.username || "Bestie")
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    toast({
      title: "Logged out",
      description: "Come back soon, bestie! 💖",
    })
    router.push("/")
  }

  return (
    <div className="min-h-screen hello-kitty-bg relative overflow-hidden">
      {/* Confetti background */}
      <ConfettiBackground />

      <header className="bg-gradient-to-r from-pink-100 to-purple-100 backdrop-blur-sm border-b-2 border-pink-200 sticky top-0 z-20 py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12">
              <Image src="/logo.png" alt="Bestie Bucket List Logo" fill className="object-contain" />
            </div>
            <h1 className="text-xl font-bold cute-title">Bestie Bucket List</h1>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-pink-600 hidden sm:flex items-center gap-1">
              <span className="text-lg">👋</span>
              Welcome, <span className="font-bold">{username}</span>! 💖
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="bg-white/80 text-pink-600 border-pink-200 hover:bg-pink-50 rounded-full px-4"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 relative z-20">
        {/* Enhanced Hello Kitty styled navigation */}
        <div className="bg-gradient-to-r from-pink-200 to-purple-200 p-2 rounded-3xl shadow-lg mb-8 max-w-3xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 flex justify-between items-center">
            <button
              className={`flex-1 flex flex-col items-center py-3 px-2 rounded-xl transition-all duration-300 ${
                activeTab === "bucket-list"
                  ? "bg-gradient-to-r from-pink-300 to-pink-200 text-pink-700 shadow-md transform -translate-y-1"
                  : "text-pink-500 hover:bg-pink-50"
              }`}
              onClick={() => setActiveTab("bucket-list")}
            >
              <CalendarHeart className="h-6 w-6 mb-1" />
              <span className="font-medium text-sm">Bucket List</span>
              {activeTab === "bucket-list" && <span className="text-xs mt-1">✨</span>}
            </button>

            <button
              className={`flex-1 flex flex-col items-center py-3 px-2 rounded-xl transition-all duration-300 ${
                activeTab === "countdown"
                  ? "bg-gradient-to-r from-pink-300 to-pink-200 text-pink-700 shadow-md transform -translate-y-1"
                  : "text-pink-500 hover:bg-pink-50"
              }`}
              onClick={() => setActiveTab("countdown")}
            >
              <Clock className="h-6 w-6 mb-1" />
              <span className="font-medium text-sm">Countdown</span>
              {activeTab === "countdown" && <span className="text-xs mt-1">✨</span>}
            </button>

            <button
              className={`flex-1 flex flex-col items-center py-3 px-2 rounded-xl transition-all duration-300 ${
                activeTab === "scrapbook"
                  ? "bg-gradient-to-r from-pink-300 to-pink-200 text-pink-700 shadow-md transform -translate-y-1"
                  : "text-pink-500 hover:bg-pink-50"
              }`}
              onClick={() => setActiveTab("scrapbook")}
            >
              <Camera className="h-6 w-6 mb-1" />
              <span className="font-medium text-sm">Scrapbook</span>
              {activeTab === "scrapbook" && <span className="text-xs mt-1">✨</span>}
            </button>

            <button
              className={`flex-1 flex flex-col items-center py-3 px-2 rounded-xl transition-all duration-300 ${
                activeTab === "generator"
                  ? "bg-gradient-to-r from-pink-300 to-pink-200 text-pink-700 shadow-md transform -translate-y-1"
                  : "text-pink-500 hover:bg-pink-50"
              }`}
              onClick={() => setActiveTab("generator")}
            >
              <Sparkles className="h-6 w-6 mb-1" />
              <span className="font-medium text-sm">Generator</span>
              {activeTab === "generator" && <span className="text-xs mt-1">✨</span>}
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="relative z-20">
          {activeTab === "bucket-list" && <BucketList />}
          {activeTab === "countdown" && <BestieCountdown />}
          {activeTab === "scrapbook" && <MemoryScrapbook />}
          {activeTab === "generator" && <AdventureGenerator />}
        </div>
      </main>
    </div>
  )
}

