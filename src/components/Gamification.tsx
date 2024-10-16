import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { api } from '../services/api';

interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    unlocked: boolean;
  }>;
}

export const Gamification: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await api.get('/gamification/stats');
        setUserStats(response.data);
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
      }
    };
    fetchUserStats();
  }, []);

  if (!userStats) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Achievements</h2>
      <Card>
        <CardHeader>
          <CardTitle>Level {userStats.level}</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={(userStats.xp / userStats.xpToNextLevel) * 100} className="mb-2" />
          <p>{userStats.xp} / {userStats.xpToNextLevel} XP to next level</p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userStats.achievements.map((achievement) => (
          <Card key={achievement.id}>
            <CardHeader>
              <CardTitle>{achievement.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{achievement.description}</p>
              {achievement.unlocked ? (
                <p className="text-green-500 mt-2">Unlocked!</p>
              ) : (
                <p className="text-gray-500 mt-2">Locked</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};