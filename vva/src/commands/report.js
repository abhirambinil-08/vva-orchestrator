import fs from "fs";
import path from "path";

import { collectProjectData } from "../core/collector.js";

function report() {
    const data = collectProjectData();

    const outputDir = path.join(
        process.cwd(),
        ".vva",
        "output"
    );

    fs.mkdirSync(outputDir, { recursive: true });

    const outputFile = path.join(
        outputDir,
        "project-data.json"
    );

    // Save project data
    fs.writeFileSync(
        outputFile,
        JSON.stringify(data, null, 2)
    );

    console.log("\nVVA Report Data\n");
    console.log("✓ Git data collected");
    console.log(`✓ Data saved to ${outputFile}`);
    console.log();
}

export default report;