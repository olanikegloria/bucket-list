"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle, Trash2, Camera, Heart, Sparkles } from "lucide-react"

type Memory = {
  id: number
  title: string
  description: string
  date: string
  imageUrl: string
}

export function MemoryScrapbook() {
  const { toast } = useToast()
  const [memories, setMemories] = useState<Memory[]>([])
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0])
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedMemories = localStorage.getItem("scrapbookMemories")
    if (savedMemories) {
      setMemories(JSON.parse(savedMemories))
    } else {
      // Add example memory for first-time users
      const exampleMemories = [
        {
          id: 1,
          title: "First Coffee Date",
          description:
            "Had the best time at the new café downtown! The lattes were amazing and we couldn't stop laughing about our inside jokes. Definitely coming back here! 💖☕",
          date: "2023-04-15",
          imageUrl: "/placeholder.svg?height=400&width=600",
        },
      ]
      setMemories(exampleMemories)
      localStorage.setItem("scrapbookMemories", JSON.stringify(exampleMemories))
    }
  }, [])

  const saveMemories = (newMemories: Memory[]) => {
    setMemories(newMemories)
    localStorage.setItem("scrapbookMemories", JSON.stringify(newMemories))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addMemory = () => {
    if (newTitle.trim() === "" || !imagePreview) return

    const newMemories = [
      ...memories,
      {
        id: Date.now(),
        title: newTitle,
        description: newDescription,
        date: newDate,
        imageUrl: imagePreview,
      },
    ]

    saveMemories(newMemories)
    setNewTitle("")
    setNewDescription("")
    setNewDate(new Date().toISOString().split("T")[0])
    setImagePreview(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    toast({
      title: "Memory saved! 📸",
      description: "Your bestie moment has been added to the scrapbook!",
    })
  }

  const deleteMemory = (id: number) => {
    const newMemories = memories.filter((memory) => memory.id !== id)
    saveMemories(newMemories)

    toast({
      title: "Memory removed",
      description: "Scrapbook memory removed successfully",
    })
  }

  // Sort memories by date (newest first)
  const sortedMemories = [...memories].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="grid gap-6">
      <Card className="cute-card">
        <CardHeader>
          <CardTitle className="cute-title text-2xl">Memory Scrapbook 📸</CardTitle>
          <CardDescription>Save your favorite moments with your bestie!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="memory-title">Title</Label>
                <Input
                  id="memory-title"
                  placeholder="What's this memory called?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="cute-input mt-1"
                />
              </div>
              <div>
                <Label htmlFor="memory-date">Date</Label>
                <Input
                  id="memory-date"
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="cute-input mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="memory-description">Description</Label>
              <Textarea
                id="memory-description"
                placeholder="Write about this special moment..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="cute-textarea mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="memory-image">Upload Image</Label>
              <div className="flex items-center gap-4 mt-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-pink-200 text-pink-600 hover:bg-pink-50"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Choose Image
                </Button>
                <Input
                  id="memory-image"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span className="text-sm text-muted-foreground">
                  {imagePreview ? "Image selected" : "No image selected"}
                </span>
              </div>

              {imagePreview && (
                <div className="mt-4 relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full max-h-[200px] object-cover rounded-lg border-2 border-pink-200"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full"
                    onClick={() => setImagePreview(null)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove image</span>
                  </Button>
                </div>
              )}
            </div>

            <Button onClick={addMemory} className="cute-button mt-2">
              <PlusCircle className="h-4 w-4 mr-2" />
              Save Memory
            </Button>
          </div>
        </CardContent>
      </Card>

      {sortedMemories.length === 0 ? (
        <Card className="cute-card text-center p-8">
          <div className="text-4xl mb-4">🌸</div>
          <h3 className="text-lg font-medium mb-2">No memories yet</h3>
          <p className="text-muted-foreground">Add your first memory above!</p>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {sortedMemories.map((memory) => (
            <Card key={memory.id} className="cute-card overflow-hidden scrapbook-bg">
              <div className="relative">
                <img
                  src={memory.imageUrl || "/placeholder.svg"}
                  alt={memory.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => deleteMemory(memory.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="cute-badge bg-white/80 backdrop-blur-sm">
                    {new Date(memory.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  {memory.title}
                  <Sparkles className="h-4 w-4 text-pink-500" />
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{memory.description}</p>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="text-pink-600 hover:bg-pink-50 hover:text-pink-700">
                    <Heart className="h-4 w-4 mr-1" />
                    <span>Favorite</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

