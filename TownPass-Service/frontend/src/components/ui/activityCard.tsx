import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Activity, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ExerciseSessionProps {
  id: number;
  time: string;
  sport: string;
  caloriesBurnt: string;
}

export function ActivityCard({
  id,
  time,
  sport,
  caloriesBurnt,
}: ExerciseSessionProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="w-full hover:bg-accent transition-colors my-1"
      onClick={() => navigate(`/exerciseDetails/${id}`)}
    >
      <CardContent className="p-4">
        <div className="flex flex-row justify-around items-center">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-muted-foreground" />
            <span className="text-base font-medium">{sport}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-base font-medium">{time} hr</span>
          </div>
          <div className="flex items-center space-x-2">
            <Flame className="w-4 h-4 text-muted-foreground" />
            <span className="text-base font-medium">{caloriesBurnt} cal</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
