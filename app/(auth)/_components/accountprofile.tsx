"use client";
import { useDiet } from "@/context/diet-list";
import { dietCreate } from "@/lib/actions/diet.actions";
import { ExerciseType, getAllData } from "@/lib/actions/exerciseData";
import { fetchUser, createUser, UserType } from "@/lib/actions/user.actions";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const AccountProfile = (user: UserType) => {
  // const { id, imageUrl, hasImage, firstName, lastName, emailAddress } = user;
  const dietsContext = useDiet();

  const userLoginMiddleware = (userInfo: UserType, dietsContext: any) => {
    if (dietsContext && dietsContext.contextUpdateUser) {
      dietsContext.contextUpdateUser({
        id: userInfo.id,
        imageUrl: userInfo.imageUrl,
        hasImage: userInfo.hasImage,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        emailAddress: userInfo.emailAddress,
      });
    }
  };

  useEffect(() => {
    try {
      // Eğer kullanıcı daha önce oluşturulmamışsa, kullanıcı oluştur
      if (dietsContext && dietsContext.contextCreateUser) {
        dietsContext.contextCreateUser({
          id: user.id,
          imageUrl: user.imageUrl,
          hasImage: user.hasImage,
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
        });
      }
    } catch (error) {}
    userLoginMiddleware(user, dietsContext);
  }, [user]);

  return null;
};

export default AccountProfile;
