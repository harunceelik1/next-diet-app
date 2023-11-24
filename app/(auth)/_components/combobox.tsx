"use client";

import React, { ChangeEvent, useEffect, useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ExerciseType, getAllData } from "@/lib/actions/exerciseData";
import { useDiet } from "@/context/diet-list";
const muscleGroup = [
  {
    value: "forearms",
    label: "Forearms",
  },
  {
    value: "quadriceps",
    label: "Quadriceps",
  },
  {
    value: "abdominals",
    label: "Abdominals",
  },
  {
    value: "lats",
    label: "Lats",
  },
  {
    value: "middle_back",
    label: "Middle Back",
  },
  {
    value: "biceps",
    label: "Biceps",
  },
  {
    value: "triceps",
    label: "Triceps",
  },
  {
    value: "glutes",
    label: "Glutes",
  },
  {
    value: "chest",
    label: "Chest",
  },
  // {
  //   value: "traps",
  //   label: "Traps",
  // },
];

export function Combobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState("");
  const [exercises, setExercices] = useState<ExerciseType[]>([]);
  const [muscle, setMuscle] = useState<string>("");
  const [exerciseName, setExerciseName] = useState<string>("");
  const dietsContext = useDiet();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllData({ muscle: muscle });
      dietsContext.setMuscle(muscle);
      dietsContext.setExercise(exerciseName);
      setExercices(data);
    };
    fetchData();
  }, [value2, value]);

  return (
    <div className="flex flex-col gap-y-4  ">
      <Popover open={open2} onOpenChange={setOpen2}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open2}
            className="w-full justify-between"
          >
            <div className="first-letter:uppercase">
              {value2 ? value2 : "Kas grubu seçin..."}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 overflow-y-auto">
          <Command className="overflow-y-auto ">
            <CommandInput placeholder="Kas grubu aratın.." />
            <CommandEmpty>Eşleşmedi</CommandEmpty>
            <CommandGroup>
              {muscleGroup.map((exercise) => (
                <CommandItem
                  value={exercise.label}
                  onSelect={(currentValue) => {
                    setValue2(currentValue === value2 ? "" : currentValue);
                    setMuscle(exercise.value);

                    setOpen2(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value2 === exercise.value ? "opacity-100" : "opacity-0"
                    )}
                  />

                  {exercise.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <div className="first first-letter:uppercase">
              {value ? value : "Hareket seçin..."}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-max p-0">
          <Command>
            <CommandInput placeholder="Hareket aratın..." />
            <CommandEmpty>Eşleşmedi.</CommandEmpty>
            <CommandGroup>
              {exercises.map((exercise) => (
                <CommandItem
                  key={exercise.name}
                  value={exercise.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setExerciseName(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === exercise.name ? "opacity-100" : "opacity-0"
                    )}
                  />

                  {exercise.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
