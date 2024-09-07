import { useEffect, useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { ActivityCard } from "@/components/ui/activityCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useExercise } from "@/contexts/useExercise.tsx";
import { Dumbbell } from "lucide-react";

type ActivityType = {
  id: number;
  userId: string;
  calories: string;
  sport: string;
  duration: string;
  location: string;
};

const Journal = () => {
  const [activityHistory, setActivityHistory] = useState<ActivityType[]>([]);
  const fakeActivity = {
    id: 0,
    userId: "",
    calories: "",
    sport: "",
    duration: "",
    location: "",
  };
  const [newActivity, setNewActivity] = useState<ActivityType>(fakeActivity);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog open state
  const { userData } = useExercise();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity!, [name]: value });
  };

  const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  const handleSubmit = () => {
    // Add the new activity with a unique id
    client
      .post("/session", { ...newActivity, userId: userData.id })
      .then((response) => {
        setActivityHistory([...activityHistory!, response.data]);
        setNewActivity(fakeActivity); // Reset the form
        setIsDialogOpen(false); // Close the dialog after successful submission
      });
  };

  useEffect(() => {
    client.get(`session?user=${userData.id}`).then((response) => {
      const { data: sessions } = response;
      setActivityHistory(sessions);
    });
  }, [userData]);

  return (
    <div>
      <div className="flex items-center justify-between mx-2 mt-4 mb-2">
        <h2 className="text-xl font-bold mb-1 flex items-center">
          <Dumbbell className="mr-2" />
          最近活動
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="button-class">新增活動</button>
          </DialogTrigger>
          <DialogContent className="w-10/12 rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">新增活動</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <div className="space-y-0.5">
                <Label htmlFor="sport" className="text-lg">
                  運動
                </Label>
                <Input
                  id="sport"
                  name="sport"
                  value={newActivity.sport}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="location" className="text-lg">
                  地點
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={newActivity.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="time" className="text-lg">
                  時長
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  value={newActivity.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="caloriesBurnt" className="text-lg">
                  燃燒熱量
                </Label>
                <Input
                  id="calories"
                  name="calories"
                  type="number"
                  value={newActivity.calories}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <DialogFooter className="flex flex-row-reverse mt-1">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-20 text-[#5ab4c5] border-2 border-[#5ab4c5] bg-transparent font-semibold"
              >
                新增
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-lg">
        <Table>
          <TableBody>
            {activityHistory.map((activity) => (
              <ActivityCard
                key={activity.id}
                id={activity.id}
                sport={activity.sport}
                time={activity.duration}
                caloriesBurnt={activity.calories}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Journal;
