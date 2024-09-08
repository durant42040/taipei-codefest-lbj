import { useEffect, useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { ActivityCard } from "@/components/ui/activityCard";
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
import type { ActivityType } from "@/shared/type";
import { useNavigate } from "react-router-dom";

const Journal = () => {
  const [activityHistory, setActivityHistory] = useState<ActivityType[]>([]);
  const navigate = useNavigate();
  const fakeActivity = {
    userId: "",
    calories: "",
    sport: "",
    duration: "",
    location: "",
  };
  const [newActivity, setNewActivity] = useState<ActivityType>(fakeActivity);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { userData } = useExercise();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity!, [name]: value });
  };

  const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  const handleSubmit = () => {
    client
      .post("/session", { ...newActivity, userId: userData.id })
      .then((response) => {
        setActivityHistory([response.data, ...activityHistory!]);
        setNewActivity(fakeActivity);
        setIsDialogOpen(false);
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
        <div className="flex flex-row gap-2">
          <button
            className="button-class"
            onClick={() => navigate("journalHistory")}
          >
            所有紀錄
          </button>
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
                    時長 (hr)
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
                    燃燒熱量 (kcal)
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
      </div>
      <div className="rounded-lg">
        <Table>
          <TableBody className="flex flex-col gap-1">
            {activityHistory.slice(0, 3).map((activity) => (
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
