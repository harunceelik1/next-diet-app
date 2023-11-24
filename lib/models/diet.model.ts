import mongoose from "mongoose";

const dietSchema = new mongoose.Schema({
  date: { type: String, default: Date.now },

  isSpor: { type: String, required: true, default: false },
  breakfastTime: { type: String, validate: /^\d{2}:\d{2}$/, required: true },
  breakfastImage: { type: String },
  eveningMeal: { type: String, validate: /^\d{2}:\d{2}$/, required: true },
  eveningMealImage: { type: String, required: true },
  isWater: { type: Number, required: true },
  numberOfSets: { type: Number, required: true },
  numberOfRepeat: { type: Number, required: true },
  stepCount: {
    type: Number,
    required: true,
    min: 0,
    max: 100000, // 100.000'e kadar olan değerlere izin verir
    get: (v: number) => Math.round(v), // Veriyi veritabanından okurken ondalık kısmı kaldırır
    set: (v: number) => Math.round(v), // Veriyi veritabanına kaydederken ondalık kısmı kaldırır
  },
  currentWeight: {
    type: Number,
    required: true,
    min: 0,
    get: (v: string) => parseFloat(v).toFixed(1), // Ondalık kısmı bir ondalık ayıra sahip olarak döndürür
    set: (v: string) => parseFloat(v).toFixed(1), // Ondalık kısmı bir ondalık ayıra sahip olarak kaydeder
  },
  user: {
    type: String,
    ref: "User", // 'User' burada userSchema'nın model adıdır
  },
  exerciseName: { type: String, required: true },
  muscle: { type: String, required: true },
});
const Diet = mongoose.models.Diet || mongoose.model("Diet", dietSchema);
export default Diet;
