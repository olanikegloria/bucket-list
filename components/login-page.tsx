"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ConfettiBackground } from "@/components/confetti-background"

export function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const form = e.target as HTMLFormElement
    const username = (form.elements.namedItem("username") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: any) => u.username === username && u.password === password)

    setTimeout(() => {
      setIsLoading(false)

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user))
        toast({
          title: "Login successful!",
          description: "Welcome back, bestie! 💖",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        })
      }
    }, 1000)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const form = e.target as HTMLFormElement
    const username = (form.elements.namedItem("username") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value

    // Validate password match
    if (password !== confirmPassword) {
      setIsLoading(false)
      toast({
        title: "Signup failed",
        description: "Passwords don't match",
        variant: "destructive",
      })
      return
    }

    // Check if username already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const userExists = users.some((u: any) => u.username === username)

    setTimeout(() => {
      setIsLoading(false)

      if (userExists) {
        toast({
          title: "Signup failed",
          description: "Username already exists",
          variant: "destructive",
        })
      } else {
        // Add new user
        const newUser = { username, password, id: Date.now() }
        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))
        localStorage.setItem("currentUser", JSON.stringify(newUser))

        toast({
          title: "Signup successful!",
          description: "Welcome to Bestie Bucket List! 💖",
        })
        router.push("/dashboard")
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 hello-kitty-bg relative overflow-hidden">
      {/* Confetti background */}
      <ConfettiBackground />

      <div className="w-full max-w-md relative z-20">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Image src="/logo.png" alt="Bestie Bucket List Logo" width={180} height={180} className="drop-shadow-lg" />
          </div>
          <h1 className="text-3xl font-bold cute-title mb-2">Bestie Bucket List</h1>
          <p className="text-pink-600">Create memories with your bestie! 💖📸</p>
        </div>

        <Card className="cute-card">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login" className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="Enter your username"
                      required
                      className="cute-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="text-xs text-pink-500 hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      className="cute-input"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full cute-button" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-username">Username</Label>
                    <Input
                      id="new-username"
                      name="username"
                      placeholder="Choose a username"
                      required
                      className="cute-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Password</Label>
                    <Input
                      id="new-password"
                      name="password"
                      type="password"
                      placeholder="Choose a password"
                      required
                      className="cute-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      required
                      className="cute-input"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full cute-button" disabled={isLoading}>
                    {isLoading ? "Signing up..." : "Sign Up"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

