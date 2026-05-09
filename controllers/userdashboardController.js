import UserDashboard from "../model/userdashboardModel.js";
import Onboarding from "../model/onboardingModel.js";
import {
  accountNav,
  activityItems,
  appointmentAlerts,
  appointmentMetrics,
  automationsSeed,
  billingCycles,
  businessNav,
  chartHeights,
  conversations,
  conversationThreads,
  crmMetrics,
  dashboardDefaults,
  dashboardNav,
  documents,
  instructorSchedule,
  kpis,
  leadActivities,
  leadPipeline,
  leadRecommendations,
  pricingPlans,
  recentCalls,
  settingsTabs,
  todaysAppointments,
} from "../util/dashboardConfig.js";

const AUTOMATION_IDS = new Set(automationsSeed.map((item) => item.id));
const SETTINGS_TAB_IDS = new Set(settingsTabs.map((item) => item.id));

const normalizeString = (value) => (typeof value === "string" ? value.trim() : "");

const buildAvatarLabel = (name) =>
  normalizeString(name)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "HA";

const buildAutomationPreferences = (input) => {
  const submitted = Array.isArray(input) ? input : [];
  const enabledById = new Map();

  submitted.forEach((item) => {
    const id = normalizeString(item?.id).toLowerCase();
    if (AUTOMATION_IDS.has(id) && typeof item?.enabled === "boolean") {
      enabledById.set(id, item.enabled);
    }
  });

  return automationsSeed.map((item) => ({
    id: item.id,
    enabled: enabledById.has(item.id) ? enabledById.get(item.id) : item.enabled,
  }));
};

const mergeAutomations = (preferences = []) => {
  const enabledById = new Map(preferences.map((item) => [item.id, item.enabled]));
  return automationsSeed.map((item) => ({
    ...item,
    enabled: enabledById.has(item.id) ? enabledById.get(item.id) : item.enabled,
  }));
};

const buildSettingsToggles = (input) => ({
  claude: typeof input?.claude === "boolean" ? input.claude : dashboardDefaults.settingsToggles.claude,
  streaming:
    typeof input?.streaming === "boolean"
      ? input.streaming
      : dashboardDefaults.settingsToggles.streaming,
  history: typeof input?.history === "boolean" ? input.history : dashboardDefaults.settingsToggles.history,
});

const buildBusinessProfile = (input, onboarding) => {
  const onboardingBusinessName = normalizeString(onboarding?.businessName);
  const onboardingBusinessType = normalizeString(onboarding?.selectedBusiness?.name);

  return {
    businessName:
      normalizeString(input?.businessName) ||
      onboardingBusinessName ||
      dashboardDefaults.businessProfile.businessName,
    businessType:
      normalizeString(input?.businessType) ||
      onboardingBusinessType ||
      dashboardDefaults.businessProfile.businessType,
    website: normalizeString(input?.website) || dashboardDefaults.businessProfile.website,
  };
};

const buildUserDashboardState = async (user) => {
  const [userDashboard, onboarding] = await Promise.all([
    UserDashboard.findOne({ userId: user.id }),
    Onboarding.findOne({ userId: user.id }),
  ]);

  const preferences = userDashboard || {
    ...dashboardDefaults,
    automations: buildAutomationPreferences(),
    businessProfile: buildBusinessProfile(null, onboarding),
  };

  const displayName = normalizeString(user.username) || "Hasaan";

  return {
    profile: {
      displayName,
      avatarLabel: buildAvatarLabel(displayName),
    },
    preferences: {
      activePanel: preferences.activePanel,
      activeDocument: preferences.activeDocument,
      activeSettingsTabId: preferences.activeSettingsTabId,
      selectedPlanId: preferences.selectedPlanId,
      billingCycle: preferences.billingCycle,
      businessProfile: preferences.businessProfile,
      settingsToggles: preferences.settingsToggles,
      automations: mergeAutomations(preferences.automations),
    },
  };
};

