import { useState, useEffect } from "react";

export interface GitHubStats {
  stars: string;
  openIssues: string;
  openPrs: string;
  mergedPrs: string;
  lastPush: string;
  contributors: any[];
  loading: boolean;
}

const CACHE_KEY = "refme-github-stats-cache";
const CACHE_DURATION_MS = 36000000; 

export function useGitHubStats(): GitHubStats {
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    stars: "-",
    openIssues: "-",
    openPrs: "-",
    mergedPrs: "-",
    lastPush: "",
    contributors: [],
    loading: true,
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        try {
          const cachedStr = localStorage.getItem(CACHE_KEY);
          if (cachedStr) {
            const cached = JSON.parse(cachedStr);
            if (cached && cached.timestamp && Date.now() - cached.timestamp < CACHE_DURATION_MS) {
              setGithubStats({ ...cached.data, loading: false });
              return; 
            }
          }
        } catch (cacheReadError) {
          console.warn("Failed to read GitHub stats from cache:", cacheReadError);
        }

        const [repoRes, openPrsRes, mergedPrsRes, issuesRes, contributorsRes] = await Promise.all([
          fetch('https://api.github.com/repos/yash-pluto/refme').catch(() => null),
          fetch('https://api.github.com/search/issues?q=repo:yash-pluto/refme+is:pr+is:open').catch(() => null),
          fetch('https://api.github.com/search/issues?q=repo:yash-pluto/refme+is:pr+is:merged').catch(() => null),
          fetch('https://api.github.com/search/issues?q=repo:yash-pluto/refme+is:issue+is:open').catch(() => null),
          fetch('https://api.github.com/repos/yash-pluto/refme/contributors').catch(() => null)
        ]);

        const repoData = repoRes && repoRes.ok ? await repoRes.json() : {};
        const openPrsData = openPrsRes && openPrsRes.ok ? await openPrsRes.json() : {};
        const mergedPrsData = mergedPrsRes && mergedPrsRes.ok ? await mergedPrsRes.json() : {};
        const issuesData = issuesRes && issuesRes.ok ? await issuesRes.json() : {};
        const contributorsData = contributorsRes && contributorsRes.ok ? await contributorsRes.json() : [];

        const freshData = {
          stars: repoData.stargazers_count !== undefined ? repoData.stargazers_count.toString() : "-",
          openIssues: issuesData.total_count !== undefined ? issuesData.total_count.toString() : "-",
          openPrs: openPrsData.total_count !== undefined ? openPrsData.total_count.toString() : "-",
          mergedPrs: mergedPrsData.total_count !== undefined ? mergedPrsData.total_count.toString() : "-",
          lastPush: repoData.pushed_at || repoData.updated_at || "",
          contributors: Array.isArray(contributorsData) ? contributorsData : [],
        };

        setGithubStats({ ...freshData, loading: false });

        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              data: freshData,
              timestamp: Date.now(),
            })
          );
        } catch (cacheWriteError) {
          console.warn("Failed to write GitHub stats to cache:", cacheWriteError);
        }
      } catch (error) {
        setGithubStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchGitHubStats();
  }, []);

  return githubStats;
}