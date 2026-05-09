import mongoose from "mongoose";

const businessOptionSchema = new mongoose.Schema(
  {   
    name: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    toolkit: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const integrationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    connected: {
      type: Boolean,
      default: false,
    },
    initialStatus: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const voiceSettingSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const onboardingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      unique: true,
      index: true,
    },
    currentStep: {
      type: Number,
      min: 2,
      max: 5,
      default: 2,
    },
    selectedBusiness: {
      type: businessOptionSchema,
      required: true,
    },
    integrations: {
      type: [integrationSchema],
      default: [],
    },
    voiceSettings: {
      type: [voiceSettingSchema],
      default: [],
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    greeting: {
      type: String,
      required: true,
      trim: true,
    },
    onboardingStatus: {
      type: String,
      enum: ["in_progress", "completed"],
      default: "in_progress",
    },
    isLive: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Onboarding = mongoose.model("Onboarding", onboardingSchema);

export default Onboarding;
