import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import WeightTrackingPage from "./components/weight" // Import your weight page
import Home from "@/containers/home/main" // Import the main.tsx (journal stuff) as Home component
import ExerciseDetails from "./containers/exerciseLog/main"
import LoginPage from "@/containers/loginPage/main"
import {useEffect, useState} from "react";
import {useConnectionMessage} from "@/composables/useConnectionMessage.ts";
import {useHandleConnectionData} from "@/composables/useHandleConnectionData.ts";
import axios from "axios";
import {useExercise} from "@/contexts/useExercise.tsx";

function App() {
  const {userData, setUserData} = useExercise();
  
  const client = axios.create({
    baseURL: "http://localhost:4000",
  });
  
  const handleUserInfo = (event: { data: string }) => {
    const result: { name: string; data: any } = JSON.parse(event.data);
    setUserData({...userData, id: result.data.id, name: result.data.realName});
    // alert(`name: ${result.data.name}, age: ${result.data.age}`);
  };
  
  useEffect(() => {
    useConnectionMessage("userinfo", null);
    useHandleConnectionData(handleUserInfo);
  }, []);
  
  useEffect(() => {
    if (userData.id !== "" && userData.age === "") {
      const id = userData.id;
      console.log(id);
      client.get(`/user?id=${id}`).then((response) => {
        if(response.data){
          setUserData(response.data);
        }
      });
    }
  }, [client, userData, setUserData]);
  
  
  return (
    <Router>
      <div>
        {/* React Router Routes */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page (Journal stuff from main.tsx) */}
          <Route path="/weight" element={<WeightTrackingPage />} /> {/* Routing to weight.tsx */}
          <Route path="/exerciseDetails/:id" element={<ExerciseDetails />} />
          <Route path="/LoginPage" element={<LoginPage/>} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
