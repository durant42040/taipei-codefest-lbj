import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface Exercise {
  id: number
  name: string
  sets: number
  reps: number
  weight: number
}

export default function ExerciseDetails() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [newExercise, setNewExercise] = useState({ name: '', sets: 0, reps: 0, weight: 0 })

  const addExercise = () => {
    if (newExercise.name) {
      setExercises([...exercises, { id: Date.now(), ...newExercise }])
      setNewExercise({ name: '', sets: 0, reps: 0, weight: 0 })
    }
  }

  const removeExercise = (id: number) => {
    setExercises(exercises.filter(exercise => exercise.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Exercise Session Details</CardTitle>
          <CardDescription>Record your workout session information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Exercise Name</Label>
              <Input id="name" value="Full Body Workout" readOnly />
            </div>
            <div>
              <Label htmlFor="place">Place</Label>
              <Input id="place" value="Home Gym" readOnly />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input id="time" value="1 hour" readOnly />
            </div>
            <div>
              <Label htmlFor="calories">Calories Depleted</Label>
              <Input id="calories" value="300 kcal" readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exercise List</CardTitle>
          <CardDescription>Add and manage your exercises</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exercises.map(exercise => (
              <div key={exercise.id} className="flex items-center justify-between bg-muted p-2 rounded">
                <span>{exercise.name} - {exercise.sets} sets, {exercise.reps} reps, {exercise.weight} lbs</span>
                <Button variant="destructive" size="sm" onClick={() => removeExercise(exercise.id)}>Remove</Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="grid grid-cols-5 gap-2 w-full">
            <Input
              placeholder="Exercise name"
              value={newExercise.name}
              onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Sets"
              value={newExercise.sets || ''}
              onChange={(e) => setNewExercise({ ...newExercise, sets: parseInt(e.target.value) || 0 })}
            />
            <Input
              type="number"
              placeholder="Reps"
              value={newExercise.reps || ''}
              onChange={(e) => setNewExercise({ ...newExercise, reps: parseInt(e.target.value) || 0 })}
            />
            <Input
              type="number"
              placeholder="Weight (lbs)"
              value={newExercise.weight || ''}
              onChange={(e) => setNewExercise({ ...newExercise, weight: parseInt(e.target.value) || 0 })}
            />
            <Button onClick={addExercise}>Add Exercise</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}