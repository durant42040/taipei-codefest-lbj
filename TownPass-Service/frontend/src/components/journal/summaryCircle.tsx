import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { Target } from "lucide-react";

const SummaryCircle = ({
  title,
  intake,
  burned,
  time,
}: {
  title: string;
  intake: number;
  burned: number;
  time: number;
}) => {
  return (
    <>
      <div className="flex items-center justify-between mx-2">
        <h2 className="text-xl font-bold mb-1 flex items-center">
          <Target className="mr-2" />
          {title}
        </h2>
      </div>
      <Card className="custom-card">
        <CardContent className="flex gap-4 p-4">
          <div className="grid items-center gap-2">
            <div className="grid flex-1 auto-rows-min gap-0.5">
              {typeof intake === "number" ? (
                <>
                  <div className="text-sm text-muted-foreground text-left">
                    攝取熱量
                  </div>
                  <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                    {intake}
                    <span className="text-sm font-normal text-muted-foreground">
                      kcal
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-sm text-muted-foreground text-left">
                    地點
                  </div>
                  <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                    {intake}
                  </div>
                </>
              )}
            </div>
            <div className="grid flex-1 auto-rows-min gap-0.5">
              <div className="text-sm text-muted-foreground text-left">
                燃燒熱量
              </div>
              <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                {burned}
                <span className="text-sm font-normal text-muted-foreground">
                  kcal
                </span>
              </div>
            </div>
            <div className="grid flex-1 auto-rows-min gap-0.5">
              <div className="text-sm text-muted-foreground text-left">
                時長
              </div>
              <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                {time}
                <span className="text-sm font-normal text-muted-foreground">
                  min
                </span>
              </div>
            </div>
          </div>
          <ChartContainer
            config={{
              move: {
                label: "Move",
                color: "hsl(var(--chart-1))",
              },
              exercise: {
                label: "Exercise",
                color: "hsl(var(--chart-2))",
              },
              stand: {
                label: "Stand",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="mx-auto aspect-square w-full max-w-[80%]"
          >
            <RadialBarChart
              margin={{
                left: -10,
                right: -10,
                top: -10,
                bottom: -10,
              }}
              data={[
                {
                  activity: "intake",
                  value: (intake / 2000) * 100,
                  fill: "var(--color-stand)",
                },
                {
                  activity: "burned",
                  value: (burned / 1000) * 100,
                  fill: "var(--color-exercise)",
                },
                {
                  activity: "move",
                  value: (time / 120) * 100,
                  fill: "var(--color-move)",
                },
              ]}
              innerRadius="20%"
              barSize={24}
              startAngle={90}
              endAngle={450}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                dataKey="value"
                tick={false}
              />
              <RadialBar dataKey="value" background cornerRadius={5} />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default SummaryCircle;
