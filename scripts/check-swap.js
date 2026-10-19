#!/usr/bin/env node

/**
 * =========================================================================
 * CHECK-SWAP SAFETY VALIDATOR
 * Scans codebase and built artifacts for leftover demo values.
 * Fails with code 1 if demo values remain while sampleMode is false.
 * =========================================================================
 */

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");

// Demo tokens to detect
const DEMO_TOKENS = [
  { label: "Demo Gym Name (ORVYN)", pattern: /\bORVYN\b/g },
  { label: "Demo Gym Name (Orvyn)", pattern: /\bOrvyn\b/g },
  { label: "Demo Phone Number", pattern: /\+1 \(555\) 389-2044|\+15553892044|15553892044/g },
  { label: "Demo Email", pattern: /hello@orvynfitness\.com/g },
  { label: "Demo Domain", pattern: /orvynfitness\.com/g },
  { label: "Demo Address", pattern: /742 Evergreen Blvd/g },
];

// Directories / files to ignore during swap check
const IGNORED_PATHS = [
  "node_modules",
  ".next",
  ".git",
  "scripts",
  "SWAP.md",
  "README.md",
  "package.json",
  "package-lock.json",
  "public/images/gym/README.md",
];

function shouldIgnore(filePath) {
  const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, "/");
  return IGNORED_PATHS.some((ignored) => relPath === ignored || relPath.startsWith(ignored + "/"));
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (shouldIgnore(fullPath)) continue;

    if (entry.isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if ([".ts", ".tsx", ".js", ".jsx", ".json", ".html", ".css", ".md"].includes(ext)) {
        arrayOfFiles.push(fullPath);
      }
    }
  }

  return arrayOfFiles;
}

function parseGymConfig() {
  const configPath = path.join(ROOT_DIR, "config", "gym.config.ts");
  if (!fs.existsSync(configPath)) {
    console.error("❌ ERROR: /config/gym.config.ts not found!");
    process.exit(1);
  }

  const content = fs.readFileSync(configPath, "utf-8");
  const sampleModeMatch = content.match(/sampleMode:\s*(true|false)/);
  const sampleMode = sampleModeMatch ? sampleModeMatch[1] === "true" : true;

  const nameMatch = content.match(/name:\s*["']([^"']+)["']/);
  const gymName = nameMatch ? nameMatch[1] : "UNKNOWN";

  return { sampleMode, gymName };
}

function runCheck() {
  console.log("=================================================");
  console.log("🔍 RUNNING SWAP SAFETY CHECK");
  console.log("=================================================");

  const { sampleMode, gymName } = parseGymConfig();
  console.log(`• Config Gym Name : ${gymName}`);
  console.log(`• Sample Mode     : ${sampleMode ? "ENABLED (Demo/Mockup Mode)" : "DISABLED (Live Production Mode)"}\n`);

  const files = getAllFiles(ROOT_DIR);
  const findings = [];

  for (const file of files) {
    // In config/gym.config.ts and config/specialty.gym.config.ts, demo tokens are permitted if sampleMode is true
    const relPath = path.relative(ROOT_DIR, file).replace(/\\/g, "/");
    const isConfigFile = relPath.startsWith("config/");

    const content = fs.readFileSync(file, "utf-8");
    const lines = content.split("\n");

    lines.forEach((line, lineIndex) => {
      DEMO_TOKENS.forEach(({ label, pattern }) => {
        // Reset regex state
        pattern.lastIndex = 0;
        if (pattern.test(line)) {
          // If in config file while sampleMode is true, track as demo default
          findings.push({
            file: relPath,
            line: lineIndex + 1,
            label,
            snippet: line.trim(),
            isConfigFile,
          });
        }
      });
    });
  }

  // Filter out config files if sampleMode is true
  const criticalFindings = findings.filter((f) => !sampleMode || !f.isConfigFile);

  if (findings.length === 0) {
    console.log("✅ PERFECT: Zero leftover demo values found anywhere in the codebase!");
    process.exit(0);
  }

  if (sampleMode) {
    console.log(`ℹ️ NOTICE: Found ${findings.length} demo references (sampleMode = true):`);
    findings.slice(0, 15).forEach((f) => {
      console.log(`   [${f.label}] in ${f.file}:${f.line} -> "${f.snippet.slice(0, 70)}"`);
    });
    if (findings.length > 15) {
      console.log(`   ...and ${findings.length - 15} more references.`);
    }

    console.log("\n💡 NOTE: When deploying a final live website for a client, set sampleMode: false in /config/gym.config.ts.");
    console.log("   check-swap will enforce that zero placeholder or demo values remain.");
    console.log("✅ Swap check PASSED (sampleMode = true).\n");
    process.exit(0);
  }

  // If sampleMode is false, fail if demo values exist
  if (criticalFindings.length > 0) {
    console.error(`❌ FAILED: ${criticalFindings.length} leftover demo values detected while sampleMode is false!\n`);
    criticalFindings.forEach((f) => {
      console.error(`   ❌ [${f.label}] in ${f.file}:${f.line}`);
      console.error(`      Line: ${f.snippet}\n`);
    });
    console.error("Please replace the above values in /config/gym.config.ts or your source files before production deployment.");
    process.exit(1);
  }

  console.log("✅ PASS: Clean production configuration verified!");
  process.exit(0);
}

runCheck();
