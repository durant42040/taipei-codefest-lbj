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
  
  const contextValue = {
    exercise,
    selectedCourt,
    isExpanded,
    isVisible,
    isCourtInfoVisible,
    userData,
    setExercise,
    setIsExpanded,
    setIsVisible,
    setSelectedCourt,
    setIsCourtInfoVisible,
    setUserData,
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
