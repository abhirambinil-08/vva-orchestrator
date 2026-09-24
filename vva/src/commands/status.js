import fs from "fs";
import path from "path";

import {
    isGitRepository,
    getRepositoryName,
    getCurrentBranch,
    getGitStatus,
    getLatestCommit
} from "../core/git.js";

function status() {
    console.log("\nVVA Status\n");

    // Check Git repository
    if (!isGitRepository()) {
        console.log("✗ Not a Git repository.\n");
        return;
    }

    const repository = getRepositoryName();
    const branch = getCurrentBranch();
    const gitStatus = getGitStatus();
    const latestCommit = getLatestCommit();

    console.log(`Repository : ${repository}`);
    console.log(`Branch     : ${branch}`);

    if (!gitStatus) {
        console.log("Git Status : Clean");
    } else {
        console.log("Git Status : Changes detected");
    }

    console.log("\nLatest Commit:");

    if (latestCommit) {
        console.log(`  ${latestCommit}`);
    } else {
        console.log("  No commits found");
    }

    console.log("\nVVA:");

    const vvaDir = path.join(process.cwd(), ".vva");

    if (fs.existsSync(vvaDir)) {
        console.log("  ✓ Initialized");
    } else {
        console.log("  ✗ Not initialized");
    }

    console.log();
}

export default status;