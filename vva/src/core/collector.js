import {
    getRepositoryName,
    getCurrentBranch,
    getLatestCommit,
    getLatestCommitHash,
    getRecentCommits,
    getChangedFiles,
    getLatestDiff,
    getFileVersion
} from "./git.js";

export function collectProjectData() {

    const changedFiles = getChangedFiles();

    const commitHash = getLatestCommitHash();

    const filesWithContent = changedFiles.map(file => {
        return {
            ...file,
            content: getFileVersion(
                commitHash,
                file.file
            )
        };
    });

    return {
        repository: getRepositoryName(),
        branch: getCurrentBranch(),
        analyzedCommit: commitHash,
        latestCommit: getLatestCommit(),
        commits: getRecentCommits(),
        changedFiles: filesWithContent,
        diff: getLatestDiff()
    };
}