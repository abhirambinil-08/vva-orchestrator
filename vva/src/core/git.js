import { exec } from "child_process";

export function runGit(command) {

    return new Promise((resolve, reject) => {

        exec(`git ${command}`, (error, stdout, stderr) => {

            if (error) {
                reject(error);
                return;
            }

            resolve({
                stdout,
                stderr
            });

        });

    });
}