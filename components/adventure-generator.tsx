"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { RefreshCw, ThumbsDown, CalendarPlus, Dices } from "lucide-react"

type Adventure = {
  title: string
  emoji: string
  description: string
  category: string
}

const adventures: Adventure[] = [
  {
    title: "Bake Cookies Together",
    emoji: "🍪",
    description: "Get your aprons ready and bake some delicious cookies! Try fun shapes and decorations.",
    category: "Food",
  },
  {
    title: "Photo Shoot Day",
    emoji: "📸",
    description: "Dress up and have a fun photo shoot! Try different poses and locations.",
    category: "Creative",
  },
  {
    title: "Picnic in the Park",
    emoji: "🧺",
    description: "Pack some snacks and drinks for a relaxing picnic at your local park.",
    category: "Outdoor",
  },
  {
    title: "Movie Marathon Night",
    emoji: "🎬",
    description: "Pick a movie series or theme and watch them all in one night with snacks!",
    category: "Entertainment",
  },
  {
    title: "DIY Face Masks",
    emoji: "🧖‍♀️",
    description: "Make homemade face masks and have a spa day at home.",
    category: "Self-Care",
  },
  {
    title: "Thrift Store Challenge",
    emoji: "👗",
    description: "Go to a thrift store with a $10 budget and find the cutest outfit for each other.",
    category: "Shopping",
  },
  {
    title: "Stargazing Night",
    emoji: "✨",
    description: "Find a spot away from city lights and gaze at the stars together.",
    category: "Outdoor",
  },
  {
    title: "Try a New Restaurant",
    emoji: "🍽️",
    description: "Pick a cuisine you've never tried before and go on a food adventure!",
    category: "Food",
  },
  {
    title: "DIY Jewelry Making",
    emoji: "💍",
    description: "Get some beads and string and make friendship bracelets or necklaces.",
    category: "Creative",
  },
  {
    title: "Karaoke Night",
    emoji: "🎤",
    description: "Use a karaoke app or YouTube and sing your hearts out!",
    category: "Entertainment",
  },
  {
    title: "Bike Ride Adventure",
    emoji: "🚲",
    description: "Explore your city or a nearby trail on bikes together.",
    category: "Outdoor",
  },
  {
    title: "Paint and Sip",
    emoji: "🎨",
    description: "Get some canvases, paint, and your favorite drinks for a creative night.",
    category: "Creative",
  },
  {
    title: "Board Game Marathon",
    emoji: "🎲",
    description: "Dust off those board games and have a competitive game night!",
    category: "Entertainment",
  },
  {
    title: "Farmers Market Trip",
    emoji: "🥕",
    description: "Visit a local farmers market and pick out fresh ingredients for a meal.",
    category: "Food",
  },
  {
    title: "DIY Room Decor",
    emoji: "🏠",
    description: "Create some cute decorations to spruce up your rooms.",
    category: "Creative",
  },
  {
    title: "Sunrise Breakfast",
    emoji: "🌅",
    description: "Wake up early, pack breakfast, and watch the sunrise together.",
    category: "Outdoor",
  },
  {
    title: "Ice Cream Taste Test",
    emoji: "🍦",
    description: "Buy different ice cream flavors and have a taste testing competition.",
    category: "Food",
  },
  {
    title: "Dance Party",
    emoji: "💃",
    description: "Create a playlist of your favorite songs and have a dance party!",
    category: "Entertainment",
  },
  {
    title: "Volunteer Together",
    emoji: "❤️",
    description: "Find a local charity or cause and spend a day volunteering together.",
    category: "Community",
  },
  {
    title: "Bookstore Date",
    emoji: "📚",
    description: "Visit a bookstore and pick out books for each other to read.",
    category: "Shopping",
  },
  {
    title: "Bubble Tea Crawl",
    emoji: "🧋",
    description: "Visit multiple bubble tea shops and try different flavors.",
    category: "Food",
  },
  {
    title: "Tie-Dye T-Shirts",
    emoji: "👕",
    description: "Get plain white t-shirts and create colorful tie-dye designs.",
    category: "Creative",
  },
  {
    title: "Botanical Garden Visit",
    emoji: "🌸",
    description: "Explore a local botanical garden and take photos of beautiful flowers.",
    category: "Outdoor",
  },
  {
    title: "Dessert Baking Competition",
    emoji: "🧁",
    description: "Each person bakes a dessert and then judge each other's creations.",
    category: "Food",
  },
  {
    title: "Scavenger Hunt",
    emoji: "🔍",
    description: "Create a list of items to find or tasks to complete around your neighborhood.",
    category: "Entertainment",
  },
  {
    title: "Matching Manicures",
    emoji: "💅",
    description: "Do each other's nails with cute matching designs.",
    category: "Self-Care",
  },
  {
    title: "Sunset Watching",
    emoji: "🌇",
    description: "Find a nice spot to watch the sunset and take beautiful photos.",
    category: "Outdoor",
  },
  {
    title: "Make a Time Capsule",
    emoji: "⏳",
    description: "Fill a box with mementos and notes to open in the future.",
    category: "Creative",
  },
  {
    title: "Try a New Coffee Shop",
    emoji: "☕",
    description: "Visit a coffee shop you've never been to and try their specialty drinks.",
    category: "Food",
  },
  {
    title: "Friendship Bracelet Making",
    emoji: "🧶",
    description: "Learn to make friendship bracelets and exchange them when done.",
    category: "Creative",
  },
]

export function AdventureGenerator() {
  const { toast } = useToast()
  const [currentAdventure, setCurrentAdventure] = useState<Adventure | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateAdventure = () => {
    setIsGenerating(true)

    // Simulate loading
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * adventures.length)
      setCurrentAdventure(adventures[randomIndex])
      setIsGenerating(false)
    }, 800)
  }

  const addToBucketList = () => {
    if (!currentAdventure) return

    // Get existing bucket list items
    const bucketListItems = JSON.parse(localStorage.getItem("bucketListItems") || "[]")

    // Check if this adventure is already in the bucket list
    const alreadyExists = bucketListItems.some((item: any) => item.text === currentAdventure.title)

    if (alreadyExists) {
      toast({
        title: "Already in your bucket list!",
        description: "This adventure is already in your bucket list.",
      })
      return
    }

    // Add to bucket list
    const category = currentAdventure.category.toLowerCase()
    const mappedCategory =
      category === "food"
        ? "food"
        : category === "outdoor"
          ? "adventure"
          : category === "entertainment"
            ? "movie"
            : category === "shopping"
              ? "shopping"
              : category === "self-care"
                ? "self-care"
                : "other"

    const newItem = {
      id: Date.now(),
      text: currentAdventure.title,
      category: mappedCategory,
      completed: false,
    }

    bucketListItems.push(newItem)
    localStorage.setItem("bucketListItems", JSON.stringify(bucketListItems))

    toast({
      title: "Added to bucket list!",
      description: "This adventure has been added to your bucket list!",
    })
  }

  return (
    <div className="grid gap-6">
      <Card className="cute-card">
        <CardHeader className="sm:text-center">
          <CardTitle className="cute-title text-2xl">Bestie Adventure Generator 🎲</CardTitle>
          <CardDescription>Feeling bored? Let us suggest a fun activity for you and your bestie!</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button
            onClick={generateAdventure}
            className="cute-button text-lg px-6 py-5 mb-6 w-full sm:w-auto"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Dices className="h-5 w-5 mr-2" />
                Generate Adventure!
              </>
            )}
          </Button>

          {currentAdventure ? (
            <Card className="adventure-bg p-4 sm:p-8 max-w-md mx-auto">
              <div className="text-5xl sm:text-6xl mb-4">{currentAdventure.emoji}</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">{currentAdventure.title}</h3>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base">{currentAdventure.description}</p>
              <div className="cute-badge mb-4 sm:mb-6">{currentAdventure.category}</div>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button
                  variant="outline"
                  className="border-pink-200 text-pink-600 hover:bg-pink-50 w-full sm:w-auto"
                  onClick={generateAdventure}
                >
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  Try Another
                </Button>
                <Button className="cute-button w-full sm:w-auto" onClick={addToBucketList}>
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Add to Bucket List
                </Button>
              </div>
            </Card>
          ) : (
            <div className="text-center p-6 sm:p-12 max-w-md mx-auto">
              <div className="text-5xl sm:text-6xl mb-4">✨</div>
              <h3 className="text-lg sm:text-xl font-medium mb-2">
                Click the button above to generate a fun bestie adventure!
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                We'll suggest activities you can do together to create amazing memories!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

