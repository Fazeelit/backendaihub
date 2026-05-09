export const dashboardNav = [
  { id: "overview", icon: "\u{1F4CA}", label: "Overview" },
  { id: "chat", icon: "\u{1F4AC}", label: "AI Chat", badge: "3" },
  { id: "nova", icon: "\u{1F916}", label: "Nova Receptionist", badge: "Live", badgeGreen: true },
  { id: "automations", icon: "\u26A1", label: "Automations" },
  { id: "docs", icon: "\u{1F4C4}", label: "Documents" },
];

export const businessNav = [
  { id: "leads", icon: "\u{1F465}", label: "Leads & CRM" },
  { id: "appointments", icon: "\u{1F4C6}", label: "Appointments" },
  { id: "reviews", icon: "\u2B50", label: "Reviews" },
];

export const accountNav = [
  { id: "settings", icon: "\u2699\uFE0F", label: "Settings" },
  { id: "billing-link", icon: "\u{1F4B3}", label: "Billing" },
];

export const settingsTabs = [
  { id: "profile", label: "Profile", icon: "\u{1F464}" },
  { id: "notifications", label: "Notifications", icon: "\u{1F514}" },
  { id: "integrations", label: "Integrations", icon: "\u{1F50C}" },
  { id: "ai-model", label: "AI Model", icon: "\u{1F916}" },
  { id: "billing", label: "Billing", icon: "\u{1F4B3}" },
  { id: "team", label: "Team", icon: "\u{1F465}" },
];

export const billingCycles = {
  monthly: {
    id: "monthly",
    label: "Monthly",
    period: "per month, billed monthly",
    discountLabel: null,
    multiplier: 1,
  },
  yearly: {
    id: "yearly",
    label: "Yearly",
    period: "per month, billed annually",
    discountLabel: "Save 20%",
    multiplier: 0.8,
  },
};

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 49,
    featured: false,
    description: "For solo operators getting started with AI workflows.",
    ctaLabel: "Get Started",
    features: [
      "AI Chat Assistant",
      "3 workflow automations",
      "50,000 AI tokens/month",
      "1 user account",
      "Email support",
      { text: "Voice receptionist", muted: true },
      { text: "Document intelligence", muted: true },
    ],
    capabilities: {
      claude: false,
      receptionist: false,
      documentIntelligence: false,
      teamSeats: 1,
      automations: 3,
    },
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 149,
    featured: true,
    description: "For growing schools that want automation, voice, and better AI control.",
    ctaLabel: "Start Pro Free",
    features: [
      "Everything in Starter",
      "AI Voice Receptionist",
      "Document Intelligence (RAG)",
      "5 workflow automations",
      "200,000 AI tokens/month",
      "3 user accounts",
      "Priority support",
    ],
    capabilities: {
      claude: true,
      receptionist: true,
      documentIntelligence: true,
      teamSeats: 3,
      automations: 5,
    },
  },
  {
    id: "agency",
    name: "Agency",
    monthlyPrice: 399,
    featured: false,
    description: "For multi-location teams that need scale and onboarding support.",
    ctaLabel: "Contact Sales",
    features: [
      "Everything in Pro",
      "White-label branding",
      "Custom subdomain",
      "Unlimited automations",
      "Unlimited tokens",
      "Unlimited team members",
      "Dedicated onboarding call",
    ],
    capabilities: {
      claude: true,
      receptionist: true,
      documentIntelligence: true,
      teamSeats: null,
      automations: null,
    },
  },
];

export const kpis = [
  { tone: "a", label: "Leads Captured", value: "247", change: "+34% vs last month" },
  { tone: "g", label: "Calls Handled by Nova", value: "189", change: "+100% (was 0)" },
  { tone: "c", label: "Avg Response Time", value: "87s", change: "-94% from 6 hrs" },
  { tone: "p", label: "Time Saved (hrs)", value: "43h", change: "Automations running" },
];

export const chartHeights = [30, 45, 60, 40, 70, 55, 80, 65, 90, 75, 85, 95, 100, 88];

export const activityItems = [
  { color: "var(--green)", text: "Nova answered inbound call from +1 (703) 4XX-XXXX", time: "2m ago" },
  { color: "var(--amber)", text: "Lead captured: Sarah M. - wants lesson booking", time: "6m ago" },
  { color: "var(--cyan)", text: "Follow-up sequence triggered for Marcus T.", time: "14m ago" },
  { color: "var(--purple)", text: "Review request sent to James K. after lesson", time: "28m ago" },
  { color: "var(--green)", text: "Appointment confirmed: Aisha R. - Thu 2pm lesson", time: "1h ago" },
];

