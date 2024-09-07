import { useExercise } from "@/contexts/useExercise";
import { MapPin } from "lucide-react";
import { Badge } from "../ui/badge";

function CourtInfo() {
  const { selectedCourt, setIsExpanded, setIsCourtInfoVisible, setIsVisible } =
    useExercise();

  const handleReturn = () => {
    setIsExpanded(true);
    setIsVisible(true);
    setIsCourtInfoVisible(false);
  };

  return (
    <div className="flex flex-col gap-2 mt-2 ml-2">
      <div className="flex flex-row">
        <p className="font-semibold text-zinc-950 text-4xl mt-2">
          {selectedCourt?.name.length! > 11 ? selectedCourt?.name.slice(0, 10) + "..." : selectedCourt?.name}
        </p>
      </div>
      <div>
        <div className="flex flex-row gap-2">
          {selectedCourt?.sports.map((sport) => {
            return (
              <Badge
                variant="outline"
                className="text-lg text-[#5ab4c5] border-[#5ab4c5] px-1.5"
              >
                #{sport}
              </Badge>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row items-center gap-0.5">
        <MapPin size={20} />
        <p className="text-xl font-semibold">{selectedCourt?.location.length! > 18 ? selectedCourt?.location.slice(0, 17) + "..." : selectedCourt?.location}</p>
      </div>
      <div className="flex flex-row gap-3">
        <p className="text-lg font-semibold">距離: 0.97公里</p>
        <p className="text-lg font-semibold">時間: {selectedCourt?.time}</p>
      </div>
      <div className="flex flex-row bottom-0 fixed right-0 mr-4 mb-4 gap-2">
        <button
          className="bg-[#5ab4c5] text-white p-2 rounded-lg w-16"
          onClick={handleReturn}
        >
          返回
        </button>
        <button className="bg-[#5ab4c5] text-white p-2 rounded-lg w-16">
          <a
            href={`https://vbs.sports.taipei/venues/?K=${selectedCourt?.K}`}
            className="text-white"
          >
            更多
          </a>
        </button>
      </div>
    </div>
  );
}

export default CourtInfo;
