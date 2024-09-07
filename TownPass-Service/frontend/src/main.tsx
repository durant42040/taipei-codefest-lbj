import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";
import { ExerciseProvider } from "./contexts/useExercise.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ExerciseProvider>
      <App />
    </ExerciseProvider>
  </StrictMode>,
);