export const conversations = [
  { id: "pricing-strategy", title: "Driving school pricing strategy", time: "Just now" },
  { id: "summer-campaign", title: "Summer marketing campaign ideas", time: "2h ago" },
  { id: "no-show-rates", title: "How to reduce no-show rates", time: "Yesterday" },
  { id: "competitor-analysis", title: "Competitor analysis DMV area", time: "2 days ago" },
];

export const conversationThreads = {
  "pricing-strategy": {
    title: "Driving school pricing strategy",
    model: "claude-sonnet-4",
    messages: [
      {
        role: "user",
        time: "10:42 AM",
        content:
          "What's a competitive pricing strategy for a driving school in the DMV area? We currently charge $65/lesson but I think we're underpriced.",
      },
      {
        role: "assistant",
        time: "10:42 AM",
        content:
          "Based on current market data for the DMV area, $65/lesson is below the market median. Recommendation: move to $79/lesson with a 10-lesson package at $699, and add a road test prep bundle at $299.",
      },
    ],
  },
  "summer-campaign": {
    title: "Summer marketing campaign ideas",
    model: "claude-sonnet-4",
    messages: [
      {
        role: "user",
        time: "2:08 PM",
        content: "Give me summer marketing campaign ideas for our driving school.",
      },
      {
        role: "assistant",
        time: "2:09 PM",
        content:
          "Prioritize a parent peace-of-mind campaign, pair it with limited summer availability messaging, and support it with SMS and email follow-up.",
      },
    ],
  },
};

export const automationsSeed = [
  {
    id: "lead-capture",
    triggerClass: "at-webhook",
    trigger: "Webhook Trigger",
    name: "Lead Capture to CRM",
    desc: "When Nova captures a lead by phone, create a CRM contact and assign it to follow-up.",
    stats: [
      { value: "847", label: "Runs", className: "green" },
      { value: "99.2%", label: "Success", className: "amber" },
      { value: "2.3s", label: "Avg Time", style: { color: "var(--cyan)" } },
    ],
    enabled: true,
  },
  {
    id: "appointment-reminder",
    triggerClass: "at-schedule",
    trigger: "Scheduled",
    name: "Appointment Reminder",
    desc: "Send SMS reminders 24 hours before a scheduled lesson with details and location.",
    stats: [
      { value: "234", label: "Sent", className: "green" },
      { value: "12%", label: "No-show reduction", className: "amber" },
    ],
    enabled: true,
  },
  {
    id: "review-request",
    triggerClass: "at-event",
    trigger: "Post-Event",
    name: "Review Request",
    desc: "After a completed lesson, send a personalized Google review request.",
    stats: [
      { value: "89", label: "Reviews", className: "green" },
      { value: "4.9", label: "Avg Rating", className: "amber" },
    ],
    enabled: true,
  },
  {
    id: "cold-lead",
    triggerClass: "at-schedule",
    trigger: "7-Day Re-engage",
    name: "Cold Lead Nurture",
    desc: "If a lead does not book after 7 days, send a re-engagement sequence over 2 weeks.",
    stats: [
      { value: "Paused", label: "Status", style: { color: "var(--muted)" } },
      { value: "18%", label: "Re-engage rate", className: "amber" },
    ],
    enabled: false,
  },
];

export const documents = [
  {
    id: "policy",
    icon: "\u{1F4CB}",
    name: "Student Policy Handbook",
    meta: "PDF - 24 pages - 1.2MB",
    badge: "Indexed",
    badgeClass: "db-indexed",
  },
  {
    id: "contract",
    icon: "\u{1F4DD}",
    name: "Instructor Contract Template",
    meta: "DOCX - 8 pages - 0.4MB",
    badge: "Indexed",
    badgeClass: "db-indexed",
  },
  {
    id: "pricing",
    icon: "\u{1F4B0}",
    name: "Pricing & Packages 2025",
    meta: "PDF - 2 pages - 0.1MB",
    badge: "Processing...",
    badgeClass: "db-processing",
  },
  {
    id: "routes",
    icon: "\u{1F5FA}\uFE0F",
    name: "Route Maps & Test Areas",
    meta: "PDF - 12 pages - 3.4MB",
    badge: "Indexed",
    badgeClass: "db-indexed",
  },
];

export const crmMetrics = [
  { label: "Open Leads", value: "41", tone: "amber", detail: "Across all channels" },
  { label: "Qualified Rate", value: "62%", tone: "green", detail: "Up 8% this month" },
  { label: "Booked Revenue", value: "$9.8k", tone: "cyan", detail: "Pipeline won this month" },
  { label: "Avg Response", value: "6m", tone: "purple", detail: "Nova + team follow-up" },
];

