import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { api } from '../services/api';

interface StudyGroup {
  id: string;
  name: string;
  members: number;
  topic: string;
}

export const CollaborativeLearning: React.FC = () => {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupTopic, setNewGroupTopic] = useState('');

  useEffect(() => {
    const fetchStudyGroups = async () => {
      try {
        const response = await api.get('/collaborative-learning/groups');
        setStudyGroups(response.data);
      } catch (error) {
        console.error('Failed to fetch study groups:', error);
      }
    };
    fetchStudyGroups();
  }, []);

  const createStudyGroup = async () => {
    try {
      const response = await api.post('/collaborative-learning/groups', {
        name: newGroupName,
        topic: newGroupTopic,
      });
      setStudyGroups([...studyGroups, response.data]);
      setNewGroupName('');
      setNewGroupTopic('');
      alert('Study group created successfully!');
    } catch (error) {
      console.error('Failed to create study group:', error);
      alert('Failed to create study group. Please try again.');
    }
  };

  const joinStudyGroup = async (groupId: string) => {
    try {
      await api.post(`/collaborative-learning/groups/${groupId}/join`);
      alert('Joined study group successfully!');
      // Refresh the study groups list
      const response = await api.get('/collaborative-learning/groups');
      setStudyGroups(response.data);
    } catch (error) {
      console.error('Failed to join study group:', error);
      alert('Failed to join study group. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Collaborative Learning</h2>
      <Card>
        <CardHeader>
          <CardTitle>Create a Study Group</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input
              type="text"
              placeholder="Group Name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Topic"
              value={newGroupTopic}
              onChange={(e) => setNewGroupTopic(e.target.value)}
            />
            <Button onClick={createStudyGroup}>Create Group</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Available Study Groups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studyGroups.map((group) => (
              <div key={group.id} className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{group.name}</h3>
                  <p className="text-sm text-gray-500">Topic: {group.topic}</p>
                  <p className="text-sm text-gray-500">Members: {group.members}</p>
                </div>
                <Button onClick={() => joinStudyGroup(group.id)}>Join</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};