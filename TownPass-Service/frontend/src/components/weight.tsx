import React, {useEffect, useState} from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import axios from "axios";
import {useExercise} from "@/contexts/useExercise.tsx";

export const description = "A linear line chart";

const chartConfig = {
  weight: {
    label: "weight",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Weight() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWeight, setNewWeight] = useState("");
  const [ weights, setWeights ] = useState([]);
  const {userData} = useExercise();

  const handleWeightChange = (event) => {
    setNewWeight(event.target.value);
  };
  
  const client = axios.create({
      baseURL: "http://localhost:4000",
    });

  const handleSubmitWeight = () => {
    console.log("New weight submitted:", newWeight); // Replace with actual update logic
    setIsDialogOpen(false);
    client.post("weight/", { weight: newWeight, userId: userData.id }).then((response) => {
    setNewWeight("");
    
    // alert field of weights
    
    setWeights([...weights, {
      weight: newWeight,
        month: response.data.month,
    }]);
    
    });
  };
  
  useEffect(() => {
    if (userData.id && weights.length === 0) {
      client.get(`/weight?id=${userData.id}`).then((response) => {
        const {data: weights} = response;
        setWeights(weights);
      });
    }
  }, [client, userData]);

  return (
    <>
      <div className="flex justify-between items-center mx-2">
        <h2 className="text-xl font-bold mt-2 mb-3">體重紀錄</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>變更體重</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>更新體重</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label htmlFor="newWeight">新的體重</Label>
              <Input
                id="newWeight"
                type="number"
                value={newWeight}
                onChange={handleWeightChange}
                required
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSubmitWeight}>提交</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardDescription>6月 - 9月 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={weights}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="weight"
                type="linear"
                stroke="var(--color-weight)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            You are Obese
            <TrendingUp className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