export const leadPipeline = [
  {
    id: "new-inquiry",
    title: "New Inquiries",
    count: 18,
    value: "$7.4k",
    leads: [
      {
        id: "lead-1",
        name: "Sarah Mitchell",
        source: "Nova call capture",
        status: "Needs callback",
        priority: "Hot",
        packageInterest: "10-lesson package",
        nextStep: "Call today at 4:30 PM",
      },
    ],
  },
  {
    id: "qualified",
    title: "Qualified",
    count: 9,
    value: "$5.9k",
    leads: [
      {
        id: "lead-4",
        name: "Marcus Taylor",
        source: "Referral",
        status: "Ready to book",
        priority: "Hot",
        packageInterest: "Weekly lessons",
        nextStep: "Confirm Tuesday slot",
      },
    ],
  },
  {
    id: "booked",
    title: "Booked",
    count: 14,
    value: "$9.8k",
    leads: [
      {
        id: "lead-6",
        name: "Daniel Green",
        source: "Nova receptionist",
        status: "Deposit paid",
        priority: "Won",
        packageInterest: "12-lesson premium",
        nextStep: "Welcome SMS automation",
      },
    ],
  },
];

export const leadActivities = [
  { color: "var(--green)", text: "Nova captured Sarah Mitchell and assigned the lead to Sales.", time: "4m ago" },
  { color: "var(--amber)", text: "Jason Reed opened the pricing PDF twice after follow-up email.", time: "19m ago" },
  { color: "var(--cyan)", text: "Amina Khan clicked the booking link from Instagram nurture flow.", time: "37m ago" },
];

export const leadRecommendations = [
  {
    title: "Call hot leads within 15 minutes",
    body: "3 incoming leads are marked hot and likely to book if contacted before end of day.",
    tone: "amber",
  },
  {
    title: "Trigger no-show prevention flow",
    body: "7 booked students have not confirmed lesson reminders. Send Nova SMS confirmation sequence.",
    tone: "cyan",
  },
  {
    title: "Upsell Road Test Ready package",
    body: "4 qualified leads asked about test prep. Bundle accompaniment plus final lesson.",
    tone: "green",
  },
];

export const appointmentMetrics = [
  { label: "Today's Lessons", value: "12", tone: "amber", detail: "Across 4 instructors" },
  { label: "Confirmed Rate", value: "91%", tone: "green", detail: "AI reminders sent" },
  { label: "Reschedules", value: "3", tone: "cyan", detail: "Handled automatically" },
  { label: "Road Tests", value: "4", tone: "purple", detail: "This week" },
];

export const todaysAppointments = [
  {
    id: "appt-1",
    time: "9:00 AM",
    student: "Sarah Mitchell",
    instructor: "Alex Morgan",
    type: "Behind-the-wheel",
    location: "Fairfax Route A",
    status: "Confirmed",
  },
  {
    id: "appt-2",
    time: "10:30 AM",
    student: "Daniel Green",
    instructor: "Maria Lopez",
    type: "Road test prep",
    location: "Springfield DMV loop",
    status: "In Progress",
  },
];

export const instructorSchedule = [
  { id: "inst-1", name: "Alex Morgan", lessons: "4 lessons", utilization: "92%", nextSlot: "11:30 AM" },
  { id: "inst-2", name: "Maria Lopez", lessons: "3 lessons", utilization: "78%", nextSlot: "2:15 PM" },
];

export const appointmentAlerts = [
  {
    title: "1 student still unconfirmed",
    body: "Marcus Taylor has not replied to the 24-hour reminder. Nova can place a follow-up confirmation call.",
    tone: "amber",
  },
  {
    title: "Route clustering opportunity",
    body: "Two Fairfax pickups are 12 minutes apart. AI suggests grouping instructor assignments.",
    tone: "cyan",
  },
];

export const recentCalls = [
  {
    color: "var(--green)",
    text: "Inbound call from +1 (703) 4XX-XXXX - Lead captured: Lesson booking for Sarah M.",
    time: "2m ago",
  },
  {
    color: "var(--amber)",
    text: 'Inbound call - FAQ: "What age do I need to be to start?" - Answered by Nova',
    time: "18m ago",
  },
];

export const dashboardDefaults = {
  activePanel: "overview",
  activeDocument: "policy",
  activeSettingsTabId: "profile",
  selectedPlanId: "pro",
  billingCycle: "monthly",
  businessProfile: {
    businessName: "Nest Driving School",
    businessType: "Driving School",
    website: "nestdrivingschool.com",
  },
  settingsToggles: {
    claude: true,
    streaming: true,
    history: true,
  },
};
