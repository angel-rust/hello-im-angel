'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitFork, Star, Users } from 'lucide-react';

interface GitHubData {
  public_repos: number;
  followers: number;
  following: number;
  totalStars?: number;
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        // Fetch user data
        const userRes = await fetch('https://api.github.com/users/angel-rust');
        const userData = await userRes.json();

        // Fetch repos to calculate total stars
        const reposRes = await fetch('https://api.github.com/users/angel-rust/repos?per_page=100');
        const reposData = await reposRes.json();

        const totalStars = reposData.reduce(
          (acc: number, repo: any) => acc + repo.stargazers_count,
          0
        );

        setStats({
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          totalStars,
        });
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
        // Fallback data
        setStats({
          public_repos: 25,
          followers: 150,
          following: 75,
          totalStars: 100,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubStats();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div>
      </div>
    );
  }

  const statItems = [
    { icon: GitFork, label: 'Repositories', value: stats?.public_repos || 0 },
    { icon: Star, label: 'Total Stars', value: stats?.totalStars || 0 },
    { icon: Users, label: 'Followers', value: stats?.followers || 0 },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center justify-center"
        >
          <item.icon className="w-6 h-6 text-accent-blue mb-2" />
          <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
          <div className="text-xs text-neutral/60 text-center">{item.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
