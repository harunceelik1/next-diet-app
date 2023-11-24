"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FileEditIcon, CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/lib/validations/diet";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, isBase64Image } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useDiet } from "@/context/diet-list";

import { Combobox } from "./combobox";
import { ExerciseType, getAllData } from "@/lib/actions/exerciseData";
const FormPage = ({ userId }: { userId?: string }) => {
  const [files, setFiles] = useState<File[]>([]);
  // const { startUpload } = useUploadThing("media");
  const [open, setOpen] = useState(false);
  const [exercises, setExercices] = useState<ExerciseType[]>([]);
  const dietsContext = useDiet();
  dietsContext.setUserId(userId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      breakfastTime: "",
      isSpor: "",
      supperTime: "",
      // stepCount: 0,
      // isWater: 0,
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const blob = data.breakfastImage;
    const hasImageChanged = isBase64Image(blob);
    const formattedDate = format(data.dob, "dd/MM/yyyy");
    // const existingDiet = dietsContext.diets.find(
    //   (diet) => diet.date === formattedDate
    // );

    // if (existingDiet) {
    //   // If an entry exists, show a toast message and return
    //   return toast.warning("A diet entry for this date already exists.");
    // }

    try {
      dietsContext.createDiet({
        id: userId,
        isSpor: data.isSpor,
        date: formattedDate,
        breakfastTime: data.breakfastTime,
        breakfastImage: data.breakfastImage,
        eveningMeal: data.supperTime,
        eveningMealImage: data.supperImage,
        isWater: data.isWater,
        stepCount: data.stepCount,
        currentWeight: data.currentWeight,
        exerciseName: dietsContext.exercise,
        muscle: dietsContext.muscle,
        numberOfSets: data.setSayisi,
        numberOfRepeat: data.tekrarSayisi,
        _id: "",
      });
      form.reset();
      setOpen(false);
      return toast.success("Programınız Oluşturuldu.");
    } catch (error) {
      throw toast.error("Programınız Oluşturulurken Bir Hata Meydana Geldi.");
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col justify-center items-center gap-x-2">
        <div className="bg">
          <h1 className="head-text uppercase font-bold text-4xl drop-shadow">
            Diyet Günlük Programı
          </h1>
          <p className="opacity-50 text-center p-4 ">
            Günlük beslenme alışkanlıklarınızı takip edin ve daha sağlıklı bir
            yaşam tarzına doğru bir adım atın. Günlük diyet bilgilerinizi
            kaydedin ve sağlıklı bir yaşamın kapılarını aralayın.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild className="w-max">
            <div className="relative mt-8 group">
              {/* Bilgileri doldurmak için lütfen tıklayın. */}
              <div className="absolute -inset-0.5 opacity-75 rounded-lg dark:bg-gradient-to-r from-ring  to-purple-600  blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

              <Button
                variant="outline"
                className=" relative flex gap-x-2 p-8 rounded-lg leading-none   items-center  shadow-2xl divide-x divide-gray-600"
              >
                <div className="pr-6">
                  <FileEditIcon size={20} />
                </div>
                <p className="pl-6  transition duration-200">
                  Günlük Programınızı Eklemek İçin Tıklayın
                </p>
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex gap-x-2">
                {/* <MdPlaylistAdd size={22} /> */}
                Günlük Programınız
              </DialogTitle>
              <DialogDescription>
                Günlük yaptığınız bazı diyet bilgilerini ve egzersizlerinize ait
                bilgieri girebilirsiniz.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* <FormField
                  control={form.control}
                  name="coffe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Kahveni içtin mi ?</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
         
                <FormField
                  control={form.control}
                  name="isFruit"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Meyve yendi mi ?</FormLabel>
                      </div>
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="breakfastTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kahvaltı Saati</FormLabel>
                      <FormControl>
                        <Input {...field} type="time" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="breakfastImage"
                  render={({ field }) => (
                    <FormItem className=" items-center gap-4 ">
                      <FormControl className=" text-base-semibold text-gray-200">
                        <Input
                          type="file"
                          accept="image/*"
                          className="account-form_image-input"
                          onChange={(e) => handleImage(e, field.onChange)}
                          placeholder="Upload a photo"
                        />
                      </FormControl>
                      <FormDescription>
                        Kahvaltı'da yedikleriniz
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isSpor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Spor</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder=""
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Spor gününüz nasıl geçti..
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Combobox />
                <FormField
                  control={form.control}
                  name="setSayisi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Set Sayısı</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="0"
                          type="number"
                          min={0}
                          max={10}
                          onChange={(e) => {
                            const inputValue = e.target.value;

                            const sanitizedValue = inputValue.replace(
                              /[^0-9]/g,
                              ""
                            );
                            // Maksimum 6 karaktere sınırla
                            const finalValue = sanitizedValue.slice(0, 2);
                            field.onChange(finalValue); // Değişikliği form kontrolüne ilet
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tekrarSayisi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tekrar Sayısı</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="0"
                          type="number"
                          min={0}
                          onChange={(e) => {
                            const inputValue = e.target.value;

                            const sanitizedValue = inputValue.replace(
                              /[^0-9]/g,
                              ""
                            );
                            // Maksimum 6 karaktere sınırla
                            const finalValue = sanitizedValue.slice(0, 2);
                            field.onChange(finalValue); // Değişikliği form kontrolüne ilet
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supperTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Akşam Yemeği Saati</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="shadcn" type="time" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supperImage"
                  render={({ field }) => (
                    <FormItem className=" items-center gap-4 ">
                      <FormControl className=" text-base-semibold text-gray-200">
                        <Input
                          type="file"
                          accept="image/*"
                          className="account-form_image-input"
                          onChange={(e) => handleImage(e, field.onChange)}
                          placeholder="Upload a photo"
                        />
                      </FormControl>
                      <FormDescription>
                        Akşam Yemeği'nde yedikleriniz{" "}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isWater"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Su</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="0"
                          type="number"
                          min={0}
                          onChange={(e) => {
                            const inputValue = e.target.value;

                            const sanitizedValue = inputValue.replace(
                              /[^0-9]/g,
                              ""
                            );
                            // Maksimum 6 karaktere sınırla
                            const finalValue = sanitizedValue.slice(0, 2);
                            field.onChange(finalValue); // Değişikliği form kontrolüne ilet
                          }}
                        />
                      </FormControl>
                      <FormDescription>Kaç litre su içtiniz ?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stepCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Günlük Adım</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const sanitizedValue = inputValue.replace(
                              /^0+/,
                              ""
                            ); // Başındaki sıfırları temizle
                            const truncatedValue = sanitizedValue.slice(0, 6); // Maksimum 6 karaktere sınırla
                            field.onChange(truncatedValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="currentWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Güncel Kilo</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const sanitizedValue = inputValue.replace(
                              /[^0-9]/g,
                              ""
                            );
                            const finalValue = sanitizedValue.slice(0, 3);

                            field.onChange(finalValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Diyet günü</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "MM-dd-yy")
                              ) : (
                                <span>Gün seçin</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Kaydet</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="  py-10">
        <DataTable columns={columns} data={dietsContext.diets} />
      </div>
    </div>
  );
};

export default FormPage;
