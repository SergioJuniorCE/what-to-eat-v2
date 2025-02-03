"use client";

import { type Food } from "@prisma/client";
import React, { createContext, useContext, useEffect, useState } from "react";

import { getFoodsForCurrentUser } from "@/server/foodActions";

interface FoodContextType {
  foods: Food[];
  loading: boolean;
  addFood: (newFood: Food) => void;
  updateFood: (id: number, updatedData: Partial<Food>) => void;
  deleteFood: (id: number) => void;
}

// Create the context
const FoodContext = createContext<FoodContextType | undefined>(undefined);

// Custom hook for accessing the food context
export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFood must be used within a FoodProvider");
  }
  return context;
};

// Example FoodProvider component
export const FoodProvider = ({ children }: { children: React.ReactNode }) => {
  // Manage the foods state
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  // Add a new food item
  const addFood = (newFood: Food) => {
    setFoods((prevFoods) => [...prevFoods, newFood]);
  };

  // Update an existing food item by id
  const updateFood = (id: number, updatedData: Partial<Food>) => {
    setFoods((prevFoods) =>
      prevFoods.map((food) =>
        food.id === id ? { ...food, ...updatedData } : food,
      ),
    );
  };

  // Delete a food item by id
  const deleteFood = (id: number) => {
    setFoods((prevFoods) => prevFoods.filter((food) => food.id !== id));
  };

  const refreshFoods = async () => {
    try {
      setLoading(true);
      const data = await getFoodsForCurrentUser();
      setFoods(data);
    } catch (error) {
      console.error("Failed to load foods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshFoods();
  }, []);

  return (
    <FoodContext.Provider
      value={{ foods, loading, addFood, updateFood, deleteFood }}
    >
      {children}
    </FoodContext.Provider>
  );
};
