import Weight from "@/components/weight";
import Journal from "@/components/journal/journal";
import SummaryCircle from "@/components/journal/summaryCircle";
import FoodHistory from "@/components/journal/foodHistory";

function main() {
  return (
    <div>
      <Weight />
      <Journal />
      <SummaryCircle title="今日總覽" burned={600} intake={1000} time={105} />
      <FoodHistory />
    </div>
  );
}

export default main;
