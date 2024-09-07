import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import scale from "@/assets/scale.svg";
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
import { useExercise } from "@/contexts/useExercise.tsx";

export const description = "A linear line chart";

type WeightType = {
  weight: string;
  month: string;
};

const chartConfig = {
  weight: {
    label: "weight",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Weight() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWeight, setNewWeight] = useState("");
  const [weights, setWeights] = useState<WeightType[]>([]);
  const { userData } = useExercise();

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWeight(event.target.value);
  };

  const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  const handleSubmitWeight = () => {
    // ensure weight is number
    if (isNaN(parseInt(newWeight)) || newWeight === "") {
      alert("請輸入數字");
      return;
    }
    console.log("New weight submitted:", newWeight); // Replace with actual update logic
    setIsDialogOpen(false);
    client
      .post("weight/", { weight: newWeight, userId: userData.id })
      .then((response) => {
        setNewWeight("");

        // remove the old weight if it exists
        const newWeights = weights.filter(
          (weight) => weight.month !== response.data.month
        );

        setWeights([
          ...newWeights,
          {
            weight: newWeight,
            month: response.data.month,
          },
        ]);
      });
  };

  useEffect(() => {
    if (userData.id && weights.length === 0) {
      client.get(`/weight?id=${userData.id}`).then((response) => {
        const { data: weights } = response;
        setWeights(weights);
      });
    }
  }, [client, userData]);

  return (
    <>
      <div className="flex justify-between items-center m-2">
        <div className="flex flex-row">
          <img src={scale} />
          <h2 className="text-xl ml-1 font-bold mt-3 mb-3 text-left">
            體重紀錄
          </h2>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="button-class">變更體重</button>
          </DialogTrigger>
          <DialogContent className="w-10/12 rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">更新體重</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Label htmlFor="newWeight" className="text-lg">
                新的體重
              </Label>
              <Input
                id="newWeight"
                type="number"
                value={newWeight}
                onChange={handleWeightChange}
                required
              />
            </div>
            <DialogFooter className="flex flex-row-reverse mt-1">
              <button
                onClick={handleSubmitWeight}
                className="w-20 text-[#5ab4c5] border-2 border-[#5ab4c5] bg-transparent font-semibold"
              >
                提交
              </button>
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
