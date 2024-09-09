import { FoodActivityCard } from "@/components/ui/foodCard";
import { useExercise } from "@/contexts/useExercise";
import axios from "axios";
import { useEffect, useState } from "react";
import type { FoodType } from "@/shared/type";

function FoodHistoryPage() {
  const { userData } = useExercise();
  const [foodHistory, setFoodHistory] = useState<FoodType[]>([]);
  const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  useEffect(() => {
    client.get(`food?user=${userData.id}`).then((response) => {
      const { data: sessions } = response;
      setFoodHistory(sessions);
    });
  }, [userData]);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold mt-2 ml-2">食物攝取紀錄</h1>
      {foodHistory.length > 0 && (
        <div className="flex flex-row gap-2 ml-2">
          <span className="text-red-500">紅色: 蛋白質</span> /
          <span className="text-yellow-500">黃色: 脂肪</span> /
          <span className="text-green-500">綠色: 碳水化合物</span>
        </div>
      )}
      <div className="rounded-lg flex flex-col gap-2">
        {foodHistory.map((food) => (
          <FoodActivityCard key={food.id} {...food} />
        ))}
      </div>
    </div>
  );
}

export default FoodHistoryPage;
