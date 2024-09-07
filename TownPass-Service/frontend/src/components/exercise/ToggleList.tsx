import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useExercise } from "@/contexts/useExercise";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { courts, sports }from "@/data";

function ToggleList() {
  const { exercise, setExercise } = useExercise();
  const [isVisible, setIsVisible] = useState(false);
  const [filteredCourts, setFilteredCourts] = useState(courts);
  const handleSelectExercise = (sport: string) => {
    setIsVisible(false);
    setTimeout(() => {
      setExercise(sport);
      setFilteredCourts(courts.filter((court) => court.sports.includes(sport.split(" ")[1])));
      setIsVisible(true);
    }, 200);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="w-full flex flex-row gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full flex flex-row justify-between text-xl items-center">
              {exercise || "運動一覽"}
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
              {sports.map((sport, index) => (
                <DropdownMenuItem
                  key={index}
                  className="text-xl hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    handleSelectExercise(sport.icon + " " + sport.name)
                  }
                >
                  {sport.icon} {sport.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="w-3/12 bg-gray-100 text-black p-1 text-base font-bold">
            建議
          </button>
        </div>
      </div>
      <div
        className={cn(
          "w-full fixed inset-x-0 bottom-0 transform transition-transform duration-300 ease-in-out h-[13%]",
          isVisible ? "translate-y-0" : "translate-y-full",
        )}
      >
        {isVisible && (
          <div className="flex flex-col gap-4 bg-gray-100 shadow-lg h-full rounded-t-xl justify-center">
            <div className="flex flex-row justify-between">
              <p className="font-semibold text-zinc-950 text-4xl ml-2">
                {exercise}
              </p>
              <button className="border border-[#5ab4c5] text-[#5ab4c5] bg-transparent p-2 rounded-full text-sm">{filteredCourts.length}筆結果</button>
              <button className="border border-[#5ab4c5] text-[#5ab4c5] bg-transparent p-2 mr-4">展開列表</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ToggleList;
