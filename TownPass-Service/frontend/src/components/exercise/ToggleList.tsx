import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useExercise } from "@/contexts/useExercise";

const sports = [
  {
    id: 1,
    name: "籃球",
    location: "大安運動中心",
    icon: "🏀",
  },
  {
    id: 2,
    name: "跑步",
    location: "台北市立大學",
    icon: "🏃",
  },
  {
    id: 3,
    name: "游泳",
    location: "台北市立大學",
    icon: "🏊",
  },
  {
    id: 4,
    name: "健身",
    location: "台北市立大學",
    icon: "🏋️",
  },
  {
    id: 5,
    name: "瑜珈",
    location: "台北市立大學",
    icon: "🧘",
  }, 
  {
    
  }
];

function ToggleList() {
  const { exercise, setExercise } = useExercise();
  return (
    <div className="w-full flex flex-row gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full flex flex-row justify-between text-lg items-center">
          {exercise || "運動一覽"}
          <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          {sports.map((sport) => (
            <DropdownMenuItem className="text-lg hover:bg-gray-100 cursor-pointer" onClick={() => setExercise(sport.icon + " " + sport.name)}>
              {sport.icon} {sport.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <button className="w-3/12 bg-gray-100 text-black p-1 text-base font-bold">
        建議
      </button>
    </div>
  );
}

export default ToggleList;
