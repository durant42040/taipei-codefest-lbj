import { courts } from "@/data";
import { CourtType } from "@/shared/type";
import { createContext, ReactNode, useContext, useState } from "react";

export type ExerciseContextType = {
  exercise: string;
  selectedCourt: CourtType | null;
  isExpanded: boolean;
  isVisible: boolean;
  isCourtInfoVisible: boolean;
  setExercise: (exercise: string) => void;
  setIsExpanded: (isExpanded: boolean) => void;
  setIsVisible: (isVisible: boolean) => void;
  setSelectedCourt: (selectedCourt: CourtType) => void;
  setIsCourtInfoVisible: (isCourtInfoVisible: boolean) => void;
  userData: {
    id: string;
    age: string;
    name: string;
    weight: string;
    height: string;
    gender: string;
  };
  setUserData: (userData: {
    id: string;
    name: string;
    age: string;
    weight: string;
    height: string;
    gender: string;
  }) => void;
  filteredCourts: CourtType[];
  setFilteredCourts: (courts: CourtType[]) => void;
  viewState: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  setViewState: (viewState: {
    latitude: number;
    longitude: number;
    zoom: number;
  }) => void;
  showBicycleKML: boolean;
  setShowBicycleKML: (showBicycleKML: boolean) => void;
  focusSingle: boolean;
  setFocusSingle: (focusSingle: boolean) => void;
  userLocation: {
    latitude: number;
    longitude: number;
  };
  setUserLocation: (userLocation: {
    latitude: number;
    longitude: number;
  }) => void;
};

export const ExerciseContext = createContext<ExerciseContextType>({
  exercise: "",
  selectedCourt: null,
  isExpanded: false,
  isVisible: false,
  isCourtInfoVisible: false,
  setExercise: () => {},
  setIsExpanded: () => {},
  setIsVisible: () => {},
  setSelectedCourt: () => {},
  setIsCourtInfoVisible: () => {},
  userData: {
    id: "",
    age: "",
    weight: "",
    height: "",
    name: "",
    gender: "",
  },
  setUserData: () => {},
  filteredCourts: [] as CourtType[],
  setFilteredCourts: () => {},
  viewState: {
    latitude: 0,
    longitude: 0,
    zoom: 0,
  },
  setViewState: () => {},
  showBicycleKML: false,
  setShowBicycleKML: () => {},
  focusSingle: false,
  setFocusSingle: () => {},
  userLocation: {
    latitude: 25.021639,
    longitude: 121.535083,
  },
  setUserLocation: () => {},
});

type ExerciseProviderProps = {
  children: ReactNode;
};

export const ExerciseProvider = ({ children }: ExerciseProviderProps) => {
  const [exercise, setExercise] = useState("");
  const [selectedCourt, setSelectedCourt] = useState<CourtType | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isCourtInfoVisible, setIsCourtInfoVisible] = useState(false);
  const [userData, setUserData] = useState({
    id: "",
    age: "",
    weight: "",
    name: "",
    height: "",
    gender: "",
  });
  const [filteredCourts, setFilteredCourts] = useState(
    courts.filter((court) => court.sports.includes(exercise.split(" ")[1])),
  );
  const [viewState, setViewState] = useState({
    latitude: 25.021639,
    longitude: 121.535083,
    zoom: 15,
  });
  const [showBicycleKML, setShowBicycleKML] = useState(false);
  const [focusSingle, setFocusSingle] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: 25.021639,
    longitude: 121.535083,
  });

  const contextValue = {
    exercise,
    selectedCourt,
    isExpanded,
    isVisible,
    isCourtInfoVisible,
    userData,
    filteredCourts,
    setExercise,
    setIsExpanded,
    setIsVisible,
    setSelectedCourt,
    setIsCourtInfoVisible,
    setUserData,
    setFilteredCourts,
    viewState,
    setViewState,
    showBicycleKML,
    setShowBicycleKML,
    focusSingle,
    setFocusSingle,
    userLocation,
    setUserLocation,
  };

  return (
    <ExerciseContext.Provider value={contextValue}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercise = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error("useExercise must be used within a ExerciseProvider");
  }
  return context;
};
