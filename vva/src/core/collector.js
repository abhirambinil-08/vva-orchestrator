import {
    getRepositoryName,
    getCurrentBranch,
    getLatestCommit,
    getRecentCommits,
    getChangedFiles,
    getLatestDiff
} from "./git.js";

export function collectProjectData() {
    return {
        repository: getRepositoryName(),
        branch: getCurrentBranch(),
        latestCommit: getLatestCommit(),
        commits: getRecentCommits(),
        changedFiles: getChangedFiles(),
        diff: getLatestDiff()
    };
}