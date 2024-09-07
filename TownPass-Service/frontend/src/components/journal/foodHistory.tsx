import React from 'react';
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Utensils, Info, Flame } from "lucide-react";
import { FoodActivityCard } from "@/components/ui/foodCard";

// Mock food history data
const foodHistory = [
  {
    id: 1,
    meal: "早餐",
    food: "雞蛋",
    amount: "100克",
    calories: 130,
    protein: 13,
    fat: 8,
    carbs: 2,
    icon: <Utensils className="inline-block w-4 h-4 mr-1" />,
  },
  {
    id: 2,
    meal: "午餐",
    food: "牛肉",
    amount: "100克",
    calories: 112,
    protein: 21,
    fat: 2,
    carbs: 1,
    icon: <Utensils className="inline-block w-4 h-4 mr-1" />,
  },
  {
    id: 3,
    meal: "晚餐",
    food: "鮭魚",
    amount: "100克",
    calories: 139,
    protein: 17,
    fat: 7,
    carbs: 0,
    icon: <Utensils className="inline-block w-4 h-4 mr-1" />,
  },
];

const FoodHistory = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Utensils className="mr-2" />
        食物攝取紀錄
      </h2>
      <div className="rounded-lg">
        {foodHistory.map((item) => (
          <FoodActivityCard
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodHistory;