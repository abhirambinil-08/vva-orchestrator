import fs from "fs";
import path from "path";
import { spawn } from "child_process";

export function findPythonEngine() {
    const aiDir = path.join(process.cwd(), "ai");

    if (!fs.existsSync(aiDir)) {
        throw new Error("AI directory not found.");
    }

    const files = fs.readdirSync(aiDir);

    const pythonFiles = files.filter(
        file => file.endsWith(".py")
    );

    if (pythonFiles.length === 0) {
        throw new Error("No Python AI engine found.");
    }

    return path.join(aiDir, pythonFiles[0]);
}

export function runPython(script, args = []) {
    return new Promise((resolve, reject) => {

        const python = spawn(
            "python",
            [script, ...args]
        );

        let output = "";
        let errorOutput = "";

        python.stdout.on("data", data => {
            output += data.toString();
        });

        python.stderr.on("data", data => {
            errorOutput += data.toString();
        });

        python.on("close", code => {
            if (code === 0) {
                resolve(output.trim());
            } else {
                reject(
                    new Error(
                        errorOutput ||
                        `Python exited with code ${code}`
                    )
                );
            }
        });
    });
}