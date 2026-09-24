import { execSync } from "child_process";

export function runGit(command) {
    try {
        return execSync(`git ${command}`, {
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"]
        }).trim();
    } catch (error) {
        return null;
    }
}

export function isGitRepository() {
    const result = runGit(
        "rev-parse --is-inside-work-tree"
    );

    return result === "true";
}

export function getRepositoryName() {
    const result = runGit(
        "rev-parse --show-toplevel"
    );

    if (!result) {
        return null;
    }

    const parts = result.split(/[\\/]/);
    return parts[parts.length - 1];
}

export function getCurrentBranch() {
    return runGit(
        "branch --show-current"
    );
}

export function getGitStatus() {
    return runGit(
        "status --short"
    );
}

export function getLatestCommit() {
    return runGit(
        'log -1 --pretty=format:"%h - %s"'
    );
}

export function getRecentCommits(limit = 10) {
    const result = runGit(
        `log -${limit} --pretty=format:"%h|%an|%ad|%s" --date=iso`
    );

    if (!result) {
        return [];
    }

    return result.split("\n").map(line => {
        const [hash, author, date, message] = line.split("|");

        return {
            hash,
            author,
            date,
            message
        };
    });
}

export function getChangedFiles() {
    const result = runGit(
        "diff --name-status HEAD~1 HEAD"
    );

    if (!result) {
        return [];
    }

    return result.split("\n").map(line => {
        const [status, file] = line.split("\t");

        return {
            status,
            file
        };
    });
}

export function getLatestDiff() {
    return runGit("diff HEAD~1 HEAD") || "";
}