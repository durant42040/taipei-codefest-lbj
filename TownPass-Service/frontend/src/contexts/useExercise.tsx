import { createContext, ReactNode, useContext, useState } from "react";

export type ExerciseContextType = {
  exercise: string;
  setExercise: (exercise: string) => void;
};

export const ExerciseContext = createContext<ExerciseContextType>({
  exercise: "",
  setExercise: () => {},
});

type ExerciseProviderProps = {
  children: ReactNode;
};

export const ExerciseProvider = ({ children }: ExerciseProviderProps) => {
  const [exercise, setExercise] = useState("");
  const contextValue = { exercise, setExercise };

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
