import axios from "axios";
import journalLogo from "@/assets/notebook-text.svg";
import mapLogo from "@/assets/map-pinned.svg";
import "@/App.css";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Weight from "@/components/weight";
import Journal from "@/components/journal/journal";
import FoodHistory from "@/components/journal/foodHistory";
import { useExercise } from "@/contexts/useExercise.tsx";
import { useNavigate } from "react-router-dom";
import ExercisePage from "@/containers/exercise/main";
import { useEffect, useState } from "react";

import SummaryCircle from "@/components/journal/summaryCircle";
import { NavLink, useLocation } from "react-router-dom";

const tabs = [
  {
    title: "運動紀錄",
    path: "/journal",
    icon: journalLogo,
    alt: "Journal",
    value: "journal",
  },
  {
    title: "我要運動",
    path: "/exercise",
    icon: mapLogo,
    alt: "Exercise",
    value: "exercise",
  },
];

function Home() {
  const { userData } = useExercise();
  const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [today, setToday] = useState({
    burned: -1,
    intake: -1,
    time: -1,
  });

  const getTabValueFromPath = (path: string) => {
    if (path === "/journal") return "journal";
    if (path === "/exercise") return "exercise";
    return "journal"; // default tab
  };

  useEffect(() => {
    if (userData.name !== "" && userData.age === "") {
      navigate("/LoginPage");
    }
  }, [navigate, userData]);

  const handleTabChange = (value: string) => {
    const tab = tabs.find((tab) => tab.value === value);
    if (tab) {
      navigate(tab.path);
    }
  };

  useEffect(() => {
    if (userData.id && today.burned === -1) {
      client.get(`/today?id=${userData.id}`).then((response) => {
        const { data: todayData } = response;
        setToday(todayData);
      });
    }
  }, [client, userData]);

  return (
    <div>
      <Tabs
        value={getTabValueFromPath(location.pathname)}
        onValueChange={handleTabChange}
        className="text-black bg-white rounded-lg"
      >
        <TabsList className="grid grid-cols-2 rounded-lg mb-3">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.title}
              value={tab.value}
              className="flex items-center cursor-pointer rounded-tl-lg rounded-r-none font-semibold text-xl"
            >
              <img src={tab.icon} alt={tab.alt} className="mx-1" />
              <NavLink to={tab.path}>{tab.title}</NavLink>
            </TabsTrigger>
          ))}
        </TabsList>
        {location.pathname === "/journal" && (
          <>
            <SummaryCircle
              title="今日總覽"
              burned={today.burned}
              intake={today.intake}
              time={today.time}
            />
            <Weight />
            <Journal />
            <FoodHistory />
          </>
        )}
        {location.pathname === "/exercise" && <ExercisePage />}
      </Tabs>
    </div>
  );
}

export default Home;
