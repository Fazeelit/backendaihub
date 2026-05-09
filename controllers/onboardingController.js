import Onboarding from "../model/onboardingModel.js";

const ONBOARDING_COPY = {
  businessTitle: "What type of business do you run?",
  businessSubtitle:
    "We'll pre-load the perfect tools, workflows, and AI prompts for your industry.",
  integrationsTitle: "Connect your existing tools",
  integrationsSubtitle: "Link the tools you already use. You can always add more later.",
  novaTitle: "Meet Nova - your AI receptionist",
  novaSubtitle: "Customize how Nova sounds and what she knows about your business.",
  novaReadyTitle: "Nova is ready",
  novaReadySubtitle: "Powered by ElevenLabs voice AI - Pre-trained on your business type",
  liveTitle: "You're live!",
  liveSubtitle:
    "Nova is answering your calls. Automations are running. Your dashboard is live. Welcome to Smart AI Hub.",
};

const PROGRESS_STEPS = [
  { step: 1, label: "Account Created" },
  { step: 2, label: "Business Type" },
  { step: 3, label: "Integrations" },
  { step: 4, label: "Configure Nova" },
  { step: 5, label: "Go Live" },
];

const BUSINESS_OPTIONS = [
  {
    id: "driving-school",
    icon: "\u{1F697}",
    name: "Driving School",
    desc: "Lesson bookings, road test prep, student follow-ups",
    toolkit: "4 workflows, 12 AI prompts, and phone integrations pre-configured",
  },
  {
    id: "medical",
    icon: "\u{1F3E5}",
    name: "Dental / Medical",
    desc: "Appointment reminders, patient re-engagement, reviews",
    toolkit: "5 workflows, patient recall prompts, and booking integrations pre-configured",
  },
  {
    id: "wellness",
    icon: "\u{1F486}",
    name: "Med Spa / Wellness",
    desc: "Treatment bookings, upsell campaigns, no-show recovery",
    toolkit: "4 workflows, treatment upsell prompts, and CRM integrations pre-configured",
  },
  {
    id: "salon",
    icon: "\u{1F487}",
    name: "Salon / Hair Studio",
    desc: "Appointment bookings, seasonal campaigns, review requests",
    toolkit: "3 workflows, seasonal campaign prompts, and booking integrations pre-configured",
  },
  {
    id: "real-estate",
    icon: "\u{1F3E0}",
    name: "Real Estate",
    desc: "Lead nurture, listing summaries, document Q&A",
    toolkit: "6 workflows, listing summary prompts, and lead nurture integrations pre-configured",
  },
  {
    id: "restaurant",
    icon: "\u{1F37D}\uFE0F",
    name: "Restaurant / Catering",
    desc: "Reservation management, event bookings, review automation",
    toolkit: "4 workflows, reservation automation, and review prompts pre-configured",
  },
];

const INTEGRATIONS_SEED = [
  {
    id: "phone",
    icon: "\u{1F4DE}",
    name: "Phone Number",
    desc: "Route inbound calls to Nova AI receptionist",
    connected: true,
    initialStatus: "Connected",
  },
  {
    id: "calendar",
    icon: "\u{1F4C5}",
    name: "Google Calendar",
    desc: "Sync lesson bookings and appointments automatically",
    connected: false,
    initialStatus: "Connect",
  },
  {
    id: "crm",
    icon: "\u{1F4BC}",
    name: "GoHighLevel / CRM",
    desc: "Pipe captured leads directly into your CRM pipeline",
    connected: false,
    initialStatus: "Connect",
  },
  {
    id: "email",
    icon: "\u{2709}\uFE0F",
    name: "Gmail / Email",
    desc: "Send automated follow-ups and booking confirmations",
    connected: false,
    initialStatus: "Skip for now",
  },
  {
    id: "sms",
    icon: "\u{1F4AC}",
    name: "SMS / Twilio",
    desc: "Text-based lead follow-up and appointment reminders",
    connected: false,
    initialStatus: "Skip for now",
  },
];

const VOICE_SETTINGS_SEED = [
  { id: "style", label: "Voice Style", value: "Friendly and Professional", selected: true },
  { id: "language", label: "Language", value: "English (US)", selected: false },
  { id: "hours", label: "Hours", value: "24/7 Always On", selected: false },
  { id: "greeting", label: "Greeting", value: "Custom Business Intro", selected: false },
];

const LIVE_CARDS = [
  {
    id: "nova-active",
    icon: "\u{1F916}",
    title: "Nova Active",
    description: "AI receptionist is live",
    tone: "success",
  },
  {
    id: "workflows-on",
    icon: "\u26A1",
    title: "4 Workflows On",
    description: "Automations running",
    tone: "warning",
  },
  {
    id: "dashboard-ready",
    icon: "\u{1F4CA}",
    title: "Dashboard Ready",
    description: "Live metrics tracking",
    tone: "info",
  },
];

const businessOptionMap = new Map(BUSINESS_OPTIONS.map((item) => [item.id, item]));
const integrationMap = new Map(INTEGRATIONS_SEED.map((item) => [item.id, item]));
const voiceSettingMap = new Map(VOICE_SETTINGS_SEED.map((item) => [item.id, item]));

const normalizeString = (value) => (typeof value === "string" ? value.trim() : "");

const buildSelectedBusiness = (businessId) => {
  const normalizedId = normalizeString(businessId).toLowerCase();
  return businessOptionMap.get(normalizedId) || null;
};

