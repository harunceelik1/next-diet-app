"use client";

import { Params1 } from "@/lib/actions/diet.actions";
import { ColumnDef, selectRowsFn } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ImageIcon,
  MoreHorizontal,
  Trash2,
  Trash2Icon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDiet } from "@/context/diet-list";
import Image from "next/image";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Params1>[] = [
  {
    id: "select",

    header: ({ table }) => {
      const dietsContext = useDiet();

      return table.getRowModel().rows.length ? (
        <div className="flex items-center gap-x-2">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
          {table.getIsSomeRowsSelected() || table.getIsAllPageRowsSelected() ? (
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => {
                  {
                    const selectedRowsId = table
                      .getFilteredSelectedRowModel()
                      .rows.map((row) => row.original._id);
                    dietsContext.removeMultipleDiet(selectedRowsId);
                  }
                }}
              >
                <Trash2Icon className="w-8" size={20} />
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      );
    },
    cell: ({ row }) => (
      <>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="flex text-start"
        />
        {/* <div>{row.getIsSelected() ? row.original._id : "sa"}</div> */}
      </>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    enableSorting: false,
    enableHiding: false,
    accessorKey: "date",
    header: "Date",
  },

  {
    enableSorting: false,
    enableHiding: false,
    accessorKey: "isSpor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Spor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "breakfastTime",
    header: "Kahvaltı Saati",
  },
  {
    enableSorting: false,
    enableHiding: false,
    accessorKey: "breakfastImage",
    header: "Image",
    cell: ({ row }) => {
      const [selectedImage, setSelectedImage] = useState<string | null>(null);

      const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
      };

      return (
        <div className="text-start flex items-center">
          <Popover>
            <PopoverTrigger>
              {/* <ImageIcon
                onClick={() => handleImageClick(row.original.breakfastImage)}
              /> */}
              <Image
                src={row.original.breakfastImage}
                height={64}
                width={64}
                className="rounded-md object-contain  h-[64px]  w-[64px] "
                alt="Img"
                onClick={() => handleImageClick(row.original.breakfastImage)}
              />
            </PopoverTrigger>

            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Breakfast</h4>
                  <p className="text-sm text-muted-foreground">
                    Kahvaltıda yediklerim
                  </p>
                </div>
                <div className="">
                  <div className="items-center justify-center  flex aspect-square w-full h-full rounded-lg bg-transparent overflow-hidden">
                    {selectedImage && (
                      <Image
                        src={selectedImage}
                        alt="profile photo"
                        height={220}
                        width={220}
                        className="rounded-lg object-contain  "
                      />
                    )}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  // {
  //   enableSorting: false,
  //   enableHiding: false,
  //   accessorKey: "isFruit",
  //   header: "Fruit",
  //   cell: ({ row }) => {
  //     const isFruit = row.original.isFruit;
  //     return (
  //       <div>
  //         {isFruit ? (
  //           <span role="img" aria-label="Check Icon">
  //             ✔
  //           </span>
  //         ) : (
  //           <span role="img" aria-label="No Check Icon">
  //             ✘
  //           </span>
  //         )}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "eveningMeal",
    header: "Evening Meal",
  },
  {
    enableSorting: false,
    enableHiding: false,
    accessorKey: "eveningMealImage",
    header: "Image  ",
    cell: ({ row }) => {
      const [selectedImage, setSelectedImage] = useState<string | null>(null);

      const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
      };

      return (
        <div className="text-start flex items-center">
          <Popover>
            <PopoverTrigger>
              <Image
                src={row.original.eveningMealImage}
                height={64}
                width={64}
                className="rounded-md object-contain h-[64px]  w-[64px] "
                alt="Img"
                onClick={() => handleImageClick(row.original.eveningMealImage)}
              />
            </PopoverTrigger>

            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Akşam Yemeği</h4>
                  <p className="text-sm text-muted-foreground">
                    Akşam Yemeğinde Yediklerim
                  </p>
                </div>
                <div className="">
                  <div className="items-center justify-center  flex aspect-square w-full h-full rounded-lg bg-transparent overflow-hidden">
                    {selectedImage && (
                      <Image
                        src={selectedImage}
                        alt="profile photo"
                        height={220}
                        width={220}
                        className="rounded-lg object-contain  "
                      />
                    )}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorKey: "isWater",
    header: "Water",
  },
  {
    accessorKey: "muscle",
    header: "Muscle",
  },
  {
    accessorKey: "exerciseName",
    header: "Water",
  },
  {
    accessorKey: "numberOfSets",
    header: "Sets",
  },
  {
    accessorKey: "numberOfRepeat",
    header: "Repeat",
  },
  {
    accessorKey: "stepCount",
    header: "Step Count",
  },
  {
    accessorKey: "currentWeight",
    header: "Weight",
  },
  {
    enableSorting: false,
    enableHiding: false,
    accessorKey: "",
    id: "id",

    cell: ({ row, table }) => {
      const dietContext = useDiet();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(row.original._id.toString())
              }
            >
              Copy user ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                dietContext.deleteDiet(row.original._id.toString())
              }
            >
              <Trash2 />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
