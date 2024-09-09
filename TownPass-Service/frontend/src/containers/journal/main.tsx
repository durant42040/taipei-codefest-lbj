import Weight from "@/components/journal/Weight.tsx";
import Session from "@/components/journal/Session.tsx";
import SummaryCircle from "@/components/journal/SummaryCircle.tsx";
import FoodHistory from "@/components/journal/FoodHistory.tsx";

function main() {
  return (
    <div>
      <Weight />
      <Session />
      <SummaryCircle title="今日總覽" burned={600} intake={1000} time={105} />
      <FoodHistory />
    </div>
  );
}

export default main;
