import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WeightTrackingPage from "./components/weight"; // Import your weight page
import Home from "@/containers/home/main"; // Import the main.tsx (journal stuff) as Home component
import ExerciseDetails from "./containers/exerciseLog/main";
import LoginPage from "@/containers/loginPage/main";
import { useEffect } from "react";
import { useConnectionMessage } from "@/composables/useConnectionMessage.ts";
import { useHandleConnectionData } from "@/composables/useHandleConnectionData.ts";
import axios from "axios";
import { useExercise } from "@/contexts/useExercise.tsx";
import JournalPage from "@/containers/journal/main";
import ExercisePage from "@/containers/exercise/main";

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
    path: "/LoginPage",
    Component: LoginPage,
  },
]);

function App(): React.ReactNode {
  const { userData, setUserData } = useExercise();

  const client = axios.create({
    baseURL: "http://localhost:4000",
  });

  const handleUserInfo = (event: { data: string }) => {
    const result: { name: string; data: any } = JSON.parse(event.data);
    if (userData.name === "") {
      client.get(`/user?id=${result.data.id}`).then((response) => {
        if (response.data.length) {
          setUserData(response.data[0]);
        } else {
          setUserData({
            ...userData,
            id: result.data.id,
            name: result.data.realName,
          });
        }
      });
    }
    // alert(`name: ${result.data.name}, age: ${result.data.age}`);
  };

  useEffect(() => {
    useConnectionMessage("userinfo", null);
    useHandleConnectionData(handleUserInfo);
  }, []);

  // useEffect(() => {
  //   if (userData.id !== "" && userData.age === "") {
  //     const id = userData.id;
  //     console.log(id);
  //     client.get(`/user?id=${id}`).then((response) => {
  //       if(response.data){
  //         setUserData(response.data[0]);
  //       }
  //     });
  //   }
  // }, [client, userData, setUserData]);

  return <RouterProvider router={router} />;
}

export default App;
