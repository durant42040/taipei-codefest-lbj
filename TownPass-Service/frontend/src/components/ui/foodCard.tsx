import { Card, CardContent } from "@/components/ui/card";
import { Clock, Utensils, Flame, Info, Weight, Pizza } from "lucide-react";
import { useNavigate } from "react-router-dom";

type FoodType = {
  id: number;
  userId: string;
  calories: string;
  food: string;
  amount: string;
  protein: string;
  carbo: string;
  fat: string;
};

export function FoodActivityCard({
  food,
  amount,
  calories,
  protein,
  fat,
  carbo,
}: FoodType) {
  const navigate = useNavigate();

  return (
    <Card
      className="w-full max-w-3xl hover:bg-accent transition-colors my-1"
      // onClick={() => navigate(`/foodDetails/${id}`)}
    >
      <CardContent className="p-4">
        <div className="flex flex-row items-center gap-2.5 justify-between">
          <div className="flex items-center space-x-2">
            <Pizza className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{food}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Weight className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{amount}</span>
          </div>
          <div className="flex items-center space-x-1 min-w-20">
            <Flame className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{calories} cal</span>
          </div>
          <div className="flex items-center space-x-4 min-w-64">
            <span
              title="紅色: 蛋白質 (克) | 黃色: 脂肪 (克) | 綠色: 碳水化合物 (克)"
              className="cursor-help"
            >
              <span className="text-red-500 text-sm">{protein}</span> /{" "}
              <span className="text-yellow-500 text-sm">{fat}</span> /{" "}
              <span className="text-green-500 text-sm">{carbo}</span>
              <Info className="inline-block ml-1.5 w-4 h-4" />
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
