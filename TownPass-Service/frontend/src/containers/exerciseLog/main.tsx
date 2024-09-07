import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SummaryCircle from "@/components/journal/summaryCircle";
import axios from "axios";

interface Session {
  id: number;
  sport: string;
  time: number; // Assuming time is in hours
  calories: number;
  location: string;
}

const ExerciseDetails = () => {
  const { id } = useParams(); // Extract the id from the URL

  const [session, setSession] = useState<Session | null>(null);
  const client = axios.create({
    baseURL: "http://localhost:4000",
  });
  useEffect(() => {
    const fetchSession = async () => {
      if (id) {
        try {
          await client.get(`/onesession?id=${id}`).then((response) => {
            setSession(response.data[0]);
            console.log(response.data[0]);
          });
        } catch (error) {
          console.error("Error fetching session data:", error);
        }
      }
    };

    fetchSession();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {session ? (
        <SummaryCircle
          title={`${session.time.slice(0, 10).split("-").join("/")} ${session.sport}`}
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

export default ExerciseDetails;