const getUserDashboardBootstrap = async (req, res) => {
  try {
    const state = await buildUserDashboardState(req.user);

    return res.status(200).json({
      message: "User dashboard bootstrap fetched successfully",
      data: {
        ...state,
        navigation: {
          dashboardNav,
          businessNav,
          accountNav,
        },
        overview: {
          title: "Overview",
          subtitle: `${state.preferences.businessProfile.businessName} - Last 30 days`,
          kpis,
          chartHeights,
          activityItems,
          novaSummary: {
            title: "Nova is active and answering calls",
            subtitle: "AI receptionist - ElevenLabs voice - 24/7 coverage",
            stats: [
              { value: "189", label: "Calls this month" },
              { value: "98%", label: "Handled" },
              { value: "4.9", label: "Satisfaction" },
            ],
          },
        },
        chat: {
          title: "AI Chat",
          subtitle: "Powered by Claude - Ask anything about your business",
          conversations,
          conversationThreads,
          modelBadge: "claude-sonnet",
        },
        automations: {
          title: "Automations",
          subtitle: "4 active workflows - 1,247 runs this month",
          items: state.preferences.automations,
        },
        documents: {
          title: "Document Intelligence",
          subtitle: "Ask questions about your business documents",
          items: documents,
        },
        leads: {
          title: "Leads & CRM",
          subtitle: "AI-assisted pipeline, smart follow-up, and booking visibility",
          crmMetrics,
          leadPipeline,
          leadActivities,
          recommendations: leadRecommendations,
        },
        appointments: {
          title: "Appointments",
          subtitle: "Lesson schedule, instructor availability, and smart confirmations",
          appointmentMetrics,
          todaysAppointments,
          instructorSchedule,
          appointmentAlerts,
        },
        nova: {
          title: "Nova - AI Receptionist",
          subtitle: "ElevenLabs Voice AI - Live 24/7",
          statusRows: [
            { label: "Voice Style", value: "Friendly & Professional", badge: "ElevenLabs" },
            { label: "Coverage", badge: "24/7", badgeGreen: true },
            { label: "Language", value: "English (US)" },
          ],
          metrics: [
            { label: "Calls Handled", value: "189" },
            { label: "Leads Captured", value: "143" },
            { label: "Avg Call Length", value: "2.4m" },
            { label: "Satisfaction", value: "4.9" },
          ],
          recentCalls,
        },
        settings: {
          title: "Settings",
          subtitle: "Manage your account and preferences",
          tabs: settingsTabs,
          billingCycles,
          pricingPlans,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching user dashboard bootstrap:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getMyUserDashboard = async (req, res) => {
  try {
    const userDashboard = await UserDashboard.findOne({ userId: req.user.id });

    if (!userDashboard) {
      return res.status(404).json({ message: "User dashboard preferences not found" });
    }

    return res.status(200).json({
      message: "User dashboard preferences fetched successfully",
      data: userDashboard,
    });
  } catch (error) {
    console.error("Error fetching user dashboard preferences:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const saveMyUserDashboard = async (req, res) => {
  try {
    const onboarding = await Onboarding.findOne({ userId: req.user.id });

    const activePanelOptions = ["overview", "chat", "nova", "automations", "docs", "leads", "appointments", "settings"];
    const activePanel = activePanelOptions.includes(req.body.activePanel)
      ? req.body.activePanel
      : dashboardDefaults.activePanel;

    const activeDocument = ["policy", "contract", "pricing", "routes"].includes(req.body.activeDocument)
      ? req.body.activeDocument
      : dashboardDefaults.activeDocument;

    const activeSettingsTabId = SETTINGS_TAB_IDS.has(req.body.activeSettingsTabId)
      ? req.body.activeSettingsTabId
      : dashboardDefaults.activeSettingsTabId;

    const selectedPlanId = ["starter", "pro", "agency"].includes(req.body.selectedPlanId)
      ? req.body.selectedPlanId
      : dashboardDefaults.selectedPlanId;

    const billingCycle = ["monthly", "yearly"].includes(req.body.billingCycle)
      ? req.body.billingCycle
      : dashboardDefaults.billingCycle;

    const payload = {
      userId: req.user.id,
      activePanel,
      activeDocument,
      activeSettingsTabId,
      selectedPlanId,
      billingCycle,
      businessProfile: buildBusinessProfile(req.body.businessProfile, onboarding),
      settingsToggles: buildSettingsToggles(req.body.settingsToggles),
      automations: buildAutomationPreferences(req.body.automations),
    };

    const userDashboard = await UserDashboard.findOneAndUpdate(
      { userId: req.user.id },
      { $set: payload, $setOnInsert: { userId: req.user.id } },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "User dashboard preferences saved successfully",
      data: userDashboard,
    });
  } catch (error) {
    console.error("Error saving user dashboard preferences:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUserDashboards = async (req, res) => {
  try {
    const userDashboards = await UserDashboard.find()
      .populate("userId", "username email role status")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      message: "User dashboards fetched successfully",
      data: userDashboards,
    });
  } catch (error) {
    console.error("Error fetching user dashboards:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserDashboardById = async (req, res) => {
  try {
    const userDashboard = await UserDashboard.findById(req.params.id).populate(
      "userId",
      "username email role status"
    );

    if (!userDashboard) {
      return res.status(404).json({ message: "User dashboard not found" });
    }

    return res.status(200).json({
      message: "User dashboard fetched successfully",
      data: userDashboard,
    });
  } catch (error) {
    console.error("Error fetching user dashboard by id:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUserDashboard = async (req, res) => {
  try {
    const deletedUserDashboard = await UserDashboard.findByIdAndDelete(req.params.id);

    if (!deletedUserDashboard) {
      return res.status(404).json({ message: "User dashboard not found" });
    }

    return res.status(200).json({ message: "User dashboard deleted successfully" });
  } catch (error) {
    console.error("Error deleting user dashboard:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  deleteUserDashboard,
  getAllUserDashboards,
  getMyUserDashboard,
  getUserDashboardBootstrap,
  getUserDashboardById,
  saveMyUserDashboard,
};
