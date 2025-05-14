import React from 'react';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import { animations } from '../utils/animations';
import { mockLeaderboard } from '../utils/mockData';

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Leaderboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Top performers this month based on XP earned
          </p>
        </div>

        <Card className={`${animations.fadeIn}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    XP
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockLeaderboard.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`${
                      index < 3 ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                    } hover:bg-gray-50 dark:hover:bg-gray-800/50`}
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        {index < 3 ? (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                            <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                              {index + 1}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">{index + 1}</span>
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <Avatar
                          src={user.avatar}
                          alt={user.name}
                          size="sm"
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          {index < 3 && (
                            <Badge
                              variant={index === 0 ? 'success' : index === 1 ? 'primary' : 'secondary'}
                              size="sm"
                            >
                              {index === 0 ? 'Gold' : index === 1 ? 'Silver' : 'Bronze'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-gray-900 dark:text-white">Level {user.level}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-gray-900 dark:text-white">{user.xp} XP</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className={`${animations.slideUp}`}>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {mockLeaderboard[0].xp}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Highest XP</div>
            </div>
          </Card>
          <Card className={`${animations.slideUp}`} style={{ animationDelay: '100ms' }}>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {mockLeaderboard[0].level}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Highest Level</div>
            </div>
          </Card>
          <Card className={`${animations.slideUp}`} style={{ animationDelay: '200ms' }}>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {mockLeaderboard.length}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Active Learners</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 