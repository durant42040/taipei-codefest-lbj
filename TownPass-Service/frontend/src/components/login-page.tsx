'use client'

import { useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast, useToast } from "@/components/ui/use-toast"

export function LoginPage() {
  const { toast } = useToast()
  const [userData, setUserData] = useState({
    id: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
  })

  const handleChange = (name: string, value: string) => {
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:4000/user', userData)
      toast({
        title: "Success!",
        description: "User registered successfully!",
      })
      console.log(response.data)
    } catch (error) {
      console.error('Error submitting user data', error)
      toast({
        title: "Error",
        description: "Failed to register user. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>User Registration</CardTitle>
          <CardDescription>Please enter your details to register.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="id">User ID</Label>
              <Input 
                id="id" 
                name="id" 
                value={userData.id} 
                onChange={(e) => handleChange('id', e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                name="age" 
                type="number" 
                value={userData.age} 
                onChange={(e) => handleChange('age', e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input 
                id="weight" 
                name="weight" 
                type="number" 
                step="0.01" 
                value={userData.weight} 
                onChange={(e) => handleChange('weight', e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input 
                id="height" 
                name="height" 
                type="number" 
                step="0.01" 
                value={userData.height} 
                onChange={(e) => handleChange('height', e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={(value) => handleChange('gender', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Register</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}