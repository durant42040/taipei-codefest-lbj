import { useEffect, useState } from "react";
import axios from "axios";
import journalLogo from "@/assets/notebook-text.svg";
import mapLogo from "@/assets/map-pinned.svg";
import "@/App.css";
import { useConnectionMessage } from "@/composables/useConnectionMessage";
import { useHandleConnectionData } from "@/composables/useHandleConnectionData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Weight from "@/components/weight";
import Calorie from "@/components/calorie";
import Journal from "@/components/journal/journal";

function Home() {
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

  // useEffect(() => {
  //   client.get("/api/monster").then((response) => {
  //     const { data: monster } = response;
  //   });
  // }, []);

  return (
    <div>
      <Tabs defaultValue="account" className="text-black bg-white rounded-lg">
        <TabsList className="grid grid-cols-2 rounded-lg border mb-3">
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
          <Calorie />
        </TabsContent>
        <TabsContent value="password">Maps</TabsContent>
      </Tabs>
    </div>
  );
}

export default Home;
