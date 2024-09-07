import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {Activity} from "lucide-react";
import {ActivityCard} from "@/components/ui/activityCard.tsx";

const activityHistory = [
  {
    id: 1,
    sport: "籃球",
    location: "大安運動中心",
    time: "1 hour",
  },
  {
    id: 2,
    sport: "跑步",
    location: "台北市立大學",
    time: "30 min",
  },
  {
    id: 3,
    sport: "游泳",
    location: "台北市立大學",
    time: "1 hour",
  },
];

const Journal = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mt-2 mb-1 text-left mx-2">最近活動</h2>
      <div className="rounded-lg">
        <Table>
          <TableBody>
            {activityHistory.map((activity) => (
                <ActivityCard
                    sport={activity.sport}
                    time={activity.time}
                    caloriesBurnt={450}
                />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Journal;
