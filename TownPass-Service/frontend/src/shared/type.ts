export type CourtType = {
  name: string;
  sports: string[];
  location: string;
  time: string;
  lat: number;
  lng: number;
  K: number;
  imgLink: string;
};

export type SportType = {
  id: number;
  name: string;
  icon: string;
};

export type FoodType = {
  id?: number;
  userId: string;
  calories: string;
  food: string;
  amount: string;
  protein: string;
  carbo: string;
  fat: string;
};

export type ActivityType = {
  id?: number;
  userId: string;
  calories: string;
  sport: string;
  duration: string;
  location: string;
};

export type SessionType = {
  id: number;
  sport: string;
  time: number; // Assuming time is in hours
  calories: number;
  location: string;
  duration: number; // Assuming duration is in hours
}