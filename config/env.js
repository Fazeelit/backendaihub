import "./loadEnv.js";

const firstNonEmptyEnv = (...keys) => {
  for (const key of keys) {
    const value = process.env[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
};

const nonEmptyEnvValues = (...keys) =>
  keys
    .map((key) => process.env[key])
    .filter((value) => typeof value === "string" && value.trim())
    .map((value) => value.trim());

const getMongoUri = () =>
  firstNonEmptyEnv(
    "MONGO_URI",
    "MONGO_URI_DIRECT",
    "MONGODB_URI",
    "DATABASE_URL",
  );

const getMongoUriCandidates = () => {
  const seen = new Set();
  const candidates = [];

  for (const value of nonEmptyEnvValues(
    "MONGO_URI",
    "MONGODB_URI",
    "MONGO_URI_DIRECT",
    "DATABASE_URL",
  )) {
    if (seen.has(value)) continue;
    seen.add(value);
    candidates.push(value);
  }

  return candidates;
};

export { firstNonEmptyEnv, getMongoUri, getMongoUriCandidates };
