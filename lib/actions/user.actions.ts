"use server";

import Diet from "../models/diet.model";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";
export interface UserType {
  id: string;
  imageUrl: string;
  hasImage: boolean;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export async function createUser({
  id,
  imageUrl,
  hasImage,
  firstName,
  lastName,
  emailAddress,
}: UserType): Promise<void> {
  try {
    connectToDb();
    const existingUser = await User.findOne({ id: id });

    if (existingUser) {
      return;
    }
    await User.create({
      id: id,
      firstName: firstName,
      lastName: lastName,
      hasImage: hasImage,
      emailAddress: emailAddress,
      imageUrl: imageUrl,
    });
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.mail) {
      throw new Error("E-posta adresi zaten kullanılıyor");
    } else {
      // Diğer hata durumları için işlem yap
      throw error;
    }
  }
}

export async function updateUser({
  id,
  imageUrl,
  hasImage,
  firstName,
  lastName,
  emailAddress,
}: UserType): Promise<void> {
  try {
    connectToDb();
    const existingUser = await User.findOne({ id: id });
    if (!existingUser) {
      return;
    }
    // await User.findOneAndUpdate  ({
    //   id: id,
    //   firstName: firstName,
    //   lastName: lastName,
    //   hasImage: hasImage,
    //   emailAddress: emailAddress,
    //   imageUrl: imageUrl,
    // });

    await User.updateOne(
      { id: id },
      {
        firstName: firstName,
        lastName: lastName,
        hasImage: hasImage,
        emailAddress: emailAddress,
        imageUrl: imageUrl,
      }
    );
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.mail) {
      throw new Error("E-posta adresi zaten kullanılıyor");
    } else {
      // Diğer hata durumları için işlem yap
      throw error;
    }
  }
}

export async function fetchUser(userId?: string) {
  try {
    connectToDb();
    const user = await User.findOne({ id: userId }).populate({
      path: "diets",
      model: Diet,
    });

    if (!user) return;

    return user;
  } catch (error) {
    throw error;
  }
}
