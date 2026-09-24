import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function init() {
    console.log("\nVVA Initialization\n");

    // Check whether current directory is a Git repository
    try {
        execSync("git rev-parse --is-inside-work-tree", {
            stdio: "ignore"
        });
    } catch (error) {
        console.log("✗ This directory is not a Git repository.");
        console.log("  Run VVA init inside a Git project.\n");
        return;
    }

    // Find Git repository root
    let gitRoot;

    try {
        gitRoot = execSync("git rev-parse --show-toplevel")
            .toString()
            .trim();
    } catch (error) {
        console.log("✗ Could not find the Git repository.\n");
        return;
    }

    // Get repository name
    const repositoryName = path.basename(gitRoot);

    // VVA directories
    const vvaDir = path.join(process.cwd(), ".vva");
    const logsDir = path.join(vvaDir, "logs");
    const outputDir = path.join(vvaDir, "output");

    // Create directories

    fs.mkdirSync(logsDir, { recursive: true });
    fs.mkdirSync(outputDir, { recursive: true });

    // Configuration file
    const configPath = path.join(vvaDir, "config.json");

    if (!fs.existsSync(configPath)) {
        const config = {
            version: "1.0",
            repository: repositoryName,
            defaultFormat: "pdf"
        };

        fs.writeFileSync(
            configPath,
            JSON.stringify(config, null, 2)
        );
    }

    console.log("✓ Git repository detected");
    console.log(`✓ Repository: ${repositoryName}`);
    console.log("✓ VVA configuration created");
    console.log("✓ Output directory created");
    console.log("✓ Logs directory created");

    console.log("\nVVA is ready.\n");
}

export default init;