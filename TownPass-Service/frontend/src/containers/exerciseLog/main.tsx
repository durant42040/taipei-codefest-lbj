import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import SummaryCircle from "@/components/journal/summaryCircle";

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

const ExerciseDetails = () => {
  const { id } = useParams(); // Extract the id from the URL

  const [name, setName] = useState<string>("");

  useEffect(() => {
    // You can modify this to fetch the exercise name based on the id,
    // or simply set the name using the id directly.
    if (id) {
      setName(`Exercise ID: ${id}`);
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <SummaryCircle title={name} />
    </div>
  );
};

export default ExerciseDetails;
