import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';

interface AnalyticsProps {
  user: {
    totalCards: number;
    overallProgress: number;
    streakDays: number;
  };
  userDecks: Array<{
    id: string;
    title: string;
    mastered: number;
    totalCards: number;
  }>;
}

export const Analytics: React.FC<AnalyticsProps> = ({ user, userDecks }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Análise de Desempenho</h2>
      <Card>
        <CardHeader>
          <CardTitle>Resumo Geral</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total de cartões estudados: {user.totalCards}</p>
          <p>Progresso geral: {user.overallProgress}%</p>
          <p>Sequência atual: {user.streakDays} dias</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Deck</CardTitle>
        </CardHeader>
        <CardContent>
          {userDecks.map(deck => (
            <div key={deck.id} className="mb-4">
              <p className="font-semibold">{deck.title}</p>
              <Progress value={(deck.mastered / deck.totalCards) * 100} className="w-full mt-2" />
              <p className="text-sm text-muted-foreground">Dominados: {deck.mastered} de {deck.totalCards}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};