import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { FoodActivityCard } from "@/components/ui/foodCard";
import { Utensils } from "lucide-react";
import { useExercise } from "@/contexts/useExercise";
import axios from "axios";

const FoodJournal = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { userData } = useExercise();
  // const { foodHistory, addFoodEntry } = useFood();
  const [foodHistory, setFoodHistory] = useState([]);
  const [newFood, setNewFood] = useState({
    food: "",
    amount: "",
    calories: 0,
    protein: 0,
    carbo: 0,
    fat: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFood({ ...newFood, [name]: value });
  };

  const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  // const handleSubmit = () => {
  //   addFoodEntry(newFood);
  //   setNewFood({ food: "", calories: 0, userId:"0" }); // Reset form
  //   setIsDialogOpen(false); // Close dialog
  // };
  const handleSubmit = () => {
    // Add the new activity with a unique id
    client
      .post("/food", { ...newFood, userId: userData.id })
      .then((response) => {
        setFoodHistory([...foodHistory, response.data]);
        setNewFood({
          food: "",
          amount: "",
          calories: 0,
          protein: 0,
          carbo: 0,
          fat: 0,
        }); // Reset the form
        setIsDialogOpen(false); // Close the dialog after successful submission
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
      <div className="flex items-center justify-between mx-2">
        <h2 className="text-xl font-bold flex items-center">
          <Utensils className="mr-2" />
          食物攝取紀錄
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="button-class">新增食物</button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新增食物</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="food">食物</Label>
                <Input
                  id="food"
                  name="food"
                  value={newFood.food}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">數量</Label>
                <Input
                  id="amount"
                  name="amount"
                  value={newFood.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="calorie">熱量</Label>
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
              <div className="space-y-2">
                <Label htmlFor="protein">蛋白質</Label>
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
              <div className="space-y-2">
                <Label htmlFor="carbo">碳水</Label>
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
              <div className="space-y-2">
                <Label htmlFor="fat">脂肪</Label>
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
            <DialogFooter>
              <Button type="button" onClick={handleSubmit}>
                新增
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-lg">
        {foodHistory.map((food) => (
          <FoodActivityCard key={food.id} {...food} />
        ))}
      </div>
    </div>
  );
};

export default FoodJournal;
