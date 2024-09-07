import { Card, CardContent } from "@/components/ui/card";
import { Clock, Utensils, Flame, Info, Weight, Pizza } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FoodActivityProps {
  id: number;
  meal: string;
  food: string;
  amount: string;
  calories: number;
  protein: number;
  fat: number;
  carbo: number;
}

export function FoodActivityCard({
  id,
  meal,
  food,
  amount,
  calories,
  protein,
  fat,
  carbo,
}: FoodActivityProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="w-full max-w-3xl hover:bg-accent transition-colors my-1"
      // onClick={() => navigate(`/foodDetails/${id}`)}
    >
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-3 items-center">
          <div className="flex items-center space-x-2">
            <Pizza className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{food}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Weight className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{amount}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Flame className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{calories} cal</span>
          </div>
          <div className="flex items-center space-x-4 min-w-64">
            <span
              title="紅色: 蛋白質 (克) | 黃色: 脂肪 (克) | 綠色: 碳水化合物 (克)"
              className="cursor-help"
            >
              <span className="text-red-500">{protein}</span> /{" "}
              <span className="text-yellow-500">{fat}</span> /{" "}
              <span className="text-green-500">{carbo}</span>
              <Info className="inline-block ml-1 w-4 h-4" />
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
