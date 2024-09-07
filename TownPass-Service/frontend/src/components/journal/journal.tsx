import { useState } from 'react';
import { Table, TableBody } from "@/components/ui/table";
import { ActivityCard } from "@/components/ui/activityCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const activityHistoryInitial = [
  {
    id: 1,
    sport: "籃球",
    location: "大安運動中心",
    time: "1 hour",
    caloriesBurnt: 450,
  },
  {
    id: 2,
    sport: "跑步",
    location: "台北市立大學",
    time: "30 min",
    caloriesBurnt: 200,
  },
  {
    id: 3,
    sport: "游泳",
    location: "台北市立大學",
    time: "1 hour",
    caloriesBurnt: 600,
  },
];
 
const Journal = () => {
  const [activityHistory, setActivityHistory] = useState(activityHistoryInitial);
  const [newActivity, setNewActivity] = useState({
    id: 0,
    sport: '',
    location: '',
    time: '',
    caloriesBurnt: 0,
  });
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };
 
  const handleSubmit = () => {
    // Add the new activity with a unique id
    setActivityHistory([
      ...activityHistory,
      { ...newActivity, id: activityHistory.length + 1 },
    ]);
    setNewActivity({ id: 0, sport: '', location: '', time: '', caloriesBurnt: 0 }); // Reset the form
  };

  return (
    <div>
      {/* Flex container to align title and button */}
      <div className="flex items-center justify-between mx-2">
        <h2 className="text-xl font-bold mt-2 mb-1">最近活動</h2>

        {/* Button aligned to the right */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="my-4">Add Activity</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Activity</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sport">Sport</Label>
                <Input
                  id="sport"
                  name="sport"
                  value={newActivity.sport}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={newActivity.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time (e.g., 1 hour, 30 min)</Label>
                <Input
                  id="time"
                  name="time"
                  value={newActivity.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="caloriesBurnt">Calories Burnt</Label>
                <Input
                  id="caloriesBurnt"
                  name="caloriesBurnt"
                  type="number"
                  value={newActivity.caloriesBurnt}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                Add Activity
              </Button>
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
                time={activity.time}
                caloriesBurnt={activity.caloriesBurnt}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
 
export default Journal;
 