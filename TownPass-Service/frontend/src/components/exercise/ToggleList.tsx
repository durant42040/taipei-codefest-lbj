import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useExercise } from "@/contexts/useExercise";
import { cn } from "@/lib/utils";
import { courts, sports } from "@/data";
import Court from "./Court";
import CourtInfo from "./CourtInfo";
import ExerciseRecommendationAssistant from "./RecommendAgent";

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
  const [isRecommendationModalOpen, setIsRecommendationModalOpen] = useState(false);

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

  const handleRecommendationClick = () => {
    setIsRecommendationModalOpen(true);
  };

  const handleSportRecommendation = (sportId: string) => {
    const recommendedSport = sports.find(sport => sport.id === parseInt(sportId));
    if (recommendedSport) {
      handleSelectExercise(recommendedSport.icon + " " + recommendedSport.name);
    }
    setIsRecommendationModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col mb-2">
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
          <button
            className="w-3/12 bg-gray-100 text-black p-1 text-base font-bold"
            onClick={handleRecommendationClick}
          >
            建議
          </button>
        </div>
      </div>
      {/* ... (rest of the component remains the same) ... */}
      
      {isRecommendationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <ExerciseRecommendationAssistant onSportClick={handleSportRecommendation} />
            <button
              className="mt-4 w-full bg-gray-200 text-black p-2 rounded"
              onClick={() => setIsRecommendationModalOpen(false)}
            >
              關閉
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ToggleList;