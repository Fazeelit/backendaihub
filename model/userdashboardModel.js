import mongoose from "mongoose";

const businessProfileSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      trim: true,
      default: "Nest Driving School",
    },
    businessType: {
      type: String,
      trim: true,
      default: "Driving School",
    },
    website: {
      type: String,
      trim: true,
      default: "nestdrivingschool.com",
    },
  },
  { _id: false }
);

const settingsTogglesSchema = new mongoose.Schema(
  {
    claude: {
      type: Boolean,
      default: true,
    },
    streaming: {
      type: Boolean,
      default: true,
    },
    history: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const automationPreferenceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const userDashboardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      unique: true,
      index: true,
    },
    activePanel: {
      type: String,
      enum: ["overview", "chat", "nova", "automations", "docs", "leads", "appointments", "settings"],
      default: "overview",
    },
    activeDocument: {
      type: String,
      enum: ["policy", "contract", "pricing", "routes"],
      default: "policy",
    },
    activeSettingsTabId: {
      type: String,
      enum: ["profile", "notifications", "integrations", "ai-model", "billing", "team"],
      default: "profile",
    },
    selectedPlanId: {
      type: String,
      enum: ["starter", "pro", "agency"],
      default: "pro",
    },
    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },
    businessProfile: {
      type: businessProfileSchema,
      default: () => ({}),
    },
    settingsToggles: {
      type: settingsTogglesSchema,
      default: () => ({}),
    },
    automations: {
      type: [automationPreferenceSchema],
      default: [],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserDashboard = mongoose.model("UserDashboard", userDashboardSchema);

export default UserDashboard;
