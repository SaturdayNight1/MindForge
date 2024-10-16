import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export const Community: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Comunidade</h2>
      <Card>
        <CardHeader>
          <CardTitle>Fórum de Discussão</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Recurso em desenvolvimento. Em breve você poderá interagir com outros estudantes!</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Decks Compartilhados</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Recurso em desenvolvimento. Em breve você poderá compartilhar e usar decks de outros usuários!</p>
        </CardContent>
      </Card>
    </div>
  );
};