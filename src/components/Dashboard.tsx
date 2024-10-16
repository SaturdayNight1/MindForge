import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { sampleStudyData } from '../data/mindforge-sample-data';

interface DashboardProps {
  user: {
    name: string;
    streakDays: number;
    studiedToday: number;
    totalCards: number;
    overallProgress: number;
  };
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo de volta, {user.name}!</CardTitle>
          <CardDescription>Aqui está seu resumo de aprendizagem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-2xl font-bold">{user.streakDays}</p>
              <p className="text-sm text-muted-foreground">Dias de sequência</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{user.studiedToday}</p>
              <p className="text-sm text-muted-foreground">Cartões estudados hoje</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{user.totalCards}</p>
              <p className="text-sm text-muted-foreground">Total de cartões</p>
            </div>
          </div>
          <Progress value={user.overallProgress} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">Progresso geral: {user.overallProgress}%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Progresso de Estudo Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sampleStudyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cards" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};