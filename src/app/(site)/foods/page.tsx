import { CreateFoodDialog } from "@/components/food/create-food-dialog";
import { FoodCard } from "@/components/food/food-card";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/server/db";
import { isEmpty } from "lodash";

export default async function FoodsPage() {
  const user = await getCurrentUser();

  const foods = await (() => {
    if (!user) return [];
    return db.food.findMany({ where: { userId: user.id } });
  })();

  return (
    <div>
      <h1>Foods</h1>
      <div className="flex gap-3">
        <CreateFoodDialog />
        <p>Find your favorite foods here.</p>
      </div>
      {!isEmpty(foods) ? (
        <div>
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
