import {useEffect, useState} from 'react';
import {Table, TableBody} from "@/components/ui/table";
import {ActivityCard} from "@/components/ui/activityCard";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import axios from "axios";
import {useExercise} from "@/contexts/useExercise.tsx";

const Journal = () => {
    const [activityHistory, setActivityHistory] = useState([]);
    const [newActivity, setNewActivity] = useState({
        sport: '',
        location: '',
        duration: '',
        calories: 0,
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog open state
    const {userData} = useExercise();
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewActivity({...newActivity, [name]: value});
    };
    
    const client = axios.create({
        baseURL: "http://localhost:4000",
    });
    
    const handleSubmit = () => {
        // Add the new activity with a unique id
        client.post("session/", {...newActivity, userId: userData.id}).then(
            (response) => {
                setActivityHistory([
                    ...activityHistory,
                    response.data,
                ]);
                setNewActivity({sport: '', location: '', duration: '', calories: 0}); // Reset the form
                setIsDialogOpen(false); // Close the dialog after successful submission
            }
        );
    };
    
    useEffect(() => {
        client.get(`session?user=${userData.id}`).then((response) => {
            const {data: sessions} = response;
            setActivityHistory(sessions);
        });
    }, [userData]);
    
    return (
        <div>
            {/* Flex container to align title and button */}
            <div className="flex items-center justify-between mx-2">
                <h2 className="text-xl font-bold mt-2 mb-1">Recent Activities</h2>
                
                {/* Button aligned to the right */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                                    id="duration"
                                    name="duration"
                                    value={newActivity.duration}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="caloriesBurnt">Calories Burnt</Label>
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
