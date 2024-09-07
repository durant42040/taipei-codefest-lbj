import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
const ExerciseRecommendationAssistant = ({
  onSportClick,
}: {
  onSportClick: (id: string) => void;
}) => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [recommendedSports, setRecommendedSports] = useState<
    { id: string; name: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRecommendation = async () => {
    if (!gender || !age || !weight || !height) {
      alert("請填寫所有欄位以獲得建議。");
      return;
    }

    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(
        import.meta.env.VITE_GEMINI_API_KEY!,
      );
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Given a ${gender} aged ${age}, weighing ${weight}kg and ${height}cm tall, recommend 2-3 suitable sports or exercises. Return the response as a JSON array of objects, each with 'id' and 'name' properties, also note that the name of the sports should be limited to [籃球,棒球,跑步,游泳,健身,羽球,網球,足球,桌球}. for example: [{"id": "1", "name": "跑步"}, {"id": "2", "name": "游泳"}]`;

      const result = await model.generateContent(prompt);
      console.log("Recommendation result:", result);
      const data = result.response;
      setRecommendedSports(JSON.parse(data.text()));
    } catch (error) {
      console.error("Error getting recommendations:", error);
      alert("獲取建議時出錯。請稍後再試。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4 flex flex-row gap-2 items-center">
        <Bot size={32} />
        運動建議助手
      </h2>
      <div className="flex flex-col gap-2">
        {/* <Button
          onClick={getRecommendation}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "獲取中..." : "獲取運動建議"}
        </Button> */}
        <AnimatePresence>
          {recommendedSports.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {recommendedSports.map((sport) => (
                <motion.div
                  key={sport.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-100 p-4 rounded-md cursor-pointer text-center text-xl font-semibold"
                  onClick={() => onSportClick(sport.id)}
                >
                  {sport.name}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExerciseRecommendationAssistant;
