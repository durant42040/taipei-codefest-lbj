import { useEffect, useState } from "react";
import axios from "axios";
import journalLogo from "./assets/notebook-text.svg"
import mapLogo from "./assets/map-pinned.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useConnectionMessage } from "./composables/useConnectionMessage";
import { useHandleConnectionData } from "./composables/useHandleConnectionData";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import {Weight} from "./components/weight"
import Journal from "./components/journal/journal";

function App() {
  const [count, setCount] = useState(0);
  const [monster, setMonster] = useState({ name: "", health: 0, ugly: true });

  const client = axios.create({
    baseURL: "http://localhost:4000",
  });

  const handleDogInfo = (event: { data: string }) => {
    const result: { name: string; data: any } = JSON.parse(event.data);
    // alert(`name: ${result.data.name}, age: ${result.data.age}`);
  };

  useEffect(() => {
    useConnectionMessage("doginfo", null);
    useHandleConnectionData(handleDogInfo);
  }, []);

  useEffect(() => {
    client.get("/api/monster").then((response) => {
      const { data: monster } = response;
      setMonster(monster);
    });
  }, []);

  return (
    <>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account" className="">
            <img src={journalLogo} alt="Journal" className="mx-2" />
            運動紀錄
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center">
            <img src={mapLogo} alt="Map" className="mx-2" />
            我要運動
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account"><Journal/></TabsContent>
        <TabsContent value="password">Maps</TabsContent>
      </Tabs>
      <Weight />
    </>
    
  );
}

export default App;
