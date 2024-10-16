import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { api } from '../services/api';

interface Session {
  id: string;
  title: string;
  tutor: string;
  date: string;
  participants: number;
  maxParticipants: number;
}

export const VirtualClassroom: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get('/virtual-classroom/sessions');
        setSessions(response.data);
      } catch (error) {
        console.error('Failed to fetch virtual classroom sessions:', error);
      }
    };
    fetchSessions();
  }, []);

  const joinSession = async (sessionId: string) => {
    try {
      await api.post(`/virtual-classroom/join/${sessionId}`);
      alert('Joined session successfully!');
      // Implement logic to redirect to the virtual classroom interface
    } catch (error) {
      console.error('Failed to join session:', error);
      alert('Failed to join session. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Virtual Classroom</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sessions.map((session) => (
          <Card key={session.id}>
            <CardHeader>
              <CardTitle>{session.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Tutor: {session.tutor}</p>
              <p>Date: {new Date(session.date).toLocaleString()}</p>
              <p>Participants: {session.participants}/{session.maxParticipants}</p>
              <Button onClick={() => joinSession(session.id)} className="mt-4">Join Session</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};