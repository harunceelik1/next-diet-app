import * as z from "zod";
export const FormSchema = z.object({
  // coffe: z.boolean().default(false).optional(),
  // isFruit: z.boolean().default(false).optional(),

  setSayisi: z
    .string()
    .refine(
      (w) => {
        const parsedValue = parseInt(w, 10);
        return !isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 20;
      },
      {
        message: "Set sayısı must be between 1 and 10.",
      }
    )
    .transform((w) => Number(w)),

  tekrarSayisi: z
    .string()
    .refine(
      (w) => {
        const parsedValue = parseInt(w, 10);
        return !isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 50;
      },
      {
        message: "Tekrar sayısı must be between 1 and 50.",
      }
    )
    .transform((w) => Number(w)),
  breakfastTime: z.string().trim().min(1, {
    message: "Breakfast time must be entered",
  }),
  supperTime: z.string().trim().min(1, {
    message: "Suppertime time must be entered",
  }),
  supperImage: z.string(),
  breakfastImage: z.string(),
  isSpor: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 30 characters.",
    }),

  stepCount: z
    .string()
    .refine(
      (w) => {
        const parsedValue = parseInt(w, 10);
        return !isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 100000;
      },
      {
        message: "Step count must be between 1 and 100.000.",
      }
    )

    .transform((w) => Number(w)),
  currentWeight: z
    .string()
    .refine((w) => !isNaN(parseFloat(w)), {
      message: "The current weight must be entered.",
    })
    .transform((w) => Number(w)),
  isWater: z
    .string()
    .refine((w) => !isNaN(parseFloat(w)), {
      message: "The water intake information must be filled",
    })
    .transform((w) => Number(w)),
  dob: z.date({
    required_error: "A date of diet is required.",
  }),
});
