import fs from "fs";
import path from "path";

import { collectProjectData } from "../core/collector.js";
import {
    findPythonEngine,
    runPython
} from "../core/python.js";


async function report() {
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

    fs.writeFileSync(
        outputFile,
        JSON.stringify(data, null, 2)
    );

    console.log("\nVVA Report\n");
    console.log("✓ Git data collected");
    console.log("✓ Project data saved");

    try {
        const engine = findPythonEngine();

        console.log("✓ Python engine detected");

        const result = await runPython(
            engine,
            [
                JSON.stringify(data)
            ]
        );

        console.log("\nPython Response:");
        console.log(result);

    } catch (error) {
        console.error("\n✗ Python engine failed:");
        console.error(error.message);
    }

    console.log();
}

export default report;