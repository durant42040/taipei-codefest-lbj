import WeightTrackingPage from "@/components/journal/Weight.tsx";
import Home from "@/containers/home/main";
import ExerciseDetails from "@/containers/journal/SessionDetails.tsx";
import LoginPage from "@/containers/login/main";
import ExercisePage from "@/containers/exercise/main";
import FoodHistoryPage from "./containers/journal/FoodHistoryPage.tsx";
import JournalPage from "./containers/journal/JournalPage.tsx";
import { useEffect } from "react";
import { useExercise } from "@/contexts/useExercise.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        children: [
          { path: "/journal", Component: JournalPage },
          { path: "/exercise", Component: ExercisePage },
        ],
      },
    ],
  },
  {
    path: "/weight",
    Component: WeightTrackingPage,
  },
  {
    path: "/exerciseDetails/:id",
    Component: ExerciseDetails,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/foodHistory",
    Component: FoodHistoryPage,
  },
  {
    path: "/journalHistory",
    Component: JournalPage,
  },
]);

function App(): React.ReactNode {
  const { userData, setUserData } = useExercise();

  const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  useEffect(() => {
    if (userData.id === "") {
      client
        .get(`/user?id=7f3562f4-bb3f-4ec7-89b9-da3b4b5ff250`)
        .then((response) => {
          if (response.data.length) {
            setUserData(response.data[0]);
          } else {
            setUserData({
              ...userData,
              id: "7f3562f4-bb3f-4ec7-89b9-da3b4b5ff250",
              name: "金大森",
            });
          }
        });
    }
  }, [client, setUserData, userData]);

  return <RouterProvider router={router} />;
}

export default App;
