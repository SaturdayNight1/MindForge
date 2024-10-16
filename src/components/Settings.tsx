import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SettingsProps {
  user: {
    id: string;
    name: string;
    email: string;
    dailyGoal: number;
  };
  onUpdateSettings: (newSettings: Partial<SettingsProps['user']>) => void;
  backupData: {
    user: {
      totalCards: number;
      overallProgress: number;
    } | undefined;
    decks: Array<{
      id: string;
      title: string;
      totalCards: number;
      mastered: number;
    }>;
  };
}

export const Settings: React.FC<SettingsProps> = ({ user, onUpdateSettings, backupData }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [dailyGoal, setDailyGoal] = useState(user.dailyGoal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({ name, email, dailyGoal });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Configurações</h2>
      <Card>
        <CardHeader>
          <CardTitle>Perfil do Usuário</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="dailyGoal" className="block text-sm font-medium text-gray-700">
                Meta Diária (cartões)
              </label>
              <Input
                type="number"
                id="dailyGoal"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <Button type="submit">Salvar Alterações</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dados de Backup</CardTitle>
        </CardHeader>
        <CardContent>
          {backupData.user ? (
            <div>
              <p>Total de cartões: {backupData.user.totalCards}</p>
              <p>Progresso geral: {backupData.user.overallProgress}%</p>
            </div>
          ) : (
            <p>Nenhum dado de backup disponível para este usuário.</p>
          )}
          <h3 className="text-lg font-semibold mt-4 mb-2">Decks em Backup:</h3>
          {backupData.decks.length > 0 ? (
            <ul className="list-disc pl-5">
              {backupData.decks.map(deck => (
                <li key={deck.id}>
                  {deck.title} - {deck.mastered} de {deck.totalCards} cartões dominados
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum deck em backup disponível para este usuário.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};