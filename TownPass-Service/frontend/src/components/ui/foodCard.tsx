import { Card, CardContent } from "@/components/ui/card";
import { Flame, Weight, Pizza } from "lucide-react";

type FoodType = {
  id?: number;
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
  return (
    <Card
      className="w-full max-w-3xl hover:bg-accent transition-colors my-1"
      // onClick={() => navigate(`/foodDetails/${id}`)}
    >
      <CardContent className="p-4">
        <div className="flex flex-row items-center gap-2.5 justify-between">
          <div className="flex items-center space-x-2">
            <Pizza className="w-4 h-4 text-muted-foreground" />
            <span className="text-base font-medium">{food}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Weight className="w-4 h-4 text-muted-foreground" />
            <span className="text-base font-medium">{amount}</span>
          </div>
          <div className="flex items-center space-x-1 min-w-20">
            <Flame className="w-4 h-4 text-muted-foreground" />
            <span className="text-base font-medium">{calories} kcal</span>
          </div>
        </div>
        <div className="flex flex-row gap-1 mt-1">
          <span className="text-red-500 text-base">{protein}</span> /
          <span className="text-yellow-500 text-base">{fat}</span> /
          <span className="text-green-500 text-base">{carbo}</span> (g)
        </div>
      </CardContent>
    </Card>
  );
}
