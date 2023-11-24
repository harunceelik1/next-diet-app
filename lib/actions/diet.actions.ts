"use server";

import Diet from "../models/diet.model";
import { connectToDb } from "../mongoose";
export interface Params1 {
  _id: string;
  id: string;
  isSpor: string;
  breakfastTime: string;
  date: string;
  breakfastImage: string;
  eveningMeal: string;
  eveningMealImage: string;
  isWater: number;
  stepCount: number;
  currentWeight: number;
  exerciseName: string;
  numberOfSets: number;
  numberOfRepeat: number;
  muscle: string;
}

export async function dietCreate({
  id,
  isSpor,
  date,
  breakfastTime,
  breakfastImage,
  eveningMeal,
  eveningMealImage,
  isWater,
  stepCount,
  currentWeight,
  numberOfSets,
  numberOfRepeat,
  exerciseName,
  muscle,
}: Params1): Promise<void> {
  try {
    connectToDb();
    // const existingDiet = await Diet.findOne({ user: id, date });

    // if (existingDiet) {
    //   throw new Error("A diet record for the same date already exists.");
    // }

    await Diet.create({
      user: id.toString(), // Kullanıcının kimlik bilgisini ekleyin
      isSpor,
      date,
      breakfastTime,
      breakfastImage,
      eveningMeal,
      eveningMealImage,
      isWater,
      stepCount,
      currentWeight,
      exerciseName,
      muscle,
      numberOfSets,
      numberOfRepeat,
    });
  } catch (error: any) {
    throw new Error(`Failed to create diet information: ${error.message}`);
  }
}

export async function getDiets(dietId: string): Promise<Params1[]> {
  connectToDb();

  const diets = await Diet.find({ user: dietId });

  return diets.map((diet) => ({
    ...diet.toObject(),
  })) as Params1[];
}

export async function removeDiet(dietId: string) {
  try {
    await Diet.deleteOne({ _id: dietId });
  } catch (error) {
    throw new Error("Silinemedi");
  }
}

export async function removeMultiple(dietId: []) {
  try {
    await Diet.deleteMany({ _id: dietId });
  } catch (error) {
    throw new Error("Silinemedi");
  }
}
