import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useExercise } from "@/contexts/useExercise.tsx";

export default function LoginPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { userData, setUserData } = useExercise();
  const handleChange = (name: string, value: string) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/user", userData);
      toast({
        title: "Success!",
        description: "User registered successfully!",
      });
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error("Error submitting user data", error);
      toast({
        title: "Error",
        description: "Failed to register user. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>註冊基本資料</CardTitle>
          <CardDescription>請輸入基本資料</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">姓名</Label>
              <Input
                id="name"
                name="name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">年紀</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={userData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">體重</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                step="0.01"
                value={userData.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">身高</Label>
              <Input
                id="height"
                name="height"
                type="number"
                step="0.01"
                value={userData.height}
                onChange={(e) => handleChange("height", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">性別</Label>
              <Select
                onValueChange={(value) => handleChange("gender", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇性別" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">男</SelectItem>
                  <SelectItem value="female">女</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              註冊
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
