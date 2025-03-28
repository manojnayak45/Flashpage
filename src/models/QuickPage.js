import mongoose from "mongoose";

const QuickPageSchema = new mongoose.Schema({
  companyName: { type: String, required: true, unique: true },
  logo: { type: String, default: "" },
  serialNumber: { type: String, required: true, unique: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Draft", "Published"], // ✅ Use enum to allow only these values
    default: "Draft",  // ✅ Default should be "Draft"
  },
});

export default mongoose.models.QuickPage || mongoose.model("QuickPage", QuickPageSchema);
