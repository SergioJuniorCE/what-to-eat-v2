"use client";

import { useState } from "react";
import Image from "next/image";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Sample food data
const foodItems = [
  { id: 1, name: "Pizza", image: "/placeholder.svg?height=400&width=300" },
  { id: 2, name: "Sushi", image: "/placeholder.svg?height=400&width=300" },
  { id: 3, name: "Burger", image: "/placeholder.svg?height=400&width=300" },
  { id: 4, name: "Salad", image: "/placeholder.svg?height=400&width=300" },
  { id: 5, name: "Pasta", image: "/placeholder.svg?height=400&width=300" },
];

export default function FoodPicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const handleSwipe = (liked: boolean) => {
    if (!foodItems[currentIndex]) return;
    setFadeOut(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % foodItems.length);
      setFadeOut(false);
    }, 300);
    console.log(liked ? "Liked" : "Disliked", foodItems[currentIndex].name);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-sm overflow-hidden">
        <div className="relative aspect-[3/4]">
          <Image
            src={foodItems[currentIndex]!.image || "/placeholder.svg"}
            alt={foodItems[currentIndex]!.name}
            layout="fill"
            objectFit="cover"
            className={`transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}
          />
        </div>
        <div className="flex items-center justify-between p-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => handleSwipe(false)}
          >
            <ThumbsDown className="h-6 w-6" />
            <span className="sr-only">Dislike</span>
          </Button>
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {foodItems.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => handleSwipe(true)}
          >
            <ThumbsUp className="h-6 w-6" />
            <span className="sr-only">Like</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
