import React from "react";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

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
      <h2 className="text-xl font-bold my-2 text-left mx-2">最近活動</h2>
      <div className="rounded-lg border-2">
        <Table>
          <TableBody>
            {activityHistory.map((activity) => (
              <TableRow key={activity.id} className="my-2">
                <TableCell>{activity.sport}</TableCell>
                <TableCell>{activity.location}</TableCell>
                <TableCell>{activity.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Journal;
