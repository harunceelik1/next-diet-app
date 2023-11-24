"use client";
import {
  Params1,
  dietCreate,
  getDiets,
  removeDiet,
  removeMultiple,
} from "@/lib/actions/diet.actions";
import { UserType, createUser, updateUser } from "@/lib/actions/user.actions";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type DietContextType = {
  diets: Params1[];
  userId?: string;
  setUserId?: any;
  setMuscle?: any;
  setExercise?: any;
  exercise?: string;
  muscle?: string;

  createDiet?: any;
  deleteDiet?: any;
  removeMultipleDiet?: any;
  contextCreateUser?: (user: UserType) => void;
  contextUpdateUser?: (user: UserType) => void;
  user: UserType[];
};
const DietContext = createContext<DietContextType>({ diets: [], user: [] });

export function DietProvider({ children }: any) {
  const [userId, setUserId] = useState<string>();
  const [dietList, setDietList] = useState<any[]>([]);
  const [muscle, setMuscle] = useState<string>("");
  const [exercise, setExercise] = useState<string>("");

  useEffect(() => {
    if (!userId) {
      return console.log("USERID YOK");
    }

    getAllDiet(userId.toString());
  }, [userId]);
  const getAllDiet = async (userId: string) => {
    await getDiets(userId.toString()).then((response: Params1[]) => {
      setDietList(response);
    });
  };
  const createDiet = async (diet: Params1) => {
    dietCreate(diet).then((r) => {
      if (!userId) {
        return;
      }
      getAllDiet(userId);
    });
  };
  const contextCreateUser = (user: UserType) => {
    createUser(user).then(() => {
      if (!user.id) {
        return;
      }
      // setUserId(user.id);
    });
  };
  const deleteDiet = (removeId: string) => {
    removeDiet(removeId).then(() => {
      if (!userId) {
        return;
      }
      getAllDiet(userId);
    });
  };

  const removeMultipleDiet = (removeId: []) => {
    removeMultiple(removeId).then(() => {
      if (!userId) {
        return;
      }
      getAllDiet(userId);
    });
  };

  const contextUpdateUser = async (user: UserType) => {
    updateUser(user).then((r) => {
      if (!userId) {
        return;
      }
    });
  };

  return (
    <DietContext.Provider
      value={{
        userId,
        setUserId,
        diets: dietList,
        createDiet,
        deleteDiet,
        setExercise,
        exercise,
        contextCreateUser,
        removeMultipleDiet,
        contextUpdateUser,
        setMuscle,
        muscle,
        user: [],
      }}
    >
      {children}
    </DietContext.Provider>
  );
}

export function useDiet() {
  const context = useContext(DietContext);

  if (!context)
    throw new Error("dietContext must be used inside a `DietContextProvider`");

  return context;
}
