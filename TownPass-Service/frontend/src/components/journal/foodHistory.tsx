import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { FoodActivityCard } from "@/components/ui/foodCard";
import { Utensils } from "lucide-react";
import { useExercise } from "@/contexts/useExercise";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { FoodType } from "@/shared/type";

const FoodJournal = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { userData } = useExercise();
  const [foodHistory, setFoodHistory] = useState<FoodType[]>([]);
  const fakeFood = {
    userId: "",
    calories: "",
    food: "",
    amount: "",
    protein: "",
    carbo: "",
    fat: "",
  };
  const [newFood, setNewFood] = useState(fakeFood);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFood({ ...newFood, [name]: value });
  };

  const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  const handleSubmit = () => {
    client
      .post("/food", { ...newFood, userId: userData.id })
      .then((response) => {
        setFoodHistory([response.data, ...foodHistory]);
        setNewFood(fakeFood);
        setIsDialogOpen(false);
      });
  };

  useEffect(() => {
    client.get(`food?user=${userData.id}`).then((response) => {
      const { data: sessions } = response;
      setFoodHistory(sessions);
    });
  }, [userData]);

  return (
    <div className="mb-8 mt-4">
      <div className="flex items-center justify-between mx-2 mt-4 mb-2">
        <h2 className="flex flex-row text-xl ml-1 font-bold mt-3 mb-3 text-left">
          <Utensils className="mr-2" />
          食物攝取紀錄
        </h2>
        <div className="flex flex-row gap-2">
          <button
            className="button-class"
            onClick={() => navigate("/foodHistory")}
          >
            所有紀錄
          </button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="button-class">新增食物</button>
            </DialogTrigger>
            <DialogContent className="w-10/12 rounded-xl">
              <DialogHeader>
                <DialogTitle className="text-2xl">新增食物</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <div className="space-y-0.5">
                  <Label htmlFor="food" className="text-lg">
                    食物
                  </Label>
                  <Input
                    id="food"
                    name="food"
                    value={newFood.food}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-0.5">
                  <Label htmlFor="amount" className="text-lg">
                    數量
                  </Label>
                  <Input
                    id="amount"
                    name="amount"
                    value={newFood.amount}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-0.5">
                  <Label htmlFor="calorie" className="text-lg">
                    熱量 (kcal)
                  </Label>
                  <Input
                    id="calorie"
                    name="calorie"
                    type="number"
                    value={newFood.calories}
                    onChange={(e) =>
                      setNewFood({ ...newFood, calories: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-0.5">
                  <Label htmlFor="protein" className="text-lg">
                    蛋白質 (g)
                  </Label>
                  <Input
                    id="protein"
                    name="protein"
                    type="number"
                    value={newFood.protein}
                    onChange={(e) =>
                      setNewFood({ ...newFood, protein: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-0.5">
                  <Label htmlFor="carbo" className="text-lg">
                    碳水 (g)
                  </Label>
                  <Input
                    id="carbo"
                    name="carbo"
                    type="number"
                    value={newFood.carbo}
                    onChange={(e) =>
                      setNewFood({ ...newFood, carbo: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-0.5">
                  <Label htmlFor="fat" className="text-lg">
                    脂肪 (g)
                  </Label>
                  <Input
                    id="fat"
                    name="fat"
                    type="number"
                    value={newFood.fat}
                    onChange={(e) =>
                      setNewFood({ ...newFood, fat: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <DialogFooter className="flex flex-row-reverse mt-1">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-20 text-[#5ab4c5] border-2 border-[#5ab4c5] bg-transparent font-semibold"
                >
                  新增
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {foodHistory.length > 0 && (
        <div className="flex flex-row gap-2 ml-2">
          <span className="text-red-500">紅色: 蛋白質</span> /
          <span className="text-yellow-500">黃色: 脂肪</span> /
          <span className="text-green-500">綠色: 碳水化合物</span>
        </div>
      )}
      <div className="rounded-lg flex flex-col gap-2">
        {foodHistory.slice(0, 3).map((food) => (
          <FoodActivityCard key={food.id} {...food} />
        ))}
      </div>
    </div>
  );
};

export default FoodJournal;
