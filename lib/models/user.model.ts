import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },

  firstName: { type: String },
  lastName: { type: String },
  imageUrl: { type: String },
  hasImage: { type: Boolean },
  emailAddress: { type: String, required: true, unique: true },

  diets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Diet" }],
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
