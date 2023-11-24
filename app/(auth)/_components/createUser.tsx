"use client";
import { UserType } from "@/lib/actions/user.actions";
import { useEffect } from "react";
import { Context } from "vm";
import { useDiet } from "@/context/diet-list";
import { toast } from "sonner";
const userLoginMiddleware = (userInfo: UserType, dietsContext: any) => {
  // Örnek: Kullanıcı bilgilerini güncelleme

  if (dietsContext && dietsContext.contextUpdateUser) {
    dietsContext.contextUpdateUser({
      id: userInfo.id,
      imageUrl: userInfo.imageUrl,
      hasImage: userInfo.hasImage,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      emailAddress: userInfo.emailAddress,
    });
    toast.success("Kullanıcı güncellendi.");
  }

  // Örnek: Kullanıcı oluşturma
  // Bu kısmı ihtiyacınıza göre düzenleyin
  // Örneğin: await createUser(userInfo);
};

// Middleware işlemlerini gerçekleştiren bileşen
const MiddlewareProcessor = ({ user }: { user: UserType }) => {
  const dietsContext = useDiet();

  useEffect(() => {
    try {
      // Eğer kullanıcı daha önce oluşturulmamışsa, kullanıcı oluştur
      if (
        dietsContext &&
        !dietsContext.user &&
        dietsContext.contextCreateUser
      ) {
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
    // Kullanıcı girişi gerçekleştiğinde middleware fonksiyonunu çağır
    userLoginMiddleware(user, dietsContext);
  }, [user, dietsContext]);

  // Bu bileşen herhangi bir şeyi arayüzde göstermez
  return null;
};

export default MiddlewareProcessor;
