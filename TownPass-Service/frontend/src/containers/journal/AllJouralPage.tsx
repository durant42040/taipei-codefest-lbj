import axios from "axios";
import { useExercise } from "@/contexts/useExercise.tsx";
import { useEffect, useState } from "react";
import type { ActivityType } from "@/shared/type";
import { Table, TableBody } from "@/components/ui/table";
import { ActivityCard } from "@/components/ui/activityCard";

function AllJouralPage() {
  const [activityHistory, setActivityHistory] = useState<ActivityType[]>([]);
  const { userData } = useExercise();
  const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });
  useEffect(() => {
    client.get(`session?user=${userData.id}`).then((response) => {
      const { data: sessions } = response;
      setActivityHistory(sessions);
    });
  }, [userData]);
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold mt-2 ml-2">活動紀錄</h1>
      <div className="rounded-lg">
        <Table>
          <TableBody className="flex flex-col gap-1">
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
}

export default AllJouralPage;
