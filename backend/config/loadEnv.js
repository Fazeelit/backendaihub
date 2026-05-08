import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendDir = path.resolve(__dirname, "..");
const repoRootDir = path.resolve(backendDir, "..");

const candidateEnvPaths = [
  path.join(backendDir, ".env"),
  path.join(repoRootDir, ".env"),
];

let loadedEnvPath = null;

for (const envPath of candidateEnvPaths) {
  if (!fs.existsSync(envPath)) continue;

  dotenv.config({ path: envPath });
  loadedEnvPath = envPath;
  break;
}

export { loadedEnvPath };
