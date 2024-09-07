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
import { courts, sports } from "@/data";
import Court from "./Court";
import CourtInfo from "./CourtInfo";

function ToggleList() {
  const {
    exercise,
    setExercise,
    isExpanded,
    setIsExpanded,
    isVisible,
    setIsVisible,
    isCourtInfoVisible,
    setIsCourtInfoVisible,
  } = useExercise();
  const [filteredCourts, setFilteredCourts] = useState(
    courts.filter((court) => court.sports.includes(exercise.split(" ")[1])),
  );

  const handleSelectExercise = (sport: string) => {
    setIsVisible(false);
    setIsExpanded(false);
    setIsCourtInfoVisible(false);
    setTimeout(() => {
      setExercise(sport);
      setFilteredCourts(
        courts.filter((court) => court.sports.includes(sport.split(" ")[1])),
      );
      setIsVisible(true);
    }, 200);
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
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
            <DropdownMenuContent className="w-72">
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
          "w-full fixed inset-x-0 transform transition-transform duration-300 ease-in-out z-50",
          isVisible ? "translate-y-0" : "translate-y-full",
          isExpanded ? "top-0 h-full" : "bottom-0 h-[13%]",
        )}
      >
        {isVisible && (
          <div
            className={cn(
              "flex flex-col gap-4 bg-gray-100 shadow-lg h-full ",
              !isExpanded && "justify-center rounded-t-xl",
            )}
          >
            <div
              className={cn(
                "flex flex-row justify-between items-center",
                isExpanded && "mt-5",
              )}
            >
              <p className="font-semibold text-zinc-950 text-4xl ml-2">
                {exercise}
              </p>
              <button className="border border-[#5ab4c5] text-[#5ab4c5] bg-transparent p-2 rounded-full text-sm">
                {filteredCourts.length} 筆結果
              </button>
              <button
                className="border border-[#5ab4c5] text-[#5ab4c5] bg-transparent p-2 mr-4"
                onClick={handleExpand}
              >
                {isExpanded ? "收回列表" : "展開列表"}
              </button>
            </div>

            {isExpanded && (
              <div className="flex flex-col p-4 gap-2 overflow-scroll">
                {filteredCourts.map((court) => (
                  <Court key={court.K} court={court} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={cn(
          "w-full fixed inset-x-0 transform transition-transform duration-500 ease-in-out bg-gray-100 rounded-lg z-50",
          isCourtInfoVisible
            ? "translate-y-0 bottom-0 h-[33%]"
            : "translate-y-full",
        )}
      >
        {isCourtInfoVisible && <CourtInfo />}
      </div>
    </>
  );
}

export default ToggleList;
