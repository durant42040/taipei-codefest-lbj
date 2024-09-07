import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import WeightTrackingPage from "./components/weight" // Import your weight page
import Home from "@/containers/home/main" // Import the main.tsx (journal stuff) as Home component
import ExerciseDetails from "./containers/exerciseLog/main"
import LoginPage from "@/containers/loginPage/main"


function App() {
  return (
    <Router>
      <div>
        {/* React Router Routes */}
        <Routes>

          <Route path="/" element={<Home />} /> {/* Home page (Journal stuff from main.tsx) */}
          <Route path="/weight" element={<WeightTrackingPage />} /> {/* Routing to weight.tsx */}
          <Route path="/exerciseDetails/:id" element={<ExerciseDetails />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
