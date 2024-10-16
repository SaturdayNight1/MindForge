import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';

interface Deck {
  id: string;
  title: string;
  description: string;
  totalCards: number;
  mastered: number;
  dueToday: number;
}

interface DeckListProps {
  userDecks: Deck[];
  onStartStudy: (deckId: string) => void;
}

export const DeckList: React.FC<DeckListProps> = ({ userDecks, onStartStudy }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Seus Decks</h2>
      {userDecks.map(deck => (
        <Card key={deck.id}>
          <CardHeader>
            <CardTitle>{deck.title}</CardTitle>
            <CardDescription>{deck.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">{deck.totalCards}</p>
                <p className="text-sm text-muted-foreground">Total de cartões</p>
              </div>
              <div>
                <p className="font-bold">{deck.mastered}</p>
                <p className="text-sm text-muted-foreground">Dominados</p>
              </div>
              <div>
                <p className="font-bold">{deck.dueToday}</p>
                <p className="text-sm text-muted-foreground">Para revisar hoje</p>
              </div>
            </div>
            <Progress value={(deck.mastered / deck.totalCards) * 100} className="w-full mt-4" />
            <Button className="mt-4" onClick={() => onStartStudy(deck.id)}>Iniciar Estudo</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};