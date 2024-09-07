import { createContext, ReactNode, useContext, useState } from "react";

export type ExerciseContextType = {
  exercise: string;
  setExercise: (exercise: string) => void;
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
  setExercise: () => {},
    userData: {
        id: '',
        age: '',
        weight: '',
        height: '',
        name: '',
       gender: '',
    },
    setUserData: () => {},
});

type ExerciseProviderProps = {
  children: ReactNode;
};

export const ExerciseProvider = ({ children }: ExerciseProviderProps) => {
  const [exercise, setExercise] = useState("");
  const [userData, setUserData] = useState({
    id: '',
    age: '',
    weight: '',
    name: '',
    height: '',
    gender: '',
  })
  
  const contextValue = { exercise, setExercise, userData, setUserData };

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
