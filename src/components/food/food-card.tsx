import type { Food } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { User } from "better-auth";
import { EditFoodDialog } from "./edit-food-dialog";

type FoodCardProps = {
  food: Food;
  user: User | undefined;
};

export const FoodCard = ({ food, user }: FoodCardProps) => {
  const isOwner = user && user.id === food.userId;
  return (
    <Card>
      <CardHeader>
        <CardTitle
          className={cn(isOwner && "flex items-center justify-between")}
        >
          {food.name}
          {isOwner && <EditFoodDialog food={food} user={user} />}
        </CardTitle>
        <CardDescription>{food.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
