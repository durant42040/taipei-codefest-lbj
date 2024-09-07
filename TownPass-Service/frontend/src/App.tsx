import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import WeightTrackingPage from "./components/weight" // Import your weight page
import Home from "@/containers/journal/main" // Import the main.tsx (journal stuff) as Home component

function App() {
  return (
    <Router>
      <div>
        {/* React Router Routes */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page (Journal stuff from main.tsx) */}
          <Route path="/weight" element={<WeightTrackingPage />} /> {/* Routing to weight.tsx */}
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
