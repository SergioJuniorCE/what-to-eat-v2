"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Food } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useFood } from "@/providers/food-provider";
import { createFood } from "@/server/foodActions";

import { Checkbox } from "../ui/checkbox";

type CreateFoodDialogProps = {
  userId: string;
};

const formSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  recipe: z.string().optional(),
  isTakeout: z.boolean().optional(),
  userId: z.string().nonempty(),
});

export const CreateFoodDialog = ({ userId }: CreateFoodDialogProps) => {
  const { addFood } = useFood();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      recipe: "",
      isTakeout: false,
      userId,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const food = values as Food;

    createFood(food)
      .then(() => {
        addFood(food);
        toast({
          title: "Food created",
          description: "Your food has been created.",
        });
        form.reset();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new food</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Shrimp spring roll" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="A delicious spring roll." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe</FormLabel>
                  <FormControl>
                    <Input placeholder="How to make it?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isTakeout"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Is this a takeout food?</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
