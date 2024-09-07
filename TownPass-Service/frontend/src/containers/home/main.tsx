import axios from "axios";
import journalLogo from "@/assets/notebook-text.svg";
import mapLogo from "@/assets/map-pinned.svg";
import "@/App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Weight from "@/components/weight";
import Journal from "@/components/journal/journal";
import {useExercise} from "@/contexts/useExercise.tsx";
import {useNavigate} from "react-router-dom";
import ExercisePage from "@/containers/exerciseLog/main";

function Home() {
  const {userData} = useExercise();
  const client = axios.create({
    baseURL: "http://localhost:4000",
  });
  const navigate = useNavigate();
  if (userData.age === "") {
    navigate("/LoginPage");
  }
  

  // useEffect(() => {
  //   client.get("/api/monster").then((response) => {
  //     const { data: monster } = response;
  //   });
  // }, []);

  if (userData.age) return (
    <div>
      <Tabs defaultValue="account" className="text-black bg-white rounded-lg">
        <TabsList className="grid grid-cols-2 rounded-lg mb-3">
          <TabsTrigger
            value="account"
            className="flex items-center cursor-pointer rounded-tl-lg rounded-r-none font-semibold text-xl"
          >
            <img src={journalLogo} alt="Journal" className="mx-1" />
            運動紀錄
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="flex items-center cursor-pointer rounded-tr-lg rounded-l-none font-semibold text-xl"
          >
            <img src={mapLogo} alt="Map" className="mx-1" />
            我要運動
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Weight />
          <Journal />
          {/* <SummaryCircle /> */}
        </TabsContent>
        <TabsContent value="password">
          <ExercisePage />
        </TabsContent>
        <TabsContent value="password">Maps</TabsContent>
      </Tabs>
    </div>
  );
}

export default Home;
