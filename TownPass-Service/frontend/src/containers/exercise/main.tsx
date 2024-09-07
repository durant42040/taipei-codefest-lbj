import ExerciseMap from "@/components/exercise/ExerciseMap";
import ToggleList from "@/components/exercise/ToggleList";

function main() {
  return (
    <div className="flex flex-col gap-2">
      <ToggleList />
      <ExerciseMap />
    </div>
  );
}

export default main;
