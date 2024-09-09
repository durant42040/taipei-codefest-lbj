import WeightTrackingPage from "@/components/journal/Weight.tsx";
import Home from "@/containers/home/main";
import ExerciseDetails from "@/containers/journal/SessionDetails.tsx";
import LoginPage from "@/containers/login/main";
import ExercisePage from "@/containers/exercise/main";
import FoodHistoryPage from "./containers/journal/FoodHistoryPage.tsx";
import JournalPage from "./containers/journal/JournalPage.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

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
  return <RouterProvider router={router} />;
}

export default App;
