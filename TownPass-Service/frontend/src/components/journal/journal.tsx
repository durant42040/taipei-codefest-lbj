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
                <h2 className="text-xl font-bold mt-2 mb-1">最近活動</h2>
                
                {/* Button aligned to the right */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="my-4">新增活動</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>新增活動</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="sport">運動</Label>
                                <Input
                                    id="sport"
                                    name="sport"
                                    value={newActivity.sport}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">地點</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    value={newActivity.location}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">時長</Label>
                                <Input
                                    id="duration"
                                    name="duration"
                                    value={newActivity.duration}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="caloriesBurnt">燃燒熱量</Label>
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
                                新增
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
