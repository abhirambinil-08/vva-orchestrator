import { runGit } from "../core/git.js";

export async function status() {

    try {

        const result = await runGit("status --short");

        console.log("VVA Status\n");

        console.log(result.stdout);

    } catch (error) {

        console.error("Could not read Git status.");
    }
}