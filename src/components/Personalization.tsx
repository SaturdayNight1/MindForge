import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { api } from '../services/api';

interface Preferences {
  studyDuration: number;
  dailyGoal: number;
  notificationFrequency: string;
  theme: string;
}

export const Personalization: React.FC = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    studyDuration: 25,
    dailyGoal: 50,
    notificationFrequency: 'daily',
    theme: 'light',
  });

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await api.get('/user/preferences');
        setPreferences(response.data);
      } catch (error) {
        console.error('Failed to fetch preferences:', error);
      }
    };
    fetchPreferences();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({ ...prev, [name]: value }));
  };

  const savePreferences = async () => {
    try {
      await api.post('/user/preferences', preferences);
      alert('Preferences saved successfully!');
    } catch (error) {
      console.error('Failed to save preferences:', error);
      alert('Failed to save preferences. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Personalization</h2>
      <Card>
        <CardHeader>
          <CardTitle>Your Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label htmlFor="studyDuration" className="block text-sm font-medium text-gray-700">
                Study Session Duration (minutes)
              </label>
              <Input
                type="number"
                id="studyDuration"
                name="studyDuration"
                value={preferences.studyDuration}
                onChange={handleChange}
                min={5}
                max={120}
              />
            </div>
            <div>
              <label htmlFor="dailyGoal" className="block text-sm font-medium text-gray-700">
                Daily Goal (cards)
              </label>
              <Input
                type="number"
                id="dailyGoal"
                name="dailyGoal"
                value={preferences.dailyGoal}
                onChange={handleChange}
                min={1}
                max={500}
              />
            </div>
            <div>
              <label htmlFor="notificationFrequency" className="block text-sm font-medium text-gray-700">
                Notification Frequency
              </label>
              <select
                id="notificationFrequency"
                name="notificationFrequency"
                value={preferences.notificationFrequency}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="never">Never</option>
              </select>
            </div>
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                Theme
              </label>
              <select
                id="theme"
                name="theme"
                value={preferences.theme}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            <Button onClick={savePreferences}>Save Preferences</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};