const buildIntegrations = (input) => {
  const submitted = Array.isArray(input) ? input : [];
  const connectedById = new Map();

  submitted.forEach((item) => {
    const id = normalizeString(item?.id).toLowerCase();
    if (integrationMap.has(id) && typeof item?.connected === "boolean") {
      connectedById.set(id, item.connected);
    }
  });

  return INTEGRATIONS_SEED.map((item) => ({
    ...item,
    connected: connectedById.has(item.id) ? connectedById.get(item.id) : item.connected,
  }));
};

const buildVoiceSettings = (input) => {
  const submitted = Array.isArray(input) ? input : [];
  const selectedById = new Map();

  submitted.forEach((item) => {
    const id = normalizeString(item?.id).toLowerCase();
    if (voiceSettingMap.has(id) && typeof item?.selected === "boolean") {
      selectedById.set(id, item.selected);
    }
  });

  return VOICE_SETTINGS_SEED.map((item) => ({
    ...item,
    selected: selectedById.has(item.id) ? selectedById.get(item.id) : item.selected,
  }));
};

const buildOnboardingResponse = (onboarding) => ({
  _id: onboarding._id,
  userId: onboarding.userId,
  currentStep: onboarding.currentStep,
  selectedBusiness: onboarding.selectedBusiness,
  integrations: onboarding.integrations,
  voiceSettings: onboarding.voiceSettings,
  businessName: onboarding.businessName,
  greeting: onboarding.greeting,
  onboardingStatus: onboarding.onboardingStatus,
  isLive: onboarding.isLive,
  completedAt: onboarding.completedAt,
  createdAt: onboarding.createdAt,
  updatedAt: onboarding.updatedAt,
});

const getOnboardingConfig = async (req, res) => {
  return res.status(200).json({
    message: "Onboarding config fetched successfully",
    data: {
      copy: ONBOARDING_COPY,
      progressSteps: PROGRESS_STEPS,
      businessOptions: BUSINESS_OPTIONS,
      integrationsSeed: INTEGRATIONS_SEED,
      voiceSettingsSeed: VOICE_SETTINGS_SEED,
      liveCards: LIVE_CARDS,
      defaults: {
        currentStep: 2,
        selectedBusinessId: BUSINESS_OPTIONS[0].id,
        businessName: "Nest Driving School",
        greeting: "Thanks for calling Nest Driving School. How can I help you today?",
      },
    },
  });
};

const saveMyOnboarding = async (req, res) => {
  try {
    const selectedBusiness = buildSelectedBusiness(req.body.selectedBusinessId);

    if (!selectedBusiness) {
      return res.status(400).json({ message: "A valid selectedBusinessId is required" });
    }

    const currentStep =
      Number.isInteger(req.body.currentStep) && req.body.currentStep >= 2 && req.body.currentStep <= 5
        ? req.body.currentStep
        : 2;

    const onboardingStatus = currentStep >= 5 || req.body.onboardingStatus === "completed"
      ? "completed"
      : "in_progress";

    const businessName = normalizeString(req.body.businessName) || "Nest Driving School";
    const greeting =
      normalizeString(req.body.greeting) ||
      `Thanks for calling ${businessName}. How can I help you today?`;

    const payload = {
      userId: req.user.id,
      currentStep,
      selectedBusiness,
      integrations: buildIntegrations(req.body.integrations),
      voiceSettings: buildVoiceSettings(req.body.voiceSettings),
      businessName,
      greeting,
      onboardingStatus,
      isLive: onboardingStatus === "completed",
      completedAt: onboardingStatus === "completed" ? new Date() : null,
    };

    const onboarding = await Onboarding.findOneAndUpdate(
      { userId: req.user.id },
      { $set: payload, $setOnInsert: { userId: req.user.id } },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      message: "Onboarding saved successfully",
      data: buildOnboardingResponse(onboarding),
    });
  } catch (error) {
    console.error("Error saving onboarding:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getMyOnboarding = async (req, res) => {
  try {
    const onboarding = await Onboarding.findOne({ userId: req.user.id });

    if (!onboarding) {
      return res.status(404).json({ message: "Onboarding not found" });
    }

    return res.status(200).json({
      message: "Onboarding fetched successfully",
      data: buildOnboardingResponse(onboarding),
    });
  } catch (error) {
    console.error("Error fetching onboarding:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllOnboardings = async (req, res) => {
  try {
    const onboardings = await Onboarding.find()
      .populate("userId", "username email role status")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      message: "Onboardings fetched successfully",
      data: onboardings.map((onboarding) => ({
        ...buildOnboardingResponse(onboarding),
        userId: onboarding.userId,
      })),
    });
  } catch (error) {
    console.error("Error fetching onboardings:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getOnboardingById = async (req, res) => {
  try {
    const onboarding = await Onboarding.findById(req.params.id).populate(
      "userId",
      "username email role status"
    );

    if (!onboarding) {
      return res.status(404).json({ message: "Onboarding not found" });
    }

    return res.status(200).json({
      message: "Onboarding fetched successfully",
      data: {
        ...buildOnboardingResponse(onboarding),
        userId: onboarding.userId,
      },
    });
  } catch (error) {
    console.error("Error fetching onboarding by id:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteOnboarding = async (req, res) => {
  try {
    const deletedOnboarding = await Onboarding.findByIdAndDelete(req.params.id);

    if (!deletedOnboarding) {
      return res.status(404).json({ message: "Onboarding not found" });
    }

    return res.status(200).json({ message: "Onboarding deleted successfully" });
  } catch (error) {
    console.error("Error deleting onboarding:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  deleteOnboarding,
  getAllOnboardings,
  getMyOnboarding,
  getOnboardingById,
  getOnboardingConfig,
  saveMyOnboarding,
};
