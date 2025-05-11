"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import {
  PlusCircle,
  Trash2,
  Check,
  X,
  CalendarHeart,
  Utensils,
  Plane,
  ShoppingBag,
  Sparkles,
  Film,
  HeartHandshake,
} from "lucide-react"

type BucketListItem = {
  id: number
  text: string
  category: string
  completed: boolean
}

const categories = [
  { value: "adventure", label: "Adventure", icon: <CalendarHeart className="h-4 w-4" /> },
  { value: "food", label: "Food", icon: <Utensils className="h-4 w-4" /> },
  { value: "travel", label: "Travel", icon: <Plane className="h-4 w-4" /> },
  { value: "shopping", label: "Shopping", icon: <ShoppingBag className="h-4 w-4" /> },
  { value: "self-care", label: "Self-Care", icon: <Sparkles className="h-4 w-4" /> },
  { value: "movie", label: "Movie Night", icon: <Film className="h-4 w-4" /> },
  { value: "other", label: "Other", icon: <HeartHandshake className="h-4 w-4" /> },
]

export function BucketList() {
  const { toast } = useToast()
  const [items, setItems] = useState<BucketListItem[]>([])
  const [newItem, setNewItem] = useState("")
  const [category, setCategory] = useState("adventure")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const savedItems = localStorage.getItem("bucketListItems")
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    } else {
      // Add some example items for first-time users
      const exampleItems = [
        { id: 1, text: "Have a picnic in the park", category: "adventure", completed: false },
        { id: 2, text: "Try a new dessert cafe", category: "food", completed: false },
        { id: 3, text: "Weekend road trip", category: "travel", completed: false },
      ]
      setItems(exampleItems)
      localStorage.setItem("bucketListItems", JSON.stringify(exampleItems))
    }
  }, [])

  const saveItems = (newItems: BucketListItem[]) => {
    setItems(newItems)
    localStorage.setItem("bucketListItems", JSON.stringify(newItems))
  }

  const addItem = () => {
    if (newItem.trim() === "") return

    const newItems = [
      ...items,
      {
        id: Date.now(),
        text: newItem,
        category,
        completed: false,
      },
    ]

    saveItems(newItems)
    setNewItem("")

    toast({
      title: "Added to bucket list!",
      description: "Can't wait to do this with your bestie! 💖",
    })
  }

  // Function to play the sound
  const playCheckSound = () => {
    // Create a new Audio instance each time to avoid issues with replaying
    const sound = new Audio("/sounds/cute-check.mp3")

    // Play the sound with a promise chain to handle errors
    const playPromise = sound.play()

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Sound played successfully
          console.log("Sound played successfully")
        })
        .catch((error) => {
          // Sound failed to play
          console.error("Sound failed to play:", error)
        })
    }
  }

  const toggleItem = (id: number) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        // If the item is being marked as completed (not already completed)
        if (!item.completed) {
          // Play the sound
          playCheckSound()
        }
        return { ...item, completed: !item.completed }
      }
      return item
    })

    saveItems(newItems)

    const item = newItems.find((item) => item.id === id)
    if (item?.completed) {
      toast({
        title: "Yay! Completed! 🎉",
        description: "Another memory with your bestie!",
      })
    }
  }

  const deleteItem = (id: number) => {
    const newItems = items.filter((item) => item.id !== id)
    saveItems(newItems)

    toast({
      title: "Item removed",
      description: "Bucket list item removed successfully",
    })
  }

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true
    if (filter === "completed") return item.completed
    if (filter === "pending") return !item.completed
    return item.category === filter
  })

  const getCategoryIcon = (categoryValue: string) => {
    const category = categories.find((c) => c.value === categoryValue)
    return category?.icon || <HeartHandshake className="h-4 w-4" />
  }

  return (
    <div className="grid gap-6">
      <Card className="cute-card">
        <CardHeader>
          <CardTitle className="cute-title text-2xl">Bestie Bucket List 🎀</CardTitle>
          <CardDescription>Add fun activities you want to do with your bestie!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Label htmlFor="new-item" className="sr-only">
                New bucket list item
              </Label>
              <Input
                id="new-item"
                placeholder="Add a new activity..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addItem()
                }}
                className="cute-input"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full sm:w-[180px] cute-select">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <span>{category.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addItem} className="cute-button">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className={filter === "all" ? "cute-button" : "border-pink-200 text-pink-600 hover:bg-pink-50"}
        >
          All
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "cute-button" : "border-pink-200 text-pink-600 hover:bg-pink-50"}
        >
          <Check className="h-4 w-4 mr-1" />
          Completed
        </Button>
        <Button
          variant={filter === "pending" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("pending")}
          className={filter === "pending" ? "cute-button" : "border-pink-200 text-pink-600 hover:bg-pink-50"}
        >
          <X className="h-4 w-4 mr-1" />
          Pending
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={filter === cat.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(cat.value)}
            className={filter === cat.value ? "cute-button" : "border-pink-200 text-pink-600 hover:bg-pink-50"}
          >
            {cat.icon}
            <span className="ml-1 hidden sm:inline">{cat.label}</span>
          </Button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <Card className="cute-card text-center p-8">
          <div className="text-4xl mb-4">🌸</div>
          <h3 className="text-lg font-medium mb-2">No items found</h3>
          <p className="text-muted-foreground">
            {filter === "all" ? "Add your first bucket list item above!" : "No items match the selected filter."}
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className={`cute-card transition-all ${item.completed ? "bg-pink-50/80" : ""}`}>
              <CardContent className="p-4 flex items-center gap-3">
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={() => toggleItem(item.id)}
                  className="cute-checkbox"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-lg ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                      {item.text}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="cute-tag flex items-center gap-1">
                      {getCategoryIcon(item.category)}
                      <span className="capitalize">{item.category}</span>
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteItem(item.id)}
                  className="text-pink-600 hover:bg-pink-50 hover:text-pink-700"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

