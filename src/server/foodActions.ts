"use server";

import { type Food } from "@prisma/client";

import { getCurrentUser } from "@/lib/auth";

import { db } from "./db";

export const createFood = async (data: Food) => {
  await db.food.create({ data });
};

export const getFoodsByUserId = async (userId: string) => {
  return db.food.findMany({ where: { userId } });
};

export const getFoodsForCurrentUser = async (): Promise<Food[]> => {
  const user = await getCurrentUser();
  if (!user) return [];
  return getFoodsByUserId(user.id);
};
