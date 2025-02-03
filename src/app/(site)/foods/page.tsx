"use client";

import { isEmpty } from "lodash";

import { CreateFoodDialog } from "@/components/food/create-food-dialog";
import { FoodCard } from "@/components/food/food-card";
import { authClient } from "@/lib/auth-client";
import { useFood } from "@/providers/food-provider";

export default function FoodsPage() {
  const { data, error, isPending } = authClient.useSession();

  const { foods } = useFood();

  const user = data?.user;

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1>Foods</h1>
      <div className="flex gap-3">
        {user && <CreateFoodDialog userId={user.id} />}
        <p>Find your favorite foods here.</p>
      </div>
      {!isEmpty(foods) ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} user={user} />
          ))}
        </div>
      ) : (
        <div>No foods found.</div>
      )}
    </div>
  );
}
