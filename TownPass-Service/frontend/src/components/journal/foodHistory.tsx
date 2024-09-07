import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { useFood } from "@/contexts/useFood";
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
    calories: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFood({ ...newFood, [name]: value });
  };

  const client = axios.create({
    baseURL: "http://localhost:4000",
  });

  // const handleSubmit = () => {
  //   addFoodEntry(newFood);
  //   setNewFood({ food: "", calories: 0, userId:"0" }); // Reset form
  //   setIsDialogOpen(false); // Close dialog
  // };
  const handleSubmit = () => {
    // Add the new activity with a unique id
    client
      .post("food/", { ...newFood, userId: userData.id})
      .then((response) => {
        setFoodHistory([...foodHistory, response.data]);
        setNewFood({ food:"", calories: 0 }); // Reset the form
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
    <div>
      <div className="flex items-center justify-between mx-2">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Utensils className="mr-2" />
          食物攝取紀錄
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="my-4">新增食物</Button>
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
                <Label htmlFor="calorie">熱量</Label>
                <Input
                  id="calorie"
                  name="calorie"
                  value={newFood.calories}
                  onChange={handleInputChange}
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
        {foodHistory.map(food => (
          <FoodActivityCard key={food.id} {...food} />
        ))}
      </div>
    </div>
  );
};

export default FoodJournal;
