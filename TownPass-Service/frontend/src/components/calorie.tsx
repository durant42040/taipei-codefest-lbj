import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const calorieData = {
  totalCalories: 1500, // Example total calories consumed today
  foods: [
    { name: "Apple", calories: 95 },
    { name: "Chicken Breast", calories: 300 },
    { name: "Rice", calories: 250 },
    { name: "Protein Shake", calories: 200 },
  ],
};

export default function Calorie() {
  const [totalCalories, setTotalCalories] = useState(0);
  const [foods, setFoods] = useState([]);

  // useEffect(() => {
  //   // Fetch or set the calorie data here
  //   setTotalCalories(calorieData.totalCalories)
  //   setFoods(calorieData.foods)
  // }, [])

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left: Big Calorie Number */}
      <div className="flex-1 lg:w-1/3">
        <Card className="p-4 text-center">
          <CardHeader>
            <CardTitle className="text-4xl font-bold">
              Calories Consumed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-6xl font-extrabold text-green-600">
              {totalCalories}
            </div>
            <CardDescription className="text-xl mt-2">
              Today's total calorie intake
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Right: List of Foods */}
      {/* <div className="flex-1 lg:w-2/3">
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Food Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {foods.map((food, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">{food.name}</span>
                  <span className="font-medium text-gray-600">{food.calories} kcal</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}
