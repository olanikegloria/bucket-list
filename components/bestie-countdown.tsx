"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle, Trash2, Clock, CalendarDays, PartyPopper } from "lucide-react"

type CountdownEvent = {
  id: number
  title: string
  date: string
  completed: boolean
}

export function BestieCountdown() {
  const { toast } = useToast()
  const [events, setEvents] = useState<CountdownEvent[]>([])
  const [newTitle, setNewTitle] = useState("")
  const [newDate, setNewDate] = useState("")
  const [today] = useState(new Date().toISOString().split("T")[0])

  useEffect(() => {
    const savedEvents = localStorage.getItem("countdownEvents")
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents))
    } else {
      // Add example event for first-time users
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 7)
      const exampleEvents = [
        {
          id: 1,
          title: "Bestie Movie Night",
          date: futureDate.toISOString().split("T")[0],
          completed: false,
        },
      ]
      setEvents(exampleEvents)
      localStorage.setItem("countdownEvents", JSON.stringify(exampleEvents))
    }
  }, [])

  useEffect(() => {
    // Check for events happening today
    const currentDate = new Date().toISOString().split("T")[0]
    const todayEvents = events.filter((event) => event.date === currentDate && !event.completed)

    if (todayEvents.length > 0) {
      todayEvents.forEach((event) => {
        toast({
          title: "Today's the day! 🎉",
          description: `Get ready, bestie! Today is ${event.title} day!`,
        })
      })
    }
  }, [events, toast])

  const saveEvents = (newEvents: CountdownEvent[]) => {
    setEvents(newEvents)
    localStorage.setItem("countdownEvents", JSON.stringify(newEvents))
  }

  const addEvent = () => {
    if (newTitle.trim() === "" || newDate === "") return

    const newEvents = [
      ...events,
      {
        id: Date.now(),
        title: newTitle,
        date: newDate,
        completed: false,
      },
    ]

    saveEvents(newEvents)
    setNewTitle("")
    setNewDate("")

    toast({
      title: "Countdown added!",
      description: "Can't wait for this bestie adventure! 💖",
    })
  }

  const completeEvent = (id: number) => {
    const newEvents = events.map((event) => (event.id === id ? { ...event, completed: true } : event))

    saveEvents(newEvents)

    toast({
      title: "Yay! Event completed! 🎉",
      description: "Hope you had an amazing time with your bestie!",
    })
  }

  const deleteEvent = (id: number) => {
    const newEvents = events.filter((event) => event.id !== id)
    saveEvents(newEvents)

    toast({
      title: "Event removed",
      description: "Countdown event removed successfully",
    })
  }

  const getCountdown = (dateString: string) => {
    const eventDate = new Date(dateString)
    const currentDate = new Date()

    // Reset time part for accurate day calculation
    eventDate.setHours(0, 0, 0, 0)
    currentDate.setHours(0, 0, 0, 0)

    const diffTime = eventDate.getTime() - currentDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Past event"
    if (diffDays === 0) return "Today! 🎉"
    if (diffDays === 1) return "Tomorrow! 😍"
    return `${diffDays} days to go! 💖`
  }

  // Sort events by date (closest first)
  const sortedEvents = [...events].sort((a, b) => {
    if (a.completed && !b.completed) return 1
    if (!a.completed && b.completed) return -1
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  return (
    <div className="grid gap-6">
      <Card className="cute-card">
        <CardHeader>
          <CardTitle className="cute-title text-2xl">Bestie Countdown ⏳</CardTitle>
          <CardDescription>Add upcoming activities with your bestie and count down the days!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Label htmlFor="event-title" className="sr-only">
                Event title
              </Label>
              <Input
                id="event-title"
                placeholder="What are you planning?"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="cute-input"
              />
            </div>
            <div className="w-full sm:w-[180px]">
              <Label htmlFor="event-date" className="sr-only">
                Event date
              </Label>
              <Input
                id="event-date"
                type="date"
                min={today}
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="cute-input"
              />
            </div>
            <Button onClick={addEvent} className="cute-button">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {sortedEvents.length === 0 ? (
        <Card className="cute-card text-center p-8">
          <div className="text-4xl mb-4">🌸</div>
          <h3 className="text-lg font-medium mb-2">No countdowns yet</h3>
          <p className="text-muted-foreground">Add your first countdown event above!</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sortedEvents.map((event) => (
            <Card
              key={event.id}
              className={`cute-card transition-all ${event.completed ? "bg-pink-50/80" : "countdown-bg"}`}
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-medium ${event.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!event.completed && (
                      <div className="cute-badge flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{getCountdown(event.date)}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      {!event.completed && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => completeEvent(event.id)}
                          className="border-pink-200 text-pink-600 hover:bg-pink-50"
                        >
                          <PartyPopper className="h-4 w-4 mr-1" />
                          <span>Done!</span>
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteEvent(event.id)}
                        className="text-pink-600 hover:bg-pink-50 hover:text-pink-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

