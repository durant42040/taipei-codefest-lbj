import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SummaryCircle from "@/components/journal/ExerciseCircle.tsx";
import axios from "axios";
import type { SessionType } from "@/shared/type";

const SessionDetails = () => {
  const { id } = useParams(); // Extract the id from the URL

  const [session, setSession] = useState<SessionType>({
    id: 0,
    time: 0,
    sport: "",
    location: "",
    duration: 0,
    calories: 0,
  });
  const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  useEffect(() => {
    client.get(`/session?id=${id}`).then((response) => {
      setSession(response.data[0]);
    });
  }, [client, id]);

  return (
    <div className="container mx-auto p-4">
      {session ? (
        <SummaryCircle
          title={`${session.time.toString().slice(0, 10).split("-").join("/")} ${session.sport}`}
          intake={session.location}
          burned={session.calories}
          time={session.duration}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SessionDetails;
