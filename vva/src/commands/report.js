import { runGit } from "../core/git.js";

export async function report() {

    try {

        console.log("Analyzing repository...\n");

        const log = await runGit("log -10 --oneline");

        const diff = await runGit("diff HEAD~1 HEAD");

        console.log("Recent commits:");
        console.log(log.stdout);

        console.log("\nChanges:");
        console.log(diff.stdout);

    } catch (error) {

        console.error("Could not analyze repository.");
    }
}