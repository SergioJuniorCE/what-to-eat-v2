"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import type { Food } from "@prisma/client";
import type { User } from "better-auth";

type EditFoodDialogProps = {
  food: Food;
  user: User | undefined;
};

export const EditFoodDialog = ({ food, user }: EditFoodDialogProps) => {
  const handleEdit = () => {
    console.log("Edit");
  };

  if (!user || user.id !== food.userId)
    return (
      <div>
        <p>Unauthorized</p>
      </div>
    );

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "icon",
          }),
        )}
      >
        <Edit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            This action cannot be undone. This will permanently delete the food{" "}
            <strong>{food.name}</strong>.
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <Button onClick={handleEdit}>Edit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
